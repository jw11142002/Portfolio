import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function makeLabelTexture(text, { color = '#e9e7e2', accent = false } = {}) {
  const scale = 2;
  const font = `500 ${26 * scale}px ${accent ? 'Georgia, serif' : 'Inter, system-ui, sans-serif'}`;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const padding = 12 * scale;
  canvas.width = Math.ceil(metrics.width + padding * 2);
  canvas.height = Math.ceil(40 * scale + padding);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  return { tex, aspect: canvas.width / canvas.height };
}

function Cloud({ words, pointerRef }) {
  const group = useRef();
  const spritesRef = useRef([]);
  const radius = 3.1;

  const items = useMemo(() => {
    const n = words.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return words.map((word, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const accent = i % 5 === 0;
      const { tex, aspect } = makeLabelTexture(word, { accent, color: accent ? '#c9b79c' : '#e9e7e2' });
      return {
        word,
        position: new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius),
        tex,
        aspect,
      };
    });
  }, [words]);

  useEffect(() => () => items.forEach((it) => it.tex.dispose()), [items]);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, clock }, delta) => {
    if (!group.current) return;
    const px = pointerRef?.current?.x ?? 0;
    const py = pointerRef?.current?.y ?? 0;
    group.current.rotation.y += delta * (0.12 + px * 0.25);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -py * 0.35, 3, delta);
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.08;

    spritesRef.current.forEach((sprite) => {
      if (!sprite) return;
      sprite.getWorldPosition(tmp);
      const depth = camera.position.distanceTo(tmp);
      // fade labels on the far side of the sphere so the front reads clearly
      const t = THREE.MathUtils.clamp((depth - (camera.position.z - radius)) / (radius * 2), 0, 1);
      sprite.material.opacity = THREE.MathUtils.lerp(1, 0.12, t);
      const s = THREE.MathUtils.lerp(1.05, 0.7, t);
      sprite.scale.set(s * sprite.userData.aspect * 0.42, s * 0.42, 1);
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <sprite
          key={it.word}
          position={it.position}
          ref={(el) => (spritesRef.current[i] = el)}
          userData={{ aspect: it.aspect }}
        >
          <spriteMaterial map={it.tex} transparent depthWrite={false} />
        </sprite>
      ))}
      <mesh>
        <sphereGeometry args={[radius * 0.96, 24, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.035} />
      </mesh>
    </group>
  );
}

export default function SkillsCloud({ words, pointerRef }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8.2], fov: 42 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Cloud words={words} pointerRef={pointerRef} />
    </Canvas>
  );
}
