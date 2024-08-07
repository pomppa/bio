import { NextResponse, NextRequest } from "next/server";
import { postKeys } from "../functions";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", code as string);
  urlencoded.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI as string);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: urlencoded, // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ callback: "failed" });
  }

  const json = await res.json();

  await postKeys({
    spotifyAccessToken: json.access_token,
    spotifyRefreshToken: json.refresh_token,
  });

  return NextResponse.json({ callback: "ok" });
}
