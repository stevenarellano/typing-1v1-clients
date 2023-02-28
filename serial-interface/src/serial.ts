import { Server } from 'socket.io';
import SerialPort from 'serialport';

const io: Server = new Server(3000, {
	cors: {
		origin: '*',
	},
});
const port = new SerialPort('/dev/cu.usbmodem14201', {
	baudRate: 115200,
});

io.on('connection', (socket: any) => {
	console.log('a user connected');
	socket.on('helpAvailable', (arg: any) => {
		// console.log('SOCKET DATA: ' + arg);
		port.write(`!${arg}`);
	});

	// Write a string to the serial port
});
io.on('msg', function (data: any) {
	console.log('Data received: ' + data);
});

port.on('open', function () {
	console.log('Serial port opened.');
});

port.on('data', function (data: any) {
	const dataArr = data.toString().split(':');

	let val = dataArr[0];
	if (dataArr.length > 1) {
		val = dataArr[1];
	}

	// console.log('SERIAL DATA: ' + val.toString());
	if (val != 0) {
		io.emit('data', val.toString());
	}
});

port.on('error', function (err: any) {
	console.error('Error: ' + err.message);
});
