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

  useEffect(() => {
    const fetchCollection = () => {
      const collection = collections.find(c => c.id.toString() === id);
      if (collection) {
        setCurrentCollection(collection);
      } else {
        // Redirect to the main collections page if the collection is not found
        router.push('/collections');
      }
    };

    fetchCollection();
  }, [id, collections, setCurrentCollection, router]);

  useEffect(() => {
    // This effect will run when collections change
    console.log('Collections updated in CollectionPage:', collections);
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