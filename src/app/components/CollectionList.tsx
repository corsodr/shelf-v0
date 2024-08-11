import Link from 'next/link';
import { getCollections } from '@/app/lib/collections';

export default async function CollectionList() {
  const collections = await getCollections();

  return (
    <nav className="w-64 border-r h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Collections</h2>
        <ul className="space-y-2">
          {collections.map(collection => (
            <li key={collection.id}>
              <Link 
                href={`/collections/${collection.id}`} 
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-150"
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}