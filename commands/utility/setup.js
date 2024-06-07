import {SlashCommandBuilder} from "discord.js"

const command = {
	cooldown: 10,
	data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Get started with the minecraft server'),
    async execute(interaction){
        const urlstring = `https://maven.minecraftforge.net/net/minecraftforge/forge/${process.env.SERVERVERSION}-${process.env.FORGEVERSION}/forge-${process.env.SERVERVERSION}-${process.env.FORGEVERSION}-installer.jar`
        let output ='Curseforge: You can download the mod files attached below'
        try{
            const url = new URL(urlstring)
            output += `\nMinecraft launcher: Install the correct forge version (currently working with ${process.env.SERVERVERSION}-forge${process.env.FORGEVERSION}) at ${urlstring}`
            
        }
        catch(error){
            console.error(error)
        }
        await interaction.reply({content:output, files: [`./files/mods.zip`]});
    },
};


export default command;