# MessCord
Facebook Messenger on Discord!

---

Every incoming message will create a new or find an existing text channel with the `threadID` being the name. 

When sending messages, your UserBot will delete your discod message and send the facebook message and your facebook message will show.

---

`npm install facebook-chat-api discord.js`

---

Edit:

`YOUR-GUILD-ID` - Your Guild (private Guild)

`PARENT-ID` - Your text channel category (can be removed)

`TOKEN` - your bot token

Change the exisiting `utils.js` in `node_modules\facebook-chat-api` with the one in this repo.

`{appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}` Uses your cookies rather than logging in each time

it can be replaced with `{email: "FB_EMAIL", password: "FB_PASSWORD"}` which is slower.

to get your `appState` use the following:

```javascript
login(credentials, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});
```

Make a Bot User and invite it to your server will full permissions.

---

To Do:
* discord->facebook image support
* command initiated conversations

---

Inspired by

https://github.com/antigravities/Steamcord
