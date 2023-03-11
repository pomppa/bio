import { NextResponse } from "next/server"; // for ts, Response valid too
export async function GET(request: Request) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const auth = Buffer.from(client_id + ":" + client_secret).toString("base64");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: urlencoded, // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + auth,
    },
  });
  const json = await res.json();
  process.env.SPOTIFY_ACCESS_TOKEN = json.access_token;
  return NextResponse.json({ data: "ok" });
}
