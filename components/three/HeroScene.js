import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NOISE_GLSL = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float terrain(vec2 p, float t) {
    float h = 0.0;
    h += snoise(p * 0.09 + vec2(t * 0.02, 0.0)) * 1.6;
    h += snoise(p * 0.22 + vec2(0.0, t * 0.035)) * 0.6;
    h += snoise(p * 0.55 + vec2(t * 0.05)) * 0.18;
    // carve a valley through the middle so the type sits in a calm area
    float valley = smoothstep(0.0, 9.0, abs(p.x));
    return h * mix(0.15, 1.0, valley);
  }
`;

const VERTEX = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying float vDist;
  ${NOISE_GLSL}
  void main() {
    vec3 p = position;
    float h = terrain(p.xy, uTime);
    p.z = h;
    vHeight = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 1.6 * (60.0 / max(vDist, 1.0));
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform float uOpacity;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vHeight;
  varying float vDist;
  void main() {
    float t = smoothstep(-1.4, 1.8, vHeight);
    vec3 col = mix(uColorLow, uColorHigh, t);
    float fog = 1.0 - smoothstep(uFogNear, uFogFar, vDist);
    float a = uOpacity * fog;
    if (a < 0.003) discard;
    gl_FragColor = vec4(col, a);
  }
`;

function useTerrainMaterial(opacity, low, high) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: opacity },
          uColorLow: { value: new THREE.Color(low) },
          uColorHigh: { value: new THREE.Color(high) },
          uFogNear: { value: 14 },
          uFogFar: { value: 44 },
        },
      }),
    [opacity, low, high]
  );
}

function Terrain() {
  const wire = useTerrainMaterial(0.16, '#3a3a40', '#c9b79c');
  const dots = useTerrainMaterial(0.55, '#4a4a52', '#e9e7e2');
  const geometry = useMemo(() => new THREE.PlaneGeometry(64, 44, 150, 100), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    wire.uniforms.uTime.value = t;
    dots.uniforms.uTime.value = t;
  });

  return (
    <group rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -3.2, -6]}>
      <mesh geometry={geometry}>
        <primitive object={wire} attach="material" wireframe />
      </mesh>
      <points geometry={geometry}>
        <primitive object={dots} attach="material" />
      </points>
    </group>
  );
}

function Dust({ count = 260 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = Math.random() * 14 - 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={1.6} color="#e9e7e2" transparent opacity={0.35} sizeAttenuation={false} depthWrite={false} />
    </points>
  );
}

function Rig({ scrollRef, pointerRef }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(0, -0.6, -8), []);

  useFrame((_, delta) => {
    const s = scrollRef.current;
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    target.set(px * 1.4, 2.2 + s * 6 + py * 0.6, 12 - s * 4);
    const k = 1 - Math.exp(-delta * 3);
    camera.position.lerp(target, k);
    lookAt.set(px * 0.5, -0.6 - s * 2, -8);
    camera.lookAt(lookAt);
  });
  return null;
}

export default function HeroScene({ scrollRef, pointerRef }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 2.2, 12], fov: 48, near: 0.1, far: 120 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Rig scrollRef={scrollRef} pointerRef={pointerRef} />
      <Terrain />
      <Dust />
    </Canvas>
  );
}
