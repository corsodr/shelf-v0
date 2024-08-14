import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';
 
// use cascade
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
    await sql`
      DELETE FROM link_previews
      WHERE collection_id = ${collectionId}
    `;

    const result = await sql`
      DELETE FROM collections
      WHERE id = ${collectionId} AND user_id = ${userId}
      RETURNING id
    `;

      return NextResponse.json({ message: 'Collection deleted successfully' }, { status: 200 });
    
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}