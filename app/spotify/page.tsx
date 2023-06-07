import { PlaylistRootObject } from "../../types/types";
import { getKeys } from "../api/spotify/functions";

async function getData() {
  const keys = await getKeys();

  const res = await fetch(
    "https://api.spotify.com/v1/users/relevant/playlist",
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
      <h1>spotify playlists</h1>

      {data.items.map((x) => {
        return (
          <>
            <ul>
              <li key={x.id}>
                <a href={x.external_urls.spotify}>{x.name}</a>
              </li>
            </ul>
          </>
        );
      })}
    </>
  );
}
