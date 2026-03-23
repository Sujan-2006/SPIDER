import React from 'react';
import { COMPONENT_TYPES } from './elementDefs';

export default function Sidebar({ onDragStart }) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-sm relative">
      <div className="p-5 border-b border-gray-200 bg-gray-50/50">
        <h2 className="text-sm uppercase tracking-wider font-bold text-gray-500">Components</h2>
        <p className="text-xs text-gray-400 mt-1">Drag elements to canvas</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {Object.values(COMPONENT_TYPES).map((comp) => {
          const Icon = comp.icon;
          return (
            <div
              key={comp.type}
              draggable
              onDragStart={(e) => onDragStart(e, comp.type)}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-blue-500 hover:shadow-md hover:text-blue-600 transition-all cursor-grab active:cursor-grabbing group"
            >
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                {comp.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
