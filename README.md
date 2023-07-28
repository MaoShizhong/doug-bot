# Doug Lloyd

[Discord.js guide](https://discordjs.guide/#before-you-begin)

[Discord.js v14 docs](https://old.discordjs.dev/#/docs/discord.js/14.11.0/general/welcome)

N.B. CommonJS is used here as opposed to ES6 modules.

N.B. Instead of pushing to a new branch here, please fork and PR (partially for my learning too!)

### Missing files/directories:

-   `.env` containing the bot's discord token.
-   `keys.json` which includes server IDs (easily grab these) and an OpenAI key - you can easily create a free account and use your own key if you wanted to do OpenAI stuff.
-   `deploy-commands.js` - [used for deploying newly created/altered slash commands](https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands). You do not need to redeploy if you have simply altered the `async execute(interaction) {}` body code, simply restart to bot to update it. Any other change must be redeployed.
-   `user_profiles/` and `users.json` - contains localStorage data for each member's User class instances

### Prerequisites for local testing

-   [Set up a bot as a discord application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) then put the bot's key in a root-level `.env` file e.g. `DISCORD_TOKEN=F4K3pTk.42069FO0BAR_zk5MA.Gm-oaA.14e4D0UGL1OYDlTdFZmYi_2-Z-lGf-hLMAOoYplN`.
-   Make a discord server and pass the server ID into `index.js` in the line (around 33):<br>
    `const guild = client.guilds.cache.get(putIDHereAsAString);`<br>
    or some equivalent method.
-   In `index.js`, check out<br>
    `client.on('guildMemberAdd', ...`<br>
    and adjust server ID as necessary.
-   In `index.js`, change `dougID` to your test bot's ID.
-   Make a directory called `user_profiles` then create an empty `users.json` inside it.
