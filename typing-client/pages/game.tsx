import { useState } from 'react';
import { Leaderboard, Speeds, TypingArea } from '../components';
import styles from '../styles/modules/Game.module.scss';

const prompt = "ello mate";
const Game = () => {
    const [userInfo, setUserInfo] = useState({});

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                TYPER
            </div>
            <div className={styles.info} >
                asdf
            </div>
            <div className={styles.content}>
                <Leaderboard />
                <TypingArea prompt={prompt} />
                <Speeds />
            </div>
            <div className={styles.footer} >

            </div>
        </div>
    );
};
export default Game;