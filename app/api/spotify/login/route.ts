export async function GET(request: Request) {
  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.SPOTIFY_CLIENT_ID);
  urlencoded.append("response_type", "code");
  urlencoded.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI);
  urlencoded.append("scope", "user-read-private user-read-email user-top-read");

  return Response.redirect(
    "https://accounts.spotify.com/authorize?" + urlencoded
  );
}
