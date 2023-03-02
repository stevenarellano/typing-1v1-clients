import { io } from 'socket.io-client';

const socket = io('http://localhost:8080/');

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

const args = process.argv.slice(2);
console.log(args); // [ 'arg1', 'arg2' ]

if (args[0] === 'reset') {
	const players = {
		player1: args[1] ?? 'asdf',
		player2: args[2] ?? '1234',
	};
	sendReset(players);
}

interface Players {
	player1: string;
	player2: string;
}

function sendReset(players: Players) {
	console.log('sending reset');
	socket.emit('reset_game', players);
}
