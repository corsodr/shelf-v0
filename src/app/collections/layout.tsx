import CollectionList from "@/app/components/CollectionList";
import { SignOut } from "@/app/components/SignOut";
import Link from 'next/link';

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 py-4 flex items-center justify-between">
        <Link href="/collections/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Create
        </Link>
        <SignOut />
      </header>
      <div className="flex flex-1">
        <CollectionList />
        <main className="px-8 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}