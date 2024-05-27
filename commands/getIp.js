import {SlashCommandBuilder} from "discord.js"

export const data = new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Get the ip address of the Minecraft server');

export async function execute(interaction){
    await interaction.reply({content:`The server ip adress is ${process.env.SERVERIP}`, ephemeral: true});
}