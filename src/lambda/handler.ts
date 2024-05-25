import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { verifyKey } from "discord-interactions";
import { commands } from "../commands";

const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY || "";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { statusCode: 400, body: "Bad Request: No Body" };
  }

  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];

  if (!signature || !timestamp) {
    return {
      statusCode: 401,
      body: "Unauthorized: Missing signature or timestamp",
    };
  }
  // verify using public key
  const isVerified = verifyKey(
    event.body,
    signature,
    timestamp,
    DISCORD_PUBLIC_KEY
  );

  if (!isVerified) {
    return { statusCode: 401, body: "Unauthorized: Invalid request signature" };
  }

  const body = JSON.parse(event.body);

  if (body.type === 1) {
    return { statusCode: 200, body: JSON.stringify({ type: 1 }) };
  }

  try {
    const commandName = body.data.name;
    const content = body.data.options?.[0].value;
    let responseContent = "Hello from Lambda!";
    if (commands[commandName as keyof typeof commands]) {
      responseContent = await commands[
        commandName as keyof typeof commands
      ].execute(content?.toString() || "");
    }
    console.log(`Response Content:${responseContent}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ type: 4, data: { content: responseContent } }),
    };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
