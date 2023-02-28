import React, { useState } from "react";
import styles from "../styles/modules/Game.module.scss";

interface TypingTestProps {
    text: string;
}

const a = "./pages/game.tsx";


const TypingTest: React.FC<TypingTestProps> = ({ text }) => {
    const [idx, setIdx] = useState(3);
    const [wrong, setWrong] = useState(true);

    return (
        <div>
            <div className={styles.correct}>{a.slice(0, idx)}</div>
            <div className={styles.wrong}>
                {wrong ? a.slice(idx, idx + 1) : ""}
            </div>
            <div className={styles.untouched}>
                {!wrong ? a.slice(idx, idx + 1) : ""}
                {a.slice(idx + 1, a.length)}
            </div>
        </div>
    );

};

export default TypingTest;
