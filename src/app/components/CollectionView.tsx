import { getCollection } from '@/app/lib/collections';
import LinkPreviewList from '@/app/components/LinkPreviewList';

// compare code to CollectionList - simplify if possible 
export default async function CollectionView({ collectionId }: { collectionId: string }) {
  let collection;
  try {
    collection = await getCollection(collectionId);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return <div>Error loading collection. Please try again later.</div>;
  }

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{collection.name}</h1>
      {collection.link_previews && collection.link_previews.length > 0 ? (
        <LinkPreviewList linkPreviews={collection.link_previews} />
      ) : (
        <p>This collection is empty.</p>
      )}
    </div>
  );
}