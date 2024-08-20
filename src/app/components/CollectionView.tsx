'use client'
import { useRouter } from "next/navigation";
import LinkPreviewList from '@/app/components/LinkPreviewList';
import { DBCollection } from "@/app/types/types";

interface CollectionViewProps {
  collection: DBCollection;
}

export default function CollectionView({ collection }: CollectionViewProps) {
  const router = useRouter();
  
  const { name, linkPreviews } = collection;

  const handleEdit = () => {
    router.push(`/collections/${collection.id}/update`);
  }

  const handleDelete = async () => {
    try {
      const response = await fetch (`/api/collections/${collection.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/collections');
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold py-3 mb-2">{name}</h1>
      {linkPreviews && linkPreviews.length > 0 ? (
        <LinkPreviewList linkPreviews={linkPreviews} />
      ) : (
        <p>This collection is empty.</p>
      )}
       <div className="flex gap-3 mt-6">
          <button 
            className="bg-slate-500 hover:bg-slate-700 text-white font-medium py-2 px-5 rounded"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-slate-300 hover:bg-slate-500 font-medium py-2 px-5 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
    </div>
  );
}