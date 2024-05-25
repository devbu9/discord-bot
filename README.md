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


## Setup-Guide
#### 1. Initialize your CDK project
```bash
cdk init app --language=typescript`
```

#### 2. Install necessary dependencies
```bash
npm install @types/aws-lambda dotenv discord.js discord-interactions 
npm install -D typescript jest @types/jest @types/aws-lambda ts-jest esbuild
```

#### 3. Configure `tsconfig.json`
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

#### 4. Create Lambda handler in `lambda/handler.ts`
```typescript
// copy the file
```

#### 5. Define the CDK stack in `lib/discord-bot-stack.ts`
```typescript
// copy the file
```

#### 6. Bootstrap & deploy
```bash
cdk bootstrap
cdk deploy
```

