
# Project Folder Structure

## Root Directory Structure

```
cyberpunk-terminal/
├── public/                     # Static assets served directly
│   ├── favicon.ico            # Browser tab icon
│   ├── placeholder.svg        # Default placeholder image
│   └── robots.txt            # Search engine crawler instructions
├── src/                       # Source code directory
│   ├── components/           # React components
│   ├── pages/               # Route-level page components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries and helpers
│   ├── App.tsx              # Root application component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles and CSS variables
│   └── vite-env.d.ts        # Vite TypeScript declarations
├── .gitignore                # Git ignore patterns
├── components.json           # Shadcn/UI configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration (root)
├── tsconfig.app.json         # TypeScript configuration (app)
├── tsconfig.node.json        # TypeScript configuration (build tools)
├── vite.config.ts            # Vite build configuration
├── README.md                 # Project documentation
├── CODEBASE_DOCUMENTATION.md # Comprehensive code documentation
├── DEPENDENCY_ANALYSIS.md    # Dependency analysis and relationships
└── FOLDER_STRUCTURE.md       # This file - folder structure guide
```

## Source Code Structure (`src/`)

### Components Directory (`src/components/`)

```
components/
├── ui/                       # Shadcn/UI component library
│   ├── accordion.tsx         # Collapsible content component
│   ├── alert-dialog.tsx      # Modal alert dialog
│   ├── alert.tsx             # Notification alert component
│   ├── aspect-ratio.tsx      # Responsive aspect ratio container
│   ├── avatar.tsx            # User avatar component
│   ├── badge.tsx             # Status badge component
│   ├── breadcrumb.tsx        # Navigation breadcrumb
│   ├── button.tsx            # Interactive button component
│   ├── calendar.tsx          # Date picker calendar
│   ├── card.tsx              # Content card container
│   ├── carousel.tsx          # Image/content carousel
│   ├── chart.tsx             # Data visualization charts
│   ├── checkbox.tsx          # Checkbox input component
│   ├── collapsible.tsx       # Expandable content sections
│   ├── command.tsx           # Command palette interface
│   ├── context-menu.tsx      # Right-click context menu
│   ├── dialog.tsx            # Modal dialog component
│   ├── drawer.tsx            # Slide-out drawer component
│   ├── dropdown-menu.tsx     # Dropdown menu component
│   ├── form.tsx              # Form wrapper and utilities
│   ├── hover-card.tsx        # Hover tooltip card
│   ├── input.tsx             # Text input component
│   ├── input-otp.tsx         # OTP/PIN input component
│   ├── label.tsx             # Form label component
│   ├── menubar.tsx           # Horizontal menu bar
│   ├── navigation-menu.tsx   # Site navigation component
│   ├── pagination.tsx        # Page navigation component
│   ├── popover.tsx           # Floating popover component
│   ├── progress.tsx          # Progress bar component
│   ├── radio-group.tsx       # Radio button group
│   ├── resizable.tsx         # Resizable panel component
│   ├── scroll-area.tsx       # Custom scrollable area
│   ├── select.tsx            # Dropdown select component
│   ├── separator.tsx         # Visual divider component
│   ├── sheet.tsx             # Side sheet component
│   ├── sidebar.tsx           # Application sidebar
│   ├── skeleton.tsx          # Loading skeleton component
│   ├── slider.tsx            # Range slider component
│   ├── sonner.tsx            # Toast notification component
│   ├── switch.tsx            # Toggle switch component
│   ├── table.tsx             # Data table component
│   ├── tabs.tsx              # Tabbed content component
│   ├── textarea.tsx          # Multi-line text input
│   ├── toast.tsx             # Toast notification system
│   ├── toaster.tsx           # Toast container component
│   ├── toggle.tsx            # Toggle button component
│   ├── toggle-group.tsx      # Toggle button group
│   ├── tooltip.tsx           # Hover tooltip component
│   └── use-toast.ts          # Toast hook utilities
├── sections/                 # Page section components
│   ├── AboutSection.tsx      # About/bio content section
│   ├── ContactSection.tsx    # Contact form section
│   ├── ProjectsSection.tsx   # Portfolio projects section
│   ├── ResumeSection.tsx     # Resume/CV section
│   └── SkillsSection.tsx     # Skills and technologies section
├── BootScreen.tsx            # Initial loading animation
├── ContentPanel.tsx          # Main content area component
├── NavigationPanel.tsx       # Left sidebar navigation
├── PixelGlobe.tsx           # Interactive globe visualization
├── SystemPanel.tsx          # Right sidebar system info
├── TerminalCommandInterface.tsx # Command input interface
├── TerminalHeader.tsx       # Terminal window header
└── TerminalInterface.tsx    # Main terminal layout
```

### Pages Directory (`src/pages/`)

```
pages/
├── Index.tsx                 # Main application page
└── NotFound.tsx             # 404 error page
```

### Hooks Directory (`src/hooks/`)

```
hooks/
├── use-mobile.tsx           # Mobile device detection hook
└── use-toast.ts             # Toast notification management
```

### Library Directory (`src/lib/`)

```
lib/
└── utils.ts                 # Common utility functions
```

## Component Architecture

