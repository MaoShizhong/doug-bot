import { Guild } from 'discord.js';
import { configDotenv } from 'dotenv';
import bot from './config/client';
import { executeSlashCommand } from './interactions/slash_command_execution';
import {
    addMemberToServer,
    handleServerMemberChanges,
    updateMemberDetails,
} from './members/handle_members';
import { handleIncomingMessage } from './messages/messages';

configDotenv();

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

bot.on('interactionCreate', executeSlashCommand);

bot.login(process.env.BOT_TOKEN);
