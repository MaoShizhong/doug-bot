import 'dotenv/config';
import 'log-timestamp';
import bot from './config/client';
import initialiseDatabase from './db/db_setup';
import { executeSlashCommand } from './interactions/slash_command_execution';
import { addMemberToServer, handleServerMemberChanges, updateMemberDetails, } from './members/handle_members';
import { handleIncomingMessage } from './messages/messages';
initialiseDatabase();
bot.on('ready', async (client) => {
    console.log('\n------------------');
    console.log('Logged in as Doug Lloyd!\n');
    const servers = Array.from(client.guilds.cache.values());
    servers.forEach(handleServerMemberChanges);
});
bot.on('guildMemberAdd', addMemberToServer);
bot.on('guildMemberUpdate', updateMemberDetails);
bot.on('messageCreate', handleIncomingMessage);
bot.on('interactionCreate', executeSlashCommand);
bot.login(process.env.BOT_TOKEN);
