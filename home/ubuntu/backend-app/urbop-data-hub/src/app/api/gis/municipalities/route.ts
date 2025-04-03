import { NextRequest, NextResponse } from 'next/server';
// Import from our mock implementation instead of the actual package
import { DrizzleD1, eq } from '@/lib/drizzle-mock';

// Mock database schema
const municipalities = {
  id: 'id',
  name: 'name',
  department: 'department',
  population: 'population',
  area: 'area',
  coordinates: 'coordinates'
};

export async function GET(request: NextRequest) {
  try {
    // Create mock database instance
    const db = new DrizzleD1({});
    
    // Mock query to get all municipalities
    const results = await db.select({
      id: municipalities.id,
      name: municipalities.name,
      department: municipalities.department,
      population: municipalities.population,
      area: municipalities.area,
      coordinates: municipalities.coordinates
    })
    .from('municipalities')
    .all();
    
    // Return mock GeoJSON data
    return NextResponse.json({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 1,
            name: 'Guatemala City',
            department: 'Guatemala',
            population: 1000000,
            area: 996
          },
          geometry: {
            type: 'Point',
            coordinates: [-90.5069, 14.6349]
          }
        },
        {
          type: 'Feature',
          properties: {
            id: 2,
            name: 'Quetzaltenango',
            department: 'Quetzaltenango',
            population: 180000,
            area: 120
          },
          geometry: {
            type: 'Point',
            coordinates: [-91.5178, 14.8448]
          }
        },
        {
          type: 'Feature',
          properties: {
            id: 3,
            name: 'Antigua Guatemala',
            department: 'Sacatepéquez',
            population: 46000,
            area: 78
          },
          geometry: {
            type: 'Point',
            coordinates: [-90.7342, 14.5586]
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching municipalities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch municipalities' },
      { status: 500 }
    );
  }
}
