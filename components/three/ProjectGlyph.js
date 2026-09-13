import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = '#c9b79c';
const GREY = '#8a877f';

function damp(current, target, lambda, delta) {
  return THREE.MathUtils.damp(current, target, lambda, delta);
}

/* Topographic contour rings, like a hillside seen from above. */
function TerrainGlyph({ active }) {
  const group = useRef();
  const rings = useMemo(() => {
    const out = [];
    const levels = 7;
    for (let i = 0; i < levels; i++) {
      const r = 1.55 - i * 0.2;
      const pts = [];
      const segs = 96;
      for (let j = 0; j < segs; j++) {
        const a = (j / segs) * Math.PI * 2;
        const wobble = 1 + 0.12 * Math.sin(a * 3 + i * 0.9) + 0.06 * Math.cos(a * 5 - i * 1.7);
        pts.push(Math.cos(a) * r * wobble, i * 0.16 - 0.5, Math.sin(a) * r * wobble);
      }
      out.push({ positions: new Float32Array(pts), count: segs, top: i === levels - 1 });
    }
    return out;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const speed = active ? 0.9 : 0.25;
    group.current.rotation.y += delta * speed;
    group.current.rotation.x = damp(group.current.rotation.x, active ? 0.55 : 0.35, 4, delta);
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      {rings.map((r, i) => (
        <lineLoop key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={r.positions} count={r.count} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color={r.top ? ACCENT : GREY} transparent opacity={r.top ? 0.9 : 0.35 + i * 0.06} />
        </lineLoop>
      ))}
    </group>
  );
}

/* A sphere split into two halves that drift apart. */
function SplitGlyph({ active }) {
  const left = useRef();
  const right = useRef();
  const group = useRef();

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y += delta * (active ? 0.7 : 0.2);
    const gap = active ? 0.42 : 0.12 + Math.sin(t * 0.8) * 0.04;
    left.current.position.x = damp(left.current.position.x, -gap, 5, delta);
    right.current.position.x = damp(right.current.position.x, gap, 5, delta);
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0.15]}>
      <mesh ref={left} rotation={[0, Math.PI / 2, 0]}>
        <sphereGeometry args={[1.15, 18, 12, 0, Math.PI]} />
        <meshBasicMaterial color={GREY} wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={right} rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[1.15, 18, 12, 0, Math.PI]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* Nested octahedra turning at different rates. */
function StackGlyph({ active }) {
  const a = useRef();
  const b = useRef();
  const c = useRef();

  useFrame((_, delta) => {
    const s = active ? 2.2 : 1;
    if (a.current) {
      a.current.rotation.y += delta * 0.25 * s;
      a.current.rotation.x += delta * 0.1 * s;
    }
    if (b.current) {
      b.current.rotation.y -= delta * 0.4 * s;
      b.current.rotation.z += delta * 0.15 * s;
    }
    if (c.current) {
      c.current.rotation.x += delta * 0.6 * s;
    }
  });

  return (
    <group>
      <mesh ref={a}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={GREY} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={b}>
        <octahedronGeometry args={[1.0, 0]} />
        <meshBasicMaterial color={GREY} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={c}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

const GLYPHS = { terrain: TerrainGlyph, split: SplitGlyph, stack: StackGlyph };

export default function ProjectGlyph({ kind = 'stack', active = false }) {
  const Glyph = GLYPHS[kind] || StackGlyph;
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.4, 4.6], fov: 40 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Glyph active={active} />
    </Canvas>
  );
}
