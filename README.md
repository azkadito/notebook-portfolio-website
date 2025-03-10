# Notebook Portfolio Website

A personal portfolio website for data scientists with a notebook-inspired interface and terminal aesthetics. This project creates an interactive experience that allows visitors to explore information about you as if they were a data scientist analyzing datasets.

## Features

- **VSCode-Inspired Interface**: Collapsible sidebar, tabbed navigation, and notebook cells
- **Terminal Aesthetics**: Dark theme with scan line effects and monospace fonts
- **Interactive Exploration**: Click-based navigation through datasets with typing animations
- **Discovery-Driven Design**: Intuitive interface that encourages exploration
- **Responsive Layout**: Works on various screen sizes

## Technology Stack

- **Framework**: Next.js
- **Styling**: TailwindCSS
- **Animations**: CSS animations and React hooks
- **Fonts**: Fira Code (monospace)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/notebooksite.git
   ```

2. Install dependencies:
   ```
   cd notebooksite
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Data

Update the datasets in `src/pages/index.js` with your personal information:

- `about_data`: Personal information and background
- `skills_data`: Technical skills and proficiency levels
- `education_data`: Educational background and qualifications
- `projects_data`: Portfolio of projects

### Visual Style

- Color schemes and styling variables can be found in `tailwind.config.js`
- Global styles are in `src/styles/globals.css`

## Project Structure

```
src/
├── components/
│   ├── layout/       # Layout components (sidebar, tabs)
│   ├── notebook/     # Notebook components (cells, tabs)
│   └── ui/           # Shared UI components
├── styles/           # Global styles
└── pages/            # Next.js pages
```

## License

[MIT](LICENSE)

## Acknowledgments

- Inspired by Jupyter Notebooks and VSCode
- Designed for data scientists and developers
