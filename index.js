const { token, prefix, owner } = require("./config.json");
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
}

client.on('ready', () => {
    console.log("Ready!");
});

client.login(token);

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)
        || msg.author.bot || msg.author.id !== owner) {
        return;
    }

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (!client.commands.has(cmd)) {
        return;
    }

    try {
        client.commands.get(cmd).execute(msg, args);
    }
    catch (e) {
        console.error(e);
        msg.reply(e);
    }
});
