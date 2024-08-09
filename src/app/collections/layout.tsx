import CollectionList from "@/app/components/CollectionList";

// add header and footer here
// should I call CollectionList Sidebar?
export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <CollectionList />
      <div className="flex-grow p-6">
        {children}
      </div>
    </div>
  );
}