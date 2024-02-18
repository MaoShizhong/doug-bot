# Doug Bot

[Discord.js guide](https://discordjs.guide/#before-you-begin)

[Discord.js v14 docs](https://discord.js.org/docs/packages/discord.js/14.14.1)

**N.B. *Instead of pushing to a new branch here, please fork and PR***

## Missing files

- `/.env` containing:
  - `BOT_ID`: The bot's discord user ID
  - `BOT_TOKEN`: The bot's application token
  - `OPENAI_KEY`: Can create a free openAI account and generate your own key
  - `DB_URL`: MongoDB connection string in the format `mongodb+srv://<username>:<password>@cluster0.iqgpsei.mongodb.net/<db_name>`
- `/assets/server_IDs.json` which includes the server IDs intended for the database (can easily fetch your test server's ID in Discord)

## How to develop and test with a local bot

**IMPORTANT -** Ensure node and npm are installed, and that node is **at least** `v20.0.0`

1. [Set up a bot as a discord application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
1. Create a test server on Discord and add your bot to that server.
1. [Make a free MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas/register).
1. Make a `.env` file in the project root. Inside it, add the 4 variables and values as listed above.
    - Your free MongoDB Atlas cluster will not have any databases inside of it. In the connection string, for the `<db_name>` segment, you can pick whatever name you wish. Mongoose will automatically create a database in the cluster with this name if it does not already exist.
    - If you wish to see Mongoose dev logs whenever a query is made, add `MODE=dev` to your `.env`.
1. Make an `assets/server_IDs.json` file that will be object where the key(s) is the name of your server, and its value is the server's Discord ID. For example:

    ```json
    {
      "myServer": "33489239482394872394872934"
    }
    ```

1. In the project root, run `npm i` to install all necessary packages.

## Running the bot

- To run the bot, in the project root, run `npm run dev`. You do not need to compile to JavaScript.
- If you add/remove and slash command files, or you amend anything in any of the slash commands' `data` property, you **must** (re)deploy the slash commands via `npm run deploy-commands-ts`.
  - You may need to restart your Discord client for it to pick up these changes quickly.
  - You do *not* need to redeploy slash commands if you only amend any of the `execute` methods. These will be refreshed when the bot restarts, which `npm run dev` will watch for changes and auto-restart if needed.
