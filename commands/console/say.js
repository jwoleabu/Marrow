import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js"
import { config } from "dotenv";
import { runcommand } from "../../function/runcommand.js";

const command = {
	cooldown: 15,
	data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('send a message as the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
		option.setName('message')
			.setDescription('The message you want to send')
            .setRequired(true)),
    async execute(interaction){
        config()
        const message = interaction.options.getString('message');
        console.log(message);
        const messagePattern = /^[a-zA-Z0-9 ]+$/;

        if(messagePattern.test(message)){
            const command = `say ${message}`;
            runcommand(command)
            await interaction.reply({content: `Command executed: /${command}`, ephemeral: true });
        }
        else{
            await interaction.reply({content: `Invalid message or permissions`, ephemeral: true });
        }
    },
};


export default command;