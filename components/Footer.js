import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import Reveal from './Reveal';
import styles from './Footer.module.css';

const LINKS = [
  { label: 'LinkedIn', href: profile.links.linkedin, meta: 'in/justinyjwang' },
  { label: 'GitHub', href: profile.links.github, meta: 'jw11142002' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <Reveal>
            <p className="mono">06 · Contact</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={`display ${styles.title}`}>
              Let&rsquo;s build something
              <br />
              <em>worth shipping.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              I am open to conversations about data infrastructure, developer tools, and interesting engineering problems. The fastest way to reach me is LinkedIn.
            </p>
          </Reveal>
        </div>

        <ul className={styles.links}>
          {LINKS.map((l, i) => (
            <Reveal as="li" key={l.label} delay={0.1 + i * 0.08}>
              <motion.a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <span className={styles.linkLabel}>{l.label}</span>
                <span className={styles.linkMeta}>{l.meta}</span>
                <span className={styles.linkArrow} aria-hidden>
                  ↗
                </span>
              </motion.a>
            </Reveal>
          ))}
        </ul>

        <div className={styles.bottom}>
          <span className="mono">
            © {year} {profile.name}
          </span>
          <span className="mono">Next.js · three.js · framer-motion</span>
          <a href="#top" className={`mono ${styles.up}`}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
