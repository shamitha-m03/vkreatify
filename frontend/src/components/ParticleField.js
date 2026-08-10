import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = `
attribute float aSize;
attribute float aSeed;
uniform float uTime;
uniform vec3 uMouse;
uniform float uSpread;
uniform float uFade;
uniform float uPx;
varying float vAlpha;
varying float vSeed;
void main() {
  vec3 pos = position;
  float breathe = 1.0 + 0.028 * sin(uTime * 0.55 + aSeed * 6.2831);
  pos *= breathe * (1.0 + uSpread * (0.5 + aSeed * 1.1));
  vec4 world = modelMatrix * vec4(pos, 1.0);
  float d = distance(world.xyz, uMouse);
  float f = smoothstep(1.5, 0.0, d);
  vec3 dir = normalize(world.xyz - uMouse + vec3(0.0001));
  world.xyz += dir * f * 0.5;
  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  float tw = 0.72 + 0.28 * sin(uTime * (1.2 + aSeed * 2.4) + aSeed * 40.0);
  vAlpha = uFade * tw * 0.62;
  vSeed = aSeed;
  gl_PointSize = aSize * uPx * (11.0 / -mv.z);
}
`;

const FRAG = `
precision mediump float;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
varying float vAlpha;
varying float vSeed;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float disc = smoothstep(0.5, 0.04, d);
  float core = smoothstep(0.16, 0.0, d);
  vec3 col = mix(uColB, uColA, vSeed);
  col = mix(col, uColC, core * 0.85);
  float a = disc * vAlpha;
  if (a < 0.012) discard;
  gl_FragColor = vec4(col, a);
}
`;

const GLIT_VERT = `
attribute vec3 aDir;
attribute float aSeed;
attribute float aSpeed;
attribute float aLen;
attribute float aSize;
uniform float uTime;
uniform float uSpread;
uniform float uFade;
uniform float uPx;
varying float vAlpha;
varying float vSeed;
void main() {
  float t = fract(uTime * aSpeed + aSeed);
  float ease = pow(t, 1.65);
  vec3 pos = position + aDir * ease * aLen * (1.0 + uSpread * 0.8);
  pos.y -= t * t * aLen * 0.12;
  pos.x += sin(aSeed * 21.0 + uTime * 0.8) * 0.04;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 0.5 + 0.5 * sin(uTime * 9.0 + aSeed * 50.0);
  vAlpha = (1.0 - t) * smoothstep(0.0, 0.06, t) * uFade * (0.25 + 0.45 * tw);
  vSeed = aSeed;
  gl_PointSize = aSize * (1.0 - t * 0.55) * uPx * (10.0 / -mv.z);
}
`;

const DUST_VERT = `
attribute float aSize;
attribute float aSeed;
uniform float uTime;
uniform float uFade;
uniform float uPx;
varying float vAlpha;
varying float vSeed;
void main() {
  vec3 pos = position;
  pos.x += sin(uTime * 0.18 + aSeed * 7.0) * 0.35;
  pos.y += cos(uTime * 0.14 + aSeed * 9.0) * 0.35;
  pos.z += sin(uTime * 0.1 + aSeed * 5.0) * 0.3;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  vAlpha = uFade * (0.35 + 0.3 * sin(uTime * 0.9 + aSeed * 30.0));
  vSeed = aSeed;
  gl_PointSize = aSize * uPx * (9.0 / -mv.z);
}
`;

const ANCHORS = [
  { p: 0.0, x: 0.55, y: 0.0, z: 0.0, s: 1.0, spread: 0.0, net: 0.0, fade: 1.0 },
  { p: 0.13, x: 0.35, y: 0.18, z: -0.4, s: 0.9, spread: 0.28, net: 0.0, fade: 1.0 },
  { p: 0.3, x: -0.8, y: 0.0, z: -0.6, s: 0.8, spread: 0.72, net: 0.0, fade: 0.95 },
  { p: 0.48, x: 0.8, y: -0.05, z: -0.3, s: 0.85, spread: 0.35, net: 1.0, fade: 0.95 },
  { p: 0.66, x: -0.25, y: 0.1, z: -0.9, s: 0.68, spread: 0.15, net: 0.2, fade: 0.85 },
  { p: 0.84, x: 0.2, y: 0.0, z: -1.2, s: 0.58, spread: 0.95, net: 0.0, fade: 0.6 },
  { p: 1.0, x: 0.0, y: -0.2, z: -1.6, s: 0.5, spread: 1.3, net: 0.0, fade: 0.12 },
];

