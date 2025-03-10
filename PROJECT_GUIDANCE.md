# Notebook Portfolio Project Guidance

## Project Overview
This project creates a personal website for a Statistics and Data Science Master's student using a notebook-inspired design with terminal aesthetics. The core experience is that of a data scientist exploring datasets about the owner through an interactive notebook interface.

**GitHub Repository**: https://github.com/azkadito/notebook-portfolio-website

## Core Vision

### Primary Experience
- Users feel like they're a data scientist using a notebook to explore data about you
- The experience should be discovery-driven, not instruction-driven
- Interface should appeal to a user's natural curiosity
- Notebook metaphor is primary, terminal aesthetics are the style layer

### Design Philosophy
- **Authentic Notebook Experience**: True to how data scientists work with notebooks
- **Terminal-Inspired Aesthetics**: Dark theme, monospace fonts, subtle scan lines
- **Discovery-Based Navigation**: No explicit instructions, intuitive design invites exploration
- **Modular Theming**: Structure allows future theme changes (VSCode, physical notebook, etc.)
- **Easy on the Eyes**: All visual elements prioritize readability and comfort
- **Professional & Clean**: Communicates expertise without being too formal

## Interface Layout

### VSCode-Inspired Navigation
- Left sidebar explorer (collapsible) showing "files/notebooks"
- Main content area for notebook cells with tabbed interface
- Each tab contains a separate notebook exploration
- No separate homepage - the exploration interface is the main website

### Notebook Layout
- Side-by-side layout for code and output cells (adjustable ratio)
- New cells appear below previous ones with auto-scrolling
- Clear visual distinction between input and output
- Tabs to switch between different explorations/topics

### Visual Styling
- Dark background with subtle scan line effect
- Terminal-inspired color scheme (emphasis on green, proper contrast)
- Monospace font throughout
- Subtle animations (faster typing speed than current implementation)
- No explicit instructions in the UI - design should be self-explanatory

## Modularity Requirements

### Code Modularity Principle
All code follows strict modularity principles:

1. **File Size Limit**: Each file is kept under 500 lines of code
2. **Component Isolation**: Components have single responsibilities and are reusable
3. **Split Logic**: Complex functionality is separated into multiple files

This approach is essential for:
- **Maintainability**: Easier to understand and modify smaller components
- **AI Assistance**: When working with AI tools that have output limits, keeping files modular prevents having to regenerate entire large files
- **Iterative Development**: Easier to update individual components without affecting the whole system

### Component Architecture
1. **Layout Components**:
   - `NotebookLayout`: Overall page layout with sidebar and tabs
   - `Sidebar`: VSCode-style explorer panel
   - `TabContainer`: Manages multiple notebook tabs

2. **Notebook Components**:
   - `NotebookTab`: Individual tab container for a notebook flow
   - `NotebookCell`: Code and output cell with typing animation
   - `InteractiveElement`: Clickable code elements

3. **UI Components**:
   - `Button`: Styled button with terminal aesthetics
   - `TabHeader`: Header for notebook tabs
   - `Icon`: Terminal-styled icons

## Current Challenges & Priorities

### Immediate Issues to Address
1. Existing implementation feels like a terminal instead of a notebook with terminal aesthetics
2. Explicit instruction text breaks immersion and doesn't project expertise
3. Missing sidebar navigation and tab system
4. Cell generation creates endless scrolling instead of organized exploration
5. Styling needs refinement for better readability and visual appeal
6. Typing animation is too slow
7. Auto-scrolling to new cells is missing
8. Non-working interactive elements in output cells

### Current Phase Priorities
1. Implement VSCode-inspired layout with sidebar and tabs
2. Enhance notebook cells with better styling and faster animations
3. Create intuitive navigation without explicit instructions
4. Fix interaction system with proper scrolling
5. Refine the dark theme for better readability

## Styling Guidelines

### Color Palette
- Background: Very dark blue/gray (`#0c0c18` or darker)
- Cell backgrounds: Slightly lighter than main background
- Accent colors:
  - Terminal Green (`#00ff88`) - Primary accent color
  - Terminal Blue (`#4cc9f0`) - Secondary accent for functions
  - Terminal Amber (`#ffc400`) - For warnings and highlights
  - Terminal Red (`#ff5555`) - For errors and important notes

### Typography
- Monospace font throughout (Fira Code or similar)
- Clear hierarchy with consistent sizing
- High contrast for readability

### Animation
- Typing animation should be 2-3x faster than current implementation
- Subtle hover effects for interactive elements
- Auto-scrolling when new cells are generated

## Content Structure

### Notebook Categories
1. **Projects Notebook**: 
   - Data science and programming projects
   - Each project as a detailed exploration
   
2. **Skills/Expertise Notebook**:
   - Technical skills with proficiency levels
   - Tools and languages mastery
   
3. **Background/Education Notebook**:
   - Educational history
   - Relevant coursework and achievements
   
4. **Personal Interests Notebook**:
   - Technical interests
   - Non-technical hobbies and activities

### Data Format
- Structured JSON data for each notebook category
- Consistent schema for each data type
- Clear relationships between different data elements

## Technical Implementation

### State Management
- Tab state (active tab, open tabs)
- Cell history per tab
- Interaction history
- User preferences (theme, animation speed)

### Performance Considerations
- Efficient rendering of notebook cells
- Lazy loading of content not in view
- Optimized animations

### Styling Approach
- TailwindCSS for utility classes
- CSS modules for component-specific styling
- Base theme variables for easy theme switching

## Next Development Steps

### Phase 1: Core Layout
1. Implement sidebar and tab system
2. Create enhanced notebook cell component
3. Setup basic state management

### Phase 2: Content & Interactions
1. Create structured data for all notebook categories
2. Implement interaction system with proper scrolling
3. Create entry point notebook

### Phase 3: Refinement
1. Polish animations and transitions
2. Optimize for different screen sizes
3. Add theme switching capability
4. Fine-tune performance

## Development Guidelines

### Folder Structure
```
src/
├── components/
│   ├── layout/       # Layout components
│   ├── notebook/     # Notebook-specific components
│   ├── ui/           # Shared UI components
│   └── sidebar/      # Sidebar components
├── hooks/            # Custom React hooks
├── state/            # State management
├── styles/           # Global styles
├── data/             # Content data
├── utils/            # Helper functions
└── pages/            # Next.js pages
```

### Styling Best Practices
1. Use utility classes for common styles
2. Create component-specific styles for unique elements
3. Maintain consistent spacing and sizing
4. Use CSS variables for theme values

### Animation Guidelines
1. Keep animations subtle and purposeful
2. Ensure all animations can be disabled for accessibility
3. Use CSS transitions when possible
4. Keep JavaScript animations performant

## Resources & References

### Design Inspiration
- Jupyter Notebook/Lab
- VSCode interface
- Terminal applications with modern styling

### Technical References
- Next.js documentation
- React hooks guides
- TailwindCSS documentation

## Conclusion
This project aims to create a unique and engaging portfolio experience that showcases both technical skills and creativity. By combining the notebook metaphor with terminal aesthetics, we create a distinctive interface that resonates with technical audiences while remaining accessible to all visitors.

The primary goal is to create a discovery-driven experience where users can explore information about the portfolio owner in an intuitive and engaging way, without explicit instructions breaking the immersion.