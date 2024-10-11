import { Guild } from 'discord.js';
import 'dotenv/config';
import 'log-timestamp';
import bot from './config/client.js';
import initialiseDatabase from './db/db_setup.js';
import { executeSlashCommand } from './interactions/slash_command_execution.js';
import {
    addMember,
    handleServerMemberChanges,
    removeMember,
    updateMember,
} from './members/handle_members.js';
import { handleIncomingMessage } from './messages/messages.js';

initialiseDatabase();

bot.on('ready', async (client): Promise<void> => {
    console.log('\n------------------');
    console.log('Logged in as Doug Lloyd!\n');

    const servers: Guild[] = Array.from(client.guilds.cache.values());
    servers.forEach(handleServerMemberChanges);
});
bot.on('guildMemberAdd', addMember);
bot.on('guildMemberRemove', removeMember);
bot.on('guildMemberUpdate', updateMember);
bot.on('messageCreate', handleIncomingMessage);
bot.on('interactionCreate', executeSlashCommand);

bot.login(process.env.BOT_TOKEN);
