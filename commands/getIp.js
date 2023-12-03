import {SlashCommandBuilder} from "discord.js"

export const data = new SlashCommandBuilder()
    .setName('serverip')
    .setDescription('Get the ip address of the Minecraft server');

export async function execute(interaction){
    await interaction.reply('The ip is IP');
}