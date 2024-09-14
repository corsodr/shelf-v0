'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCollections } from '@/app/contexts/CollectionsContext';
import CollectionView from '@/app/components/CollectionView';
import CollectionForm from '@/app/components/CollectionForm';

export default function CollectionPage() {
  const { id } = useParams();
  const { collections, currentCollection, setCurrentCollection, isEditing } = useCollections();

  useEffect(() => {
    const collection = collections.find(c => c.id.toString() === id);
    if (collection) {
      setCurrentCollection(collection);
    }
  }, [id, collections, setCurrentCollection]);

  if (!currentCollection) {
    return <div>Loading...</div>;
  }

  if (isEditing) {
    return <CollectionForm currentCollection={currentCollection} />;
  }

  return <CollectionView collection={currentCollection} />;
}