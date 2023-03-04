import axios from 'axios';
import { BASEURL, FinishedRequest, MilestoneRequest } from '../context';

const useProgress = () => {
	const uploadFinished = async (finishedRequest: FinishedRequest) => {
		const res = await axios.post(`${BASEURL}/finished`, finishedRequest);
		const winner = res.data.winner;
		console.log(winner);
		console.log(winner ? 'You won!' : 'You lost!');
		return winner;
	};

	const uploadMilestone = async (milestoneRequest: MilestoneRequest) => {
		const res = await axios.post(`${BASEURL}/milestone`, milestoneRequest);
		console.log(res.data);
		return res.data;
	};

	const uploadMiss = async () => {
		const res = await axios.get(`${BASEURL}/miss`);
		console.log(res.data);
	};

	return { uploadFinished, uploadMilestone, uploadMiss };
};

export default useProgress;