### Layout Components
- **TerminalInterface.tsx**: Main application layout using CSS Grid
- **TerminalHeader.tsx**: Top navigation bar with terminal branding
- **NavigationPanel.tsx**: Left sidebar with section navigation
- **ContentPanel.tsx**: Dynamic content area based on current section
- **SystemPanel.tsx**: Right sidebar with system information and globe

### Feature Components
- **PixelGlobe.tsx**: Canvas-based 3D globe with network monitoring
- **BootScreen.tsx**: Animated loading sequence with cyberpunk aesthetics
- **TerminalCommandInterface.tsx**: Command-line input simulation

### Section Components
Located in `src/components/sections/`:
- **AboutSection.tsx**: Personal information and bio
- **ContactSection.tsx**: Contact form with validation
- **ProjectsSection.tsx**: Portfolio showcase
- **ResumeSection.tsx**: Professional experience and education
- **SkillsSection.tsx**: Technical skills and competencies

## Configuration Files

### Build Configuration
- **vite.config.ts**: Vite build tool configuration
  - React plugin setup
  - Path aliases (@/ for src/)
  - Development server settings
  - Component tagger for development

### TypeScript Configuration
- **tsconfig.json**: Root TypeScript configuration
- **tsconfig.app.json**: Application-specific TypeScript settings
- **tsconfig.node.json**: Build tools TypeScript configuration

### Styling Configuration
- **tailwind.config.ts**: Tailwind CSS configuration
  - Color scheme definitions
  - Animation settings
  - Component styling utilities
  - Dark mode configuration
- **postcss.config.js**: PostCSS processing configuration

### Component Library Configuration
- **components.json**: Shadcn/UI configuration
  - Component installation paths
  - Styling preferences
  - TypeScript settings

### Code Quality Configuration
- **eslint.config.js**: ESLint linting rules
  - TypeScript integration
  - React-specific rules
  - Code quality standards

## Asset Organization

### Public Assets (`public/`)
- **favicon.ico**: Browser tab icon
- **placeholder.svg**: Default image placeholder
- **robots.txt**: Search engine optimization

### Styling Assets
- **src/index.css**: Global styles and CSS custom properties
  - Theme color definitions
  - Cyberpunk-specific styling
  - Animation keyframes
  - Responsive design utilities

## Data Flow Architecture

### State Management
```
App.tsx (Root)
├── QueryClient Provider (API state)
├── Toast Provider (Notifications)
└── Router (Navigation state)
    └── Index.tsx
        ├── BootScreen.tsx (Loading state)
        └── TerminalInterface.tsx (Main app state)
            ├── NavigationPanel.tsx (Navigation state)
            ├── ContentPanel.tsx (Content state)
            └── SystemPanel.tsx
                └── PixelGlobe.tsx (Globe state + API data)
```

### Component Communication
- **Props**: Parent to child data passing
- **State lifting**: Shared state in common ancestors
- **Context**: Theme and toast notifications
- **Query cache**: API data sharing across components

## Import/Export Patterns

### Barrel Exports
- `src/components/ui/index.ts`: Central export for UI components
- Component-specific exports in individual files

### Path Aliases
- `@/`: Maps to `src/` directory
- Example: `import { Button } from '@/components/ui/button'`

### Import Conventions
```typescript
// External libraries first
import React from 'react';
import { useState } from 'react';

// Internal components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Utilities and hooks
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
```

## File Naming Conventions

### Components
- **PascalCase**: `PixelGlobe.tsx`, `TerminalInterface.tsx`
- **Descriptive names**: Clear purpose indication
- **TypeScript extension**: `.tsx` for components, `.ts` for utilities

### Utilities and Hooks
- **camelCase**: `utils.ts`, `use-toast.ts`
- **Prefix hooks**: `use-` prefix for custom hooks
- **Descriptive names**: Function purpose indication

### Configuration Files
- **kebab-case**: `eslint.config.js`, `tailwind.config.ts`
- **Standard names**: Following community conventions

## Development Workflow

### File Creation Order
1. **Create component file** in appropriate directory
2. **Add to barrel export** if in ui/ directory
3. **Update documentation** if public API changes
4. **Add tests** for new functionality

### Component Structure Template
```typescript
// External imports
import React from 'react';

// Internal imports
import { cn } from '@/lib/utils';

// Type definitions
interface ComponentProps {
  // Props definition
}

// Component implementation
const Component = ({ ...props }: ComponentProps) => {
  // Component logic
  return (
    // JSX
  );
};

// Export
export default Component;
```

## Best Practices

### File Organization
- **Single responsibility**: One component per file
- **Logical grouping**: Related components in subdirectories
- **Clear hierarchy**: Nested components in parent directories
- **Consistent naming**: Follow established conventions

### Import Organization
- **External first**: Third-party libraries at top
- **Internal second**: Local components and utilities
- **Type imports**: Separate type-only imports when needed
- **Alphabetical order**: Within each group

### Component Design
- **Small components**: Focused, single-purpose components
- **Composition**: Prefer composition over inheritance
- **Props interface**: Clear TypeScript interfaces
- **Default exports**: For main component, named for utilities

This folder structure supports a scalable, maintainable codebase with clear separation of concerns and consistent organization patterns.
