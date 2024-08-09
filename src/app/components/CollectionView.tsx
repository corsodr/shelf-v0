import { getCollection } from '@/app/lib/collections';
import LinkPreviewList from '@/app/components/LinkPreviewList';

export default async function CollectionView({ collectionId }: { collectionId: string }) {
    const collection = await getCollection(collectionId);
    // change name to title 
    // does it make sense that link_previews is snake case? 
    const { name, link_previews } = collection;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      {link_previews && link_previews.length > 0 ? (
        <LinkPreviewList linkPreviews={link_previews} />
      ) : (
        <p>This collection is empty.</p>
      )}
    </div>
  );
}