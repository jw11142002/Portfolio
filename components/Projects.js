import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '@/data/profile';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import styles from './Projects.module.css';

const ProjectGlyph = dynamic(() => import('./three/ProjectGlyph'), { ssr: false });

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 160, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 160, damping: 20 });
  const glowX = useTransform(mx, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['20%', '80%']);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setActive(false);
  };

  const reversed = index % 2 === 1;

  return (
    <Reveal as="li" className={`${styles.card} ${reversed ? styles.reversed : ''}`}>
      <motion.a
        ref={ref}
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        className={styles.inner}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
        onPointerMove={onMove}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={onLeave}
      >
        <motion.span
          className={styles.glow}
          style={{ '--gx': glowX, '--gy': glowY }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden
        />

        <div className={styles.visual}>
          <ProjectGlyph kind={project.glyph} active={active} />
          <span className={`mono ${styles.num}`}>0{index + 1}</span>
          <span className={`${styles.status} ${styles[`status_${project.status.replace(/\s+/g, '')}`] || ''}`}>
            <span className={styles.statusDot} aria-hidden />
            {project.status}
          </span>
        </div>

        <div className={styles.text}>
          <div className={styles.titleRow}>
            <h3 className={`display ${styles.name}`}>{project.name}</h3>
            <span className={styles.ext} aria-hidden>
              ↗
            </span>
          </div>
          <p className={styles.tagline}>{project.tagline}</p>
          <p className={styles.desc}>{project.description}</p>

          <ul className={styles.highlights}>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <ul className={styles.stack}>
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </motion.a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Things I am building."
          lede="Small products for my friends and myself. Each one starts as a real annoyance and ends as a repository."
        />
        <ul className={styles.list}>
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
