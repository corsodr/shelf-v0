'use client'

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useCollections } from '@/app/contexts/CollectionsContext';
import CollectionView from '@/app/components/CollectionView';
import CollectionForm from '@/app/components/CollectionForm';

export default function HomePage() {
  const { data: session, status } = useSession();
 
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/');
    }
  }, [status]);

  const { collections, currentCollection, isCreating, isEditing } = useCollections();

  if (collections.length === 0) {
    return <h1>Create your first collection</h1>;
  }

  if (collections.length && !currentCollection) {
    return <CollectionView collection={collections[0]} />;
  }

  if (isCreating || (currentCollection && isEditing)) {
    return <CollectionForm currentCollection={currentCollection} />;
  }
  
}



