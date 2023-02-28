import { atom } from 'recoil';
import { GameInstance } from './types';

const gameState = atom<GameInstance>({
	key: 'gameState',
	default: {
		player_id: 0,
		prompt: 'ello mate',
		winner: 0,
	},
});
export { gameState };
