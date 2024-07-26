import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" })
      }}
    >
      <p>You are not logged in</p>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}