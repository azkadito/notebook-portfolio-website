/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Terminal-inspired colors
        'terminal-green': '#00ff88',
        'terminal-blue': '#4cc9f0',
        'terminal-amber': '#ffc400',
        'terminal-red': '#ff5555',
        // Background colors
        'code-bg': '#0c0c18',
        'output-bg': '#101020',
        'notebook-dark': '#0c0c18',
        'notebook-light': '#f8f8f2',
      },
      fontFamily: {
        'mono': ['Fira Code', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'typing': 'typing 2s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'pulseGlow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(76, 201, 240, 0.4)' },
          '50%': { boxShadow: '0 0 15px rgba(76, 201, 240, 0.8)' }
        }
      },
      boxShadow: {
        'glow-green': '0 0 8px rgba(0, 255, 136, 0.6)',
        'glow-blue': '0 0 8px rgba(76, 201, 240, 0.6)',
        'glow-amber': '0 0 8px rgba(255, 196, 0, 0.6)',
        'glow-red': '0 0 8px rgba(255, 85, 85, 0.6)',
      }
    },
  },
  plugins: [],
}