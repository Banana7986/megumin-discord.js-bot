const Discord = require('discord.js');
const newUsers = new Discord.Collection()
const client = new Discord.Client();
const config = require('./config.json');


client.on("ready", () => {
  console.log(`${client.user.tag} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined : ${guild.name} (id: ${guild.id}). this guild has ${guild.memberCount} members!`)
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id :${guild.id})`);
});

client.on("message", async message => {
if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  if (command == "avatar") {
    message.reply(message.author.avatarURL);
  }
  if(command === "ping") {

    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.

    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)

    const m = await message.channel.send("Ping?");

    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

  }
  if(command == "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
}

});
client.on('guildMemberAdd', member => {
       newUsers.set(member.id, member.user);
       let role = message.guild.roles.find("name", "Average anime viewer");
       member.addRole(role).catch(console.error);
       member.guild.defaultChannel.send(`Welcome to the server, ${member}, Have a great time here!`);
       console.log(`${member.user.username} has joined`);
});

client.on("guildMemberRemove", (member) => {
  if(newUsers.has(member.id)) newUsers.delete(member.id);
  let role = message.guild.roles.find("name", "Average anime viewer");
  member.removeRole(role).catch(console.error);
  member.guild.defaultChannel.send(` ${member} Has left the server we had a great time.`);
  console.log(`${member.user.username} has left`);
});


client.login(config.token);
