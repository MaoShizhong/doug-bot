import { Collection, Events, Guild } from 'discord.js';
import { configDotenv } from 'dotenv';
import { readdirSync } from 'fs';
import { join as pathJoin } from 'path';
import bot from './config/client';
import {
    addMemberToServer,
    handleServerMemberChanges,
    updateMemberDetails,
} from './members/handle_members';
import { handleIncomingMessage } from './messages/messages';

configDotenv();
bot.login(process.env.BOT_TOKEN);

/*
    Everything below this point will happen once Doug is live and connected
*/
bot.on('ready', async (client): Promise<void> => {
    console.log('Logged in as Doug Lloyd!');

    const servers: Guild[] = Array.from(client.guilds.cache.values());
    servers.forEach(handleServerMemberChanges);
});

bot.on('guildMemberAdd', addMemberToServer);

bot.on('guildMemberUpdate', updateMemberDetails);

bot.on('messageCreate', handleIncomingMessage);

/*
    Loading slash commands
*/
bot.commands = new Collection();

const commandsPath = pathJoin(__dirname, 'commands/doug');
const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    const filePath = pathJoin(commandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        bot.commands.set(command.data.name, command);
        console.log(command.data.name, 'added');
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
});

/*
    Handle slash commands on execute
*/
bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        const error = `No command found matching ${interaction.commandName}.`;
        console.error(error);
        interaction.reply(error);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(e);
        const errorReply = { content: 'Error executing command!', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorReply);
        } else {
            await interaction.reply(errorReply);
        }
    }
});