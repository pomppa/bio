"use client";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export function SignIn() {
  return <button onClick={() => signIn("github")}>Sign in</button>;
}
