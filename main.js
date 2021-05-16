const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
require('dotenv').config();
const token = process.env.TOKEN;

client.once('ready', () => {
   console.log('準備完了');
});

client.on('message', message => {
   console.log(message.content);
   if(message.content === '!ping'){
      message.channel.send('hoge');
   }

   switch(message.content){
      case 'h/':
         sub_help(message);
         break;
      case 'h/ help':
         help(message);
         break;
   }

})

function help(message){
   try{
      const buff = fs.readFileSync("./help.md","utf-8");
      message.channel.send(buff);
   }
   catch(e){
      message.channel.send(e.message);
   }
   
}
function sub_help(message){
   try{
      const buff = fs.readFileSync("./help_sub.md","utf-8");
      message.channel.send(buff);
   }
   catch(e){
      message.channel.send(e.message);
   }
   
}

client.login(token);

