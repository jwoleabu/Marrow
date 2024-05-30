import {SlashCommandBuilder} from "discord.js"


const command = {
	cooldown: 2,
	data: new SlashCommandBuilder()
    .setName('restore')
    .setDescription('Restore a players items on the server')
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
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['Player1', 'Player2', 'Player3', 'Player4']; // Replace with actual username choices
        const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue.toLowerCase()));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        );
    },
    async execute(interaction){
        const playerName = interaction.options.getString('username');
        const deathId = interaction.options.getString('death_id');
        const restoreType = interaction.options.getString('restore_type');
        const command = `/restoreinventory ${playerName} ${deathId} ${restoreType}`

        await interaction.reply({content: `Command executed: ${command}`, ephemeral: true });
    },
};


export default command;