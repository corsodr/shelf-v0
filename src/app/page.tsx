import { signIn } from "@/auth"

export default function Home() {
  return (
    <main>
      <h1 className="text-lg">Yo</h1>
      <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
      
    </main>
  );
}
