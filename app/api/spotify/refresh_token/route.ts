import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append(
    "refresh_token",
    process.env.SPOTIFY_REFRESH_TOKEN as string
  );

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

  const json = await res.json();
  process.env.SPOTIFY_ACCESS_TOKEN = json.access_token;
  console.log("refreshed token, if there was something to refresh");
  return NextResponse.json({ refreshed: "ok" });
}
