import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { skills, skillCloud } from '@/data/profile';
import SectionHeader from './SectionHeader';
import Reveal, { Stagger, item } from './Reveal';
import styles from './Skills.module.css';

const SkillsCloud = dynamic(() => import('./three/SkillsCloud'), { ssr: false });

export default function Skills({ pointerRef }) {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <SectionHeader index="05" eyebrow="Skills" title="Tools I reach for." />
        <div className={styles.grid}>
          <Reveal className={styles.cloud}>
            <SkillsCloud words={skillCloud} pointerRef={pointerRef} />
            <span className={`mono ${styles.hint}`}>Move your cursor to steer</span>
          </Reveal>

          <Stagger className={styles.groups} step={0.1}>
            {skills.map((g) => (
              <motion.div key={g.group} className={styles.group} variants={item}>
                <h3 className={`mono ${styles.groupTitle}`}>{g.group}</h3>
                <ul className={styles.items}>
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
