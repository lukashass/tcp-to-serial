const net = require('net');
const SerialPort = require('serialport');
const CONFIG = require('./config.json');

const port = new SerialPort(CONFIG.serial.port, {
  baudRate: CONFIG.serial.baudRate,
  autoOpen: false,
});
const client = new net.Socket();

port.on('open', () => {
  console.log('uii toll');
  client.on('data', (data) => {
    console.log('Received: ', data);
    port.write(data);
  });
  port.on('data', (data) => {
    console.log('serial', data);
  });
});

port.on('error', (err) => {
  console.log(err);
});

port.open((err) => {
  if (err) {
    console.log(err);
    // reconnect on error
    // setTimeout(connect, 1000)
  }
});

function connectTCP() {
  client.connect(CONFIG.tcp.port, CONFIG.tcp.host);
}

client.on('connect', () => {
  console.log('Connected');
  client.write(CONFIG.tcp.initMessage);
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.log(err);
  setTimeout(connectTCP, 1000);
});

connectTCP();
