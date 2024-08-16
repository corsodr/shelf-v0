import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import { getCollections } from '@/app/lib/collections';
import { DBCollection } from '@/app/types/types';

export default async function CollectionsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  const collections: DBCollection[] = await getCollections();

  if (collections.length === 0) {
    return (
      <h1 className='text-xl font-bold'>Create your first collection.</h1>
    )
  } else {
    redirect(`/collections/${collections[0].id}`);
  }
}