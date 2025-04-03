import { NextRequest, NextResponse } from 'next/server';
import { OdooConnector } from '@/lib/odoo_connector';

// Environment variables should be set in .env.local or through deployment platform
const ODOO_URL = process.env.ODOO_URL || 'https://yourodoo.odoo.sh';
const ODOO_DB = process.env.ODOO_DB || 'yourodoo';
const ODOO_USERNAME = process.env.ODOO_USERNAME || 'admin';
const ODOO_API_KEY = process.env.ODOO_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // Initialize the Odoo connector
    const odoo = new OdooConnector(ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY);
    
    // Connect to Odoo
    const uid = await odoo.connect();
    
    if (!uid) {
      return NextResponse.json(
        { error: 'Failed to connect to Odoo' },
        { status: 500 }
      );
    }
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const model = searchParams.get('model') || 'res.partner';
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    // Perform a search_read operation
    const results = await odoo.search_read(
      model,
      [],  // Empty domain to get all records
      ['name', 'id'],  // Fields to fetch
      limit
    );
    
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, values } = body;
    
    if (!model || !values) {
      return NextResponse.json(
        { error: 'Missing required fields: model and values' },
        { status: 400 }
      );
    }
    
    // Initialize the Odoo connector
    const odoo = new OdooConnector(ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY);
    
    // Connect to Odoo
    const uid = await odoo.connect();
    
    if (!uid) {
      return NextResponse.json(
        { error: 'Failed to connect to Odoo' },
        { status: 500 }
      );
    }
    
    // Create a new record
    const recordId = await odoo.create(model, values);
    
    if (!recordId) {
      return NextResponse.json(
        { error: 'Failed to create record' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Record created successfully`,
      id: recordId
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, id, values } = body;
    
    if (!model || !id || !values) {
      return NextResponse.json(
        { error: 'Missing required fields: model, id, and values' },
        { status: 400 }
      );
    }
    
    // Initialize the Odoo connector
    const odoo = new OdooConnector(ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY);
    
    // Connect to Odoo
    const uid = await odoo.connect();
    
    if (!uid) {
      return NextResponse.json(
        { error: 'Failed to connect to Odoo' },
        { status: 500 }
      );
    }
    
    // Update the record
    const success = await odoo.write(model, [id], values);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update record' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Record updated successfully` 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const model = searchParams.get('model');
    const id = searchParams.get('id');
    
    if (!model || !id) {
      return NextResponse.json(
        { error: 'Missing required parameters: model and id' },
        { status: 400 }
      );
    }
    
    // Initialize the Odoo connector
    const odoo = new OdooConnector(ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY);
    
    // Connect to Odoo
    const uid = await odoo.connect();
    
    if (!uid) {
      return NextResponse.json(
        { error: 'Failed to connect to Odoo' },
        { status: 500 }
      );
    }
    
    // Delete the record
    const success = await odoo.unlink(model, [parseInt(id, 10)]);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete record' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Record deleted successfully` 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
