import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from request headers or body
    const authHeader = request.headers.get('authorization');
    const body = await request.json().catch(() => ({}));
    
    // Simple secret validation (you can make this more secure)
    const secret = authHeader?.replace('Bearer ', '') || body.secret;
    const expectedSecret = process.env.REVALIDATION_SECRET || 'gavali-revalidate-secret';
    
    if (!secret || secret !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // Get paths to revalidate from request body
    const { paths } = body;
    const pathsToRevalidate = paths || ['/demo', '/', '/categories'];

    // Revalidate specified paths
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    return NextResponse.json({ 
      revalidated: true, 
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Also support GET for manual testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const expectedSecret = process.env.REVALIDATION_SECRET || 'gavali-revalidate-secret';
  
  if (!secret || secret !== expectedSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate common paths
    const pathsToRevalidate = ['/demo', '/', '/categories'];
    
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({ 
      revalidated: true, 
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}