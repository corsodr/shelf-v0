import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import CollectionView from '@/app/components/CollectionView';

export default async function CollectionPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login'); 
  }

  return (
    <CollectionView collectionId={params.id} />
  );
}