import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { config } from "dotenv";

config();

export class DiscordBotStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsFunction(this, "DiscordBotHandler", {
      runtime: Runtime.NODEJS_LATEST,
      entry: "src/lambda/handler.ts",
      handler: "handler",
      environment: {
        DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY || "",
      },
    });

    const api = new RestApi(this, "discordBotApi", {
      restApiName: "Discord Bot Service",
      description: "This service handles Discord bot interactions.",
    });

    const interactions = api.root.addResource("interactions", {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["POST"],
        allowHeaders: ["*"],
      },
    });
    const postIntegration = new LambdaIntegration(lambdaFunction);
    interactions.addMethod("POST", postIntegration);

    new CfnOutput(this, "InteractionsApiUrl", {
      value: api.urlForPath("/interactions"),
    });
  }
}
