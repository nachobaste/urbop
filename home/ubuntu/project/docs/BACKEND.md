# URBOP Data Hub - Backend Documentation

This document provides detailed information about the backend components of the URBOP Data Hub platform for Latin America economic development.

## API Structure

The backend API is organized in the `src/app/api` directory and follows a RESTful architecture. The API routes are built using Next.js API Routes with the App Router.

```
src/app/api/
├── consultants/
│   └── onet/           # O*NET occupational data API
├── gis/
│   ├── demographics/   # Demographic data for GIS visualization
│   ├── municipalities/ # Municipality boundary data
│   └── projects/       # Project location data
├── odoo/
│   ├── [model]/        # Dynamic routes for Odoo model access
│   └── webhook/        # Webhook endpoint for Odoo events
├── parameters/         # Parameter dictionary API
└── upload/
    ├── csv/            # CSV file upload handler
    ├── shapefile/      # GIS shapefile upload handler
    └── sql/            # SQL script upload handler
```

## Database Integration

The application uses Cloudflare D1 (SQLite-compatible) for data storage. Database migrations are stored in the `migrations` directory.

### Migration Files

- `migrations/0001_initial.sql`: Initial database schema

### Database Models

The database schema includes tables for:

1. **Projects**: Economic development projects across Latin America
2. **Parameters**: Unified parameter dictionary with cross-table relationships
3. **Municipalities**: Geographic boundaries for Latin American municipalities
4. **Demographics**: Population and economic data for regions
5. **Consultants**: Skill profiles mapped to O*NET occupational data
6. **OdooSync**: Synchronization status for Odoo integration

## Odoo Integration

The Odoo integration is handled through the `src/lib/odoo_connector.js` and `src/lib/odoo_connector.py` files, providing both JavaScript and Python interfaces to the Odoo XML-RPC API.

### Odoo Connector Features

- **Authentication**: Secure connection to Odoo instances
- **Model Access**: CRUD operations on Odoo models
- **Bidirectional Sync**: Two-way data synchronization
- **Webhook Support**: Real-time updates via webhooks
- **Caching**: Performance optimization with tiered caching

### Odoo Models Integrated

- Projects
- Tasks
- Employees
- Job Positions
- Contacts
- Products
- Sales Orders
- Invoices

## GIS Integration

Geographic data is managed through the GIS API endpoints and integrated with Google Earth Engine for visualization.

### GIS Data Sources

- Municipality boundaries
- Project locations
- Demographic data
- Economic indicators
- Infrastructure data

### GIS Data Processing

The backend processes geographic data through:

1. **Data Normalization**: Converting various formats to a standard structure
2. **Spatial Analysis**: Calculating distances, areas, and spatial relationships
3. **Visualization Preparation**: Generating data for map rendering
4. **Layer Management**: Organizing data into logical map layers

## Multi-Criteria Decision Analysis (MCDA)

The MCDA engine is implemented through the parameter dictionary and provides decision support for:

1. **Site Selection**: Evaluating potential locations based on multiple criteria
2. **Business Model Structuring**: Analyzing business model components
3. **Portfolio Management**: Optimizing project portfolios

### MCDA Implementation

The MCDA system uses:

- Weighted criteria evaluation
- Pairwise comparison
- Sensitivity analysis
- Multi-objective optimization

## Performance Optimizations

The backend includes several performance optimizations:

1. **Caching**: Three-tiered caching system with different TTLs
   - Short-term cache (1 minute) for frequently changing data
   - Medium-term cache (1 hour) for semi-static data
   - Long-term cache (1 day) for static reference data

2. **Pagination**: All list endpoints support pagination to handle large datasets

3. **Batch Processing**: Bulk operations for data synchronization

4. **Database Indexing**: Optimized queries with appropriate indexes

## Security Measures

The backend implements several security measures:

1. **Input Validation**: All API inputs are validated and sanitized
2. **Authentication**: Secure authentication for API access
3. **Authorization**: Role-based access control
4. **Rate Limiting**: Protection against abuse
5. **Audit Logging**: Tracking of sensitive operations

## Error Handling

The API implements consistent error handling with:

1. **Structured Error Responses**: Standard format for all error responses
2. **Error Logging**: Comprehensive logging for debugging
3. **Graceful Degradation**: Fallbacks for service unavailability

## Mock Libraries

For development and testing, several mock libraries are provided:

- `drizzle-d1-mock.js`: Mock for Cloudflare D1 database
- `drizzle-mock.js`: Mock for Drizzle ORM
- `node-cache-mock.js`: Mock for NodeCache
- `shapefile-mock.js`: Mock for shapefile processing

## Environment Variables

The backend requires the following environment variables:

```
# Odoo Connection
ODOO_URL=https://your-odoo-instance.com
ODOO_DB=your_database
ODOO_USERNAME=your_username
ODOO_PASSWORD=your_password

# Google Earth Engine
GOOGLE_EARTH_ENGINE_API_KEY=your_gee_api_key

# Database (for local development)
DATABASE_URL=your_database_connection_string

# API Security
API_SECRET_KEY=your_api_secret_key
```

## Development Guidelines

When working on the backend:

1. **API Consistency**: Follow RESTful principles for all endpoints
2. **Error Handling**: Implement proper error handling and validation
3. **Documentation**: Update API documentation when making changes
4. **Testing**: Write tests for new functionality
5. **Performance**: Consider performance implications of changes

## Testing

Backend tests can be run with:

```bash
pnpm test:backend
```

The test suite includes:

- Unit tests for utility functions
- Integration tests for API endpoints
- Mock tests for external services

## Deployment

The backend is designed to be deployed on Vercel, which provides:

- Serverless functions for API routes
- Global CDN for edge caching
- Automatic scaling
- Zero-configuration deployment

For detailed deployment instructions, see the [Vercel Deployment Guide](/home/ubuntu/vercel_deployment_guide.md).
