const discord = require('discord.js');
const tmi = require('tmi.js');
const commands = require('./commands.json');

const options = {
	connection: {
		reconnect: true,
		secure: true,
	},
	options: {
		debug: false,
	},
	identity: {
		username: "demoknight_tf2",
		password: process.env.TWITCH
	},
	channels: ['SolarLightTF2']
};

const dclient = new discord.Client({disableEveryone: true});
const tclient = new tmi.client(options);
tclient.connect();

dclient.on("ready", function() {
	dclient.user.setActivity('demoknight tf2', {type: 'PLAYING'});
	console.log("demoknight tf2");
});

tclient.on('chat', (channel, userstate, message, self) => {
	if (message.startsWith('!')) {
		let response = command(message.toLowerCase(), userstate['display-name']);
		if (response != "") tclient.say(channel, response);
	}
});

dclient.on('message', (message) => {
	if (message.content.startsWith('!')) {
		let response = command(message.content.toLowerCase(), message.member.displayName);
		if (response == "") return undefined;
		else message.channel.send(response);
	}
	return undefined;
});

function command(msg, name) {
	switch (msg) {
		case "!demoknight":
		case "!demoknighttf2":
			return name + commands.demoknight;
			break;
		case "!hud":
			return commands.hud;
			break;
		case "!sens":
		case "!sensitivity":
			return commands.sens;
			break;
		case "!discord":
			return commands.discord;
			break;
		case "!youtube":
			return commands.youtube;
			break;
		case "!ctgp":
			return commands.ctgp;
			break;
		case "!div":
		case "!division":
			return commands.div;
			break;
		case "!donate":
			return commands.donate;
			break;
		case "!funkykong":
			return commands.funkykong;
			break;
		case "!ip":
			return commands.ip;
			break;
		case "!posture":
			return commands.posture;
			break;
		case "!scraptf":
			return commands.scraptf;
			break;
		case "!viewmodel":
			return commands.viewmodel;
			break;
		case "!commands":
			return commands.commands;
			break;
		default:
			return "";
			break;
	}
}

dclient.login(process.env.TOKEN);