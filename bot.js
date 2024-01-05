import { Client, Events, GatewayIntentBits } from 'discord.js';
import {config} from "dotenv";
import * as getip from './commands/getIp.js'
import * as url from "url";
config();
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
    allowedMentions: { parse: [] }
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

function isReel(parsedUrl) {
    const url = new URL(parsedUrl)
    console.log(url.pathname)
    console.log(`hostname: ${url.hostname === "www.instagram.com"}`)
    console.log(`reel: ${url.pathname.startsWith("/reel")}`)
    if (url.hostname === "www.instagram.com" && url.pathname.startsWith("/reel")){
        return true;
    }
    return false;
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.MessageCreate, (message) => {
    if (message.author.id === client.user.id){
        return;
    }
    console.log(message.embeds)
    const isLink = new RegExp(/https?:\/\/\S+/g).test(message.content);
    if (!isLink) return;
    console.log(`${message.embeds.length} link detected in message: ${message.content}`)
    for (let i = 0; i < message.embeds.length; i++) {
        let parsedLink = message.embeds[i].url
        console.log(parsedLink);
        if (isReel(parsedLink)){
            message.react("👍");
            message.reply("instagram reel link");
            message.suppressEmbeds(true);
        }
    }

});

client.on(Events.InteractionCreate, handleInteraction)
