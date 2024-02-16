import { Collection, Events } from 'discord.js';
import { readdirSync } from 'fs';
import { join as pathJoin } from 'path';
import Bot from './config/client';
import OpenAIClient from './config/openAI';
import { serverIDs, token } from './keys.json' with { type: 'json' };

Bot.login(token);

/*
    Everything below this point will happen once Doug is live and connected
*/
// client.on('ready', async (client) => {
//     console.log('Logged in as Doug Lloyd!');

//     const guild = client.guilds.cache.get(serverIDs.liquidDrinkers);

//     /*
//         check current server members (non-bot) and update user list as necessary
//     */
//     let changesMadeToUsers = false;
//     let accounts = await guild.members.fetch();
//     const humans = accounts.filter((account) => account.user.bot === false);

//     /*
//         TODO: REFACTOR THIS
//     */
//     humans.forEach((human) => {
//         const id = human.user.id;
//         const name = human.nickname ?? human.user.username;

//         // add any new server members
//         if (!User.users.some((user) => user.id === id)) {
//             console.log(`${name}'s ID not found in storage - adding to storage`);
//             User.createUser(human);
//             changesMadeToUsers = true;
//         }
//         // update username if changed
//         else {
//             const userInStorage = User.users.find((user) => user.id === id);
//             if (userInStorage.name !== name) {
//                 console.log(
//                     `ID: ${id} has changed their name from ${userInStorage.name} to ${name} - updating`
//                 );
//                 userInStorage.name = name;
//             }
//         }
//     });

//     if (!changesMadeToUsers) {
//         console.log('No members added or deleted from storage');
//     }
// });

// client.on('guildMemberAdd', (member) => {
//     if (
//         !User.users.some((user) => user.id === member.user.id) &&
//         !member.user.bot &&
//         member.guild.id === serverIDs.liquidDrinkers
//     ) {
//         console.log(
//             `${member.user.username} (ID: ${member.user.id}) just joined - adding to storage`
//         );
//         User.createUser(member);
//     } else {
//         console.log(member.user.username, 'joined a server that is not liquidDrinkers');
//     }
// });

// client.on('guildMemberUpdate', (oldUserDetails, newUserDetails) => {
//     const user = User.users.find((user) => user.id === newUserDetails.id);

//     user.name = newUserDetails.nickname;
//     user.avatar = newUserDetails.displayAvatarURL();

//     console.log(
//         `ID: ${user.id} has changed their name from ${oldUserDetails.nickname} to ${newUserDetails.nickname} - updating`
//     );
// });

// /*
//     Loading slash commands
// */
// client.commands = new Collection();

// const commandsPath = pathJoin(__dirname, 'commands/doug');
// const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

// commandFiles.forEach((file) => {
//     const filePath = pathJoin(commandsPath, file);
//     const command = require(filePath);

//     // Set a new item in the Collection with the key as the command name and the value as the exported module
//     if ('data' in command && 'execute' in command) {
//         client.commands.set(command.data.name, command);
//         console.log(command.data.name, 'added');
//     } else {
//         console.log(
//             `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//         );
//     }
// });

// /*
//     Handle slash commands on execute
// */
// client.on(Events.InteractionCreate, async (interaction) => {
//     if (!interaction.isChatInputCommand()) return;

//     const command = interaction.client.commands.get(interaction.commandName);

//     if (!command) {
//         const error = `No command found matching ${interaction.commandName}.`;
//         console.error(error);
//         interaction.reply(error);
//         return;
//     }

//     try {
//         await command.execute(interaction);
//     } catch (e) {
//         console.error(e);
//         const errorReply = { content: 'Error executing command!', ephemeral: true };
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp(errorReply);
//         } else {
//             await interaction.reply(errorReply);
//         }
//     }
// });

// /*
//     Misc. responses to other messages
// */
// client.on('messageCreate', async (msg) => {
//     if (msg.author.bot) return;

//     msg.content = msg.content.toLowerCase().trim();

//     const dougID = '1105901074025553990';

//     const userID = msg.author.id;
//     const account = User.users.find((user) => user.id === userID);
//     account.increaseTotalMessages();

//     if (msg.content.startsWith(`<@${dougID}>`)) {
//         msg.reply('Did you mean to use `/douggpt` or `/continue`?');
//     }
//     // AI response - use Babbage
//     else if (/^<@&1105911690396176407>\s.+$/.test(msg.content)) {
//         const message = msg.content.slice(23).trim();

//         const res = await model.call(message);
//         msg.reply(res);
//     } else if (msg.content.startsWith('!slots')) {
//         msg.reply('Did you mean to try `/slots`?');
//     } else if (containsDoug(msg.content)) {
//         msg.react('1105890013297791036');
//         account.increaseDougMessages();
//     } else if (msg.content === 'hello there') {
//         msg.channel.send('General Kenobi');
//     }
// });
