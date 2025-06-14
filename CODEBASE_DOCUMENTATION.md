
# Codebase Documentation

## Project Overview

This is a cyberpunk-themed terminal interface web application built with React, TypeScript, and Tailwind CSS. The application simulates a retro computer terminal with various sections including an interactive globe visualization, network monitoring, and personal portfolio content.

## Technology Stack

### Core Technologies
- **React 18.3.1** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling

### UI Components & Libraries
- **Shadcn/UI Components** - Pre-built accessible UI components
- **Radix UI** - Headless UI primitives for complex components
- **Lucide React 0.462.0** - Icon library for modern icons
- **Class Variance Authority** - Utility for creating variant-based components

### State Management & Data Fetching
- **TanStack React Query 5.56.2** - Data fetching and caching library
- **React Hook Form 7.53.0** - Form state management
- **Zod 3.23.8** - Schema validation library

### Routing & Navigation
- **React Router DOM 6.26.2** - Client-side routing

### Additional Libraries
- **Recharts 2.12.7** - Chart and data visualization library
- **Sonner 1.5.0** - Toast notification system
- **Date-fns 3.6.0** - Date utility library
- **Next Themes 0.3.0** - Theme management

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/UI component library
│   ├── sections/        # Page section components
│   ├── BootScreen.tsx   # Initial loading screen
│   ├── PixelGlobe.tsx   # Interactive globe visualization
│   ├── TerminalInterface.tsx # Main terminal layout
│   ├── TerminalHeader.tsx    # Terminal top bar
│   ├── NavigationPanel.tsx   # Left sidebar navigation
│   ├── ContentPanel.tsx      # Main content area
│   └── SystemPanel.tsx       # Right sidebar system info
├── pages/               # Route-level page components
│   ├── Index.tsx        # Main page with boot sequence
│   └── NotFound.tsx     # 404 error page
├── hooks/               # Custom React hooks
│   └── use-toast.ts     # Toast notification hook
├── lib/                 # Utility libraries
│   └── utils.ts         # Common utility functions
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and theme variables
```

## Component Architecture

### Main Application Flow

1. **App.tsx** - Root component with providers and routing
2. **Index.tsx** - Main page with boot sequence logic
3. **BootScreen.tsx** - Animated loading screen (4-second duration)
4. **TerminalInterface.tsx** - Main terminal layout after boot

### Terminal Interface Layout

The terminal interface uses a CSS Grid layout with four main areas:

```
┌─────────────────────────────────────┐
│           TerminalHeader            │ 12px height
├───────────┬─────────────┬───────────┤
│Navigation │   Content   │  System   │ Flexible height
│ Panel     │    Panel    │  Panel    │
│ (3 cols)  │  (6 cols)   │ (3 cols)  │
├───────────┴─────────────┴───────────┤
│           Status Bar                │ 8px height
└─────────────────────────────────────┘
```

### Key Components Deep Dive

#### PixelGlobe.tsx
- **Purpose**: Interactive 3D globe visualization with network monitoring
- **Features**:
  - Canvas-based pixel art rendering
  - Real-time data fetching from ipapi.co
  - Responsive design (mobile/desktop layouts)
  - Animated rotation and continent highlighting
  - Network statistics simulation

#### TerminalInterface.tsx
- **Purpose**: Main layout container for the terminal experience
- **Features**:
  - CSS Grid-based responsive layout
  - Section navigation state management
  - Transition animations between sections
  - Status bar with connection information

#### Navigation & Content System
- **NavigationPanel.tsx**: Left sidebar with section links
- **ContentPanel.tsx**: Dynamic content based on current section
- **SystemPanel.tsx**: Right sidebar with system information and globe

## Styling Architecture

### CSS Organization
- **Global Styles** (`index.css`): CSS custom properties, base styles, animations
- **Component Styles**: Tailwind utility classes within components
- **Theme System**: CSS variables for consistent color scheme

### Color Scheme (Cyberpunk Theme)
- **Primary**: Cyan (`#22d3ee`) - Main accent color
- **Secondary**: Various cyan shades for hierarchy
- **Background**: Dark grays and blacks
- **Text**: Light colors with cyan accents

