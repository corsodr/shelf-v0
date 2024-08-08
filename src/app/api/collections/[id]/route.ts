import { NextResponse } from 'next/server';
import { getCollection } from '@/app/lib/collections';

// review API routes vs lib functions 

// do I need this? 
export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getCollection(params.id);
    
    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error('Error fetching collection:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // Logic to update a specific collection
}
  
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Logic to delete a specific collection
}