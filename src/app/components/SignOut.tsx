import { signOut, auth } from "@/auth";

// clicking on button should open modal with sign out button 

export async function SignOut() {
  // is this the right way to get the session? 
  const session = await auth();
  // review this 
  const userInitial = session?.user?.name ? session.user.name[0].toUpperCase() : '';
  
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign out</button>
    </form>
  );
}