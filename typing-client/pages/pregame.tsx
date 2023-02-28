import styles from '../styles/modules/Pregame.module.scss';
import { useRouter } from 'next/router';

const Pregrame = () => {

    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                await your moderator&apos;s instructions
            </div>
            <button onClick={() => router.push('game')} className={styles.startBtn} >
                start
            </button>
        </div>
    );
};
export default Pregrame;