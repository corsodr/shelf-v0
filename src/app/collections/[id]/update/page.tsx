import { getCollection } from '@/app/lib/collections';
import CollectionForm from '@/app/components/CollectionForm';

export default async function UpdateCollectionPage({ params }: { params: { id: string } }) {
  const collection = await getCollection(params.id);

  return (
    <CollectionForm currentCollection={collection} /> 
  );
}