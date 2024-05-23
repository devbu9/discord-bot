import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

interface Command {
  id: string;
  application_id: string;
  name: string;
}

(async () => {
  try {
    // Delete all commands using for loop
    const registeredCommands = await rest.get(Routes.applicationCommands(config.DISCORD_CLIENT_ID)) as Command[];
    for (const command of registeredCommands) {
      console.log(`Deleting command: '${command.name}' with id: ${command.id}`);
      await rest.delete(Routes.applicationCommand(config.DISCORD_CLIENT_ID, command.id));
    }

    // Register all commands
    console.log(`Registering commands: ${commandsData.map((command) => command.name).join(", ")}`);
    await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
      body: commandsData,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
