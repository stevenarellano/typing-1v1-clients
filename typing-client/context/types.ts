interface GameInstance {
	player_id: number;
	prompt: string;
	winner?: number;
}

interface FinishedRequest {
	player_id: number;
	wpm: number;
}

interface MilestoneRequest {
	player_id: number;
	milestone: number;
}

export type { GameInstance, FinishedRequest, MilestoneRequest };
