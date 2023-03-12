import { SignIn, SignOut } from "./actions";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession();

  return (
    <>
      <h1>admin authentication</h1>
      {session?.user ? (
        <>
          <h3>session user found</h3>
          <SignOut></SignOut>
        </>
      ) : (
        <>
          <h3>no session</h3>
          <SignIn></SignIn>
        </>
      )}
    </>
  );
}
