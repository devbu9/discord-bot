import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Echo what you said!")
  .addStringOption(option =>
    option.setName('message')
    .setDescription('The message to echo back')
    .setRequired(true)
    );

export async function execute(content: string) {
  return content;
}