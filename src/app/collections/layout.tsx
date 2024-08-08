import CollectionList from "@/app/components/CollectionList";

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