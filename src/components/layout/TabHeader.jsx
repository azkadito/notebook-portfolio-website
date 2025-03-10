import React from 'react';

/**
 * TabHeader - Individual tab header in the VSCode-style tab bar
 * 
 * Displays the tab title, icon, and close button
 */
const TabHeader = ({ 
  tabId, 
  title,
  icon = '📓',
  isActive = false,
  onSelect = () => {},
  onClose = () => {}
}) => {
  // Prevent close button click from selecting the tab
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };
  
  return (
    <div 
      onClick={onSelect}
      className={`tab-header flex items-center min-w-[150px] max-w-[200px] h-10 px-3 
                 border-r border-gray-700 cursor-pointer group
                 transition-colors ${isActive 
                  ? 'bg-gray-900 text-white border-t-2 border-t-terminal-green' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-900'}`}
    >
      {/* Tab Icon */}
      <span className="mr-2">{icon}</span>
      
      {/* Tab Title */}
      <span className="flex-1 truncate text-sm">{title}</span>
      
      {/* Close Button */}
      <button 
        onClick={handleCloseClick}
        className={`ml-2 w-5 h-5 flex items-center justify-center rounded-sm
                  group-hover:bg-gray-700 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}
      >
        <span className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>×</span>
      </button>
    </div>
  );
};

export default TabHeader;