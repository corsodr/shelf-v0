import { redirect } from 'next/navigation';
import { getCollections } from '@/app/lib/collections';
import { auth } from "@/auth";

export default async function CollectionsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  const collections = await getCollections();

  // add collections to state 

  if (collections.length === 0) {
    return (
      <h1 className='text-xl font-bold'>Create your first collection.</h1>
    )
  } else {
    // review this path 
    redirect(`/collections/${collections[0].id}`);
  }
}