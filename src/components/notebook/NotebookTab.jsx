import React, { useState, useRef, useEffect } from 'react';
import NotebookCell from './NotebookCell';

export default function NotebookTab({ notebook, datasets }) {
  // Create default welcome cell if no initial cells provided
  const getInitialCells = () => {
    if (notebook.initialCells && notebook.initialCells.length > 0) {
      return notebook.initialCells;
    }
    
    // Default welcome cell
    return [{
      code: `# ${notebook.title || 'Welcome to Data Explorer'}
# Let's explore the available data

available_data = list_available_data()
print("Available data sources:")
for source in available_data:
    print(f"  > {source}")

# Click on any data source to explore it`,
      output: (
        <div className="p-4">
          <h3 className="text-xl mb-4 text-terminal-green">Available data sources:</h3>
          <ul className="dataset-list space-y-3">
            {Object.keys(datasets).map(datasetKey => (
              <li key={datasetKey} className="flex items-start">
                <span className="text-terminal-blue mr-2">•</span>
                <div>
                  <button
                    onClick={() => handleInteraction({
                      type: 'load_dataset',
                      dataset: datasetKey
                    })}
                    className="interactive-keyword"
                  >
                    {datasetKey}
                  </button>
                  <p className="text-sm text-gray-400 ml-6 mt-1">
                    {datasets[datasetKey]?.description || ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ),
      interactiveElements: []
    }];
  };
  
  // State for cells in this notebook
  const [cells, setCells] = useState(getInitialCells);
  
  // Reference for auto-scrolling
  const bottomRef = useRef(null);
  
  // Auto-scroll when new cells are added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cells.length]);
  
  // Add a new cell
  const addCell = (newCell) => {
    setCells(prev => [...prev, newCell]);
  };
  
  // Handle interaction events (like loading a dataset)
  const handleInteraction = (action) => {
    switch (action.type) {
      case 'load_dataset':
        handleDatasetLoad(action.dataset);
        break;
      case 'explore_item':
        handleItemExploration(action.dataset, action.itemId);
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
    
    // Code for dataset exploration
    const cellCode = `# Exploring dataset: ${datasetKey}
import pandas as pd

# Load the dataset
data = pd.read_json("${datasetKey}.json")

# Display basic information
data.info()
data.head()`;
    
    // Add a new cell
    addCell({
      code: cellCode,
      output: (
        <div className="p-4">
          <h3 className="text-xl mb-4 text-terminal-green">Dataset: {dataset.name}</h3>
          {dataset.description && (
            <p className="mb-4 text-gray-300">{dataset.description}</p>
          )}
          
          {dataset.items && dataset.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="dataset-preview">
                <thead>
                  <tr>
                    {Object.keys(dataset.items[0])
                      .filter(key => !['id', 'related'].includes(key))
                      .map(key => (
                        <th key={key}>{key}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {dataset.items.map((item, idx) => (
                    <tr key={idx}>
                      {Object.entries(item)
                        .filter(([key]) => !['id', 'related'].includes(key))
                        .map(([key, value], i) => (
                          <td key={i}>
                            {typeof value === 'object' ? 
                              JSON.stringify(value).substring(0, 100) + (JSON.stringify(value).length > 100 ? '...' : '') : 
                              String(value)
                            }
                          </td>
                        ))
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-400">No data available</div>
          )}
          
          <div className="mt-4">
            <p className="text-gray-400">Click on any item for details:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {dataset.items && dataset.items.map(item => (
                <button
                  key={item.id || item.name}
                  onClick={() => handleInteraction({
                    type: 'explore_item',
                    dataset: datasetKey,
                    itemId: item.id || item.name
                  })}
                  className="interactive-function"
                >
                  {item.title || item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      interactiveElements: []
    });
  };
  
  // Handle exploring a specific item
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
    
    // Code for item exploration
    const nameField = item.title || item.name || itemId;
    const cellCode = `# Exploring details for: ${nameField}
item = data[data["id"] == "${itemId}"].iloc[0]

# Display detailed information
print(f"Detail view for: {item['title']}")
for key, value in item.items():
    if key not in ["id", "related"]:
        print(f"{key}: {value}")`;
    
    // Add a new cell
    addCell({
      code: cellCode,
      output: (
        <div className="p-4">
          <h3 className="text-xl mb-4 text-terminal-blue">
            {item.title || item.name || 'Item Details'}
          </h3>
          
          <div className="bg-gray-800 border-l-4 border-terminal-blue p-4 rounded-md">
            {Object.entries(item)
              .filter(([key]) => !['id', 'related'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="mb-3">
                  <div className="text-terminal-green mb-1">{key}:</div>
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
              ))
            }
          </div>
          
          {item.related && (
            <div className="mt-6">
              <h4 className="text-lg mb-2 text-terminal-amber">Related:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(item.related).map(([key, value]) => (
                  <div key={key} className="flex items-center mr-4">
                    <span className="text-gray-300 mr-2">{key}:</span>
                    <button
                      onClick={() => handleInteraction({
                        type: 'load_dataset',
                        dataset: value
                      })}
                      className="interactive-keyword"
                    >
                      {value}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
      interactiveElements: []
    });
  };
  
  // Reset the notebook
  const resetNotebook = () => {
    setCells(getInitialCells());
  };
  
  return (
    <div className="notebook-tab h-full overflow-y-auto p-4 pb-16">
      {/* Notebook cells */}
      <div className="exploration-notebook">
        {cells.map((cell, index) => (
          <NotebookCell
            key={index}
            cellNumber={index + 1}
            code={cell.code}
            output={cell.output}
            interactiveElements={cell.interactiveElements}
            onInteraction={handleInteraction}
            typingSpeed={8} // Faster typing as per requirements
          />
        ))}
      </div>
      
      {/* Auto-scroll anchor */}
      <div ref={bottomRef} />
      
      {/* Reset button */}
      <button
        onClick={resetNotebook}
        className="fixed bottom-4 right-4 retro-button z-10"
      >
        <span className="text-terminal-amber mr-2">$</span>
        <span>reset_notebook()</span>
      </button>
    </div>
  );
}
