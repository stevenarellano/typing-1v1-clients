import { useEffect, useState } from 'react';
import { Leaderboard, Speeds, TypingArea } from '../components';
import styles from '../styles/modules/Game.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FinishedRequest, FinishedResponse, GameInstance, MilestoneRequest, gameState } from '../context';
import { useProgress } from '../api';

const Game = () => {
    const { uploadFinished, uploadMilestone, uploadMiss } = useProgress();
    const [game, setGame] = useRecoilState(gameState);
    const wordCount = game.prompt.split(' ').length;

    const [time, setTime] = useState<number[]>([Date.now(), 0]);
    const [wpm, setWpm] = useState(0);

    function getWinner(isUserWinner: boolean): number {
        if (isUserWinner == true) {
            return game.player_id;
        } else {
            return game.player_id === 0 ? 1 : 0;
        }
    }

    async function onFinish() {
        setTime([time[0], Date.now()]);
        const finishedRequest: FinishedRequest = {
            player_id: game.player_id,
            wpm
        };

        const isWinner = await uploadFinished(finishedRequest);
        setGame({
            ...game,
            winner_id: getWinner(isWinner)
        });
        setWpm(Math.round(wordCount / ((Date.now() - time[0]) / 1000 / 60)));
    }

    async function onStart() {
        const newTimeArr = [Date.now(), 0];
        setTime(newTimeArr);
        console.log(newTimeArr);
    }

    async function onMilestone(milestoneNumber: number) {
        console.log('milestone reached');
        const milestoneRequest: MilestoneRequest = `milestone:${game.player_id}:${milestoneNumber}`;
        const res = await uploadMilestone(milestoneRequest);
    };

    console.log(wordCount);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                GET TYPING
            </div>
            <div className={styles.info} >
                <div>
                    player_id: {game.player_id}&nbsp;
                </div>
                <div>
                    {wpm > 0 && <div>&nbsp;WPM: {wpm}</div>}
                </div>
            </div>
            <div className={styles.content}>
                <Leaderboard />
                <TypingArea
                    prompt={game.prompt}
                    onStart={onStart}
                    onFinish={onFinish}
                    onMilestone={onMilestone}
                    onMiss={uploadMiss}
                />
                <Speeds />
            </div>
            <div className={styles.footer} >
                {/* fix this */}
                {game.winner_id !== -1 && <div>winner: player {game.winner_id}</div>}
            </div>
        </div>
    );
};


export default Game;;