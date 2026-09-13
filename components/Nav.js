import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { profile } from '@/data/profile';
import styles from './Nav.module.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.div className={styles.progress} style={{ scaleX: progress }} />
      <motion.header
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className={`container ${styles.inner}`}>
          <a href="#top" className={styles.brand} aria-label="Back to top">
            <span className={styles.mark} aria-hidden />
            <span className={styles.brandText}>{profile.name}</span>
          </a>

          <nav className={styles.links} aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={`${styles.link} ${active === l.id ? styles.active : ''}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={styles.right}>
            <a className={styles.cta} href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <button
              className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className={styles.sheet}
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 0.35 }}
        aria-hidden={!open}
      >
        <div className={styles.sheetLinks}>
          {LINKS.map((l, i) => (
            <motion.a
              key={l.id}
              href={`#${l.id}`}
              className={`display ${styles.sheetLink}`}
              onClick={() => setOpen(false)}
              initial={false}
              animate={open ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              transition={{ delay: open ? 0.05 + i * 0.05 : 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mono">0{i + 1}</span>
              {l.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
