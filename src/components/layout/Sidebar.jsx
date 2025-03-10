import React from 'react';

export default function Sidebar({ 
  notebooks, 
  activeNotebookId, 
  collapsed, 
  onToggleCollapse, 
  onSelectNotebook 
}) {
  // Group notebooks by category
  const notebooksByCategory = notebooks.reduce((acc, notebook) => {
    const category = notebook.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(notebook);
    return acc;
  }, {});
  
  return (
    <>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!collapsed && (
          <div className="font-semibold text-terminal-green text-sm">EXPLORER</div>
        )}
        <button 
          onClick={onToggleCollapse}
          className="p-1 text-gray-400 hover:text-white"
        >
          {collapsed ? (
            <span className="text-xl">&#8250;</span> // Right arrow
          ) : (
            <span className="text-xl">&#8249;</span> // Left arrow
          )}
        </button>
      </div>
      
      {/* Sidebar Content */}
      <div className="sidebar-content">
        {Object.entries(notebooksByCategory).map(([category, categoryNotebooks]) => (
          <div key={category} className="sidebar-category">
            {/* Category Header */}
            {!collapsed && (
              <div className="sidebar-category-header">
                {category}
              </div>
            )}
            
            {/* Notebooks */}
            <div>
              {categoryNotebooks.map(notebook => (
                <div
                  key={notebook.id}
                  onClick={() => onSelectNotebook(notebook.id)}
                  className={`sidebar-item ${activeNotebookId === notebook.id ? 'active' : ''}`}
                >
                  {/* Icon */}
                  <span className="text-lg text-terminal-green mr-2">
                    {notebook.icon || '📓'}
                  </span>
                  
                  {/* Title */}
                  {!collapsed && (
                    <span className="text-gray-300 text-sm truncate">
                      {notebook.title}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Sidebar Footer */}
      <div className="h-12 border-t border-gray-700 flex items-center justify-center">
        <button className="p-2 text-terminal-green hover:text-terminal-blue">
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </>
  );
}
