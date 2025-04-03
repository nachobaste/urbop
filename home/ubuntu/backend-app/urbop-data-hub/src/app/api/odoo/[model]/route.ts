import { NextRequest, NextResponse } from 'next/server';
// Import from our mock implementation instead of the actual package
import { DrizzleD1, eq } from '@/lib/drizzle-mock';
import OdooConnector from '@/lib/odoo_connector';

export async function GET(request: NextRequest, { params }: { params: { model: string } }) {
  try {
    const { model } = params;
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    // Create mock database instance
    const db = new DrizzleD1({});
    
    // Create Odoo connector instance
    const odoo = new OdooConnector();
    
    // Mock data based on model type
    let data;
    
    if (id) {
      // Return single record
      switch (model) {
        case 'projects':
          data = {
            id: 1,
            name: 'Urban Development Zone A',
            status: 'in_progress',
            budget: 5000000,
            score: 87
          };
          break;
        case 'parameters':
          data = {
            id: 1,
            name: 'Economic Growth',
            category: 'economic',
            weight: 0.75,
            description: 'Measures the economic growth potential of a site'
          };
          break;
        case 'consultants':
          data = {
            id: 1,
            name: 'John Doe',
            skills: ['Urban Planning', 'Economic Analysis', 'GIS'],
            onet_code: '15-1299.08',
            match_score: 92
          };
          break;
        default:
          data = { id: 1, name: 'Generic Record' };
      }
    } else {
      // Return multiple records
      switch (model) {
        case 'projects':
          data = [
            {
              id: 1,
              name: 'Urban Development Zone A',
              status: 'in_progress',
              budget: 5000000,
              score: 87
            },
            {
              id: 2,
              name: 'Commercial District B',
              status: 'planned',
              budget: 8500000,
              score: 92
            }
          ];
          break;
        case 'parameters':
          data = [
            {
              id: 1,
              name: 'Economic Growth',
              category: 'economic',
              weight: 0.75,
              description: 'Measures the economic growth potential of a site'
            },
            {
              id: 2,
              name: 'Social Impact',
              category: 'social',
              weight: 0.65,
              description: 'Measures the social impact of a development project'
            }
          ];
          break;
        case 'consultants':
          data = [
            {
              id: 1,
              name: 'John Doe',
              skills: ['Urban Planning', 'Economic Analysis', 'GIS'],
              onet_code: '15-1299.08',
              match_score: 92
            },
            {
              id: 2,
              name: 'Jane Smith',
              skills: ['Project Management', 'Financial Analysis', 'Market Research'],
              onet_code: '13-1111.00',
              match_score: 87
            }
          ];
          break;
        default:
          data = [
            { id: 1, name: 'Generic Record 1' },
            { id: 2, name: 'Generic Record 2' }
          ];
      }
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error handling ${params.model} request:`, error);
    return NextResponse.json(
      { error: `Failed to process ${params.model} request` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: { model: string } }) {
  try {
    const { model } = params;
    const body = await request.json();
    
    // Create Odoo connector instance
    const odoo = new OdooConnector();
    
    // Mock creating a record
    const newId = Math.floor(Math.random() * 1000) + 1;
    
    return NextResponse.json({ 
      id: newId, 
      ...body,
      created: true
    });
  } catch (error) {
    console.error(`Error creating ${params.model} record:`, error);
    return NextResponse.json(
      { error: `Failed to create ${params.model} record` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { model: string } }) {
  try {
    const { model } = params;
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for update' },
        { status: 400 }
      );
    }
    
    // Create Odoo connector instance
    const odoo = new OdooConnector();
    
    // Mock updating a record
    return NextResponse.json({ 
      id: parseInt(id), 
      ...body,
      updated: true
    });
  } catch (error) {
    console.error(`Error updating ${params.model} record:`, error);
    return NextResponse.json(
      { error: `Failed to update ${params.model} record` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { model: string } }) {
  try {
    const { model } = params;
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for deletion' },
        { status: 400 }
      );
    }
    
    // Create Odoo connector instance
    const odoo = new OdooConnector();
    
    // Mock deleting a record
    return NextResponse.json({ 
      id: parseInt(id),
      deleted: true
    });
  } catch (error) {
    console.error(`Error deleting ${params.model} record:`, error);
    return NextResponse.json(
      { error: `Failed to delete ${params.model} record` },
      { status: 500 }
    );
  }
}
