'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCollections } from '@/app/contexts/CollectionsContext';
import CollectionView from '@/app/components/CollectionView';
import CollectionForm from '@/app/components/CollectionForm';

export default function CollectionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { collections, currentCollection, setCurrentCollection, isEditing } = useCollections();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = () => {
      const collection = collections.find(c => c.id.toString() === id);
      if (collection) {
        setCurrentCollection(collection);
        setIsLoading(false);
      } else if (collections.length > 0) {
        router.push(`/collections/${collections[0].id}`);
      } else {
        router.push('/collections');
      }
    };

    fetchCollection();
  }, [id, collections, setCurrentCollection, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isEditing) {
    return <CollectionForm currentCollection={currentCollection} />;
  }

  return currentCollection ? <CollectionView collection={currentCollection} /> : null;
}