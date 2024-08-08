import { getCollections } from '@/app/lib/collections';
import CollectionEditor from '@/app/components/CollectionEditor';
import CollectionView from '@/app/components/CollectionView';

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div>
      {collections.length === 0 ? (
        <CollectionEditor />
      ) : (
        <CollectionView collectionId={collections[0].id} />
      )}
    </div>
  );
}