import { NextResponse } from "next/server";
import { getKeys, postKeys } from "../functions";

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
  if (res.ok) {
    const json = await res.json();
    await postKeys({
      spotifyAccessToken: json.access_token,
      spotifyRefreshToken: keys?.spotifyRefreshToken,
    });
    return NextResponse.json({ refreshed: "ok", token: json.access_token });
  }
  //todo maybe wise to check why it failed in the first place
  return NextResponse.json({ refreshed: "failed", error: res.status });
}
