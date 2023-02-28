import styles from "../styles/modules/Game.module.scss";
import { useEffect, useState } from 'react';

interface TypingTestProps {
    prompt: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ prompt }) => {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [timeTaken, setTimeTaken] = useState<number | null>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (startTime === null) {
                setStartTime(Date.now());
            }

            const currentChar = prompt.charAt(idx);

            if (event.key === currentChar) {
                setIdx(idx + 1);
                setWrong(false);

                if (idx + 1 === prompt.length) {
                    setEndTime(Date.now());
                    document.removeEventListener('keydown', handleKeyPress);
                }
            } else if (event.key !== 'Shift' && idx < prompt.length) {
                setWrong(true);
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [idx, prompt, startTime]);

    useEffect(() => {
        if (endTime !== null) {
            const timeTaken = endTime - startTime!;
            setTimeTaken(timeTaken);
        }
    }, [endTime, startTime]);

    return (

        <div className={`${styles.typingArea} ${wrong && styles.chosenWrong}`}>
            <div className={styles.correct}>{prompt.slice(0, idx)}</div>

            <div className={wrong ? styles.wrong : styles.current} >
                {prompt.slice(idx, idx + 1)}
            </div>

            <div className={styles.untouched}>
                {prompt.slice(idx + 1, prompt.length)}
            </div>
        </div>

    );
};

export default TypingTest;
