import { NextRequest, NextResponse } from 'next/server';
// Import from our mock implementation instead of the actual package
import { DrizzleD1, eq } from '@/lib/drizzle-mock';

// Mock database schema
const demographics = {
  id: 'id',
  region: 'region',
  population: 'population',
  income: 'income',
  education: 'education',
  employment: 'employment',
  coordinates: 'coordinates'
};

export async function GET(request: NextRequest) {
  try {
    // Create mock database instance
    const db = new DrizzleD1({});
    
    // Mock query to get all demographic data
    const results = await db.select({
      id: demographics.id,
      region: demographics.region,
      population: demographics.population,
      income: demographics.income,
      education: demographics.education,
      employment: demographics.employment,
      coordinates: demographics.coordinates
    })
    .from('demographics')
    .all();
    
    // Return mock GeoJSON data
    return NextResponse.json({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 1,
            region: 'Metropolitan',
            population: 3500000,
            income: 12500,
            education: 85,
            employment: 78
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-90.6069, 14.5349],
              [-90.4069, 14.5349],
              [-90.4069, 14.7349],
              [-90.6069, 14.7349],
              [-90.6069, 14.5349]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: {
            id: 2,
            region: 'Western Highlands',
            population: 2100000,
            income: 8200,
            education: 72,
            employment: 65
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-91.6178, 14.7448],
              [-91.4178, 14.7448],
              [-91.4178, 14.9448],
              [-91.6178, 14.9448],
              [-91.6178, 14.7448]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: {
            id: 3,
            region: 'Eastern Region',
            population: 1800000,
            income: 7500,
            education: 68,
            employment: 62
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-89.8342, 14.4586],
              [-89.6342, 14.4586],
              [-89.6342, 14.6586],
              [-89.8342, 14.6586],
              [-89.8342, 14.4586]
            ]]
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching demographic data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demographic data' },
      { status: 500 }
    );
  }
}
