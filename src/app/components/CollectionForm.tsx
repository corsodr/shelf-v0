'use client'
import { use, useState } from "react";
import LinkPreviewList from '@/app/components/LinkPreviewList';

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
      setPreviews((prevPreviews) => [...prevPreviews, data]);
      setLink('');
    } catch (error) {
      console.error('Error fetching preview', error);
    }
  }
    
  return (
    <div className="flex flex-col w-80 gap-4">
      <input 
        type="text" 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-400 p-2 rounded-lg"
      />
      <div className="flex gap-4">
        <input 
          type="url" 
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={fetchPreview}
        >
          Add
        </button>
      </div>
      <LinkPreviewList previews={previews} /> 
    </div>
  );
}