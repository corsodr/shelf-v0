// use Next image? 
// color palette
// rotate anything 

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignIn } from "@/app/components/SignIn";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/collections");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-6">
        <div className="flex gap-3">
          <img 
            src="/images/shelf-logo.svg" alt="Shelf Logo" 
            className="h-8"
          />
          <h3 className="text-2xl font-bold">Shelf</h3>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Collect anything with Shelf
        </h1>
        <SignIn />

        <div className="mt-12 mb-12">
          {/* shelf collection image */}
        </div>

        <section className="w-full max-w-2xl mt-12">
          <h2 className="text-2xl font-bold mb-4">Vision</h2>
          <p className="mb-8">
            Collections are amazing: 
            {/* images of collections: playlist, library, museum, blog, newsletter, stamps */}
          </p>
          <p className="mb-8">
            Shelf aims to be the best tool for creating and sharing collections online. 
          </p>

          {/* style this as a list */}
          <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
          <ul className="mb-8">
           <li>First</li>
           <li>Second</li>
           <li>Third</li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          &copy; 2024 Shelf. All rights reserved.
        </div>
      </footer>
    </div>
  );
}