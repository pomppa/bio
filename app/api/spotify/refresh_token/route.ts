import { NextResponse } from "next/server";
import { getKeys, postKeys } from "../functions";

export const revalidate = 60;

export async function GET(request: Request) {

  const keys = await getKeys();
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append("refresh_token", keys?.spotifyRefreshToken as string);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ refreshed: "failed", error: res.status });
  }

  const json = await res.json();

  await postKeys({
    spotifyAccessToken: json.access_token,
    spotifyRefreshToken: keys?.spotifyRefreshToken,
  });

  return NextResponse.json({ refreshed: "ok" });
}
