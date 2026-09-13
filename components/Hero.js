import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '@/data/profile';
import styles from './Hero.module.css';

const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false });

const EASE = [0.22, 1, 0.36, 1];

function Word({ children, delay }) {
  return (
    <span className={styles.wordClip}>
      <motion.span
        className={styles.word}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ pointerRef }) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      scrollRef.current = v;
    });
    return unsub;
  }, [scrollYProgress]);

  const title = ['Justin', 'Wang'];

  return (
    <section id="top" ref={sectionRef} className={styles.hero}>
      <div className={styles.scene} aria-hidden>
        <HeroScene scrollRef={scrollRef} pointerRef={pointerRef} />
        <div className={styles.vignette} />
      </div>

      <motion.div className={`container ${styles.content}`} style={{ y: textY, opacity: textOpacity }}>
        <motion.p
          className={`mono ${styles.kicker}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          {profile.role} · {profile.company} · {profile.location}
        </motion.p>

        <h1 className={`display ${styles.title}`}>
          {title.map((w, i) => (
            <Word key={w} delay={0.45 + i * 0.12}>
              {w}
            </Word>
          ))}
        </h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1 }}
        >
          <a href="#projects" className={styles.primary}>
            View projects
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className={styles.secondary}>
            GitHub
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className={`container ${styles.footerInner}`}>
          <span className="mono">Scroll</span>
          <span className={styles.scrollLine} aria-hidden>
            <span />
          </span>
          <span className="mono">UC San Diego · CS</span>
        </div>
      </motion.div>
    </section>
  );
}
