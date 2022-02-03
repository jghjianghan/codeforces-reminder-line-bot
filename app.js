const line = require('@line/bot-sdk');
const express = require('express');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};
// console.log(config);
const client = new line.Client(config);
const app = express();

app.get('/', (req, res) => {
    res.sendStatus(404);
});
app.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(mainProgram))
        .then((result) => res.json(result))
        .catch((error) => {
            console.error(`Promise error ${error}`);
        });
});

const mainProgram = (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') { //jika user tidak mengirimkan pesan berupa teks (bukan gambar, lokasi, atau sejenisnya)
        return Promise.resolve(null); //abaikan pesan
    }
    return client.replyMessage(event.replyToken, { type: 'text', text: 'Hello, world' }); //balas dengan pesan "Hello, world"
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app running in port ${port}...`);
})