function sample(p) {
  let a = ANCHORS[0];
  let b = ANCHORS[ANCHORS.length - 1];
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    if (p >= ANCHORS[i].p && p <= ANCHORS[i + 1].p) {
      a = ANCHORS[i];
      b = ANCHORS[i + 1];
      break;
    }
  }
  const t = a === b ? 0 : (p - a.p) / (b.p - a.p);
  const out = {};
  for (const k of ["x", "y", "z", "s", "spread", "net", "fade"]) {
    out[k] = a[k] + (b[k] - a[k]) * t;
  }
  return out;
}

export default function ParticleField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile =
      window.innerWidth < 768 ||
      new URLSearchParams(window.location.search).has("lowfx");
    const SHELL = mobile ? 2400 : 5600;
    const GLIT = mobile ? 650 : 1500;
    const DUST = mobile ? 260 : 620;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      60
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(mobile ? 1 : Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const goldA = new THREE.Color("#ffd76a");
    const goldB = new THREE.Color("#ff9d2e");
    const hot = new THREE.Color("#fff6dd");
    const dustCol = new THREE.Color("#8fb8ff");

    const R = 1.55;
    const shellPos = new Float32Array(SHELL * 3);
    const shellSize = new Float32Array(SHELL);
    const shellSeed = new Float32Array(SHELL);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < SHELL; i++) {
      const inner = i % 10 < 3;
      const y = 1 - (i / (SHELL - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      const jit = inner ? Math.pow(Math.random(), 0.7) * 0.88 : 0.94 + Math.random() * 0.09;
      shellPos[i * 3] = Math.cos(th) * rad * R * jit;
      shellPos[i * 3 + 1] = y * R * jit;
      shellPos[i * 3 + 2] = Math.sin(th) * rad * R * jit;
      shellSize[i] = inner ? 1.2 + Math.random() * 2.2 : 1.6 + Math.random() * 3.4;
      shellSeed[i] = Math.random();
    }
    const shellGeo = new THREE.BufferGeometry();
    shellGeo.setAttribute("position", new THREE.BufferAttribute(shellPos, 3));
    shellGeo.setAttribute("aSize", new THREE.BufferAttribute(shellSize, 1));
    shellGeo.setAttribute("aSeed", new THREE.BufferAttribute(shellSeed, 1));

    const shared = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uSpread: { value: 0 },
      uFade: { value: 0 },
      uPx: { value: renderer.getPixelRatio() },
    };
    const shellMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: { ...shared, uColA: { value: goldA }, uColB: { value: goldB }, uColC: { value: hot } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(shellGeo, shellMat));

    const glitPos = new Float32Array(GLIT * 3);
    const glitDir = new Float32Array(GLIT * 3);
    const glitSeed = new Float32Array(GLIT);
    const glitSpeed = new Float32Array(GLIT);
    const glitLen = new Float32Array(GLIT);
    const glitSize = new Float32Array(GLIT);
    for (let i = 0; i < GLIT; i++) {
      const u = Math.random();
      const v = Math.random();
      const th = 2 * Math.PI * u;
      const ph = Math.acos(2 * v - 1);
      const dx = Math.sin(ph) * Math.cos(th);
      const dy = Math.cos(ph);
      const dz = Math.sin(ph) * Math.sin(th);
      const r0 = R * (0.96 + Math.random() * 0.08);
      glitPos[i * 3] = dx * r0;
      glitPos[i * 3 + 1] = dy * r0;
      glitPos[i * 3 + 2] = dz * r0;
      glitDir[i * 3] = dx + (Math.random() - 0.5) * 0.55;
      glitDir[i * 3 + 1] = dy + (Math.random() - 0.5) * 0.55;
      glitDir[i * 3 + 2] = dz + (Math.random() - 0.5) * 0.55;
      glitSeed[i] = Math.random();
      glitSpeed[i] = 0.06 + Math.random() * 0.16;
      glitLen[i] = 1.1 + Math.random() * 2.3;
      glitSize[i] = 1.0 + Math.random() * 2.6;
    }
    const glitGeo = new THREE.BufferGeometry();
    glitGeo.setAttribute("position", new THREE.BufferAttribute(glitPos, 3));
    glitGeo.setAttribute("aDir", new THREE.BufferAttribute(glitDir, 3));
    glitGeo.setAttribute("aSeed", new THREE.BufferAttribute(glitSeed, 1));
    glitGeo.setAttribute("aSpeed", new THREE.BufferAttribute(glitSpeed, 1));
    glitGeo.setAttribute("aLen", new THREE.BufferAttribute(glitLen, 1));
    glitGeo.setAttribute("aSize", new THREE.BufferAttribute(glitSize, 1));
    const glitMat = new THREE.ShaderMaterial({
      vertexShader: GLIT_VERT,
      fragmentShader: FRAG,
      uniforms: { ...shared, uColA: { value: goldA }, uColB: { value: goldB }, uColC: { value: hot } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(glitGeo, glitMat));

    const lineCount = mobile ? 320 : 760;
    const linePos = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount; i++) {
      const a = Math.floor(Math.random() * SHELL);
      const b = (a + 1 + Math.floor(Math.random() * 24)) % SHELL;
      linePos.set(shellPos.slice(a * 3, a * 3 + 3), i * 6);
      linePos.set(shellPos.slice(b * 3, b * 3 + 3), i * 6 + 3);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffd76a,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    const dustPos = new Float32Array(DUST * 3);
    const dustSize = new Float32Array(DUST);
    const dustSeed = new Float32Array(DUST);
    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 16;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      dustSize[i] = 0.6 + Math.random() * 1.6;
      dustSeed[i] = Math.random();
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("aSize", new THREE.BufferAttribute(dustSize, 1));
    dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1));
    const dustMat = new THREE.ShaderMaterial({
      vertexShader: DUST_VERT,
      fragmentShader: FRAG,
      uniforms: { ...shared, uColA: { value: dustCol }, uColB: { value: new THREE.Color("#3f5f9e") }, uColC: { value: hot } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    const ndc = new THREE.Vector2(0, 0);
    const mouseWorld = new THREE.Vector3(99, 99, 0);
    const onMove = (e) => {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const cur = { x: 0.85, y: 0, z: 0, s: 1, spread: 0, net: 0, fade: 0 };
    let rotY = 0;
    let raf;
    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();

    const tick = () => {
      const t = clock.getElapsedTime();
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      const target = sample(p);
      for (const k of Object.keys(cur)) {
        cur[k] += (target[k] - cur[k]) * 0.055;
      }
      tmp.set(ndc.x, ndc.y, 0.5).unproject(camera);
      const dir = tmp.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const mw = camera.position.clone().add(dir.multiplyScalar(dist));
      mouseWorld.lerp(mw, 0.08);

      shellMat.uniforms.uTime.value = t;
      shellMat.uniforms.uMouse.value.copy(mouseWorld);
      shellMat.uniforms.uSpread.value = cur.spread;
      shellMat.uniforms.uFade.value = cur.fade;
      glitMat.uniforms.uTime.value = t;
      glitMat.uniforms.uSpread.value = cur.spread;
      glitMat.uniforms.uFade.value = cur.fade;
      dustMat.uniforms.uTime.value = t;
      dustMat.uniforms.uFade.value = Math.min(1, cur.fade + 0.15);

      lineMat.opacity = cur.net * cur.fade * 0.22;

      rotY += 0.0011;
      group.rotation.y += (rotY + ndc.x * 0.4 - group.rotation.y) * 0.05;
      group.rotation.x += (ndc.y * -0.22 - group.rotation.x) * 0.05;
      group.position.set(cur.x, cur.y, cur.z);
      group.scale.setScalar(cur.s);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      cur.fade = 1;
      shellMat.uniforms.uFade.value = 1;
      glitMat.uniforms.uFade.value = 1;
      dustMat.uniforms.uFade.value = 1;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      shellGeo.dispose();
      glitGeo.dispose();
      lineGeo.dispose();
      dustGeo.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (mountRef.current) mountRef.current.style.opacity = "1";
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={mountRef}
      data-testid="particle-field"
      className="fixed inset-0 z-0 pointer-events-none opacity-0 transition-opacity ease-out"
      style={{ transitionDuration: "2200ms" }}
      aria-hidden="true"
    />
  );
}
