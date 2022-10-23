const { Client, Events, GatewayIntentBits } = require('discord.js');

require('dotenv').config();

const BotToken = process.env.BOT_TOKEN;
if (!BotToken) {
  console.error('Missing BOT_TOKEN environment variable, exiting.');
  process.exit(-1);
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c: any) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(BotToken);
