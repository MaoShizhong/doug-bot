const { SlashCommandBuilder } = require('discord.js');
const { getCommandsEmbedPage, helpOne } = require('../../embeds/commands_embeds.js');

module.exports = {
    data: new SlashCommandBuilder().setName('commands').setDescription('Show a list of commands'),
    async execute(interaction) {
        await interaction.reply({ embeds: [helpOne] });

        await interaction.fetchReply().then((message) => {
            message.react('⬅️');
            message.react('➡️');

            const collectorFilter = (reaction, user) => {
                return (
                    user.id !== '1105901074025553990' && ['⬅️', '➡️'].includes(reaction.emoji.name)
                );
            };

            const collector = message.createReactionCollector({
                filter: collectorFilter,
                dispose: true,
                time: 45000,
            });

            let page = 1;

            const changePage = (reaction, user) => {
                const [firstPage, lastPage] = [1, 2];

                if (reaction.emoji.name === '⬅️') {
                    page = --page < firstPage ? lastPage : page;
                } else {
                    page = ++page > lastPage ? firstPage : page;
                }
                message.edit({ embeds: [getCommandsEmbedPage(page)] });
            };

            collector.on('collect', changePage);
            collector.on('remove', changePage);
        });
    },
};
