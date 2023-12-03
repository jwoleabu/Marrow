import { Client, Events, GatewayIntentBits } from 'discord.js';
import {config} from "dotenv";
import * as getip from './commands/getIp.js'
config();
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

function readyDiscord(){
    console.log(`Booting up ${client.user.tag}`);
}

async function handleInteraction(interaction){
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'serverip'){
        await getip.execute(interaction);
    }
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction)
