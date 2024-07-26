import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignIn } from "@/app/components/SignIn";

// review code - compare to docs / best practices - keep it simple 
export default async function LandingPage() {
  const session = await auth();

  // If the user is already signed in, redirect to the dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

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
          <div>
            <p>Sign in to start using [Your App Name]</p>
            <SignIn />
          </div>
        </section>
      </main>

      <footer className="py-6">
        <p>&copy; 2024 [Your App Name]. All rights reserved.</p>
      </footer>
    </div>
  );
}