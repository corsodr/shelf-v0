// review this code - understand how it works 
import { createContext, useState, useContext } from 'react';
import { DBCollection } from '@/app/types/types';

// review this typing 
type CollectionsContextType = {
  collections: DBCollection[];
  setCollections: React.Dispatch<React.SetStateAction<DBCollection[]>>;
  currentCollection: DBCollection | null;
  setCurrentCollection: React.Dispatch<React.SetStateAction<DBCollection | null>>;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export const CollectionsProvider: React.FC<{ children: React.ReactNode, initialCollections: DBCollection[] }> = ({ children, initialCollections }) => {
  const [collections, setCollections] = useState<DBCollection[]>(initialCollections);
  const [currentCollection, setCurrentCollection] = useState<DBCollection | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <CollectionsContext.Provider value={{ 
      collections, 
      setCollections, 
      currentCollection, 
      setCurrentCollection,
      isCreating,
      setIsCreating,
      isEditing,
      setIsEditing
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