import { getCollection } from '@/app/lib/collections';

export default async function CollectionView({ collectionId }) {
  const collection = await getCollection(collectionId);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <h1>{collection.name}</h1>
      {/* Render collection details here */}
    </div>
  );
}