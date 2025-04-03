import { NextRequest, NextResponse } from 'next/server';
// Import from our mock implementation instead of the actual package
import NodeCache from '@/lib/node-cache-mock';

// Create a cache instance
const webhookCache = new NodeCache({ stdTTL: 300 }); // 5 minute TTL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, action, record_id, data } = body;
    
    if (!model || !action || !record_id) {
      return NextResponse.json(
        { error: 'Missing required fields: model, action, and record_id are required' },
        { status: 400 }
      );
    }
    
    // Generate a unique webhook ID
    const webhookId = `webhook_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Store webhook data in cache to prevent duplicate processing
    const cacheKey = `${model}_${action}_${record_id}`;
    if (webhookCache.get(cacheKey)) {
      return NextResponse.json(
        { error: 'Duplicate webhook received', status: 'ignored' },
        { status: 200 }
      );
    }
    
    // Cache this webhook to prevent duplicates
    webhookCache.set(cacheKey, { webhookId, timestamp: Date.now() });
    
    // Process the webhook based on model and action
    let result;
    switch (action) {
      case 'create':
        result = { status: 'processed', message: `Created ${model} record ${record_id}` };
        break;
      case 'update':
        result = { status: 'processed', message: `Updated ${model} record ${record_id}` };
        break;
      case 'delete':
        result = { status: 'processed', message: `Deleted ${model} record ${record_id}` };
        break;
      default:
        result = { status: 'processed', message: `Processed ${action} for ${model} record ${record_id}` };
    }
    
    return NextResponse.json({
      webhook_id: webhookId,
      status: 'success',
      result
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
