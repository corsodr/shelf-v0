import Link from 'next/link';
import { getCollections } from '@/app/lib/collections';

export default async function CollectionList() {
  const collections = await getCollections();

  return (
    <nav className="w-64 mr-8">
      <ul>
        {collections.map(collection => (
          <li key={collection.id}>
            <Link href={`/collections/${collection.id}`} className="text-blue-500 hover:underline">
              {collection.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}