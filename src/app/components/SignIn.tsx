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
        className="flex items-center justify-center text-[16px] px-5 py-3 text-sm font-medium bg-white border border-slate-300 rounded-lg"
      >
        <img src="/images/google-icon.svg" alt="" className="mr-3 h-5" />
        Continue with Google
      </button>
    </form>
  );
}

