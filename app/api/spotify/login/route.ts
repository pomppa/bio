import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({
      data: "unauthorized",
    });
  }

  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.SPOTIFY_CLIENT_ID as string);
  urlencoded.append("response_type", "code");
  urlencoded.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI as string);
  urlencoded.append("scope", "user-read-private user-read-email user-top-read");

  return Response.redirect(
    "https://accounts.spotify.com/authorize?" + urlencoded
  );
}
