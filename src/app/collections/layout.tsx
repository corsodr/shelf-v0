import CollectionList from "@/app/components/CollectionList";
import UserAvatar from "@/app/components/UserAvatar";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-300 px-6 py-4 flex items-center justify-between">
        <img 
          src="/images/s-logo.svg" alt="Shelf Logo" 
          className="h-10"
        />
        <UserAvatar />
      </header>
      <div className="flex flex-1">
        <CollectionList />
        <main className="px-10 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}