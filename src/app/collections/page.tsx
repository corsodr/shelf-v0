import { redirect } from 'next/navigation';
import { getCollections } from '@/app/lib/collections';
import { auth } from "@/auth";

// does it make sense for this to be a page and for /new and /id to be pages?
export default async function CollectionsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  // review this vs api call 
  const collections = await getCollections();

  if (collections.length === 0) {
    redirect('/collections/new');
  } else {
    // check collection order in sql query 
    redirect(`/collections/${collections[0].id}`);
  }
}