import { io } from 'socket.io-client';

const socket = io('https://typing-actuated.herokuapp.com/');

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
