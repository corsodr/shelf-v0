import { sql } from '@vercel/postgres';
import { auth } from "@/auth";

export async function getCollections() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  const userId = session.user.id;

  try { 
    const collectionsResult = await sql<Collection>`
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

    return collectionsResult.rows;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
}