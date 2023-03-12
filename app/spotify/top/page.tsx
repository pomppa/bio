import { TopTracksRootObject } from "../../../lib/topTrackTypes";
export async function getData() {
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: "Bearer " + process.env.SPOTIFY_ACCESS_TOKEN,
    },
  });
  const json = await res.json();
  return json;
}
export default async function Page() {
  const data: TopTracksRootObject = await getData();
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
