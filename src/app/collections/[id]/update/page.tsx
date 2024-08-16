import CollectionForm from '@/app/components/CollectionForm';
import { getCollection } from '@/app/lib/collections';
import { DBCollection } from '@/app/types/types';

export default async function UpdateCollectionPage({ params }: { params: { id: string } }) {
  const collection: DBCollection = await getCollection(params.id);

  return (
    <CollectionForm currentCollection={collection} /> 
  );
}