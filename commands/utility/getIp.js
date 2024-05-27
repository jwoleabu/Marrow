import {SlashCommandBuilder} from "discord.js"

const command = {
	cooldown: 2,
	data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Get the ip address of the Minecraft server'),
    async execute(interaction){
        await interaction.reply({content:`The server ip adress is ${process.env.SERVERIP}`, ephemeral: true});
    },
};


export default command;