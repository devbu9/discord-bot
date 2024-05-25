# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


# Setup-Guide
Let's set up a TypeScript package that uses the AWS CDK to deploy a Lambda function for handling Discord bot slash commands. Below is a step-by-step guide on how to structure your package and the necessary scripts.

### 1. Pre-requisites
- AWS 
- NodeJS
- Discord

### 2. Initialize your CDK project
```bash
mkdir discord-bot
cd discord-bot
cdk init app --language=typescript
```

### 3. Install necessary dependencies
```bash
npm install @types/aws-lambda dotenv discord.js discord-interactions 
npm install -D typescript jest @types/jest @types/aws-lambda ts-jest esbuild
```

### 4. Add the following options to `tsconfig.json`
```json
{
  "compilerOptions": {
    ...
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist"
  },
}
```

### 5. Create `.env` file with following parameters copied
```bash
DISCORD_TOKEN=<YOUR_DISCORD_TOKEN>
DISCORD_CLIENT_ID=<DISCORD_CLIENT_ID>
DISCORD_PUBLIC_KEY=<DISCORD_PUBLIC_KEY>
```

### 6. update npm commands in `package.json`
```json
"scripts": {
    "clean": "rm -rf dist && rm -rf cdk.out",
    "build": "tsc",
    "watch": "tsc -w",
    "test": "jest",
    "register": "node dist/src/commands/register-commands.js",
    "deploy": "npm run clean && npm run build && npm run register && cdk deploy"
  },
```

### 7. Copy the files under `lib` and `src`
```
// Copy the entire folder
```

### 8. Run the commands
```
npm run deploy
```

### 9. Copy the CloudFormation output printed to `INTERACTIONS ENDPOINT URL` section and save.

### 10. Refresh the discord and Tadah!!
