import { NextRequest, NextResponse } from 'next/server';
// Import from our mock implementation instead of the actual package
import { DrizzleD1, eq } from '@/lib/drizzle-mock';

// Mock database schema
const parameters = {
  id: 'id',
  name: 'name',
  category: 'category',
  weight: 'weight',
  description: 'description',
  related_tables: 'related_tables'
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const table = searchParams.get('table');
    
    // Create mock database instance
    const db = new DrizzleD1({});
    
    // Mock parameter data
    let parameterData = [
      {
        id: 1,
        name: 'Economic Growth',
        category: 'economic',
        weight: 0.75,
        description: 'Measures the economic growth potential of a site',
        related_tables: ['MCDA', 'Market Analysis', 'BMC']
      },
      {
        id: 2,
        name: 'Social Impact',
        category: 'social',
        weight: 0.65,
        description: 'Measures the social impact of a development project',
        related_tables: ['MCDA', 'Market Analysis']
      },
      {
        id: 3,
        name: 'Environmental Sustainability',
        category: 'environmental',
        weight: 0.70,
        description: 'Measures the environmental sustainability of a project',
        related_tables: ['MCDA', 'BMC']
      },
      {
        id: 4,
        name: 'Infrastructure Quality',
        category: 'infrastructure',
        weight: 0.60,
        description: 'Measures the quality of existing infrastructure',
        related_tables: ['MCDA', 'Site Selection']
      },
      {
        id: 5,
        name: 'Market Demand',
        category: 'market',
        weight: 0.80,
        description: 'Measures the market demand for the development',
        related_tables: ['Market Analysis', 'BMC']
      }
    ];
    
    // Filter by category if provided
    if (category) {
      parameterData = parameterData.filter(param => param.category === category);
    }
    
    // Filter by related table if provided
    if (table) {
      parameterData = parameterData.filter(param => param.related_tables.includes(table));
    }
    
    return NextResponse.json({
      parameters: parameterData,
      dictionary: {
        total_parameters: parameterData.length,
        categories: [...new Set(parameterData.map(param => param.category))],
        related_tables: [...new Set(parameterData.flatMap(param => param.related_tables))]
      }
    });
  } catch (error) {
    console.error('Error fetching parameters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parameters' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, weight, description, related_tables } = body;
    
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }
    
    // Create mock database instance
    const db = new DrizzleD1({});
    
    // Mock creating a new parameter
    const newId = Math.floor(Math.random() * 1000) + 6;
    
    const newParameter = {
      id: newId,
      name,
      category,
      weight: weight || 0.5,
      description: description || '',
      related_tables: related_tables || []
    };
    
    return NextResponse.json({
      parameter: newParameter,
      created: true
    });
  } catch (error) {
    console.error('Error creating parameter:', error);
    return NextResponse.json(
      { error: 'Failed to create parameter' },
      { status: 500 }
    );
  }
}
