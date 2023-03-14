import { PlaylistRootObject } from "../../lib/types";
import { getKeys } from "../api/spotify/functions";

async function getData() {
  const keys = await getKeys();

  const res = await fetch(
    `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`,
    {
      headers: {
        Authorization: "Bearer " + keys?.spotifyAccessToken,
      },
    }
  );

  if (!res.ok) return null;

  const json: PlaylistRootObject = await res.json();
  return json;
}

export default async function Page() {
  const data = await getData();

  if (!data) {
    return <>Error</>;
  }

  return (
    <>
      <h1>spotify</h1>

      {data.items.map((x) => {
        return (
          <>
            <ul>
              <li key={x.id}>
                <a href={x.external_urls.spotify}>{x.external_urls.spotify}</a>
              </li>
            </ul>
          </>
        );
      })}
    </>
  );
}
