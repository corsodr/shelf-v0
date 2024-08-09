import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import CollectionView from '@/app/components/CollectionView';

export default async function CollectionPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login'); 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionView collectionId={params.id} />
    </div>
  );
}