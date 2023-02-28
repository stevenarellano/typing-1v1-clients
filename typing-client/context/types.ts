interface GameInstance {
	player_id: number;
	prompt: string;
	winner?: number;
}

interface FinishedRequest {
	player_id: number;
	wpm: number;
}

export type { GameInstance, FinishedRequest };
