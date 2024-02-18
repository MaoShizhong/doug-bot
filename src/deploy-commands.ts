import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import 'dotenv/config';
import { readdirSync } from 'fs';
import { join as pathJoin } from 'path';
import { SLASH_COMMAND_FILE_EXTENSIONS } from './constants/constants';
import { SlashCommand } from './types';
import { getDirName } from './util/dirname';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

// Grab all the command folders from the commands directory you created earlier
const foldersPath = pathJoin(getDirName(import.meta.url), 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = pathJoin(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file): boolean =>
        SLASH_COMMAND_FILE_EXTENSIONS.test(file)
    );

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = pathJoin(commandsPath, file);
        const importObject = await import(filePath);
        const command: SlashCommand = importObject.default;

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            console.log(command);
        } else {
            console.error(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

// Construct and prepare an instance of the REST module
const { BOT_ID, BOT_TOKEN } = process.env;

if (!BOT_ID || !BOT_TOKEN) throw new Error('No client ID or bot token!');
const rest = new REST().setToken(BOT_TOKEN);

// and deploy your commands!
(async (): Promise<void> => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands globally
        const data = (await rest.put(Routes.applicationCommands(BOT_ID), {
            body: commands,
        })) as unknown[];

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
