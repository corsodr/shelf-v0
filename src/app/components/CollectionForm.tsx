'use client'
import { useState } from "react";
import LinkPreviewList from '@/app/components/LinkPreviewList';

// form size 
// style title

// loading state 
// error handling 
export default function CollectionForm() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [previews, setPreviews] = useState([]); 

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
    <form onSubmit={submitCollection} className="flex flex-col w-[800px] gap-2">
      <input 
        type="text" 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded-lg text-3xl font-bold focus:outline-none placeholder-gray-300"
        autoFocus
        required
      />
      {previews && <LinkPreviewList previews={previews} />} 
      <div className="flex gap-4">
        <input 
          type="url" 
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
        <button 
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={fetchPreview}
        >
          Add
        </button>
      </div>
      <button 
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Save
      </button>
    </form>
  );
}