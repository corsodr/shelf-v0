import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { getCollection } from '@/app/lib/collections';
import CollectionView from '@/app/components/CollectionView';

export default async function CollectionPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login'); 
  }

  // confirm it makes sense to put this here 
  const collection = await getCollection(params.id);

  return (
    <CollectionView collection={collection} />
  );
}