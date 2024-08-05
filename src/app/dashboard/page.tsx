import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignOut } from "@/app/components/SignOut";
import CollectionForm from "@/app/components/CollectionForm";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Shelf</h3>
        <nav>
          <SignOut /> 
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-4">
        <section className="my-8">
          <CollectionForm /> 
        </section>
      </main>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          &copy; 2024 Shelf. All rights reserved.
        </div>
      </footer>
    </div>
  );
}