import styles from '../styles/modules/Landing.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASEURL, GameInstance, gameState } from '../context';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';


interface LockableInputProps {
    onSubmit?: (value: string) => void;
}

interface ConnectResponse {
    starting: boolean;
    player_id: number;
    msg: string;
}

const Landing: React.FC<LockableInputProps> = ({
    onSubmit = () => console.log('wut')
}: any) => {
    const [locked, setLocked] = useState(false);
    const [value, setValue] = useState('');
    const [countdown, setCountdown] = useState(0);
    const router = useRouter();
    const setGameState = useSetRecoilState(gameState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!locked) {
            setLocked(true);
            onSubmit(value);
        }
    };

    const handleUnlock = () => {
        setLocked(false);
        setValue('');
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        async function connectToGame() {
            const res = await axios.post(`${BASEURL}/connect`, {
                password: value,
            });
            console.log(`response: ${JSON.stringify(res.data)}`);
            const data = res.data as ConnectResponse;


            const gameState: GameInstance = { player_id: data.player_id, prompt: data.msg };
            setGameState(gameState);

            if (data.starting) {
                router.push({
                    pathname: '/pregame',
                });
            }


        }
        if (locked) {
            intervalId = setInterval(() => {
                const date = new Date();
                const secondsTillTry = 10 - date.getSeconds() % 10;
                setCountdown(secondsTillTry);
                if (secondsTillTry === 10) {
                    connectToGame();

                }
            }, 1000);
        }
        return () => {
            if (intervalId !== undefined) clearInterval(intervalId);
        };
    }, [locked, value]);



    return (
        <div className={styles.container}>
            <div>welcome.</div>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    disabled={locked}
                    placeholder="password"
                    className={styles.passwordInput}
                />
                {!locked &&
                    <button
                        className={styles.lockButton}
                        type="submit">join</button>
                }
                {locked && (

                    <div className={styles.lockedContainer}>
                        <div className={styles.countdown}>
                            Countdown: {countdown}
                        </div>
                        <button
                            onClick={handleUnlock}
                            className={styles.unlockButton}>
                            X
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Landing;;
