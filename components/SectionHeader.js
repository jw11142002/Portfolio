import Reveal from './Reveal';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ index, title, eyebrow, lede }) {
  return (
    <div className={styles.header}>
      <Reveal className={styles.meta}>
        <span className="mono">{index}</span>
        {eyebrow && <span className={`mono ${styles.eyebrow}`}>{eyebrow}</span>}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={`display ${styles.title}`}>{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p className={styles.lede}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
