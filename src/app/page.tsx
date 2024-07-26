import { auth } from "@/auth";
import Link from "next/link";
import { SignIn } from "@/app/components/SignIn";
import { SignOut } from "@/app/components/SignOut";

// review code 
// layout 
// typescript it baby 
// why async 
// review auth approach 
export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="container mx-auto px-4">
      <header className="py-6">
        <h1 className="text-3xl font-bold">Welcome to [Your App Name]</h1>
      </header>

      <main>
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">About Our App</h2>
          <p>
            [Brief description of your app and its main features]
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          {session ? (
            <div>
              <p>Welcome back, {session.user.name}!</p>
              <Link href="/dashboard" className="text-blue-500 hover:underline">
                Go to Dashboard
              </Link>
              <SignOut>Sign out</SignOut>
            </div>
          ) : (
            <div>
              <p>Sign in to start using [Your App Name]</p>
              <SignIn />
            </div>
          )}
        </section>
      </main>

      <footer className="py-6">
        <p>&copy; 2024 [Your App Name]. All rights reserved.</p>
      </footer>
    </div>
  );
}