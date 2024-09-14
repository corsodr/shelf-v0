import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignIn } from "@/app/components/SignIn";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-6">
        <img 
          src="/images/s-logo.svg" alt="Shelf Logo" 
          className="h-10"
        />
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-start items-center mt-16">
        <h1 className="text-6xl font-semibold mb-10 text-center">
          Collect anything
          <br />
          with Shelf 
        </h1>
        <SignIn />
      </main>

      <footer className="bg-gray-100 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          &copy; 2024 Shelf. All rights reserved.
        </div>
      </footer>
    </div>
  );
}