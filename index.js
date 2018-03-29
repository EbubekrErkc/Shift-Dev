const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const client = new Discord.Client();

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

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
  .addField('Shift Statistics', 'Here Are My Statistics')
  .addField('» Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`)
  .addField('» Uptime', `${duration}`)
  .addField('» Bot Version', `${process.env.VERSION}`)
  .addField('» Node', `9.8.0`)
  .addField('» Library', `Discord.JS`)
  .setColor(`E9D700`)
  message.channel.send({embed});
  }
  
  if (command === 'help') {
  const embed = new Discord.RichEmbed()
  .addField('Shift Commands', 'Here Are My Commands')
  .addField('Information', 'Ping - Measures The Bot Latency\n\nStats - Gives Some Bot Statistics')
  message.channel.send({embed});
  }
  
  });

client.login(process.env.TOKEN)