'use client'

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCollections } from '@/app/contexts/CollectionsContext';
import CollectionView from '@/app/components/CollectionView';
import CollectionForm from '@/app/components/CollectionForm';

export default function CollectionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { collections, currentCollection, setCurrentCollection, isEditing } = useCollections();

  useEffect(() => {
    const fetchCollection = () => {
      const collection = collections.find(c => c.id.toString() === id);
      if (collection) {
        setCurrentCollection(collection);
      } else {
        router.push('/collections');
      }
    };

    fetchCollection();
  }, [id, collections, setCurrentCollection, router]);

  useEffect(() => {
    if (collections.length === 0) {
      router.push('/collections');
    } else if (!collections.some(c => c.id.toString() === id)) {
      const nextCollection = collections[0];
      router.push(`/collections/${nextCollection.id}`);
    }
  }, [collections, id, router]);

  if (isEditing) {
    return <CollectionForm currentCollection={currentCollection} />;
  }

  return currentCollection ? <CollectionView collection={currentCollection} /> : null;
}