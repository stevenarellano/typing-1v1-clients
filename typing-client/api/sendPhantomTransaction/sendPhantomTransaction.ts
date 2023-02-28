import { getProvider } from '../getProvider';

const sendPhantomTransaction = async (cost: number, data_count: number) => {
	let status = false;
	try {
		const provider = await getProvider();
		await provider.connect();
		const message = `Click here to confirm paying ${cost} SOL for ${data_count} data points}`;
		const encodedMessage = new TextEncoder().encode(message);
		const signedMessage = await provider.signMessage(
			encodedMessage,
			'utf8'
		);
		if (signedMessage) {
			status = true;
		}
	} catch (error) {
		console.log(error);
	}
	return status;
};

export default sendPhantomTransaction;
