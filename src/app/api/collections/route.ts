import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { sql } from '@vercel/postgres';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const userId = session.user.id;

  try { 
    const collectionsResult = await sql`
      SELECT 
        collections.id,
        collections.name,
        json_agg(json_build_object(
          'id', link_previews.id,
          'url', link_previews.url,
          'title', link_previews.title,
          'favicon', link_previews.favicon,
          'description', link_previews.description,
          'image', link_previews.image,
          'created_at', link_previews.created_at
        )) AS link_previews
      FROM 
        collections
        LEFT JOIN link_previews ON collections.id = link_previews.collection_id
      WHERE 
        collections.user_id = ${userId}
      GROUP BY 
        collections.id, collections.name
    `;

    return NextResponse.json({ collections: collectionsResult.rows }, { status: 200 }); 
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, links } = await req.json();

    if (!title || !links || !Array.isArray(links)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await sql`BEGIN`;

    const collectionResult = await sql`
      INSERT INTO collections (user_id, name)
      VALUES (${session.user.id}, ${title})
      RETURNING id
    `;

    const collectionId = collectionResult.rows[0].id;

    // review bulk insert 
    await sql`
      INSERT INTO link_previews (collection_id, url, title, favicon, description, image)
      SELECT ${collectionId}, url, title, favicon, description, image
      FROM json_populate_recordset(null::link_previews, ${JSON.stringify(links)})
    `;

    //  for (const link of links) {
    //   await sql`
    //     INSERT INTO link_previews (collection_id, url, title, favicon, description, image)
    //     VALUES (${collectionId}, ${link.url}, ${link.title}, ${link.favicon}, ${link.description}, ${link.image})
    //   `;
    // }

    await sql`COMMIT`;

    return NextResponse.json({ message: "Collection created successfully", collectionId }, { status: 201 });

  } catch (error) {
    await sql`ROLLBACK`;
    console.error('Error posting collection', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



