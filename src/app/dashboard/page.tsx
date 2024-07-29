import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOut } from "@/app/components/SignOut";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4">
      <header className="py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <nav>
          <Link href="/" className="text-blue-500 hover:underline mr-4">
            Home
          </Link>
          <SignOut>Sign out</SignOut>
        </nav>
      </header>

      <main>
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {session.user.name}!</h2>
          <p>This is your personal dashboard.</p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
          <p>Here you can display user-specific information or actions.</p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            New Action
          </button>
        </section>
      </main>

      <footer className="py-6">
        <p>&copy; 2024 [Your App Name]. All rights reserved.</p>
      </footer>
    </div>
  );
}