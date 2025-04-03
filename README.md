# URBOP Data Hub - Latin America Economic Development

A comprehensive platform for integrating site selection, business model structuring, and portfolio management for economic development across Latin America with Odoo ERP integration.

## Overview

The URBOP Data Hub is a full-stack Next.js application designed to support economic development projects throughout Latin America. It provides tools for data-driven decision making, geographic visualization, consultant selection, and comprehensive project management with deep Odoo ERP integration.

## Key Features

- **Odoo ERP Integration**: Bidirectional synchronization with Odoo modules for comprehensive project management and data flow
- **Multi-Criteria Decision Analysis (MCDA)**: Advanced decision support for site selection and business model structuring
- **Geographic Information System (GIS)**: Interactive visualization powered by Google Earth Engine for spatial data analysis
- **Unified Parameter Dictionary**: Cross-referenced parameters maintaining relationships between all tables
- **Consultant Selection**: O*NET integrated system matching skills with WBS deliverables and Odoo HR modules
- **Data Upload System**: Support for various data formats including CSV, SQL, and shapefiles
- **Latin America Coverage**: Expanded methodology for economic development across all Latin American countries with country-specific parameters

## Project Structure

```
urbop-data-hub/
├── migrations/         # Database migration files
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages and API routes
│   │   ├── api/        # Backend API endpoints
│   │   ├── consultants/# Consultant selection interface
│   │   ├── dashboard/  # Analytics dashboard
│   │   ├── deploy/     # Deployment management
│   │   ├── gis/        # Geographic visualization
│   │   ├── latin-america/ # Latin America expansion
│   │   ├── odoo-integration/ # Odoo ERP connection
│   │   ├── parameters/ # Parameter dictionary
│   │   └── upload/     # Data upload interface
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions and connectors
│       ├── odoo_connector.js  # JavaScript Odoo connector
│       ├── odoo_connector.py  # Python Odoo connector
│       └── ...         # Mock libraries and utilities
├── .next/              # Next.js build output
├── next.config.js      # Next.js configuration
└── package.json        # Project dependencies
```

## Technologies

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Serverless Functions
- **Database**: Cloudflare D1 (SQLite compatible)
- **Integration**: Odoo XML-RPC API
- **GIS**: Google Earth Engine
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git
- Odoo instance with API access
- Google Earth Engine account (for GIS features)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd urbop-data-hub
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   ODOO_URL=https://your-odoo-instance.com
   ODOO_DB=your_database
   ODOO_USERNAME=your_username
   ODOO_PASSWORD=your_password
   GOOGLE_EARTH_ENGINE_API_KEY=your_gee_api_key
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

For production deployment, we recommend using Vercel. See the [Vercel Deployment Guide](/home/ubuntu/vercel_deployment_guide.md) for detailed instructions.

## Documentation

- [Integration Requirements](/home/ubuntu/project/docs/integration_requirements.md)
- [System Architecture](/home/ubuntu/project/system_architecture.md)
- [Integration Framework](/home/ubuntu/project/integration_framework.md)
- [Implementation Roadmap](/home/ubuntu/project/implementation_roadmap.md)
- [Comprehensive Guide](/home/ubuntu/project/comprehensive_guide.md)
- [Technical Documentation](/home/ubuntu/project/technical_documentation.md)
- [User Manual](/home/ubuntu/project/user_manual.md)

## Modules

### Odoo Integration

The Odoo integration module provides bidirectional synchronization between the URBOP Data Hub and your Odoo ERP system. It connects with Odoo's modules for project management, HR, CRM, and financial tracking.

### GIS Visualization

The GIS module leverages Google Earth Engine to provide interactive geographic visualization for spatial data analysis and site selection. It includes layers for municipalities, projects, and demographic data.

### Consultant Selection

The consultant selection module integrates with O*NET occupational data to match consultant skills with project requirements. It connects with Odoo's HR modules for comprehensive talent management.

### Parameter Dictionary

The unified parameter dictionary maintains cross-referenced parameters across all tables, supporting the Multi-Criteria Decision Analysis system for site selection and business model structuring.

### Latin America Expansion

The Latin America module extends the economic development methodology across all Latin American countries with country-specific parameters and data visualization.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- URBOP team for their expertise in economic development
- Next.js and Vercel teams for the excellent framework and platform
- Odoo community for the comprehensive ERP system
- Google Earth Engine for the powerful GIS capabilities
