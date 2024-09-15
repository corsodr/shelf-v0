'use client'

// review this code - understand how it works 
import { createContext, useState, useContext } from 'react';
import { DBCollection } from '@/app/types/types';

type CollectionsContextType = {
  collections: DBCollection[];
  setCollections: React.Dispatch<React.SetStateAction<DBCollection[]>>;
  currentCollection: DBCollection | null;
  setCurrentCollection: React.Dispatch<React.SetStateAction<DBCollection | null>>;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  addCollection: (newCollection: DBCollection) => void;
  deleteCollection: (id: number) => Promise<void>;
};

// why use undefined? 
const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export const CollectionsProvider: React.FC<{ children: React.ReactNode, initialCollections: DBCollection[] }> = ({ children, initialCollections }) => {
  const [collections, setCollections] = useState<DBCollection[]>(initialCollections);
  const [currentCollection, setCurrentCollection] = useState<DBCollection | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const addCollection = (newCollection: DBCollection) => {
    setCollections(prevCollections => [...prevCollections, newCollection]);
    setCurrentCollection(newCollection);
    setIsCreating(false);
  };

  const deleteCollection = async (id: number) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCollections(prevCollections => {
          console.log('Updating collections state');
          return prevCollections.filter(c => c.id !== id);
        });
      } else {
        throw new Error('Failed to delete collection');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw error;
    }
  };

  return (
    <CollectionsContext.Provider value={{ 
      collections, 
      setCollections, 
      currentCollection, 
      setCurrentCollection,
      isCreating,
      setIsCreating,
      isEditing,
      setIsEditing,
      addCollection,
      deleteCollection
    }}>
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (context === undefined) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
};