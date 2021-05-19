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

   
   let command = spritMessageContent(message.content);
   if(command[0] === 'h/'){
      switch(command[1]){
         case 'help':
            help(message);
            break;

         case 'sub':
            listSubShow(message);
            break;

         case 'list':
            listHomeworkShow(message);
            break;

         case 'add':
            homeworkAdder(message,command);
            break;

         default:
            sub_help(message);
      }
   }

})

function spritMessageContent(string){
   const  space = " ";
   return string.split(space);
}

//help
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

function homeworkAdder(message,command){
   
}

client.login(token);

