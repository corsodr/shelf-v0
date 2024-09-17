import { sql } from '@vercel/postgres';
import { auth } from "@/auth";
import { DBCollection } from '@/app/types/types';

export async function getCollections(): Promise<DBCollection[]> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  const userId = session.user.id;

  try { 
    const collectionsResult = await sql<DBCollection>`
      SELECT 
        collections.id,
        collections.name,
        json_agg(json_build_object(
          'id', link_previews.id,
          'url', link_previews.url,
          'title', link_previews.title,
          'domain', link_previews.domain,
          'favicon', link_previews.favicon,
          'description', link_previews.description,
          'image', link_previews.image,
          'createdAt', link_previews.created_at
        )) AS "linkPreviews"
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

// delete? 
export async function getCollection(collectionId: string): Promise<DBCollection> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  const userId = session.user.id;

  try { 
    const result = await sql<DBCollection>`
      SELECT 
        collections.id,
        collections.name,
        json_agg(json_build_object(
          'id', link_previews.id,
          'url', link_previews.url,
          'title', link_previews.title,
          'domain', link_previews.domain,
          'favicon', link_previews.favicon,
          'description', link_previews.description,
          'image', link_previews.image,
          'createdAt', link_previews.created_at
        )) AS "linkPreviews"
      FROM 
        collections
        LEFT JOIN link_previews ON collections.id = link_previews.collection_id
      WHERE 
        collections.id = ${collectionId}
        AND collections.user_id = ${userId}
      GROUP BY 
        collections.id, collections.name
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
}