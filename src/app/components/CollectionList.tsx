import Link from 'next/link';
import { getCollections } from '@/app/lib/collections';

export default async function CollectionList() {
  const collections = await getCollections();

  return (
    <nav className="w-80 border-r overflow-y-auto">
      <div className="p-4">
        <ul className="space-y-2">
          {collections.map(collection => (
            <li key={collection.id}>
              <Link 
                href={`/collections/${collection.id}`} 
                className="block px-4 py-6 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-150 border border-gray-200"
              >
                <h3 className="font-medium">{collection.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}