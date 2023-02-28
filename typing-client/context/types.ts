interface GameInstance {
	player_id: number;
	prompt: string;
	winner_id: number;
}

interface FinishedRequest {
	player_id: number;
	wpm: number;
}

interface FinishedResponse {
	winner: boolean;
}

interface MilestoneRequest {
	player_id: number;
	milestone: number;
}

export type {
	GameInstance,
	FinishedRequest,
	MilestoneRequest,
	FinishedResponse,
};
