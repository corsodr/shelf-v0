'use client'

import { useState } from 'react';
import CollectionEditor from "@/app/components/CollectionEditor";
import Collection from "@/app/components/Collection";

export default function CollectionManager() {
  // isEditing or activeCollection? 
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  const handleCreateNew = () => {
    setIsEditing(true);
    setSelectedCollectionId(null);
  };

  const handleCollectionCreated = (newCollectionId) => {
    setIsEditing(false);
    setSelectedCollectionId(newCollectionId);
  };

  const handleCollectionSelect = (collectionId) => {
    setIsEditing(false);
    setSelectedCollectionId(collectionId);
  };

  return (
    <div className="flex-grow">
      <button onClick={handleCreateNew} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Create New Collection
      </button>
      {/* display CollectionEditor if there are not collections */}
      {isEditing ? (
        <CollectionEditor onCollectionCreated={handleCollectionCreated} />
      ) : selectedCollectionId ? (
        <Collection collectionId={selectedCollectionId} />
      ) : (
        <p>Select a collection or create a new one</p>
      )}
    </div>
  );
}