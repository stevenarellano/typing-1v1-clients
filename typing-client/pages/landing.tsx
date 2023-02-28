import styles from '../styles/modules/Landing.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';


interface LockableInputProps {
    onSubmit: (value: string) => void;
}

const Landing: React.FC<LockableInputProps> = ({ onSubmit }: any) => {
    const [locked, setLocked] = useState(false);
    const [value, setValue] = useState('');
    const [countdown, setCountdown] = useState(0);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!locked) {
            setLocked(true);
            const date = new Date();
            onSubmit(value);
        }
    };

    const handleUnlock = () => {
        setLocked(false);
        setValue('');
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (locked) {
            intervalId = setInterval(() => {
                const date = new Date();
                const secondsTillTry = 10 - date.getSeconds() % 10;
                setCountdown(secondsTillTry);
                if (secondsTillTry === 10) {
                    console.log('game launched');
                }
            }, 500);
        }
        return () => {
            if (intervalId !== undefined) clearInterval(intervalId);
        };
    }, [locked, value, onSubmit, countdown]);



    return (
        <div className={styles.lockableInput}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={handleInputChange} disabled={locked} />
                {!locked && <button type="submit">Lock</button>}
            </form>
            {locked && (
                <div>
                    Countdown: {countdown}
                    <button onClick={handleUnlock}>X</button>
                </div>
            )}
        </div>
    );
};

export default Landing;
