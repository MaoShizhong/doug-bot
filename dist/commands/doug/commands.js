import { SlashCommandBuilder } from 'discord.js';
import { commandsEmbeds, getCommandsEmbedPage, } from '../../embeds/commands_embeds';
const command = {
    data: new SlashCommandBuilder().setName('commands').setDescription('Show a list of commands'),
    async execute(interaction) {
        await interaction.reply({ embeds: [commandsEmbeds[1]] });
        await interaction.fetchReply().then((message) => {
            message.react('⬅️');
            message.react('➡️');
            const collectorFilter = (reaction, user) => {
                return (user.id !== process.env.BOT_ID &&
                    ['⬅️', '➡️'].includes(reaction.emoji.name));
            };
            const collector = message.createReactionCollector({
                filter: collectorFilter,
                dispose: true,
                time: 45000,
            });
            let page = 1;
            const changePage = (reaction) => {
                const [firstPage, lastPage] = [1, 2];
                if (reaction.emoji.name === '⬅️') {
                    page = --page < firstPage ? lastPage : page;
                }
                else {
                    page = ++page > lastPage ? firstPage : page;
                }
                message.edit({ embeds: [getCommandsEmbedPage(page)] });
            };
            collector.on('collect', changePage);
            collector.on('remove', changePage);
        });
    },
};
export default command;
