const SerialPort = require('serialport');

SerialPort.list().then((ports) => {
  ports.forEach((port) => {
    console.log(port.path);
  });
});

// this is kind of obsolete. just run: npx @serialport/list
