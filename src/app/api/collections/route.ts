import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { sql } from '@vercel/postgres';

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized or email not found" }, { status: 401 });
  }
  
  const userEmail = session.user.email;

  try {
    // should I add ORDER BY? 
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
        users
        JOIN collections ON users.id = collections.user_id
        LEFT JOIN link_previews ON collections.id = link_previews.collection_id
      WHERE 
        users.email = ${userEmail}
      GROUP BY 
        collections.id, collections.name
    `;

    return NextResponse.json({ collections: collectionsResult.rows }, { status: 200 }); 
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
  
export async function POST(request: Request) {
    // create a new collection 
}