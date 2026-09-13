import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience } from '@/data/profile';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import styles from './Experience.module.css';

function Entry({ job, index }) {
  return (
    <Reveal as="li" className={styles.entry} delay={0.05}>
      <div className={styles.rail}>
        <span className={styles.dot} />
      </div>

      <div className={styles.when}>
        <span className={styles.dates}>
          {job.start} — {job.end}
        </span>
        <span className="mono">{job.type}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.role}>{job.role}</h3>
          <p className={styles.company}>
            {job.company}
            <span className={styles.sep}>·</span>
            <span className={styles.location}>{job.location}</span>
          </p>
        </div>
        {job.team && <p className={`mono ${styles.team}`}>{job.team}</p>}
        <ul className={styles.bullets}>
          {job.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <ul className={styles.tags}>
          {job.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <span className={`mono ${styles.index}`}>0{index + 1}</span>
    </Reveal>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 70%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Experience"
          title="Where I have worked."
          lede="From cryptographic hardware in Shanghai to data governance in San Francisco, with a lecture hall of four hundred students in between."
        />

        <div className={styles.timeline} ref={listRef}>
          <div className={styles.track} aria-hidden>
            <motion.div className={styles.trackFill} style={{ scaleY: lineScale }} />
          </div>
          <ul className={styles.list}>
            {experience.map((job, i) => (
              <Entry key={`${job.company}-${job.role}`} job={job} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
