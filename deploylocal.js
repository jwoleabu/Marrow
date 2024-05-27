import { REST, Routes } from 'discord.js';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';


import fs from 'fs';
import path from 'path';
config();


// Convert __filename and __dirname from CommonJS to ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const loadCommands = async () => {
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        const imports = commandFiles.map(async (file) => {
            const filePath = path.join(commandsPath, file);
            try {
                const command = await import(filePath).then(mod => mod.default);
                console.log(command)
                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            } catch (error) {
                console.error(`Error importing command from ${filePath}:`, error);
            }
        });

        // Wait for all imports to complete for this folder
        await Promise.all(imports);
    }
};

// Construct and prepare an instance of the REST module
let rest = new REST().setToken(process.env.TOKEN);


const deployCommands = async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
};

(async () => {
    await loadCommands();
    await deployCommands();
})();