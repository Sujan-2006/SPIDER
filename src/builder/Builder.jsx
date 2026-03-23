import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import { v4 as uuidv4 } from 'uuid';
import { COMPONENT_TYPES } from './elementDefs';

export default function Builder() {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  const [draggedItem, setDraggedItem] = useState(null); // { type: 'Sidebar', compType: 'Heading' } or { type: 'Canvas', id: '123' }

  const handleDragStartSidebar = (e, compType) => {
    e.dataTransfer.setData('source', 'sidebar');
    e.dataTransfer.setData('compType', compType);
    setDraggedItem({ source: 'sidebar', compType });
    e.dataTransfer.effectAllowed = 'copyUrl';
  };

  const handleDragStartCanvas = (e, id) => {
    e.stopPropagation();
    e.dataTransfer.setData('source', 'canvas');
    e.dataTransfer.setData('id', id);
    setDraggedItem({ source: 'canvas', id });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = draggedItem?.source === 'sidebar' ? 'copy' : 'move';
  };

  const recursiveFindAndRemove = (nodes, id) => {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
            const removed = nodes.splice(i, 1)[0];
            return removed;
        }
        if (nodes[i].children) {
            const removed = recursiveFindAndRemove(nodes[i].children, id);
            if (removed) return removed;
        }
    }
    return null;
  };

  const recursiveFindAndInsert = (nodes, targetId, newNode, position = 'after') => {
      if (targetId === 'root') {
          nodes.push(newNode);
          return true;
      }
      
      for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === targetId) {
             if (nodes[i].type === 'Container' && position === 'inside') {
                if (!nodes[i].children) nodes[i].children = [];
                nodes[i].children.push(newNode);
             } else {
                nodes.splice(i + 1, 0, newNode);
             }
             return true;
          }
          if (nodes[i].children) {
             if (recursiveFindAndInsert(nodes[i].children, targetId, newNode, position)) {
                 return true;
             }
          }
      }
      return false;
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Cleanup active zones
    document.querySelectorAll('.drop-zone-active').forEach(el => el.classList.remove('drop-zone-active'));

    const source = e.dataTransfer.getData('source');
    
    // Create new element
    if (source === 'sidebar') {
      const compType = e.dataTransfer.getData('compType');
      const def = COMPONENT_TYPES[compType];
      
      const newElement = {
        id: uuidv4(),
        type: compType,
        props: { ...def.defaultProps },
        children: def.isContainer ? [] : undefined
      };
      
      const newElements = JSON.parse(JSON.stringify(elements)); // Deep copy
      recursiveFindAndInsert(newElements, targetId, newElement, 'inside');
      setElements(newElements);
      setSelectedId(newElement.id);
    } 
    // Move existing element
    else if (source === 'canvas') {
      const draggedId = e.dataTransfer.getData('id');
      if (draggedId === targetId) return; // Dropped on itself
      
      const newElements = JSON.parse(JSON.stringify(elements));
      
      // Prevent dropping a parent into its own child (prevent infinite loops)
      const isDescendant = (nodes, parendId, currentTargetId) => {
          let foundParent = null;

          const findNode = (n, id) => {
            for (let i=0; i < n.length; i++) {
                if (n[i].id === id) return n[i];
                if (n[i].children) {
                    const res = findNode(n[i].children, id);
                    if(res) return res;
                }
            }
            return null;
          };

          const pNode = findNode(nodes, parendId);
          if (!pNode || !pNode.children) return false;
          
          return findNode(pNode.children, currentTargetId) !== null;
      };

      if (isDescendant(newElements, draggedId, targetId)) {
        console.warn("Cannot drop a container into its own child.");
        return;
      }
      
      const removedNode = recursiveFindAndRemove(newElements, draggedId);
      if (removedNode) {
         recursiveFindAndInsert(newElements, targetId, removedNode, 'inside');
         setElements(newElements);
      }
    }
    
    setDraggedItem(null);
  };

  const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.classList.add('drop-zone-active');
  };

  const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.classList.remove('drop-zone-active');
  };

  const findElement = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findElement(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedElement = selectedId ? findElement(elements, selectedId) : null;

  const updateElement = (id, newProps) => {
    const newElements = JSON.parse(JSON.stringify(elements));
    const node = findElement(newElements, id);
    if (node) {
      node.props = { ...node.props, ...newProps };
      setElements(newElements);
    }
  };

  const deleteElement = (id) => {
    const newElements = JSON.parse(JSON.stringify(elements));
    recursiveFindAndRemove(newElements, id);
    setElements(newElements);
    if (selectedId === id) setSelectedId(null);
  };

  const duplicateElement = (id) => {
      const newElements = JSON.parse(JSON.stringify(elements));
      const nodeToDuplicate = findElement(newElements, id);

      if(nodeToDuplicate) {
          const cloneDeepAndRenewIds = (node) => {
             const cloned = JSON.parse(JSON.stringify(node));
             cloned.id = uuidv4();
             if (cloned.children) {
                 cloned.children = cloned.children.map(cloneDeepAndRenewIds);
             }
             return cloned;
          };

          const clone = cloneDeepAndRenewIds(nodeToDuplicate);
          // Find parent array and index to insert after
           const insertAfter = (nodes, tId) => {
               for(let i=0; i<nodes.length; i++) {
                   if(nodes[i].id === tId) {
                      nodes.splice(i+1, 0, clone);
                      return true;
                   }
                   if(nodes[i].children) {
                      if(insertAfter(nodes[i].children, tId)) return true;
                   }
               }
               return false;
           };

           // Root level direct child check
           let inserted = false;
           for(let i=0; i<newElements.length; i++) {
               if(newElements[i].id === id) {
                   newElements.splice(i+1, 0, clone);
                   inserted = true;
                   break;
               }
           }
           if (!inserted) {
               insertAfter(newElements, id);
           }

           setElements(newElements);
           setSelectedId(clone.id);
      }
  };

  const moveElement = (id, direction) => {
      const newElements = JSON.parse(JSON.stringify(elements));
      
      const moveInArray = (nodes, tId) => {
          for(let i=0; i<nodes.length; i++) {
              if (nodes[i].id === tId) {
                  if (direction === -1 && i > 0) {
                      const temp = nodes[i];
                      nodes[i] = nodes[i-1];
                      nodes[i-1] = temp;
                      return true;
                  }
                  if (direction === 1 && i < nodes.length - 1) {
                      const temp = nodes[i];
                      nodes[i] = nodes[i+1];
                      nodes[i+1] = temp;
                      return true;
                  }
                  return false; // Can't move
              }
              if (nodes[i].children) {
                  if(moveInArray(nodes[i].children, tId)) return true;
              }
          }
          return false;
      };

      if (moveInArray(newElements, id)) {
         setElements(newElements);
      }
  };

  return (
    <div className="flex w-full h-full bg-[#f3f4f6]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-6 shadow-sm">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-inner">
               <span className="text-white font-bold text-lg leading-none">W</span>
            </div>
            <h1 className="font-semibold text-gray-800 tracking-tight">WebBuilder <span className="text-blue-500 font-light">Pro</span></h1>
         </div>
         <div className="flex items-center gap-3">
            <button 
               className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
               onClick={() => setElements([])}
            >
               Clear Canvas
            </button>
            <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all hover:shadow-blue-600/40">
               Publish
            </button>
         </div>
      </div>

      <div className="pt-14 flex w-full h-full text-left">
          <Sidebar 
            onDragStart={handleDragStartSidebar} 
          />
          
          <Canvas 
            elements={elements}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDrop={handleDrop}
            onDragStart={handleDragStartCanvas}
            onDragOver={handleDragOver}
          />
          
          <PropertiesPanel 
            selectedElement={selectedElement}
            updateElement={updateElement}
            deleteElement={deleteElement}
            duplicateElement={duplicateElement}
            moveElementUp={(id) => moveElement(id, -1)}
            moveElementDown={(id) => moveElement(id, 1)}
          />
      </div>
    </div>
  );
}
