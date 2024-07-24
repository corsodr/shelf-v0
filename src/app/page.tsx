import { auth } from "@/auth";
import { SignIn } from "@/app/components/SignIn";
import { SignOut } from "@/app/components/SignOut";

export default async function Page() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    <section>
      <h1>Home</h1>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
    </section>
  );
}