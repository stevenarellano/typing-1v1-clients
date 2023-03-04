import { io } from 'socket.io-client';
import SerialPort from 'serialport';

const socket = io('https://typing-actuated.herokuapp.com/');
let winner = -1;

const port = new SerialPort('/dev/cu.usbmodem14401', {
	baudRate: 115200,
});

// client-side
socket.on('connect', () => {
	console.log(socket.id);
});

socket.on('api', (data: any) => {
	console.log(data);
});

socket.on('disconnect', () => {
	console.log(socket.id);
});

socket.on('finished', (data: number) => {
	console.log(`winner: ${data}`);
	if (winner === -1) {
		winner = data;
		port.write(`finished:${data}`);
		port.close();
	}
});
socket.on('miss', (data: number) => {
	console.log(`miss`);
	port.write(`miss`);
});

const args = process.argv.slice(2);
console.log(args); // [ 'arg1', 'arg2' ]

interface Players {
	player1: string;
	player2: string;
}

function sendReset(players: Players) {
	console.log('sending reset');
	socket.emit('reset_game', players);
}

async function main() {
	if (args[0] === 'reset') {
		const players = {
			player1: args[1] ?? 'asdf',
			player2: args[2] ?? '1234',
		};
		sendReset(players);
		port.write('reset');
	} else if (args[0] === 'serial') {
		port.on('open', function () {
			console.log('Serial port opened.');
		});

		port.on('data', (data: any) => {
			console.log(data.toString());
		});
	}
}

main();
