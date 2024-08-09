import { signIn } from "@/auth";

// review how server actions works and why use them here
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/collections" })
      }}
    >
      {/* improve button styling - look at Claude homepage  */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Continue with Google
      </button>
    </form>
  );
}