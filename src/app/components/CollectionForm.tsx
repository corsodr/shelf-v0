'use client'
import { useState } from "react";
import PreviewList from '@/app/components/PreviewList';
import { ApiPreview } from '@/app/types/types';

// fix collection title cut off 
// add skeleton loader for previews 
// add dev + user error handling 
export default function CollectionForm() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  // fix this 
  const [previews, setPreviews] = useState<ApiPreview>([]); 


  // should I type API response? 
  const fetchPreview = async () => {
    try {
      const response = await fetch('https://link-preview-api-v1.vercel.app/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: link})
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      const data = await response.json();
      // fix this
      setPreviews((prevPreviews) => [...prevPreviews, data]);
      setLink('');
    } catch (error) {
      console.error('Error fetching preview', error);
    }
  }

  const submitCollection = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // links, previews, link_previews? compare to API and db 
        body: JSON.stringify({
          title,
          previews
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      
      // keep this? 
      const result = await response.json();
      setTitle('');
      setPreviews([]);
    } catch (error) {
      console.error('Error submitting collection:', error);
    }
  };
  
  return (
    <form onSubmit={submitCollection} className="flex flex-col w-[600px]">
      <input 
        type="text" 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-4xl font-bold focus:outline-none placeholder-gray-300 mb-4"
        autoFocus
        required
      />
      {previews && <PreviewList previews={previews} />} 
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
      <button 
        type="submit"
        className="bg-blue-500 text-white px-5 py-3 rounded-lg self-start"
      >
        Save
      </button>
    </form>
  );
}