import React from 'react';
import { COMPONENT_TYPES } from './elementDefs';
import { Trash2, Copy, MoveUp, MoveDown, Layers } from 'lucide-react';

export default function PropertiesPanel({ selectedElement, updateElement, deleteElement, duplicateElement, moveElementUp, moveElementDown }) {
  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col items-center justify-center p-8 text-center text-gray-400 z-10 shadow-sm relative">
        <Layers className="w-12 h-12 mb-4 text-gray-200" />
        <p className="font-medium text-gray-500">No element selected</p>
        <p className="text-sm mt-2">Click on an element in the canvas to edit its properties.</p>
      </div>
    );
  }

  const def = COMPONENT_TYPES[selectedElement.type];
  if (!def) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full z-10 shadow-[0_0_20px_rgba(0,0,0,0.02)] relative">
      <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <def.icon className="w-4 h-4 text-blue-500" />
            {def.label}
          </h2>
          <p className="text-[10px] text-gray-400 font-mono mt-1 w-full truncate" title={selectedElement.id}>
            ID: {selectedElement.id.split('-')[0]}
          </p>
        </div>
        <div className="flex bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => moveElementUp(selectedElement.id)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors border-r border-gray-100"
            title="Move Up"
          >
            <MoveUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => moveElementDown(selectedElement.id)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors border-r border-gray-100"
            title="Move Down"
          >
            <MoveDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => duplicateElement(selectedElement.id)}
            className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors border-r border-gray-100"
            title="Duplicate"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteElement(selectedElement.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 form-container custom-scrollbar">
        {Object.entries(def.schema).map(([propName, fieldDef]) => {
          const value = selectedElement.props[propName] || '';

          if (fieldDef.type === 'string') {
            return (
              <div key={propName} className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">
                  {fieldDef.label}
                </label>
                {fieldDef.multiline ? (
                  <textarea
                    value={value}
                    onChange={(e) => updateElement(selectedElement.id, { [propName]: e.target.value })}
                    className="w-full text-sm border-gray-200 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm bg-gray-50 focus:bg-white resize-y min-h-[100px]"
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateElement(selectedElement.id, { [propName]: e.target.value })}
                    className="w-full text-sm border-gray-200 border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm bg-gray-50 focus:bg-white"
                  />
                )}
              </div>
            );
          }

          if (fieldDef.type === 'select') {
            return (
              <div key={propName} className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">
                  {fieldDef.label}
                </label>
                <div className="relative">
                  <select
                    value={value}
                    onChange={(e) => updateElement(selectedElement.id, { [propName]: e.target.value })}
                    className="w-full text-sm border-gray-200 border rounded-lg p-2.5 pr-8 appearance-none outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm bg-gray-50 focus:bg-white cursor-pointer"
                  >
                    {fieldDef.options.map((opt) => {
                      const optValue = typeof opt === 'string' ? opt : opt.value;
                      const optLabel = typeof opt === 'string' ? opt : opt.label;
                      return (
                        <option key={optValue} value={optValue}>
                          {optLabel}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
