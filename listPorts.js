const SerialPort = require('serialport');

SerialPort.list((err, ports) => {
  ports.forEach((port) => {
    console.log(port.comName);
  });
});
