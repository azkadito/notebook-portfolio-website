import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TabContainer from './TabContainer';

export default function NotebookLayout({ notebooks = [], datasets = {}, defaultActiveNotebook = null }) {
  // State for sidebar collapsed status
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // State for active notebook
  const [activeNotebookId, setActiveNotebookId] = useState(defaultActiveNotebook || (notebooks[0]?.id || null));
  
  // State for open tabs
  const [openTabs, setOpenTabs] = useState(() => {
    if (defaultActiveNotebook) {
      const tab = notebooks.find(n => n.id === defaultActiveNotebook);
      return tab ? [tab] : [];
    } else if (notebooks.length > 0) {
      return [notebooks[0]];
    }
    return [];
  });
  
  // Handle toggling sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Handle selecting a notebook from sidebar
  const handleSelectNotebook = (notebookId) => {
    // Check if notebook is already open in a tab
    const isOpen = openTabs.some(tab => tab.id === notebookId);
    
    // If not open, add it to open tabs
    if (!isOpen) {
      const notebookToOpen = notebooks.find(n => n.id === notebookId);
      if (notebookToOpen) {
        setOpenTabs(prev => [...prev, notebookToOpen]);
      }
    }
    
    // Set as active notebook
    setActiveNotebookId(notebookId);
  };
  
  // Handle closing a tab
  const handleCloseTab = (notebookId) => {
    // Remove from open tabs
    const updatedTabs = openTabs.filter(tab => tab.id !== notebookId);
    setOpenTabs(updatedTabs);
    
    // If closing active tab, activate another one
    if (notebookId === activeNotebookId && updatedTabs.length > 0) {
      setActiveNotebookId(updatedTabs[0].id);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-notebook-dark text-notebook-light">
      {/* Sidebar */}
      <div className={`sidebar-container ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <Sidebar 
          notebooks={notebooks}
          activeNotebookId={activeNotebookId}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          onSelectNotebook={handleSelectNotebook}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TabContainer 
          tabs={openTabs}
          activeTabId={activeNotebookId}
          onSelectTab={handleSelectNotebook}
          onCloseTab={handleCloseTab}
          datasets={datasets}
        />
      </div>
    </div>
  );
}
