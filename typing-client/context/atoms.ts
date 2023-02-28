import { atom } from 'recoil';
import { GameInstance } from './types';

const gameState = atom<GameInstance>({
	key: 'gameState',
	default: {
		player_id: 0,
		prompt: 'now this is a story all about how my life got switched turned upside down',
		winner_id: -1,
	},
});
export { gameState };
