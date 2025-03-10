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

## Current Implementation Status

### Completed Features
- ✅ VSCode-inspired layout with collapsible sidebar
- ✅ Tabbed interface for different notebook categories
- ✅ Side-by-side layout for code and output cells
- ✅ Terminal aesthetics with dark theme and scan line effects
- ✅ Typing animation for code cells
- ✅ Auto-scrolling to new cells
- ✅ Interactive elements in code/output cells
- ✅ Structured dataset exploration

### Next Development Priorities
1. **Content Enhancement**: Add more detailed and personalized content to datasets
2. **Responsiveness**: Improve mobile and tablet layouts
3. **Accessibility**: Ensure proper keyboard navigation and screen reader support
4. **Performance Optimization**: Optimize rendering of cells and animations
5. **Advanced Interactions**: Add more sophisticated interactive elements

## Component Architecture

### Layout Components
- `NotebookLayout`: Overall page layout with sidebar and tabs
- `Sidebar`: VSCode-style explorer panel
- `TabContainer`: Manages multiple notebook tabs

### Notebook Components
- `NotebookTab`: Individual tab container for a notebook flow
- `NotebookCell`: Code and output cell with typing animation
- `InteractiveElement`: Clickable code elements

### Data Structure
- Notebooks: Collection of different notebook types (Projects, Skills, etc.)
- Datasets: Structured JSON data for exploration
- Relationships: Connected elements across different datasets

## Styling Guidelines

### Color Palette
- Background: Very dark blue/gray (`#0c0c18`)
- Cell backgrounds: Slightly lighter than main background
- Accent colors:
  - Terminal Green (`#00ff88`) - Primary accent color
  - Terminal Blue (`#4cc9f0`) - Secondary accent for functions
  - Terminal Amber (`#ffc400`) - For warnings and highlights
  - Terminal Red (`#ff5555`) - For errors and important notes

### Typography
- Monospace font throughout (Fira Code)
- Clear hierarchy with consistent sizing
- High contrast for readability

### Interactive Elements
- Distinct styling for different element types (keywords, functions, comments)
- Hover effects with tooltips
- Visual feedback on interaction

## Content Structure

### Notebook Categories
1. **About Me Notebook**: Personal information and background
2. **Projects Notebook**: Data science and programming projects 
3. **Skills/Expertise Notebook**: Technical skills with proficiency levels
4. **Background/Education Notebook**: Educational history
5. **Personal Interests Notebook**: Technical and non-technical interests

### Data Format
- Structured JSON data for each notebook category
- Consistent schema for each data type
- Relationships between datasets for cross-reference exploration

## Deployment & Maintenance

### Deployment Checklist
- Verify all interactive elements work correctly
- Test performance on various devices
- Ensure proper font loading
- Verify smooth animations
- Check for any console errors

### Future Development
- Consider adding more advanced interactive visualizations
- Explore integration with real data science libraries
- Add theme switching capability
- Consider adding a blog/articles section

## Conclusion
This project successfully implements a notebook-inspired interface with VSCode aesthetics to create an engaging and distinctive portfolio experience. The design emphasizes discovery-driven exploration and projects technical expertise through both content and presentation.

The implementation follows best practices for modularity, styling consistency, and interactive user experience, making it both maintainable and extensible for future enhancements.