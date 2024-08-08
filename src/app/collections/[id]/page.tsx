import { getCollection } from '@/lib/collections';

export default async function CollectionPage({ params }: { params: { id: string } }) {
  const collection = await getCollection(params.id);

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