import CollectionEditor from '@/app/components/CollectionEditor';

export default function NewCollectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Collection</h1>
      <CollectionEditor />
    </div>
  );
}