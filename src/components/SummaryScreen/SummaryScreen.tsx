import styles from "./SummaryScreen.module.css";

interface SummaryScreenProps {
  correctCount: number;
  onPlayAgain: () => void;
}

function getEncouragingMessage(correctCount: number): string {
  if (correctCount === 20) return "Perfect score! You've mastered those slide positions!";
  if (correctCount >= 16) return "Excellent work! Keep it up!";
  if (correctCount >= 12) return "Great job! Keep practising to master those slide positions.";
  if (correctCount >= 8) return "Good effort! A bit more practice will get you there.";
  return "Keep at it — every round makes you better!";
}

export function SummaryScreen({ correctCount, onPlayAgain }: SummaryScreenProps) {
  const segments = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heroIcon} role="img" aria-label="Medal">
          🏅
        </div>
        <h1 className={styles.heading}>Round Complete</h1>
        <div className={styles.scoreCard}>
          <p className={styles.score}>{correctCount} / 20</p>
          <div className={styles.segmentedBar} aria-hidden="true">
            {segments.map((i) => (
              <span
                key={i}
                data-testid={`segment-${i}`}
                data-filled={i < correctCount ? "true" : "false"}
                className={i < correctCount ? styles.segmentFilled : styles.segmentEmpty}
              />
            ))}
          </div>
        </div>
        <p className={styles.encouragingMessage} data-testid="encouraging-message">
          {getEncouragingMessage(correctCount)}
        </p>
      </div>
      <button className={styles.playAgainButton} onClick={onPlayAgain} type="button">
        Play Again
      </button>
    </div>
  );
}
