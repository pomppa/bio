import { TopTracksRootObject } from "../../../lib/topTrackTypes";
import { getKeys } from "../../api/spotify/functions";

async function getData() {
  const keys = await getKeys();

  const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: "Bearer " + keys?.spotifyAccessToken,
    },
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json;
}
export default async function Page() {
  const data: TopTracksRootObject = await getData();

  if (!data) {
    return <>Error</>;
  }

  return (
    <>
      <h1>spotify top tracks</h1>
      <ul>
        {data.items.map((x) => {
          return (
            <li key={x.id}>
              <a href={x.external_urls.spotify} target="_blank">
                {x.name + " - " + x.artists[0].name}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
