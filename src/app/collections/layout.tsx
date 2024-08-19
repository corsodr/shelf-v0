import CollectionList from "@/app/components/CollectionList";
import { SignOut } from "@/app/components/SignOut";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-300 px-4 py-4 flex items-center justify-between">
        <img 
          src="/images/s-logo.svg" alt="Shelf Logo" 
          className="h-10"
        />
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