import { NextRequest, NextResponse } from "next/server";
import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { SpotifyTokensForAWS } from "../../../lib/types";

const client = new DynamoDBClient({});

export async function GET(request: NextRequest) {
  const { Item } = await client.send(
    new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        bioPartitionKey: { S: "1" },
      },
    })
  );
  return NextResponse.json(Item);
}

export async function POST(request: NextRequest) {
  const body: SpotifyTokensForAWS = await request.json();

  const { Attributes } = await client.send(
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

  return NextResponse.json(Attributes);
}
