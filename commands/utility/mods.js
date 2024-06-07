import {SlashCommandBuilder} from "discord.js"

const command = {
	cooldown: 15,
	data: new SlashCommandBuilder()
    .setName('mods')
    .setDescription('Get the mods for the Minecraft server'),
    async execute(interaction){
        await interaction.reply({content:`You can download the mod files here`, files: [`./files/mods.zip`]});
    },
};


export default command;