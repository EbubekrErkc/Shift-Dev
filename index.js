const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Webhook = require("webhook-discord")

const Hook = new Webhook("https://discordapp.com/api/webhooks/430421933515997215/nAmQcEgMVYrCY8Mga8OB7lHcOzb0ratHVUmD1W9JYL9KkzWbajDS_PVdDEi5_4shVQuN")
const client = new Discord.Client();


client.on("ready", () => {
  client.user.setActivity(`+Help`)
  console.log(`Logged In As ${client.user.tag}`);
});

const prefix = '+';

client.on("message", async message => {
 if(message.author.bot) return;
 if(message.content.indexOf(prefix) !== 0) return;
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase();
    
  if (command === 'ping') {
  message.channel.send(`Pong \`${Date.now() - message.createdTimestamp}MS\``);
  }
  
  if (command === 'stats') {
  const duration = moment.duration(client.uptime).format(" D [Days], H [Hours], m [Minutes], s [Seconds]");
  const embed = new Discord.RichEmbed()
  .addField('Kyros Statistics', 'Here Are My Statistics')
  .addField('» Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`)
  .addField('» Uptime', `${duration}`)
  .addField('» Bot Version', `0.0.1`)
  .addField('» Node', `9.8.0`)
  .addField('» Library', `Discord.JS`)
  .setColor(`E9D700`)
  message.channel.send({embed});
  }
  
  if (command === 'help') {
  const embed = new Discord.RichEmbed()
  .addField('Command List', 'Here Are My Commands')
  .addField('Information', 'Ping - Measures The Bot Latency\n\nStats - Gives Some Bot Statistics')
  message.channel.send({embed});
  }
  
  if (command === 'change') {
    Hook.info('Changes', `2+ New Commands\n\nCommunity Category`)
  }
  });

client.login(process.env.TOKEN)
