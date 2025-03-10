import React from 'react';
import NotebookTab from '../notebook/NotebookTab';

export default function TabContainer({ tabs, activeTabId, onSelectTab, onCloseTab, datasets }) {
  // Active notebook data
  const activeNotebook = tabs.find(tab => tab.id === activeTabId);
  
  // If no tabs are open
  if (tabs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-2xl mb-4">No notebooks open</p>
          <p>Select a notebook from the sidebar to begin exploring</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Tab Headers */}
      <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`tab-header ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            {/* Tab Icon */}
            <span className="mr-2">{tab.icon || '📓'}</span>
            
            {/* Tab Title */}
            <span className="flex-1 truncate text-sm">{tab.title}</span>
            
            {/* Close Button */}
            <button 
              className="ml-2 w-5 h-5 flex items-center justify-center rounded-sm
                        hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
            >
              <span className="text-xs">×</span>
            </button>
          </div>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {activeNotebook && (
          <NotebookTab
            key={activeTabId}
            notebook={activeNotebook}
            datasets={datasets}
          />
        )}
      </div>
    </div>
  );
}
