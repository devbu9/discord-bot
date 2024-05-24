import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("Replies Hi Back!");

export async function execute(content: string) {
  return "Hi Back!"
}