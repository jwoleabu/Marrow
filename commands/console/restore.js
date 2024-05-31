import {SlashCommandBuilder} from "discord.js"
import { config } from "dotenv";
import { runcommand } from "../../function/runcommand.js";

const command = {
	cooldown: 2,
	data: new SlashCommandBuilder()
    .setName('restore')
    .setDescription('Restore a players items on the server')
    .setDefaultMemberPermissions('0')
    .addStringOption(option =>
		option.setName('username')
			.setDescription('The username of the player to be restored')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('restore_type')
            .setDescription('Add the lost items to the player or replace them')
            .addChoices(
                { name: 'add', value: 'add' },
                { name: 'replace', value: 'replace' })
            .setRequired(true))
    .addStringOption(option =>
		option.setName('death_id')
			.setDescription('The death id of the player')
            .setRequired(true)),
    async execute(interaction){
        config()
        const playerName = interaction.options.getString('username');
        const deathId = interaction.options.getString('death_id');
        const restoreType = interaction.options.getString('restore_type');
        const namePattern = /^[a-zA-Z0-9_]{2,16}$/;
        const idPattern = /^[a-zA-Z0-9-]+$/;

        if(namePattern.test(playerName) && idPattern.test(deathId) && interaction.user.id === process.env.OWNERID){
            const command = `restoreinventory ${playerName} ${deathId} ${restoreType}`;
            runcommand(command)
            await interaction.reply({content: `Command executed: /${command}`, ephemeral: true });
        }
        else{
            await interaction.reply({content: `Invalid name/death id or permissions`, ephemeral: true });
        }
    },
};


export default command;