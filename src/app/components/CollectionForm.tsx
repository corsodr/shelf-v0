'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DndLinkPreviewList from '@/app/components/DndLinkPreviewList';
import { APIPreview, DBLinkPreview, DBCollection } from '@/app/types/types';
import { useCollections } from '@/app/contexts/CollectionsContext';

interface CollectionFormProps {
  currentCollection?: DBCollection 
}

interface CollectionResult {
  id: number;  
}

type LinkPreview = APIPreview | DBLinkPreview;

export default function CollectionForm({ currentCollection }: CollectionFormProps) {
  const { currentCollection: collection, setCurrentCollection, setIsCreating, setIsEditing } = useCollections();
  const [name, setName] = useState(collection?.name || '');
  const [link, setLink] = useState('');
  const [linkPreviews, setLinkPreviews] = useState<LinkPreview[]>(collection?.linkPreviews || []);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setLinkPreviews(collection.linkPreviews);
    }
  }, [collection]);

  const fetchPreview = async () => {
    setError(null);

    try {
      const response = await fetch('https://link-preview-api-v1.vercel.app/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: link})
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch preview. Status: ${response.status}`);
      }

      const data: APIPreview = await response.json();
      setLinkPreviews((prevPreviews) => [...prevPreviews, data]);
      setLink('');
    } catch (error) {
      console.error('Error fetching preview', error);
      const fallbackPreview: APIPreview = {
        url: link,
        domain: '',
        title: link,
        favicon: '',
        description: '',
        image: ''
      };
      setLinkPreviews((prevPreviews) => [...prevPreviews, fallbackPreview]);
      setLink('');
    }
  }

  const deletePreview = (indexToDelete: number) => {
    setLinkPreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToDelete));
  }

  const handleReorder = (newOrder: LinkPreview[]) => {
    setLinkPreviews(newOrder);
  };

  const submitCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (linkPreviews.length === 0) {
      setError('Please add at least one link to your collection.');
      return;
    }
    setError(null);

    const url = collection ? `/api/collections/${collection.id}` : '/api/collections';
    const method = collection ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          linkPreviews
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${collection ? 'update' : 'create'} collection. Status: ${response.status}`);
      }
      
      const result: CollectionResult = await response.json();
      setCurrentCollection(null);
      setIsCreating(false);
      setIsEditing(false);
      router.push(`/collections/${result.id}`);
      router.refresh();
    } catch (error) {
      console.error(`Error ${collection ? 'updating' : 'submitting'} collection:`, error);
      setError(`Failed to ${collection ? 'update' : 'create'} collection. Please try again.`);
    }
  };

  const handleCancel = () => {
    setCurrentCollection(null);
    setIsCreating(false);
    setIsEditing(false);
    router.push('/collections');
  };

  return (
    <form onSubmit={submitCollection} className="flex flex-col min-w-[500px] max-w-[700px]">
      <input 
        type="text" 
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-3xl font-bold bg-slate-50 rounded-lg w-full focus:outline-none py-3 pl-0 mb-2"
        autoFocus
        required
      />
      {linkPreviews.length > 0 && (
        <div className="mb-4 -ml-8"> 
          <DndLinkPreviewList 
            linkPreviews={linkPreviews} 
            onReorder={handleReorder}
            onDelete={deletePreview} 
          />
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex gap-3 mb-4">
        <input 
          type="url" 
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded-lg flex-grow"
        />
        <button 
          type="button"
          className="bg-slate-500 hover:bg-slate-700 text-white font-medium py-2 px-5 rounded-lg"
          onClick={fetchPreview}
        >
          Add
        </button>
      </div>
      <div className="flex gap-3 mt-2">
        <button 
          type="submit"
          className="bg-slate-500 hover:bg-slate-700 text-white font-medium py-2 px-5 rounded-lg"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-slate-300 hover:bg-slate-500 font-medium py-2 px-5 rounded-lg"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

