import { useEffect, useState } from 'react';
import { Leaderboard, Speeds, TypingArea } from '../components';
import styles from '../styles/modules/Game.module.scss';
import { useRecoilValue } from 'recoil';
import { GameInstance, gameState } from '../context';

const prompt = "ello mate";
const Game = () => {
    const game: GameInstance = useRecoilValue(gameState);
    const wordCount = game.prompt.split(' ').length;

    const [time, setTime] = useState<number[]>([Date.now(), 0]);
    const [wpm, setWpm] = useState(0);

    function onFinish() {
        setTime([time[0], Date.now()]);
        setWpm(Math.round(wordCount / ((Date.now() - time[0]) / 1000 / 60)));
    }

    console.log(wordCount);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                GET TYPING
            </div>
            <div className={styles.info} >
                {wpm > 0 && <div>WPM: {wpm}</div>}
            </div>
            <div className={styles.content}>
                <Leaderboard />
                <TypingArea prompt={game.prompt} onFinish={onFinish} />
                <Speeds />
            </div>
            <div className={styles.footer} >
                {game.winner !== undefined && <div>winner: player {game.winner + 1}</div>}
            </div>
        </div>
    );
};
export default Game;