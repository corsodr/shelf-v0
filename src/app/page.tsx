import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignIn } from "@/app/components/SignIn";

// use layout? 
// call this home or something else? 
export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/collections");
  }

  // review styles 
  return (
    <div className="flex flex-col min-h-screen">

      <header className="container mx-auto px-4 py-4 flex items-center">
          <h3 className="text-xl font-bold">Shelf</h3>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {/* change anything to carousel */}
        <h1 className="text-4xl font-bold mb-8 text-center">
          Collect anything with Shelf
        </h1>
        <SignIn />
      </main>

      {/* should footer always be visible? */}
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          &copy; 2024 Shelf. All rights reserved.
        </div>
      </footer>
    </div>
  );
}