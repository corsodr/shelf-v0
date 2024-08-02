'use client'
import { use, useState } from "react";

// reference youtube-previews 

// get preview data
// preview component 
// preview list component 
// collection component 
// collection list component 
// api / stage management 

// use form? 
// componentize
export function CollectionForm() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [preview, setPreview] = useState(null); 

  const addLink = () => {
    // get link preview data 
    // check var name 
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
      {/* why does using flex here increase the button height? */}
      <div className="flex gap-4">
        <input 
          type="url" 
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          // why is w-full necessary?
          className="border border-gray-400 p-2 rounded-lg w-full"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={addLink}
        >
          Add
        </button>
      </div>
    </div>
  );
}