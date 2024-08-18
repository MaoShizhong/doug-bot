import { Guild, GuildMember, PartialGuildMember } from 'discord.js';
import { User } from '../db/models/User.js';

const servers = JSON.parse(process.env.SERVER_IDS ?? '{}');

/**
 * To be run when bot reloads to capture any changes to servers
 * during the time the bot was inactive.
 */
export async function handleServerMemberChanges(server: Guild): Promise<void> {
    // Only handle servers listed in `process.env.SERVER_IDS`
    if (!Object.values(servers).includes(server.id)) return;

    let changesMadeToMemberList = false;
    const allAccounts = await server.members.fetch();
    const humanAccounts = allAccounts.filter((account): boolean => !account.user.bot);
    const existingServerMembers = await User[server.id].find({}).exec();

    humanAccounts.forEach(async (account): Promise<void> => {
        const { id, username } = account.user;
        const name = account.nickname ?? username;

        const userInDatabase = existingServerMembers.find((user): boolean => user._id === id);

        if (!userInDatabase) {
            addMemberToServer(account);
            changesMadeToMemberList = true;
        } else if (name !== userInDatabase.name) {
            await User[server.id].findByIdAndUpdate(id, { name });
            console.log(`User ${id} name updated to ${name}\n`);
        }
    });

    if (!changesMadeToMemberList) {
        console.log(`No changes made to server "${server.name}" whilst this bot was inactive.\n`);
    }
}

export async function addMemberToServer(member: GuildMember): Promise<void> {
    const { id, username } = member.user;
    const serverID = member.guild.id;
    const serverModel = User[serverID];

    const newUser = new serverModel({
        _id: id,
        name: member.nickname ?? username,
        avatar: member.user.displayAvatarURL(),
    });

    try {
        await newUser.save();
        console.log(`${username} (ID: ${id}) joined server ${serverID} - adding to db\n`);
    } catch (error) {
        console.error(`Error creating new user: ${username} - ${id}`);
        console.error(error, '\n');
    }
}

export async function updateMemberDetails(
    oldDetails: GuildMember | PartialGuildMember,
    newDetails: GuildMember
): Promise<void> {
    const { id, username } = newDetails.user;
    const oldName = oldDetails.nickname ?? username;
    const newName = newDetails.nickname ?? username;
    const oldAvatar = oldDetails.user.displayAvatarURL();
    const newAvatar = newDetails.user.displayAvatarURL();

    const noRelevantChange = oldName === newName && oldAvatar === newAvatar;
    if (noRelevantChange) return;

    try {
        await User[newDetails.guild.id].findByIdAndUpdate(newDetails.id, {
            name: newName,
            avatar: newDetails.user.displayAvatarURL(),
        });
        console.log(
            `Updated user "${oldName}" (ID: ${id}) with new name "${newName}" and/or new avatar URL\n`
        );
    } catch (error) {
        console.error(
            `Error updating user: "${oldName}" (ID: ${id}) with new name "${newName}" or new avatar URL`
        );
        console.error(error, '\n');
    }
}
