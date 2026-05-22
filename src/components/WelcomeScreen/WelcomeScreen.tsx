import styles from "./WelcomeScreen.module.css";

interface WelcomeScreenProps {
  onPlay: () => void;
}

export function WelcomeScreen({ onPlay }: WelcomeScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heroIcon} role="img" aria-label="Music note">
          ♩
        </div>
        <h1 className={styles.title}>Trombone Flash Cards</h1>
        <p className={styles.description}>
          A note appears on the bass clef staff — identify its name or slide position. Each round
          has 20 questions. How many can you get right?
        </p>
      </div>
      <button className={styles.playButton} onClick={onPlay} type="button">
        Play ▶
      </button>
    </div>
  );
}
