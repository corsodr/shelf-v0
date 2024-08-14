'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import LinkPreviewList from '@/app/components/LinkPreviewList';
import { ApiPreview } from '@/app/types/types';

export default function CollectionForm() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [linkPreviews, setLinkPreviews] = useState<ApiPreview[]>([]); 
  // review typing + setting error to null + error handling 
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  // is this how I should cancel? 
  const handleCancel = () => {
    router.push('/collections');
  };
  

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

      const data: ApiPreview = await response.json();
      setLinkPreviews((prevPreviews) => [...prevPreviews, data]);
      setLink('');
    } catch (error) {
      console.error('Error fetching preview', error);
      setError('Unable to create link preview. Please try again.');
    }
  }

  const submitCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (linkPreviews.length === 0) {
      setError('Please add at least one link to your collection.');
      return;
    }
    setError(null);

    try {
      console.log('linkPreviews', linkPreviews);
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          linkPreviews
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create collection. Status: ${response.status}`);
      }
      
      const result = await response.json();
      // review this - how does colletion list update? 
      router.push(`/collections/${result.id}`);
      router.refresh(); 
    } catch (error) {
      console.error('Error submitting collection:', error);
      setError('Failed to create collection. Please try again.');
    }
  };
  
  return (
    <form onSubmit={submitCollection} className="flex flex-col w-[500px]">
      <input 
        type="text" 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-4xl font-bold focus:outline-none placeholder-gray-300 mb-4"
        autoFocus
        required
      />
      {linkPreviews.length > 0 && <LinkPreviewList linkPreviews={linkPreviews} />} 
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex gap-3 mb-4">
        <input 
          type="url" 
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg w-full"
        />
        <button 
          type="button"
          className="bg-blue-500 text-white px-5 py-3 rounded-lg"
          onClick={fetchPreview}
        >
          Add
        </button>
      </div>
      <div className="flex gap-5">
        <button 
          type="submit"
          className="bg-blue-500 text-white px-5 py-3 rounded-lg self-start"
        >
          Save
        </button>
        <button
            className="bg-gray-300 text-gray-700 px-5 py-3 rounded-lg self-start"
            onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}