'use client'

// confirn link only works for server components
// check if I should use Next router here

import Link from 'next/link';
import { useCollections } from '@/app/contexts/CollectionsContext';
import { useRouter } from 'next/navigation';

export default function CollectionList() {
  const { collections, setCurrentCollection, setIsCreating, setIsEditing } = useCollections();
  const router = useRouter();

  const handleCreateClick = () => {
    setIsCreating(true);
    setIsEditing(false);
    setCurrentCollection(null);
    router.push('/collections');
  };

  return (
    <nav className="w-64 border-r border-slate-300 overflow-y-auto">
      <div className="flex flex-col mt-4">
        <div className="mb-4 pl-6">
          <button 
            onClick={handleCreateClick}
            className="bg-slate-500 hover:bg-slate-700 text-white font-medium py-2 px-5 rounded-lg inline-block"
          >
            Create
          </button>
        </div>
        <ul>
          {collections.map(collection => (
            <li key={collection.id}>
              <Link 
                href={`/collections/${collection.id}`}
                className="block w-full text-left py-2 px-3 hover:bg-slate-200 transition-colors duration-150 rounded-lg mx-3"
              >
                <h3 className="font-semibold">{collection.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}