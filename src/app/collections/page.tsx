'use client'

import { useState, useEffect } from 'react';
import { useCollectionsContext } from '@/app/context/CollectionsContext';
import CollectionForm from '@/components/CollectionForm';
import CollectionView from '@/components/CollectionView';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from "@/auth";

// where to wrap provider? 
export default async function CollectionsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  const { collections, fetchCollections, currentCollection, fetchCollection } = useCollectionsContext();
  
  // one thing at a time 

  useEffect(() => {
    fetchCollections();
  }, []);


  if (collections.length === 0) {
    return (
      <h1 className='text-xl font-bold'>Create your first collection.</h1>
    )
  } else {
    // review this path 
    redirect(`/collections/${collections[0].id}`);
  }
}