const line = require('@line/bot-sdk');
const express = require('express');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

const commandList = {
    'help': {
        usage: "/help OR /help <command>",
        description: "Display the syntax and description of all commands or a specific command",
    },
    'next': require('./commands/next'),
    'now': require('./commands/now'),
    'past': require('./commands/past'),
    'rc': {
        description: "Display the last 5 rating change for an user"
    },
};


app.get('/', (req, res) => {
    res.sendStatus(404);
});
app.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(mainProgram))
        .then((result) => res.json(result))
        .catch((error) => {
            res.status(500);
            console.error(`Promise error ${error}`);
        });
});

const mainProgram = async(event) => {
    if (event.type !== 'message' || event.message.type !== 'text' || event.message.text[0] !== '/') { //event bukan command
        return Promise.resolve(null); //abaikan pesan
    }

    const args = event.message.text.substring(1).split(' ');
    if (args.length == 0) {
        return Promise.resolve(null); //abaikan pesan
    }
    const cmd = args.shift();

    if (cmd === 'help') {
        let text = "";
        if (args.length == 0) {
            text = `Command lists:`;
            for (command in commandList) {
                text += `\n\nUsage: ${commandList[keyword].usage}\n${commandList[keyword].description}`;
            }
        } else {
            const keyword = args[0];
            if (keyword in commandList) {
                text = `Usage: ${commandList[keyword].usage}\n${commandList[keyword].description}`;
            } else {
                text = `Command /${keyword} not found`;
            }
        }
        return client.replyMessage(event.replyToken, { type: 'text', text: text });
    } else if (cmd in commandList) {
        return client.replyMessage(event.replyToken, { type: 'text', text: await (commandList[cmd].handler(args)) });
    } else {
        return client.replyMessage(event.replyToken, { type: 'text', text: "Invalid command" });
    }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app running in port ${port}...`);
})