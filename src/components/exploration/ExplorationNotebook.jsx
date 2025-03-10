import React, { useState } from 'react';
import ExplorationCell from './ExplorationCell';

/**
 * ExplorationNotebook - Main container for the dataset exploration experience
 * 
 * Simplified version with clean state management and focused interactivity
 */
const ExplorationNotebook = ({ 
  initialCells = [],
  datasets = {},
  enableReset = true
}) => {
  // State to hold all cells in the notebook
  const [cells, setCells] = useState(initialCells);
  
  // Function to add a new cell to the notebook
  const addCell = (newCell) => {
    setCells(prevCells => [...prevCells, newCell]);
  };
  
  // Function to handle interaction with cell elements
  const handleInteraction = (action) => {
    switch (action.type) {
      case 'load_dataset':
        handleDatasetLoad(action.dataset);
        break;
      case 'explore_item':
        handleItemExploration(action.dataset, action.itemId);
        break;
      case 'custom':
        if (action.handler && typeof action.handler === 'function') {
          action.handler();
        }
        break;
      default:
        console.warn('Unknown action type:', action.type);
    }
  };
  
  // Handle loading a dataset
  const handleDatasetLoad = (datasetKey) => {
    const dataset = datasets[datasetKey];
    
    if (!dataset) {
      console.error(`Dataset '${datasetKey}' not found`);
      return;
    }
    
    // Create code for the cell
    const cellCode = `# Loading dataset: ${datasetKey}
dataset = load_dataset("${datasetKey}")

# Display basic information
dataset.info()`;
    
    // Generate interactive elements for the dataset items
    const interactiveElements = dataset.items.map(item => {
      const nameField = item.name || item.title || item.id;
      const startIdx = cellCode.indexOf('dataset.info()');
      
      return {
        start: startIdx,
        end: startIdx + 'dataset.info()'.length,
        type: 'function',
        tooltip: `Explore details for ${nameField}`,
        action: {
          type: 'explore_item',
          dataset: datasetKey,
          itemId: item.id || item.name
        }
      };
    });
    
    // Add a new cell with the dataset information
    addCell({
      code: cellCode,
      output: renderDatasetPreview(dataset),
      interactiveElements
    });
  };
  
  // Handle exploring a specific item in a dataset
  const handleItemExploration = (datasetKey, itemId) => {
    const dataset = datasets[datasetKey];
    
    if (!dataset || !dataset.items) {
      console.error(`Dataset '${datasetKey}' or its items not found`);
      return;
    }
    
    // Find the specific item
    const item = dataset.items.find(item => 
      (item.id && item.id === itemId) || (item.name && item.name === itemId)
    );
    
    if (!item) {
      console.error(`Item '${itemId}' not found in dataset '${datasetKey}'`);
      return;
    }
    
    // Create code for the cell
    const nameField = item.name || item.title || item.id;
    const cellCode = `# Exploring details for: ${nameField}
item = dataset.get_item("${itemId}")

# Display detailed information
display_details(item)`;
    
    // Generate interactive elements for related items if any
    const interactiveElements = [];
    
    // If the item has related datasets, add interactive elements for them
    if (item.related) {
      Object.entries(item.related).forEach(([key, value]) => {
        const keyIndex = cellCode.indexOf(key);
        if (keyIndex >= 0 && datasets[value]) {
          interactiveElements.push({
            start: keyIndex,
            end: keyIndex + key.length,
            type: 'keyword',
            tooltip: `Explore related dataset: ${value}`,
            action: {
              type: 'load_dataset',
              dataset: value
            }
          });
        }
      });
    }
    
    // Add a new cell with the item details
    addCell({
      code: cellCode,
      output: renderItemDetails(item),
      interactiveElements
    });
  };
  
  // Function to reset the notebook to its initial state
  const resetNotebook = () => {
    setCells(initialCells);
  };
  
  // Render a preview of a dataset
  const renderDatasetPreview = (dataset) => {
    return (
      <div className="dataset-preview">
        <h3 className="text-xl font-mono mb-4 text-green-500">
          Dataset: {dataset.name || 'Unnamed'}
        </h3>
        
        {dataset.description && (
          <div className="mb-4 text-gray-300">
            <p>{dataset.description}</p>
          </div>
        )}
        
        {dataset.items && dataset.items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  {Object.keys(dataset.items[0]).filter(key => 
                    !['id', 'related'].includes(key)
                  ).map(key => (
                    <th key={key} className="p-2 border border-gray-700 text-left text-blue-400">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.items.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                    {Object.entries(item).filter(([key]) => 
                      !['id', 'related'].includes(key)
                    ).map(([key, value], i) => (
                      <td key={i} className="p-2 border border-gray-700">
                        {typeof value === 'object' ? 
                          JSON.stringify(value) : 
                          String(value)
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-400">No data available</div>
        )}
      </div>
    );
  };
  
  // Render detailed view of a dataset item
  const renderItemDetails = (item) => {
    // Filter out internal fields
    const displayFields = Object.entries(item).filter(
      ([key]) => !['id', 'related'].includes(key)
    );
    
    return (
      <div className="detail-view">
        <h3 className="text-xl font-mono mb-4 text-blue-400">
          {item.title || item.name || 'Item Details'}
        </h3>
        
        <div className="bg-gray-800 border-l-4 border-blue-500 p-4 rounded-md">
          {displayFields.map(([key, value]) => (
            <div key={key} className="mb-3">
              <div className="text-green-400 font-mono mb-1">{key}:</div>
              <div className="pl-4 text-gray-300">
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside">
                    {value.map((item, i) => (
                      <li key={i} className="mb-1">
                        {typeof item === 'object' ? JSON.stringify(item) : String(item)}
                      </li>
                    ))}
                  </ul>
                ) : typeof value === 'object' ? (
                  <pre className="text-xs overflow-x-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  String(value)
                )}
              </div>
            </div>
          ))}
        </div>
        
        {item.related && (
          <div className="mt-6">
            <h4 className="text-lg font-mono mb-2 text-yellow-400">Related:</h4>
            <ul className="space-y-2">
              {Object.entries(item.related).map(([key, value]) => (
                <li key={key} className="flex items-center">
                  <span className="text-gray-400 mr-2">•</span>
                  <span className="text-gray-300">{key}: </span>
                  <button
                    onClick={() => handleInteraction({
                      type: 'load_dataset', 
                      dataset: value
                    })}
                    className="ml-2 px-2 py-0.5 rounded bg-blue-900 text-blue-300 hover:bg-blue-800 transition-colors"
                  >
                    {value}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="exploration-notebook pb-20">
      {cells.map((cell, index) => (
        <ExplorationCell
          key={index}
          cellNumber={index + 1}
          code={cell.code}
          output={cell.output}
          interactiveElements={cell.interactiveElements || []}
          onInteraction={handleInteraction}
          typingSpeed={15}
          typingDelay={index * 200} // Stagger the typing of cells
        />
      ))}
      
      {enableReset && cells.length > 0 && (
        <button 
          onClick={resetNotebook}
          className="fixed bottom-4 right-4 bg-gray-800 text-gray-300 px-3 py-2 rounded-md
                   border border-gray-700 hover:bg-gray-700 transition-colors shadow-lg
                   flex items-center space-x-1 text-sm"
        >
          <span className="text-yellow-500">$</span>
          <span>reset_notebook()</span>
        </button>
      )}
    </div>
  );
};

export default ExplorationNotebook;