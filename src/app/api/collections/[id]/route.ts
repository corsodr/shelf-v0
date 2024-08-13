import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
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

// review this 
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const collectionId = params.id;

  try {
    // Delete associated link_previews first
    await sql`
      DELETE FROM link_previews
      WHERE collection_id = ${collectionId}
    `;

    // Then delete the collection
    const result = await sql`
      DELETE FROM collections
      WHERE id = ${collectionId} AND user_id = ${userId}
      RETURNING id
    `;

    if (result.rowCount > 0) {
      revalidatePath('/collections');
      return NextResponse.json({ message: 'Collection deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Collection not found or unauthorized' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}