import { NextResponse, NextRequest } from "next/server";

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

  if (res.ok) {
    const json = await res.json();
    process.env.SPOTIFY_ACCESS_TOKEN = json.access_token;
    process.env.SPOTIFY_REFRESH_TOKEN = json.refresh_token;
    return NextResponse.json({ callback: "ok" });
  }

  return NextResponse.json({ callback: "failed" });
}