### Responsive Design
- **Mobile First**: Tailwind's responsive utilities
- **Breakpoints**: 
  - Mobile: < 768px
  - Desktop: ≥ 768px
- **Adaptive Components**: PixelGlobe component has separate mobile/desktop layouts

## State Management

### Local State (useState)
- Component-specific state (loading, data, UI state)
- Form inputs and validation
- Animation and transition states

### External Data (React Query)
- API calls for user location data
- Caching and error handling
- Background data updates

## API Integration

### External APIs
- **ipapi.co**: Geolocation service for user IP and location data
  - Endpoint: `https://ipapi.co/json/`
  - Fallback handling for API failures
  - Used in PixelGlobe component for real user data

## Development Guidelines

### File Organization
- **One component per file** with matching filename
- **Grouped related components** in subdirectories
- **Separate business logic** from presentation components
- **Reusable utilities** in dedicated lib folder

### TypeScript Usage
- **Strict type checking** enabled
- **Interface definitions** for component props
- **Type safety** for API responses and state
- **Generic types** for reusable components

### Component Patterns
- **Functional components** with hooks
- **Custom hooks** for shared logic
- **Compound components** for complex UI patterns
- **Render props** for flexible component composition

## Build & Deployment

### Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

### Production Build
- **Vite bundling** with tree-shaking
- **TypeScript compilation** with type checking
- **CSS optimization** with PostCSS and Tailwind
- **Asset optimization** and code splitting

## Performance Considerations

### Optimization Strategies
- **Component lazy loading** for route-based code splitting
- **Memoization** for expensive calculations (React.memo, useMemo)
- **Canvas optimization** for smooth globe animation
- **Debounced API calls** to prevent rate limiting

### Bundle Size Management
- **Tree-shaking** for unused code elimination
- **Dynamic imports** for optional features
- **Optimized dependencies** (production builds only)

## Testing Strategy

### Recommended Testing Approach
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interactions and API calls
- **E2E Tests**: Full user workflows and navigation
- **Visual Tests**: Component rendering and responsive design

## Browser Compatibility

### Supported Browsers
- **Modern browsers** with ES2015+ support
- **Canvas API** support required for globe visualization
- **CSS Grid** support for layout
- **Fetch API** for network requests

## Security Considerations

### Data Privacy
- **No sensitive data storage** in localStorage
- **API key management** (none required for current APIs)
- **CORS handling** for external API requests
- **Input sanitization** for user-generated content

## Contributing Guidelines

### Code Style
- **Prettier formatting** for consistent code style
- **ESLint rules** for code quality
- **TypeScript strict mode** for type safety
- **Conventional commits** for clear change history

### Pull Request Process
1. **Feature branch** from main
2. **Component tests** for new features
3. **Documentation updates** for public APIs
4. **Code review** before merge

## Future Enhancements

### Planned Features
- **Real-time network monitoring** with WebSocket connections
- **Interactive terminal commands** with command history
- **Theme customization** with multiple color schemes
- **Progressive Web App** features for offline usage
- **Accessibility improvements** for screen readers

### Technical Debt
- **Component size optimization** (PixelGlobe.tsx is getting large)
- **Performance profiling** for animation optimization
- **Error boundary implementation** for better error handling
- **Testing coverage** improvements

## Troubleshooting

### Common Issues
- **Canvas rendering problems**: Check browser Canvas API support
- **API failures**: Verify network connectivity and CORS settings
- **Build errors**: Ensure all dependencies are installed correctly
- **Responsive layout issues**: Test at various screen sizes

### Debug Tools
- **React Developer Tools** for component inspection
- **Network tab** for API call debugging
- **Console logging** for state tracking
- **Lighthouse** for performance analysis
