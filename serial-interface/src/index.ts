import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

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
