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
   if (message.content === '!ping') {
      message.channel.send('hoge');
   }


   let command = spritMessageContent(message.content);
   if (command[0] === 'h/') {
      console.log(command);
      switch (command[1]) {
         case 'help':
            help(message);
            break;

         case 'sub':
            // Show homework list
            listSubShow(message);
            break;

         case 'list':
            listHomeworkShow(message,command);
            break;
         // Add homework 
         case 'add':
            console.log("add");
            homeworkAdder(message, command);
            break;

         default:
            sub_help(message);
      }
   }

})

function spritMessageContent(string) {
   const space = " ";
   return string.split(space);
}

//help
function help(message) {
   try {
      const buff = fs.readFileSync("./help/help.md", "utf-8");
      message.channel.send(buff);
   }
   catch (e) {
      message.channel.send(e.message);
   }

}

function sub_help(message) {
   try {
      const buff = fs.readFileSync("./help/help_sub.md", "utf-8");
      message.channel.send(buff);
   }
   catch (e) {
      message.channel.send(e.message);
   }
}
// h/ add sub  

function homeworkAdder(message,command) {
   //subjectを成形
   let checkSubjectMolding = check_sub(message,command[2]);
   let addedHomeworkObj = {"dedline": command[3], "contents": command[4]};

   let dbObject = JSON.parse(
      fs.readFileSync(
         "./db.json"
      )
   );

   console.log(dbObject);
   dbObject[checkSubjectMolding].push(addedHomeworkObj);

   fs.writeFileSync("./db.json", JSON.stringify(dbObject));


}

function listHomeworkShow(message,command) {
   //subjectを成形
   let checkSubjectMolding = check_sub(message,command[2]);

   console.log("check_sub:" + checkSubjectMolding );

   let dbObject = JSON.parse(
   fs.readFileSync(
         "./db.json"
      )
   );

   console.log(dbObject);
//   let HomeworkList = JSON.stringify(dbObject[checkSubjectMolding]);
   let HomeworkList = dbObject[checkSubjectMolding];
   //送るためのメッセージの作成
   let createMessage = "```\n" ;
   //要修正
   //0 === HomeworkList.length だった場合の対応ができないので
   for(let i = 0;i < HomeworkList.length; i++){
      createMessage += "期限 " + HomeworkList[i] .dedline + " 内容 " + HomeworkList[i].contents + "\n";
   }
   createMessage += "```\n";

   console.log("homeworklist:" + JSON.stringify(HomeworkList) );

   message.channel.send(createMessage);
   console.log(HomeworkList.length);
}
function check_sub(message,checkSubject) {
   //教科の判定

   let checkSubjectMolding = "";
   //check subjeckt 

   if (checkSubject === '機構学' | checkSubject === '機構') {
      //機構学
      checkSubjectMolding = 'Mecanics';
   } else if (checkSubject === '英語2' | checkSubject === '英語' | checkSubject === '英語２') {
      //英語2
      checkSubjectMolding = 'English';
   } else if (checkSubject === '英語表現2' | checkSubject === '英語表現' | checkSubject === '英語表現２' | checkSubject === '英表') {
      //英語表現
      checkSubjectMolding = 'EnglishExpression';
   } else if (checkSubject === '数学2A' | checkSubject === '数A' | checkSubject === '数２A') {
      //数学2A
      checkSubjectMolding = 'MathA';
   } else if (checkSubject === '数2B' | checkSubject === '数B' | checkSubject === '数２B') {
      //数学2B
      checkSubjectMolding = 'MathB';
   } else if (checkSubject === '国語' | checkSubject === '国語2' | checkSubject === '国語２' | checkSubject === '国' | checkSubject == 'ja') {
      //国語2
      checkSubjectMolding = 'Japanese';
   } else if (checkSubject === 'プログラミング' | checkSubject === 'プログラミング2' | checkSubject === 'プログラミング２' | checkSubject == 'programming' | checkSubject == 'Pro' | checkSubject == 'Prog') {
      //プログラミング
      checkSubjectMolding = 'Programming';
   } else if (checkSubject === '現代社会' | checkSubject === '現社') {
      //現代社会
      checkSubjectMolding = 'ModernSociety';
   } else if (checkSubject === '世界史' | checkSubject === '世界') {
      //世界史
      checkSubjectMolding = 'WorldHistory';
   } else if (checkSubject == 'other') {
      checkSubjectMolding = 'Other';
   }
   else {
      let erroMsg = "error: 引数が足りません"
      message.channel.send(erroMsg);
   }

   console.log(checkSubjectMolding);
   return checkSubjectMolding;
}

client.login(token);

