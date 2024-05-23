import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { config } from '../src/config';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class DiscordBotStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const interactionLambda = new lambda.Function(this, "InteractionHandler", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      timeout: cdk.Duration.seconds(5),
      code: lambda.Code.fromAsset("src"),
      handler: "index.handler",
      environment: {
        DISCORD_PUBLIC_KEY: config.DISCORD_PUBLIC_KEY || "",
      },
    });

    const functionUrl = interactionLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ["*"],
      },
    });

    new cdk.CfnOutput(this, "FunctionUrl", {
      value: functionUrl.url,
    });

  }
}
