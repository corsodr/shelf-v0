import CollectionList from "@/app/components/CollectionList";
import Header from "@/app/components/Header";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <CollectionList />
        <main className="px-8 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}