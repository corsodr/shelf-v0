import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { sql } from '@vercel/postgres';
import { Collection, Preview } from '@/app/types/types';
import { getCollections } from '@/app/lib/collections';

// update typing 

// do I need this? 
export async function GET() {
  try {
    const collections = await getCollections();
    return NextResponse.json({ collections }, { status: 200 });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// use, rename, move to types.ts? 
interface PostRequestBody {
  title: string;
  links: Omit<Preview, 'id' | 'created_at'>[];
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, links }: PostRequestBody = await req.json();

    if (!title || !links || !Array.isArray(links)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await sql`BEGIN`;

    const collectionResult = await sql<{ id: string }>`
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



