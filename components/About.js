import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import SectionHeader from './SectionHeader';
import Reveal, { Stagger, item } from './Reveal';
import styles from './About.module.css';

const FACTS = [
  { label: 'Currently', value: 'Software Engineer, Sigma' },
  { label: 'Focus', value: 'Data Governance' },
  { label: 'Based in', value: 'San Diego, CA' },
  { label: 'Education', value: 'B.S. & M.S. Computer Science, UC San Diego' },
];

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <SectionHeader index="01" eyebrow="About" title="Correct, fast, and quiet." />

        <div className={styles.grid}>
          <div className={styles.copy}>
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? styles.lead : ''}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Stagger className={styles.facts} delay={0.15}>
            {FACTS.map((f) => (
              <motion.div key={f.label} className={styles.fact} variants={item}>
                <span className="mono">{f.label}</span>
                <span className={styles.factValue}>{f.value}</span>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
