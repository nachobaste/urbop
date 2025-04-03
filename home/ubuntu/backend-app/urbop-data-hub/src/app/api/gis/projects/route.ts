import { NextRequest, NextResponse } from 'next/server';
// Import from our mock implementation instead of the actual package
import { DrizzleD1, eq } from '@/lib/drizzle-mock';

// Mock database schema
const projects = {
  id: 'id',
  name: 'name',
  status: 'status',
  budget: 'budget',
  coordinates: 'coordinates',
  score: 'score'
};

export async function GET(request: NextRequest) {
  try {
    // Create mock database instance
    const db = new DrizzleD1({});
    
    // Mock query to get all projects
    const results = await db.select({
      id: projects.id,
      name: projects.name,
      status: projects.status,
      budget: projects.budget,
      coordinates: projects.coordinates,
      score: projects.score
    })
    .from('projects')
    .all();
    
    // Return mock GeoJSON data
    return NextResponse.json({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 1,
            name: 'Urban Development Zone A',
            status: 'in_progress',
            budget: 5000000,
            score: 87
          },
          geometry: {
            type: 'Point',
            coordinates: [-90.5269, 14.6149]
          }
        },
        {
          type: 'Feature',
          properties: {
            id: 2,
            name: 'Commercial District B',
            status: 'planned',
            budget: 8500000,
            score: 92
          },
          geometry: {
            type: 'Point',
            coordinates: [-90.5469, 14.6349]
          }
        },
        {
          type: 'Feature',
          properties: {
            id: 3,
            name: 'Residential Area C',
            status: 'completed',
            budget: 3200000,
            score: 78
          },
          geometry: {
            type: 'Point',
            coordinates: [-90.5069, 14.6549]
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
