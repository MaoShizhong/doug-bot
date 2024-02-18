export async function executeSlashCommand(interaction) {
    // slash commands only
    if (!interaction.isChatInputCommand())
        return;
    const bot = interaction.client;
    const command = bot.commands.get(interaction.commandName);
    if (!command) {
        const error = `No command found matching ${interaction.commandName}.`;
        console.error(error);
        interaction.reply(error);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        const errorReply = { content: 'Error executing command!', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorReply);
        }
        else {
            await interaction.reply(errorReply);
        }
    }
}
