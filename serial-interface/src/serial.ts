import SerialPort from 'serialport';

const args = process.argv.slice(2);
const port = new SerialPort('/dev/cu.usbmodem142101', {
	baudRate: 115200,
});

async function main() {
	console.log('WHAT IS GOING ON');
	// setTimeout(() => {
	// 	console.log('last?');
	// 	port.write('a', (err) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 	});
	// }, 1000);
}
// port.on('data', (data: any) => {
// 	console.log(data.toString());
// });
port.on('open', function () {
	console.log('Serial port opened.');
	setTimeout(() => {
		port.write('a', (err) => {
			console.log(err);
		});
	}, 2500);
});

port.on('data', (data: any) => {
	console.log(data);
});

main();
