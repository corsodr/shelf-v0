import CollectionList from "@/app/components/CollectionList";
import { SignOut } from "@/app/components/SignOut";
import Link from 'next/link';

// make header a component 
export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="container border-b mx-auto px-4 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Shelf</h3>
          <div className="flex items-center space-x-4">
            <Link href="/collections/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Create New Collection
            </Link>
            <SignOut />
          </div>
        </div>
      </header>
      <CollectionList />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}