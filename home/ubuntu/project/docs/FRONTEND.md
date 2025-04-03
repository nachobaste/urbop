# URBOP Data Hub - Frontend Documentation

This document provides detailed information about the frontend components of the URBOP Data Hub platform for Latin America economic development.

## Frontend Architecture

The URBOP Data Hub frontend is built using Next.js 14 with the App Router architecture, React 18, and Tailwind CSS. It follows a component-based design pattern with a focus on reusability and maintainability.

## Page Structure

The application pages are organized in the `src/app` directory:

```
src/app/
├── consultants/       # Consultant selection interface
├── dashboard/         # Analytics dashboard
├── deploy/            # Deployment management
├── gis/               # Geographic visualization
├── latin-america/     # Latin America expansion
├── odoo-integration/  # Odoo ERP connection
├── parameters/        # Parameter dictionary
├── upload/            # Data upload interface
├── layout.tsx         # Root layout with common UI elements
└── page.tsx           # Homepage
```

## Component Library

Reusable UI components are stored in the `src/components` directory and follow a modular architecture:

```
src/components/
├── ui/                # Base UI components
├── forms/             # Form components and validation
├── charts/            # Data visualization components
├── maps/              # GIS visualization components
└── layout/            # Layout components
```

## Key UI Features

### Responsive Design

The application is fully responsive and optimized for:
- Desktop workstations
- Laptops
- Tablets
- Mobile devices

### Theme and Styling

- **Styling**: Tailwind CSS for utility-first styling
- **Components**: Custom UI components with consistent design language
- **Accessibility**: WCAG 2.1 AA compliance for all components

### Interactive Elements

- **Data Tables**: Sortable, filterable tables with pagination
- **Charts**: Interactive data visualization with Recharts
- **Maps**: Interactive GIS visualization with Google Earth Engine
- **Forms**: Dynamic forms with validation

## Page Descriptions

### Homepage

The homepage (`src/app/page.tsx`) provides an overview of the platform's capabilities and quick access to key features:

- Platform introduction
- Feature highlights
- Quick navigation cards
- Recent activity summary

### Dashboard

The dashboard page (`src/app/dashboard/page.tsx`) displays key metrics and visualizations:

- Project status overview
- Geographic distribution of projects
- Economic indicators
- Performance metrics
- Activity timeline

### GIS Visualization

The GIS page (`src/app/gis/page.tsx`) provides interactive geographic visualization:

- Interactive map with multiple layers
- Municipality boundaries
- Project locations
- Demographic data
- Layer controls
- Spatial analysis tools

### Parameters

The parameters page (`src/app/parameters/page.tsx`) manages the unified parameter dictionary:

- Parameter categories
- Cross-referenced relationships
- Parameter editing
- Import/export functionality

### Consultants

The consultants page (`src/app/consultants/page.tsx`) provides O*NET-integrated consultant selection:

- Skill matching
- Consultant profiles
- Project assignment
- Odoo HR integration

### Odoo Integration

The Odoo integration page (`src/app/odoo-integration/page.tsx`) manages the connection with Odoo ERP:

- Connection status
- Synchronization controls
- Model mapping
- Data flow visualization

### Upload

The upload page (`src/app/upload/page.tsx`) provides data import functionality:

- CSV file upload
- SQL script upload
- Shapefile upload
- Validation and preview
- Import history

### Latin America

The Latin America page (`src/app/latin-america/page.tsx`) manages the regional expansion:

- Country selection
- Regional data visualization
- Country-specific parameters
- Implementation status tracking

### Deploy

The deploy page (`src/app/deploy/page.tsx`) manages application deployment:

- Deployment status
- Environment configuration
- Version management
- Rollback options

## State Management

The application uses a combination of state management approaches:

- **React Context**: For global application state
- **React Query**: For server state and data fetching
- **React Hook Form**: For form state management
- **URL State**: For shareable UI state

## Data Fetching

Data fetching is implemented using:

- **SWR**: For client-side data fetching with caching and revalidation
- **Server Components**: For server-side data fetching
- **API Routes**: For custom data endpoints

## Client-Side Optimizations

The frontend includes several performance optimizations:

1. **Code Splitting**: Automatic code splitting by route
2. **Image Optimization**: Using Next.js Image component
3. **Font Optimization**: Using Next.js Font optimization
4. **Lazy Loading**: For non-critical components
5. **Memoization**: For expensive computations
6. **Virtualization**: For long lists and tables

## Accessibility

The application follows accessibility best practices:

1. **Semantic HTML**: Proper use of HTML elements
2. **ARIA Attributes**: When necessary for complex components
3. **Keyboard Navigation**: Full keyboard support
4. **Screen Reader Support**: Compatible with screen readers
5. **Color Contrast**: WCAG 2.1 AA compliant

## Browser Compatibility

The application is tested and supported on:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Custom Hooks

The application includes several custom hooks in the `src/hooks` directory:

- **useParameters**: For accessing the parameter dictionary
- **useOdooSync**: For Odoo synchronization status
- **useGisLayers**: For managing GIS visualization layers
- **useAuth**: For authentication state

## Development Guidelines

When working on the frontend:

1. **Component Structure**: Follow the component hierarchy
2. **Styling**: Use Tailwind CSS for styling
3. **State Management**: Choose appropriate state management approach
4. **Performance**: Consider performance implications of changes
5. **Accessibility**: Ensure all components are accessible

## Testing

Frontend tests can be run with:

```bash
pnpm test:frontend
```

The test suite includes:

- Unit tests for components
- Integration tests for pages
- End-to-end tests for user flows

## Building for Production

To build the frontend for production:

```bash
pnpm build
```

This generates optimized production code in the `.next` directory.

## Deployment

The frontend is designed to be deployed on Vercel, which provides:

- Global CDN for static assets
- Edge functions for API routes
- Automatic preview deployments
- Zero-configuration setup

For detailed deployment instructions, see the [Vercel Deployment Guide](/home/ubuntu/vercel_deployment_guide.md).
