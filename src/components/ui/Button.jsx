import React from 'react';

/**
 * Button - Terminal-styled button component
 * 
 * A reusable button with terminal aesthetics
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  prefix = '$',
  onClick = () => {},
  className = '',
  ...props
}) => {
  // Style variants
  const variants = {
    primary: 'bg-gray-800 border-terminal-green text-terminal-green hover:bg-gray-700',
    secondary: 'bg-gray-800 border-terminal-blue text-terminal-blue hover:bg-gray-700',
    danger: 'bg-gray-800 border-terminal-red text-terminal-red hover:bg-gray-700',
    warning: 'bg-gray-800 border-terminal-amber text-terminal-amber hover:bg-gray-700',
  };
  
  // Size variants
  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base',
  };
  
  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.medium}
        font-mono border rounded-md transition-colors shadow-md
        flex items-center space-x-1
        ${className}
      `}
      {...props}
    >
      {prefix && <span className="opacity-80">{prefix}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;