const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('absence')
		.setDescription('Register an upcoming absence.'),
	execute: async (interaction: any) => {
		await interaction.reply('This is the absence command!');
	},
};
