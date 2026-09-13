import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { profile } from '@/data/profile';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

const TITLE = `${profile.name} — ${profile.role}`;
const DESCRIPTION = profile.tagline;

export default function HomePage() {
  // Normalised pointer position (-0.5..0.5) shared by every three.js scene
  // so all of them respond to the same cursor without extra listeners.
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current.x = e.clientX / window.innerWidth - 0.5;
      pointerRef.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Nav />
      <main>
        <Hero pointerRef={pointerRef} />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Skills pointerRef={pointerRef} />
      </main>
      <Footer />
    </>
  );
}
