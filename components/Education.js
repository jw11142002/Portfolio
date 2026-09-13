import { motion } from 'framer-motion';
import { education } from '@/data/profile';
import SectionHeader from './SectionHeader';
import { Stagger, item } from './Reveal';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className="container">
        <SectionHeader index="04" eyebrow="Education" title="UC San Diego, twice." />
        <Stagger className={styles.grid}>
          {education.map((e) => (
            <motion.article key={e.degree} className={styles.card} variants={item}>
              <div className={styles.top}>
                <span className="mono">
                  {e.start} — {e.end}
                </span>
                <span className={styles.crest} aria-hidden>
                  <span />
                  <span />
                </span>
              </div>
              <h3 className={`display ${styles.degree}`}>{e.degree}</h3>
              <p className={styles.school}>{e.school}</p>
              <p className={styles.note}>{e.note}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
