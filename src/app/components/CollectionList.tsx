'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CollectionList({ onSelectCollection }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Fetch collections from your API
    // Update the collections state
  }, []);

  return (
    <nav className="w-64 mr-8">
      <ul>
        {collections.map(collection => (
          <li key={collection.id}>
            <button 
              onClick={() => onSelectCollection(collection.id)}
              className="text-blue-500 hover:underline"
            >
              {collection.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}