export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  total: number;
}

export interface Item {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color?: any;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface PlaylistRootObject {
  href: string;
  items: Item[];
  limit: number;
  next?: any;
  offset: number;
  previous?: any;
  total: number;
}

export interface SpotifyTokensForAWS {
  spotifyRefreshToken: string;
  spotifyAccessToken: string;
}

export interface BioPartitionKey {
  S: string;
}

export interface SPOTIFYREFRESHTOKEN {
  S: string;
}

export interface SPOTIFYACCESSTOKEN {
  S: string;
}

export interface SpotifyTokensFromAWS {
  bioPartitionKey: BioPartitionKey;
  SPOTIFY_REFRESH_TOKEN: SPOTIFYREFRESHTOKEN;
  SPOTIFY_ACCESS_TOKEN: SPOTIFYACCESSTOKEN;
}
