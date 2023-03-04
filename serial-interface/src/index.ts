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
	if (winner === -1) {
		console.log(`winner: ${data}`);
		winner = data;
		port.write(`finished:${data}`);
		// process.exit();
	}
});
socket.on('miss', (data: number) => {
	console.log(`miss`);
	port.write(`miss`);
});
socket.on('milestone', (data: string) => {
	console.log(`milestone: ${data}`);
	port.write(data);
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
		winner = -1;
		const players = {
			player1: args[1] ?? 'asdf',
			player2: args[2] ?? '1234',
		};
		sendReset(players);
		setTimeout(() => {
			port.write('reset');
		}, 3000);
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
