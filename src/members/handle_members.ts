import { Guild, GuildMember, PartialGuildMember } from 'discord.js';

export async function handleServerMemberChanges(server: Guild): Promise<void> {
    let changesMadeToMemberList = false;
    const allAccounts = await server.members.fetch();
    const humanAccounts = allAccounts.filter((account): boolean => !account.user.bot);

    // TODO: Get users from DB

    humanAccounts.forEach((account) => {
        const { id, username } = account.user;
        const name = account.nickname ?? username;

        // TODO: Add any new server members
        // if (foo) {
        //     // ...
        //     changesMadeToMemberList = true;
        // }

        // TODO: Update username if necessary
    });

    if (!changesMadeToMemberList) {
        console.log();
    }
}

export async function addMemberToServer(member: GuildMember): Promise<void> {
    // TODO: Handle add server member to DB
    // if (
    // !User.users.some((user) => user.id === member.user.id) &&
    // !member.user.bot &&
    // member.guild.id === serverIDs.liquidDrinkers
    // ) {
    // console.log(
    // `${member.user.username} (ID: ${member.user.id}) just joined - adding to storage`
    // );
    // User.createUser(member);
    // } else {
    // console.log(member.user.username, 'joined a server that is not liquidDrinkers');
    // }
}

export async function updateMemberDetails(
    oldDetails: GuildMember | PartialGuildMember,
    newDetails: GuildMember
): Promise<void> {
    // TODO: Handle member name update
    // const user = User.users.find((user) => user.id === newUserDetails.id);

    // user.name = newUserDetails.nickname;
    // user.avatar = newUserDetails.displayAvatarURL();

    // console.log(
    //     `ID: ${user.id} has changed their name from ${oldUserDetails.nickname} to ${newUserDetails.nickname} - updating`
    // );
}
