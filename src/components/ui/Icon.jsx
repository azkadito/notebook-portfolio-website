import React from 'react';

/**
 * Icon - Terminal-styled icon component
 * 
 * A component for displaying icons with terminal aesthetics
 */
const Icon = ({
  name,
  size = 'medium',
  color = 'primary',
  className = '',
  ...props
}) => {
  // Icons mapping - very simple set to start with
  const icons = {
    close: '✕',
    add: '+',
    folder: '📁',
    file: '📄',
    notebook: '📓',
    python: '🐍',
    data: '📊',
    settings: '⚙️',
    reset: '↺',
    play: '▶',
    download: '↓',
    upload: '↑',
    search: '🔍',
    user: '👤',
    warning: '⚠️',
    error: '❌',
    success: '✓',
    info: 'ℹ️',
  };
  
  // Size mapping
  const sizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
  };
  
  // Color mapping
  const colors = {
    primary: 'text-terminal-green',
    secondary: 'text-terminal-blue',
    danger: 'text-terminal-red',
    warning: 'text-terminal-amber',
    neutral: 'text-gray-400',
  };
  
  // Get the icon character
  const iconChar = icons[name] || name || '?';
  
  return (
    <span
      className={`
        ${sizes[size] || sizes.medium}
        ${colors[color] || colors.primary}
        inline-flex items-center justify-center
        ${className}
      `}
      role="img"
      aria-label={name}
      {...props}
    >
      {iconChar}
    </span>
  );
};

export default Icon;