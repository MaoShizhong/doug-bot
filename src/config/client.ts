import { Client, ClientOptions, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { join as pathJoin } from 'path';
import { SLASH_COMMAND_FILE_EXTENSIONS } from '../constants/constants';
import { IBotClient, SlashCommand } from '../types';

class BotClient extends Client implements IBotClient {
    commands = new Collection<string, SlashCommand>();

    constructor(options: ClientOptions) {
        super(options);

        // load slash commands to bot client instance to make them accessible in other files via the `.commands` property
        const commandsPath = pathJoin(__dirname, '..', 'commands/doug');
        const commandFiles = readdirSync(commandsPath).filter((file): boolean =>
            SLASH_COMMAND_FILE_EXTENSIONS.test(file)
        );

        commandFiles.forEach(async (file): Promise<void> => {
            const filePath = pathJoin(commandsPath, file);
            const { default: command } = await import(filePath);

            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
                console.log(`"/${command.data.name}" loaded to bot object`);
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
                );
            }
        });
    }
}

const bot = new BotClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

export default bot;
