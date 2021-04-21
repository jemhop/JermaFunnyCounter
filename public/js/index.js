import { CountUp } from './modules/countUp.min.js';

const socket = io();

socket.on('connection', socketID => {
    console.log(socketID);
    var countUp = new CountUp('score', -600);
    countUp.start();
})