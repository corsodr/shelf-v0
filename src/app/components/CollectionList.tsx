import Link from 'next/link';
import { getCollections } from '@/app/lib/collections';

export default async function CollectionList() {
  const collections = await getCollections();

  return (
    <nav className="w-80 border-r border-slate-300 overflow-y-auto">
      <div className="flex flex-col mt-4">
        <div className="mb-4 px-4">
          <Link 
            href="/collections/new" 
            className="bg-slate-500 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded block text-center"
          >
            Create
          </Link>
        </div>
        <ul>
          {collections.map(collection => (
            <li key={collection.id}>
              <Link 
                href={`/collections/${collection.id}`} 
                className="block py-2 px-2 hover:bg-slate-200 transition-colors duration-150 rounded-lg mx-2"
              >
                <h3 className="font-bold">{collection.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}