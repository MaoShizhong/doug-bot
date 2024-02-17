import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join as pathJoin } from 'path';
import { SlashCommand } from './types';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

// Grab all the command folders from the commands directory you created earlier
const foldersPath = pathJoin(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = pathJoin(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = pathJoin(commandsPath, file);
        const command: SlashCommand = await import(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.error(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

// Construct and prepare an instance of the REST module
const { CLIENT_ID, BOT_TOKEN } = process.env;

if (!CLIENT_ID || !BOT_TOKEN) throw new Error('No client ID or bot token!');

const rest = new REST().setToken(BOT_TOKEN);

// and deploy your commands!
(async (): Promise<void> => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands globally
        const data = await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands }) as unknown[];

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();