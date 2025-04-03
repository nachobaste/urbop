"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">URBOP Data Hub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Integrated platform for economic development across Latin America with Odoo ERP integration, 
          Multi-Criteria Decision Analysis, and Google Earth Engine visualization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Odoo Integration</h2>
          <p className="text-gray-600 mb-4">
            Seamless bidirectional synchronization with Odoo ERP modules for comprehensive 
            project management and data flow.
          </p>
          <Link href="/odoo-integration" className="text-blue-600 hover:underline">
            Explore Odoo Integration →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Parameter Dictionary</h2>
          <p className="text-gray-600 mb-4">
            Unified parameter system with cross-table relationships for MCDA, 
            Market Analysis, BMC, and other modules.
          </p>
          <Link href="/parameters" className="text-blue-600 hover:underline">
            View Parameter Dictionary →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">GIS Visualization</h2>
          <p className="text-gray-600 mb-4">
            Interactive geographic visualization powered by Google Earth Engine for 
            spatial data analysis and site selection.
          </p>
          <Link href="/gis" className="text-blue-600 hover:underline">
            Open GIS Viewer →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Consultant Selection</h2>
          <p className="text-gray-600 mb-4">
            O*NET integrated consultant selection system matching skills with 
            WBS deliverables and Odoo HR modules.
          </p>
          <Link href="/consultants" className="text-blue-600 hover:underline">
            Manage Consultants →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Data Upload</h2>
          <p className="text-gray-600 mb-4">
            Upload and process data from various sources including CSV, SQL, 
            and shapefiles for the Guatemala Data Hub.
          </p>
          <Link href="/upload" className="text-blue-600 hover:underline">
            Upload Data →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Latin America Expansion</h2>
          <p className="text-gray-600 mb-4">
            Expanded methodology for economic development across all Latin American 
            countries with country-specific parameters.
          </p>
          <Link href="/latin-america" className="text-blue-600 hover:underline">
            View Latin America →
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Access real-time metrics and visualizations for decision-making across your Latin American operations.
        </p>
        <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block">
          Open Dashboard
        </Link>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">About URBOP Data Hub</h2>
        <p className="text-gray-600 mb-4">
          The URBOP Data Hub is a comprehensive platform for economic development in Latin America, 
          integrating site selection, business model structuring, and portfolio management with 
          Odoo ERP and Multi-Criteria Decision Analysis.
        </p>
        <p className="text-gray-600 mb-4">
          Our platform provides tools for data-driven decision making, geographic visualization, 
          consultant selection, and comprehensive project management across the region.
        </p>
        <div className="mt-6">
          <Link href="/deploy" className="text-blue-600 hover:underline mr-6">
            Deployment Options
          </Link>
          <a href="https://aiwgxgww.manus.space" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Documentation Website
          </a>
        </div>
      </div>
    </div>
  );
}