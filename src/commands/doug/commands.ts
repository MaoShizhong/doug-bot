import { CollectorFilter, MessageReaction, SlashCommandBuilder, User } from 'discord.js';
import {
    CommandsEmbedPage,
    commandsEmbeds,
    getCommandsEmbedPage,
} from '../../embeds/commands_embeds.js';
import { SlashCommand } from '../../types.js';

const command: SlashCommand = {
    data: new SlashCommandBuilder().setName('commands').setDescription('Show a list of commands'),
    async execute(interaction): Promise<void> {
        await interaction.reply({ embeds: [commandsEmbeds[1]] });

        await interaction.fetchReply().then((message): void => {
            message.react('⬅️');
            message.react('➡️');

            const collectorFilter: CollectorFilter<[MessageReaction, User]> = (
                reaction,
                user
            ): boolean => {
                return (
                    user.id !== process.env.BOT_ID &&
                    ['⬅️', '➡️'].includes(reaction.emoji.name as string)
                );
            };

            const collector = message.createReactionCollector({
                filter: collectorFilter,
                dispose: true,
                time: 45000,
            });

            let page = 1;

            const changePage = (reaction: MessageReaction): void => {
                const [firstPage, lastPage] = [1, 2];

                if (reaction.emoji.name === '⬅️') {
                    page = --page < firstPage ? lastPage : page;
                } else {
                    page = ++page > lastPage ? firstPage : page;
                }

                message.edit({ embeds: [getCommandsEmbedPage(page as CommandsEmbedPage)] });
            };

            collector.on('collect', changePage);
            collector.on('remove', changePage);
        });
    },
};

export default command;
