/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'notebook-dark': '#0c0c18',
        'notebook-darker': '#0c0c18',
        'notebook-light': '#e6e6e6',
        'accent-primary': '#00ff88', // Terminal green
        'accent-secondary': '#4cc9f0', // Terminal blue
        'accent-tertiary': '#ffc400', // Terminal amber
        'cell-bg': '#151528',
        'code-bg': '#0c0c18',
        'output-bg': '#101020',
        'terminal-green': '#00ff88',
        'terminal-blue': '#4cc9f0',
        'terminal-amber': '#ffc400',
        'terminal-red': '#ff5555',
      },
      fontFamily: {
        'mono': ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Fira Code', 'monospace'], // Making everything monospace
      },
      spacing: {
        '128': '32rem',
      },
      boxShadow: {
        'cell': '0 0 10px rgba(76, 201, 240, 0.2)',
        'terminal': '0 0 20px rgba(76, 201, 240, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        scanLine: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px 2px rgba(76, 201, 240, 0.3)' },
          '50%': { boxShadow: '0 0 8px 4px rgba(76, 201, 240, 0.5)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        typing: 'typing 3.5s steps(40, end)',
        scanLine: 'scanLine 2s linear infinite',
        pulseGlow: 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}