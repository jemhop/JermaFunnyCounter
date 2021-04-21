// you might say that i'm using way too many packages, my response is fuck you, i like packages

const dayjs = require('dayjs');
const tmi = require('tmi.js');
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');


const app = express();
const server = http.createServer(app);
const io = socketio(server);



let funnyCount = 0;
let users = [];
const channel = 'Kyle'
let lastFilepath;

app.use(express.static(path.join(__dirname, 'public')));

let now = dayjs();

const client = new tmi.Client({
	connection: { reconnect: true },
	channels: [channel]
});

io.on('connection', socket => {
    socket.emit("connection", socket.id);
})

client.connect();
console.log(`Listening on channel ${channel}`);

client.on('message', (channel, tags, message, self) => {
    const plusTwo = /(?:^|\W)\+2(?:$|\W)/;
    const minusTwo = /(?:^|\W)\-2(?:$|\W)/;

    let score = 0;

    //message.search only returns the first of message
    if(message.search(plusTwo))
        score-=2;
    if(message.search(minusTwo))
        score+=2;

    if(score != 0)
    {
        funnyCount += score;
        console.log(`${tags['display-name']}: ${message}`);
    }
});


function updateFunnyCount()
{
    for(let i = 0; i < users.length; i++)
    {
        io.to(users[i]).emit('funnyCountUpdate', funnyCount);
    }
    
}


function backupManager()
{

}

function saveCount(funnyCount)
{
    var todayDate = now.format("HH.mm.ssa YYYY-MM-DD")
    let fileName = `backups/Backup on ${todayDate}.txt`;
    fs.writeFile(`backups/Backup on ${todayDate}.txt`, funnyCount.toString(), function (err) {
        if (err) throw err;
      });
    lastFilepath = fileName
}




const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
			