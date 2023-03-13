"use client";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export function SignIn() {
  /*
   we could maybe something like
   callbackUrl: `${process.env.NEXT_PUBLIC}/api/spotify/login`
   */
  return <button onClick={() => signIn("github")}>Sign in</button>;
}
