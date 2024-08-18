import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/collections" })
      }}
    >
       <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="mr-2 text-lg font-bold text-blue-500">G</span>
        Continue with Google
      </button>
    </form>
  );
}

