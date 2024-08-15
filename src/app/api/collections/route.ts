import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, linkPreviews } = await req.json();

    if (!name || !linkPreviews || !Array.isArray(linkPreviews)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await sql`BEGIN`;

    const collectionResult = await sql<{ id: string }>`
      INSERT INTO collections (user_id, name)
      VALUES (${session.user.id}, ${name})
      RETURNING id
    `;

    const collectionId = collectionResult.rows[0].id;

    // review bulk insert 
    await sql`
      INSERT INTO link_previews (collection_id, url, title, domain, favicon, description, image)
      SELECT ${collectionId}, url, title, domain, favicon, description, image
      FROM json_populate_recordset(null::link_previews, ${JSON.stringify(linkPreviews)})
    `;

    await sql`COMMIT`;

    return NextResponse.json({ id: collectionId, message: "Collection created successfully" }, { status: 201 });

  } catch (error) {
    await sql`ROLLBACK`;
    console.error('Error posting collection', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



