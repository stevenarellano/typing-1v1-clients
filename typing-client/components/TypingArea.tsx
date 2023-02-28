import styles from "../styles/modules/Game.module.scss";
import { useEffect, useState } from 'react';

interface TypingTestProps {
    prompt: string;
    onFinish: () => void;
    onMilestone: () => void;
    onStart: () => void;
}
function cutStringIntoFourParts(inputString: string): Set<number> {
    const length = inputString.length;
    const indices = new Set<number>();

    if (length < 4) {
        return indices;
    }

    const partitionSize = Math.floor(length / 4);

    for (let i = 1; i <= 3; i++) {
        indices.add(i * partitionSize);
    }

    return indices;
}

const TypingTest: React.FC<TypingTestProps> = ({ prompt, onStart, onFinish, onMilestone }) => {
    const [idx, setIdx] = useState(0);
    const [wrong, setWrong] = useState(false);
    const milestoneIndices: Set<number> = cutStringIntoFourParts(prompt);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const currentChar = prompt.charAt(idx);
            if (!started) {
                onStart();
                setStarted(true);
            }
            if (event.key === currentChar) {
                setIdx(idx + 1);
                setWrong(false);


                if (idx + 1 === prompt.length) {
                    onFinish();
                    document.removeEventListener('keydown', handleKeyPress);
                } else if (milestoneIndices.has(idx)) {
                    onMilestone();
                }
            } else if (event.key !== 'Shift' && idx < prompt.length) {
                setWrong(true);
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [idx, prompt]);


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
