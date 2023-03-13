import { NextResponse } from "next/server";
import { getSpotifyTokens, setSpotifyTokens } from "../../aws/functions";
import {
  SpotifyTokensForAWS,
  SpotifyTokensFromAWS,
} from "../../../../lib/types";

export async function GET(request: Request) {
  const keys: SpotifyTokensFromAWS = await getSpotifyTokens();
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append("refresh_token", keys.SPOTIFY_REFRESH_TOKEN.S);

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
    const tokensToUpdate: SpotifyTokensForAWS = {
      spotifyAccessToken: json.access_token,
      spotifyRefreshToken: keys.SPOTIFY_REFRESH_TOKEN.S,
    };
    await setSpotifyTokens(tokensToUpdate);
    return NextResponse.json({ refreshed: "ok" });
  }
  //todo maybe wise to check why it failed in the first place
  return NextResponse.json({ refreshed: "failed" });
}
