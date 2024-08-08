import Link from 'next/link';
import { getCollections } from '@/lib/collections';

export default async function CollectionList() {
  const collections = await getCollections();

  return (
    <nav className="w-64 mr-8">
      <ul>
        {collections.map(collection => (
          <li key={collection.id}>
            <Link href={`/dashboard/collections/${collection.id}`} className="text-blue-500 hover:underline">
              {collection.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/dashboard/collections/new" className="text-blue-500 hover:underline">
        Create New Collection
      </Link>
    </nav>
  );
}