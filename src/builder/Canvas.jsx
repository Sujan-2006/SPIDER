import React from 'react';
import { COMPONENT_TYPES } from './elementDefs';

function ElementWrapper({ element, selectedId, onSelect, onDrop, onDragStart, onDragOver, children }) {
  const isSelected = selectedId === element.id;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, element.id)}
      onDragOver={(e) => onDragOver(e, element.id)}
      onDrop={(e) => onDrop(e, element.id)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      className={`relative group cursor-pointer transition-all ${
        isSelected ? 'selected-element ring-2 ring-blue-500 z-10' : 'hover:outline hover:outline-2 hover:outline-blue-300 hover:z-10'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-t-md font-medium tracking-wider uppercase z-20">
          {element.type}
        </div>
      )}
      <div className={`${isSelected ? 'pointer-events-none' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default function Canvas({ elements, selectedId, onSelect, onDrop, onDragStart, onDragOver }) {
  const getElementStyles = (props) => {
    return Object.values(props).filter(v => typeof v === 'string').join(' ');
  };

  const renderElement = (node) => {
    const { type, props, id, children } = node;
    
    let content = null;
    
    if (type === 'Heading') {
      content = <h2 className={getElementStyles(props)}>{props.text}</h2>;
    } else if (type === 'Paragraph') {
      content = <p className={getElementStyles(props)}>{props.text}</p>;
    } else if (type === 'Button') {
      content = (
        <button className={getElementStyles(props)} onClick={(e) => e.preventDefault()}>
          {props.text}
        </button>
      );
    } else if (type === 'Image') {
      content = (
        <img 
          src={props.src} 
          alt={props.alt} 
          className={getElementStyles({ ...props, src: '', alt: '' })} 
        />
      );
    } else if (type === 'Container') {
      content = (
        <div className={`min-h-[100px] w-full ${getElementStyles(props)}`}>
          {children && children.length > 0 ? (
            children.map(child => renderElement(child))
          ) : (
            <div className="w-full h-full min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50/50">
              Drop components here
            </div>
          )}
        </div>
      );
    }

    return (
      <ElementWrapper
        key={id}
        element={node}
        selectedId={selectedId}
        onSelect={onSelect}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
      >
        {content}
      </ElementWrapper>
    );
  };

  return (
    <div 
      className="flex-1 overflow-y-auto bg-gray-100 p-8 flex justify-center"
      onDragOver={(e) => onDragOver(e, 'root')}
      onDrop={(e) => onDrop(e, 'root')}
      onClick={(e) => {
        // Deselect if clicking outside elements
        if (e.target === e.currentTarget || e.target.id === 'canvas-inner') {
          onSelect(null);
        }
      }}
    >
      <div 
        id="canvas-inner"
        className="w-full max-w-5xl bg-white min-h-[800px] shadow-sm ring-1 ring-gray-900/5 transition-all"
        style={{ padding: elements.length === 0 ? '0' : '20px' }}
      >
        {elements.length === 0 ? (
          <div className="h-full w-full min-h-[800px] flex flex-col items-center justify-center text-gray-400 p-8 focus:outline-none PointerEventsNone">
             <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 w-full max-w-2xl text-center bg-gray-50 h-[400px] flex flex-col items-center justify-center pointer-events-none">
                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-medium text-gray-600 mb-2">Your canvas is empty</h3>
                <p className="text-gray-400">Drag and drop components from the sidebar to start building.</p>
             </div>
          </div>
        ) : (
          <div className="space-y-4">
            {elements.map(renderElement)}
          </div>
        )}
      </div>
    </div>
  );
}
