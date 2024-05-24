import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Echo what you said!");

export async function execute(content: string) {
  return content;
}