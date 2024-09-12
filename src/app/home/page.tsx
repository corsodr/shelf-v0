'use client'

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useCollections } from '@/app/contexts/CollectionsContext';
import CollectionView from '@/app/components/CollectionView';
import CollectionForm from '@/app/components/CollectionForm';

export default function HomePage() {
  const { data: session, status } = useSession();

  // check this 
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/');
    }
  }, [status]);

  const { collections, currentCollection, isCreating, isEditing } = useCollections();

  if (collections.length === 0) {
    return <div>Create your first colleciton</div>;
  }

  if (collections.length) {
    return <CollectionView collection={collections[0]} />;
  }

  if (isCreating) {
    return <CollectionForm />;
  }

  // why is the currentCollection check necessary 
  if (currentCollection && isEditing) {
    return <CollectionForm currentCollection={currentCollection} />;
  }

}



