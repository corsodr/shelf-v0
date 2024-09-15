'use client'
import { useRouter } from "next/navigation";
import LinkPreviewList from '@/app/components/LinkPreviewList';
import { DBCollection } from "@/app/types/types";
import { useCollections } from '@/app/contexts/CollectionsContext';

interface CollectionViewProps {
  collection: DBCollection;
}

export default function CollectionView({ collection }: CollectionViewProps) {
  const router = useRouter();
  const { setCurrentCollection, setIsEditing, collections, deleteCollection } = useCollections();
  
  const { name, linkPreviews } = collection;

  const handleEdit = () => {
    setCurrentCollection(collection);
    setIsEditing(true);
  }

  const handleDelete = async () => {
    try {
      await deleteCollection(collection.id);
  
      const updatedCollections = collections.filter(c => c.id !== collection.id);
  
      if (updatedCollections.length > 0) {
        const nextCollection = updatedCollections[0];
        router.push(`/collections/${nextCollection.id}`);
      } else {
        router.push('/collections');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  }

  return (
    <div className="min-w-[500px] max-w-[700px]">
      <h1 className="text-3xl font-bold py-3 mb-2 mr-3">{name}</h1>
      {linkPreviews && linkPreviews.length > 0 ? (
        <LinkPreviewList linkPreviews={linkPreviews} />
      ) : (
        <p>This collection is empty.</p>
      )}
       <div className="flex gap-3 mt-6">
          <button 
            className="bg-slate-500 hover:bg-slate-700 text-white font-medium py-2 px-5 rounded-lg"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-slate-300 hover:bg-slate-500 font-medium py-2 px-5 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
    </div>
  );
}