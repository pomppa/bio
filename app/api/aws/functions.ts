import { SpotifyTokensForAWS, SpotifyTokensFromAWS } from "../../../lib/types";
import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export async function getSpotifyTokens() {
  const { Item } = await client.send(
    new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        bioPartitionKey: { S: "1" },
      },
    })
  );

  // workaround for dynamodb types, i guess they would work but this at least works
  const data: SpotifyTokensFromAWS = {
    bioPartitionKey: {
      S: "1",
    },
    SPOTIFY_ACCESS_TOKEN: {
      S: Item?.SPOTIFY_ACCESS_TOKEN.S ?? "",
    },

    SPOTIFY_REFRESH_TOKEN: {
      S: Item?.SPOTIFY_REFRESH_TOKEN.S ?? "",
    },
  };

  return data;
}

export async function setSpotifyTokens(body: SpotifyTokensForAWS) {
  await client.send(
    new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        bioPartitionKey: { S: "1" },
      },
      UpdateExpression:
        "set SPOTIFY_REFRESH_TOKEN = :rt, SPOTIFY_ACCESS_TOKEN = :at",
      ExpressionAttributeValues: {
        ":rt": { S: body.spotifyRefreshToken },
        ":at": { S: body.spotifyAccessToken },
      },
      ReturnValues: "ALL_NEW",
    })
  );

  // workaround for dynamodb types, i guess they would work but this at least works
  const data: SpotifyTokensFromAWS = {
    bioPartitionKey: {
      S: "1",
    },
    SPOTIFY_ACCESS_TOKEN: {
      S: body.spotifyAccessToken,
    },

    SPOTIFY_REFRESH_TOKEN: {
      S: body.spotifyRefreshToken,
    },
  };

  return data;
}
