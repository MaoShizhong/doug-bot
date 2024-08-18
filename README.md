# Doug Bot

[Discord.js guide](https://discordjs.guide/#before-you-begin)

[Discord.js v14 docs](https://discord.js.org/docs/packages/discord.js/14.14.1)

**N.B. _Instead of pushing to a new branch here, please fork and PR_**

## Missing files

-   `/.env` containing:
    -   `NODE_ENV`: dev or production mode
    -   `BOT_ID`: The bot's discord user ID
    -   `BOT_TOKEN`: The bot's application token
    -   `OPENAI_KEY`: Can create a free openAI account and generate your own key
    -   `DB_URL`: MongoDB connection string in the format `mongodb+srv://<username>:<password>@<host[:port]>/<db_name>`
    -   `SERVER_IDS`: JSON string for an object with server names (that your test bot is in) as keys and their Discord server IDs as their values

## How to develop and test with a local bot

**IMPORTANT -** Ensure node and npm are installed, and that node is **at least** `v20.0.0`

1. [Set up a bot as a discord application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
1. Create a test server on Discord and add your bot to that server.
1. [Make a free MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas/register).
1. Run `cp .env.sample .env` to make a copy of the `.env.sample` file. You can now edit your `.env` file with the appropriate values.
    - Your free MongoDB Atlas cluster will not have any databases inside of it. In the connection string, for the `<db_name>` segment, you can pick whatever name you wish. Mongoose will automatically create a database in the cluster with this name if it does not already exist.
    - If you wish to see Mongoose dev logs whenever a query is made, set `NODE_ENV` to `dev`.
1. In the project root, run `npm i` to install all necessary packages.

## Running the bot

-   To run the bot, in the project root, run `npm run dev`. You do not need to compile to JavaScript.
-   If you add/remove and slash command files, or you amend anything in any of the slash commands' `data` property, you **must** (re)deploy the slash commands via `npm run deploy-commands-ts`.
    -   You may need to restart your Discord client for it to pick up these changes quickly.
    -   You do _not_ need to redeploy slash commands if you only amend any of the `execute` methods. These will be refreshed when the bot restarts, which `npm run dev` will handle automatically.

## bin/start

The script in `bin/` is only necessary for sparkedhost's hosting, due to the way it works. It is not needed for local development.
