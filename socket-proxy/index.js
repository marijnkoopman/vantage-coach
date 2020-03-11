const WebSocket = require('ws');
const proxy = new WebSocket.Server({ port: 4000 });
const proxy2 = new WebSocket.Server({ port: 5000 });

console.log("Waiting 5 seconds, please refresh your webpage now");
const sleep = require('sleep');
sleep.sleep(5);

const emando1 = new WebSocket('wss://events.emandovantage.com/v1/competitions');
const competitionID = "64c50ac3-2564-4837-9ab7-2717c4f4ab13"
const emando2 = new WebSocket('wss://events.emandovantage.com/v1/competitions/' + competitionID)

emando1.on('open', function open() {
	emando1.send('ping');
});

emando1.on('message', function incoming(msg) {
    console.log("message received");
    proxy.clients.forEach(function each(client) {
        client.send(msg);
        console.log("message emitted");
    });
});

emando2.on('open', function open() {
	emando2.send('ping');
});

emando2.on('message', function incoming(msg) {
    console.log("message received");
    proxy2.clients.forEach(function each(client) {
        client.send(msg);
        console.log("message emitted");
    });
});