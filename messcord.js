const login = require("facebook-chat-api");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.on('ready', () => {
  console.log('ready!');
});
function getOrCreateChannel(chan, callback){
  var guild = client.guilds.get("YOUR-GUILD-ID");
    if( guild.channels.exists("name", chan) ){
        var chan = guild.channels.find("name", chan);
        chan.fetchWebhooks().then(collection => {
            callback(null, chan, collection.first());
        }).catch(error => {
            callback(error);
        });
    } else {
        guild.createChannel(chan).then(channel => {
            channel.setParent('PARENT-ID')
            channel.createWebhook(chan+"-hook").then(webhook => {
                callback(null, chan, webhook);
            }).catch(error => {
                callback(error);
            });
        }).catch(error => {
            callback(error);
        });
}};
login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    console.log('Logged into facebook!');
    api.setOptions({selfListen: true});
    api.setOptions({logLevel: "silent"});
    api.listen((err, message) => {
      if(JSON.stringify(message.attachments) === '[]') {
          var msgbody = message.body;
        }else if(JSON.stringify(message.attachments) !== '[]') {
          var msgbody = message.attachments[0].url;
        }
    api.getUserInfo(message.senderID, (err, obj) => {
       if(err) return console.error(err);
       var idpicURL = 'https://graph.facebook.com/'+message.senderID+'/picture?width=100';
       var userName = obj[message.senderID].name;
        if(msgbody == ''){
          return
        }else{
        getOrCreateChannel(message.threadID, (error, chan, webhook) => {
            if( error ) return console.log(error);
            webhook.send(msgbody, {username: userName, avatarURL: idpicURL});
        });
        }
      });
    });
});
function sendMessageThread(body, threadID){
  login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
  var msg = {body: body};
  api.sendMessage(msg, threadID);
});
};
client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.channel.name == "general") return;
  var messageData = msg.content;
  var messageThread = msg.channel.name;
  sendMessageThread(messageData, messageThread);
  msg.delete(1000);
});
client.login('TOKEN');
