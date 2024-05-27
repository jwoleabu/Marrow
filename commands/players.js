import {SlashCommandBuilder} from "discord.js"

export const data = new SlashCommandBuilder()
    .setName('players')
    .setDescription('Shows the number of players online on the server')
    .addBooleanOption(option =>
		option.setName('listplayers')
			.setDescription('List the names of players in the server'));
    

export async function execute(interaction){
    const listPlayers = interaction.options.getBoolean('listPlayers');

    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${process.env.SERVERIP}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const serverData = await response.json();
        console.log(serverData);
        
        if (serverData.online && serverData.players.online >= 1) {
            const multiplicity = (serverData.players.online > 1) ? ['are','players'] : ['is','player'];
            const replyMessage = `There ${multiplicity[0]} ${serverData.players.online} ${multiplicity[1]} online on the server.`
            if(listPlayers && serverData.players.list){
                serverData.players.list.forEach(element => {
                    replyMessage += `\n ${element.name}`
                });
            }
        } else {
            await interaction.reply('There are no players on the server.');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        await interaction.reply('There was an error fetching the server data.');
    }
}