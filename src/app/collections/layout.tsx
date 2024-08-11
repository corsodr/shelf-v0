import CollectionList from "@/app/components/CollectionList";
import { SignOut } from "@/app/components/SignOut";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Shelf</h3>
        <div className="flex items-center space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Create collection
          </button>
          <SignOut />
        </div>
      </header>        
      <CollectionList />
      <div className="flex-grow p-6">
        {children}
      </div>
    </div>
  );
}