import axios from 'axios';
import { BASEURL, FinishedRequest, MilestoneRequest } from '../context';

const useProgress = () => {
	const uploadFinished = async (finishedRequest: FinishedRequest) => {
		const res = await axios.post(`${BASEURL}/finished`, finishedRequest);
		console.log(res.data);
		return res.data;
	};

	const uploadMilestone = async (milestoneRequest: MilestoneRequest) => {
		const res = await axios.post(`${BASEURL}/milestone`, milestoneRequest);
		console.log(res.data);
		return res.data;
	};

	return { uploadFinished };
};

export default useProgress;
