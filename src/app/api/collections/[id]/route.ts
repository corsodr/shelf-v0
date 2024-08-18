import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';
import { APIPreview, DBLinkPreview } from '@/app/types/types';

type LinkPreview = APIPreview | DBLinkPreview;

interface UpdateCollectionBody {
  name: string;
  linkPreviews: LinkPreview[];
}

export async function PUT(
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
    const body: UpdateCollectionBody = await request.json();
    const { name, linkPreviews } = body;

    if (!name || !linkPreviews || !Array.isArray(linkPreviews)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await sql`BEGIN`;

    await sql`
      UPDATE collections
      SET name = ${name}
      WHERE id = ${collectionId} AND user_id = ${userId}
    `;

    await sql`
      DELETE FROM link_previews
      WHERE collection_id = ${collectionId}
    `;

    await sql`
      INSERT INTO link_previews (collection_id, url, title, domain, favicon, description, image)
      SELECT ${collectionId}, url, title, domain, favicon, description, image
      FROM json_populate_recordset(null::link_previews, ${JSON.stringify(linkPreviews)})
    `;

    await sql`COMMIT`;

    return NextResponse.json({ id: collectionId, message: "Collection updated successfully" }, { status: 200 });

  } catch (error) {
    await sql`ROLLBACK`;
    console.error('Error updating collection:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}
 
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
    const result = await sql`
    DELETE FROM collections
    WHERE id = ${collectionId} AND user_id = ${userId}
  `;

    return NextResponse.json({ message: 'Collection deleted successfully' }, { status: 200 });
    
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}