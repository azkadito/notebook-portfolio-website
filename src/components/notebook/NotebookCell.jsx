import React, { useState, useEffect, useRef } from 'react';

export default function NotebookCell({ 
  cellNumber, 
  code, 
  output, 
  interactiveElements = [], 
  onInteraction = () => {},
  typingSpeed = 10 
}) {
  // State for displayed code (for typing animation)
  const [displayedCode, setDisplayedCode] = useState('');
  
  // State for typing animation status
  const [isTyping, setIsTyping] = useState(true);
  
  // State for output visibility
  const [showOutput, setShowOutput] = useState(false);
  
  // Ref for typing animation timer
  const typingRef = useRef(null);
  
  // Process the code to remove any potential "undefined" suffix
  const processedCode = code ? code.replace(/undefined$/, '') : '';
  
  // Typing animation effect
  useEffect(() => {
    // Clear existing timer
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    
    // Reset state
    setDisplayedCode('');
    setIsTyping(true);
    setShowOutput(false);
    
    let currentIndex = 0;
    
    // Function to type the next character
    const typeNextChar = () => {
      if (currentIndex < processedCode.length) {
        setDisplayedCode(prev => prev + processedCode[currentIndex]);
        currentIndex++;
        typingRef.current = setTimeout(typeNextChar, typingSpeed);
      } else {
        // Finished typing
        setIsTyping(false);
        setTimeout(() => setShowOutput(true), 300);
      }
    };
    
    // Start typing with a small initial delay
    typingRef.current = setTimeout(typeNextChar, 200);
    
    // Cleanup
    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [processedCode, typingSpeed]);
  
  // Render code with interactive elements
  const renderInteractiveCode = () => {
    if (!interactiveElements || interactiveElements.length === 0) {
      return <pre className="text-gray-300 whitespace-pre-wrap">{displayedCode}</pre>;
    }
    
    // Only include elements that have been typed
    const visibleElements = interactiveElements
      .filter(el => el.start < displayedCode.length)
      .sort((a, b) => a.start - b.start);
    
    // Build segments
    const segments = [];
    let lastIndex = 0;
    
    for (const element of visibleElements) {
      // Text before this element
      if (element.start > lastIndex) {
        segments.push({
          type: 'text',
          content: displayedCode.substring(lastIndex, element.start)
        });
      }
      
      // The interactive element
      const endPos = Math.min(element.end, displayedCode.length);
      segments.push({
        type: 'interactive',
        content: displayedCode.substring(element.start, endPos),
        element
      });
      
      lastIndex = endPos;
    }
    
    // Text after all elements
    if (lastIndex < displayedCode.length) {
      segments.push({
        type: 'text',
        content: displayedCode.substring(lastIndex)
      });
    }
    
    // Render segments
    return (
      <pre className="text-gray-300 whitespace-pre-wrap">
        {segments.map((segment, idx) => (
          segment.type === 'text' ? (
            <span key={idx}>{segment.content}</span>
          ) : (
            <InteractiveElement
              key={idx}
              type={segment.element.type || 'keyword'}
              tooltip={segment.element.tooltip}
              onClick={() => onInteraction(segment.element.action)}
            >
              {segment.content}
            </InteractiveElement>
          )
        ))}
      </pre>
    );
  };
  
  // Interactive Element Component
  const InteractiveElement = ({ children, type, tooltip, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    let className;
    switch (type) {
      case 'function':
        className = 'interactive-function';
        break;
      case 'comment':
        className = 'interactive-comment';
        break;
      case 'keyword':
      default:
        className = 'interactive-keyword';
    }
    
    return (
      <span className="relative">
        <span
          className={className}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </span>
        
        {tooltip && isHovered && (
          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
            <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs shadow-lg border border-gray-700">
              {tooltip}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 border-r border-b border-gray-700"></div>
            </div>
          </div>
        )}
      </span>
    );
  };
  
  return (
    <div className="exploration-cell">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Code Cell - 1 column */}
        <div className="cell-input">
          <div className="cell-input-header">
            <span className="text-terminal-green mr-1">In [{cellNumber}]:</span>
          </div>
          <div className="cell-input-content terminal-cell">
            {renderInteractiveCode()}
            {isTyping && <span className="cursor-blink" />}
          </div>
        </div>
        
        {/* Output Cell - 2 columns */}
        <div className="cell-output md:col-span-2">
          <div className="cell-output-header">
            <span className="text-terminal-red mr-1">Out [{cellNumber}]:</span>
          </div>
          <div className={`cell-output-content ${showOutput ? 'opacity-100' : 'opacity-0'}`}>
            {output}
          </div>
        </div>
      </div>
    </div>
  );
}
