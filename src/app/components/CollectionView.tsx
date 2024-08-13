'use client'
import { useRouter } from "next/navigation";
import LinkPreviewList from '@/app/components/LinkPreviewList';

export default function CollectionView({ collection }) {
  const router = useRouter();
  
  // change name to title 
  // change snake case to camel case
  const { name, link_previews } = collection;

  const handleDelete = async () => {
    try {
      const response = await fetch (`/api/collections/${collection.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // check this 
        router.push('/collections');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      {link_previews && link_previews.length > 0 ? (
        <LinkPreviewList linkPreviews={link_previews} />
      ) : (
        <p>This collection is empty.</p>
      )}
       <div className="flex gap-5">
          <button 
            type="submit"
            className="bg-blue-500 text-white px-5 py-3 rounded-lg self-start"
          >
            Edit
          </button>
          <button
              className="bg-red-500 text-white px-5 py-3 rounded-lg"
              onClick={handleDelete}
          >
            Delete
          </button>
        </div>
    </div>
  );
}