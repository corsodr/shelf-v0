// review context 
// make this and collections list client components
// think through how they should work 

import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import { useCollections } from '@/app/contexts/CollectionsContext';
import CollectionView from '@/app/components/CollectionView';
import CollectionForm from '@/app/components/CollectionForm';

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

// if no collections display message
// if collections, display first collection 
// if click create, display collection form 
// if click edit, display collection form with collection data 

  return (
    <div>hello</div>
  )

}



