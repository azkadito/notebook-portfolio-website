import React, { useState, useEffect, useRef } from 'react';

/**
 * ExplorationCell - A notebook cell with code input and output content
 * 
 * Simplified version with reliable typing animation and interactive elements
 */
const ExplorationCell = ({ 
  code, 
  output, 
  cellNumber = 1,
  interactiveElements = [],
  onInteraction = () => {},
  typingSpeed = 15,
  typingDelay = 0,
  showTypingAnimation = true
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(showTypingAnimation);
  const [showOutput, setShowOutput] = useState(!showTypingAnimation);
  const typingRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    if (!showTypingAnimation) {
      setDisplayedCode(code);
      setShowOutput(true);
      return;
    }

    // Clear any existing interval
    if (typingRef.current) clearTimeout(typingRef.current);
    
    // Reset states for new animation
    setDisplayedCode('');
    setIsTyping(true);
    setShowOutput(false);
    
    let currentIndex = 0;
    
    // Delay before starting typing
    typingRef.current = setTimeout(() => {
      const typeNextChar = () => {
        if (currentIndex < code.length) {
          setDisplayedCode(prev => prev + code[currentIndex]);
          currentIndex++;
          typingRef.current = setTimeout(typeNextChar, typingSpeed);
        } else {
          // Typing complete
          setIsTyping(false);
          setTimeout(() => setShowOutput(true), 300);
        }
      };
      
      typeNextChar();
    }, typingDelay);
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [code, showTypingAnimation, typingSpeed, typingDelay]);
  
  // Render code with interactive elements
  const renderCodeWithInteractiveElements = () => {
    if (!interactiveElements || interactiveElements.length === 0) {
      return <pre className="font-mono text-gray-300">{displayedCode}</pre>;
    }

    // Only include interactive elements that have been typed
    const visibleElements = interactiveElements
      .filter(el => el.start < displayedCode.length)
      .sort((a, b) => a.start - b.start);
    
    const segments = [];
    let lastIndex = 0;
    
    for (const el of visibleElements) {
      // Add text before this element
      if (el.start > lastIndex) {
        segments.push({
          type: 'text',
          content: displayedCode.substring(lastIndex, el.start)
        });
      }
      
      // Add the interactive element (up to current typing position)
      const endPos = Math.min(el.end, displayedCode.length);
      segments.push({
        type: 'interactive',
        content: displayedCode.substring(el.start, endPos),
        element: el
      });
      
      lastIndex = endPos;
    }
    
    // Add any remaining text
    if (lastIndex < displayedCode.length) {
      segments.push({
        type: 'text',
        content: displayedCode.substring(lastIndex)
      });
    }
    
    return (
      <pre className="font-mono text-gray-300">
        {segments.map((segment, idx) => {
          if (segment.type === 'text') {
            return <span key={idx}>{segment.content}</span>;
          } else {
            return (
              <InteractiveElement 
                key={idx}
                type={segment.element.type || 'keyword'}
                onClick={() => handleElementClick(segment.element)}
                tooltip={segment.element.tooltip}
              >
                {segment.content}
              </InteractiveElement>
            );
          }
        })}
      </pre>
    );
  };
  
  // Handle click on interactive element
  const handleElementClick = (element) => {
    if (element.action) {
      onInteraction(element.action);
    }
  };
  
  // Interactive Element Component
  const InteractiveElement = ({ children, type, onClick, tooltip }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Get styles based on element type
    const styles = {
      keyword: {
        baseClasses: "px-2 py-0.5 rounded bg-emerald-800 bg-opacity-70 text-emerald-400 border-2 border-emerald-500 hover:bg-emerald-700 hover:text-white",
        glow: "0 0 8px rgba(0, 255, 136, 0.4)",
        tooltipBg: "bg-emerald-900",
        prefix: ">",
        suffix: ""
      },
      function: {
        baseClasses: "px-2 py-0.5 rounded bg-blue-800 bg-opacity-70 text-blue-300 border-2 border-blue-500 hover:bg-blue-700 hover:text-white",
        glow: "0 0 8px rgba(76, 201, 240, 0.4)",
        tooltipBg: "bg-blue-900",
        prefix: "",
        suffix: "()"
      },
      comment: {
        baseClasses: "px-2 py-0.5 rounded bg-gray-800 bg-opacity-70 text-gray-400 border-2 border-gray-700 hover:bg-gray-700 hover:text-white",
        glow: "0 0 8px rgba(150, 150, 150, 0.4)",
        tooltipBg: "bg-gray-900",
        prefix: "#",
        suffix: ""
      }
    };
    
    const style = styles[type] || styles.keyword;
    
    return (
      <span className="relative inline-block">
        <span 
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${style.baseClasses} cursor-pointer transition-all duration-300`}
          style={{
            boxShadow: isHovered ? style.glow : 'none',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
          }}
        >
          {style.prefix && <span className="mr-1">{style.prefix}</span>}
          {children}
          {style.suffix && <span className="ml-0">{style.suffix}</span>}
        </span>
        
        {tooltip && isHovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs z-10 pointer-events-none">
            <div className={`${style.tooltipBg} text-white p-2 rounded-sm border border-gray-600 shadow-lg text-sm`}>
              {tooltip}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 border-r border-b border-gray-600"></div>
            </div>
          </div>
        )}
      </span>
    );
  };
  
  return (
    <div className="notebook-cell mb-12 border-b border-gray-800 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Input section (code) - 1/3 width on desktop */}
        <div className="cell-input">
          <div className="flex items-center bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-t-md">
            <span className="text-green-500 mr-1">In [{cellNumber}]:</span>
          </div>
          <div className="bg-gray-900 p-4 rounded-b-md overflow-x-auto">
            {renderCodeWithInteractiveElements()}
            {isTyping && (
              <span className="inline-block h-4 w-2 ml-1 bg-white animate-blink"></span>
            )}
          </div>
        </div>
        
        {/* Output section - 2/3 width on desktop */}
        <div className="cell-output md:col-span-2">
          <div className="flex items-center bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-t-md">
            <span className="text-red-500 mr-1">Out [{cellNumber}]:</span>
          </div>
          <div 
            className={`bg-gray-900 p-4 rounded-b-md transition-opacity duration-300 
                       ${showOutput ? "opacity-100" : "opacity-0"}`}
          >
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorationCell;