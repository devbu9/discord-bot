import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import { commands } from ".";

config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN || '';
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || '';

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

interface Command {
  id: string;
  application_id: string;
  name: string;
}

(async () => {
  try {
    // Delete all existing commands
    const registeredCommands = await rest.get(Routes.applicationCommands(DISCORD_CLIENT_ID)) as Command[];
    for (const command of registeredCommands) {
      console.log(`Deleting command: '${command.name}' with id: ${command.id}`);
      await rest.delete(Routes.applicationCommand(DISCORD_CLIENT_ID, command.id));
    }

    // Register all commands
    console.log(`Registering commands: ${commandsData.map((command) => command.name).join(", ")}`);
    await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
      body: commandsData,
    });

    console.log("Successfully registered application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();