
const { ActivityType, Client, Collection, Events, GatewayIntentBits, GuildMember } = require('discord.js');
const AbsenceCommand = require('./commands/absence');

require('dotenv').config();

const BotToken = process.env.BOT_TOKEN;
if (!BotToken) {
  console.error('Missing BOT_TOKEN environment variable, exiting.');
  process.exit(-1);
}

// Create a new client instance
const client = new Client({ 
   intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection();

client.commands.set(AbsenceCommand.data.name, AbsenceCommand.execute);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async (c: any) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	await c.user.setActivity('a whales mating call', { type: ActivityType.Listening });
});

client.on(Events.GuildMemberAdd, async (guildMember: any) => {
  const applicantRole = await guildMember.guild.roles.fetch('1033851034994475068');
  await guildMember.edit({ roles: [applicantRole] });
  // const channel = await guildMember.createDM(true);
  // await channel.send('Hello and welcome to Punk!');
});

client.on(Events.InteractionCreate, async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command || command.length === 0) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your client's token
client.login(BotToken);
