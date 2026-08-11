import { useEffect, useRef } from "react";
import * as THREE from "three";

const GLASS_VERT = `
varying vec3 vN;
varying vec3 vV;
void main() {
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const GLASS_FRAG = `
precision mediump float;
uniform vec3 uRim;
uniform vec3 uTint;
uniform float uFade;
uniform float uTime;
varying vec3 vN;
varying vec3 vV;
void main() {
  float f = abs(dot(normalize(vN), normalize(vV)));
  float rim = pow(1.0 - f, 2.6);
  float rimHot = pow(1.0 - f, 6.5);
  float shimmer = 0.85 + 0.15 * sin(uTime * 0.7 + vN.y * 6.0);
  vec3 col = uRim * rim * 1.1 * shimmer + uRim * rimHot * 1.7 + uTint * pow(1.0 - f, 4.0) * 0.4;
  col += uTint * 0.02;
  float a = (rim * 0.7 + rimHot * 0.9 + 0.03) * uFade;
  gl_FragColor = vec4(col, a);
}
`;

const PTS_VERT = `
attribute float aSize;
attribute float aSeed;
attribute float aFlare;
attribute vec3 aCol;
uniform float uTime;
uniform vec3 uMouse;
uniform float uSpread;
uniform float uFade;
uniform float uPx;
uniform float uSwirl;
uniform float uCrack;
varying float vAlpha;
varying float vFlare;
varying vec3 vCol;
void main() {
  vec3 pos = position;
  float ang = uTime * uSwirl * (0.4 + aSeed * 0.8);
  float c = cos(ang), s = sin(ang);
  pos.xz = mat2(c, -s, s, c) * pos.xz;
  pos.y += sin(uTime * 0.4 + aSeed * 20.0) * 0.05;
  pos *= (1.0 + uSpread * (0.5 + aSeed));
  pos *= (1.0 + uCrack * (1.2 + aSeed * 1.6));
  pos.y -= uCrack * (0.3 + aSeed * 1.2);
  vec4 world = modelMatrix * vec4(pos, 1.0);
  float d = distance(world.xyz, uMouse);
  float f = smoothstep(1.5, 0.0, d);
  world.xyz += normalize(world.xyz - uMouse + vec3(0.0001)) * f * 0.45;
  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  float tw = pow(0.5 + 0.5 * sin(uTime * (1.5 + aSeed * 3.0) + aSeed * 60.0), 2.0) * 1.35;
  vAlpha = uFade * min(tw, 1.0) * 0.95 * (1.0 - smoothstep(0.85, 1.0, uCrack) * 0.55);
  vFlare = aFlare;
  vCol = aCol;
  float sizePulse = 1.0 + aFlare * 0.55 * sin(uTime * 6.0 + aSeed * 90.0);
  gl_PointSize = aSize * sizePulse * uPx * (12.0 / -mv.z);
}
`;

const RAIN_VERT = `
attribute vec3 aDir;
attribute float aSeed;
attribute float aSpeed;
attribute float aMode;
attribute float aSize;
attribute float aLen;
attribute float aFlare;
attribute vec3 aCol;
uniform float uTime;
uniform float uSpread;
uniform float uFade;
uniform float uPx;
uniform float uCrack;
varying float vAlpha;
varying float vFlare;
varying vec3 vCol;
void main() {
  float t = fract(uTime * aSpeed + aSeed);
  vec3 pos;
  float alpha;
  if (aMode < 0.5) {
    float e = pow(t, 1.6);
    pos = position + aDir * e * aLen * (1.0 + uSpread * 0.8 + uCrack * 2.2);
    pos.y -= t * t * aLen * 0.1;
    pos.x += sin(aSeed * 21.0 + uTime * 0.8) * 0.05;
    alpha = (1.0 - t) * smoothstep(0.0, 0.05, t) * (1.0 + uCrack * 0.6);
  } else {
    float floorY = -2.02;
    float fallT = 0.55 - uCrack * 0.25;
    if (t < fallT) {
      float ft = t / fallT;
      pos = position;
      pos.y = mix(position.y, floorY, ft * ft);
      pos.x += sin(aSeed * 30.0 + ft * 6.0) * 0.08 * ft;
      pos.z += cos(aSeed * 24.0 + ft * 5.0) * 0.06 * ft;
      alpha = smoothstep(0.0, 0.06, t);
    } else {
      float st = (t - fallT) / (1.0 - fallT);
      pos = vec3(position.x, floorY, position.z) + vec3(aDir.x, 0.0, aDir.z) * st * aLen * (0.6 + uCrack * 1.4);
      pos.y += sin(st * 3.1415) * 0.03;
      alpha = 1.0 - st * 0.9;
    }
  }
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 0.5 + 0.5 * sin(uTime * 8.0 + aSeed * 50.0);
  vAlpha = alpha * uFade * (0.5 + 0.5 * tw);
  vFlare = aFlare;
  vCol = aCol;
  gl_PointSize = aSize * uPx * (11.0 / -mv.z);
}
`;

const DUST_VERT = `
attribute float aSize;
attribute float aSeed;
attribute float aFlare;
attribute vec3 aCol;
uniform float uTime;
uniform float uFade;
uniform float uPx;
varying float vAlpha;
varying float vFlare;
varying vec3 vCol;
void main() {
  vec3 pos = position;
  pos.x += sin(uTime * 0.16 + aSeed * 7.0) * 0.4;
  pos.y += cos(uTime * 0.13 + aSeed * 9.0) * 0.4;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  vAlpha = uFade * (0.22 + 0.2 * sin(uTime * 0.8 + aSeed * 30.0));
  vFlare = aFlare;
  vCol = aCol;
  gl_PointSize = aSize * uPx * (10.0 / -mv.z);
}
`;

const PTS_FRAG = `
precision mediump float;
varying float vAlpha;
varying float vFlare;
varying vec3 vCol;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float disc = smoothstep(0.5, 0.05, d);
  float core = smoothstep(0.15, 0.0, d);
  float fx = smoothstep(0.045, 0.0, abs(uv.y)) * smoothstep(0.5, 0.0, abs(uv.x));
  float fy = smoothstep(0.045, 0.0, abs(uv.x)) * smoothstep(0.5, 0.0, abs(uv.y));
  float star = (fx + fy) * 0.8;
  float a = disc * (1.0 - vFlare * 0.35) + star * vFlare;
  a *= vAlpha;
  if (a < 0.012) discard;
  vec3 col = mix(vCol, vec3(1.0, 1.0, 1.0), core * 0.7);
  gl_FragColor = vec4(col, a);
}
`;

const GLOW_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const GLOW_FRAG = `
precision mediump float;
uniform float uFade;
uniform float uCrack;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.0, d);
  a *= a;
  gl_FragColor = vec4(vec3(0.85, 0.88, 0.95), a * 0.1 * uFade * (1.0 + uCrack * 1.2));
}
`;

const WHITES = ["#ffffff", "#f4f6fa", "#e6eaf2", "#eef1f7", "#f9fbff"];
const SILVERS = ["#c8d2e0", "#aeb9cc", "#dfe6f2", "#bcc7d9"];

const ANCHORS = [
  { p: 0.0, x: 0.55, y: 0.0, z: 0.0, s: 1.0, spread: 0.0, net: 0.0, fade: 1.0, crack: 0.0 },
  { p: 0.13, x: 0.35, y: 0.18, z: -0.4, s: 0.9, spread: 0.28, net: 0.0, fade: 1.0, crack: 0.0 },
  { p: 0.3, x: -0.8, y: 0.0, z: -0.6, s: 0.8, spread: 0.72, net: 0.0, fade: 0.95, crack: 0.0 },
  { p: 0.48, x: 0.8, y: -0.05, z: -0.3, s: 0.85, spread: 0.35, net: 1.0, fade: 0.95, crack: 0.0 },
  { p: 0.66, x: -0.2, y: 0.05, z: -0.9, s: 0.7, spread: 0.1, net: 0.15, fade: 0.9, crack: 0.0 },
  { p: 0.84, x: 0.15, y: 0.0, z: -0.7, s: 0.72, spread: 0.05, net: 0.0, fade: 0.95, crack: 0.0 },
  { p: 1.0, x: 0.0, y: 0.05, z: -0.7, s: 0.78, spread: 0.35, net: 0.0, fade: 0.7, crack: 1.0 },
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
  for (const k of ["x", "y", "z", "s", "spread", "net", "fade", "crack"]) {
    out[k] = a[k] + (b[k] - a[k]) * t;
  }
  return out;
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const col = (hex) => new THREE.Color(hex);

export default function CrystalSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const low =
      window.innerWidth < 768 ||
      new URLSearchParams(window.location.search).has("lowfx");
    const INNER = low ? 2600 : 5200;
    const RAIN = low ? 1500 : 3400;
    const DUST = low ? 220 : 520;
    const LINES = low ? 240 : 520;
    const R = 1.55;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(low ? 1 : Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const shared = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uSpread: { value: 0 },
      uFade: { value: 0 },
      uPx: { value: renderer.getPixelRatio() },
      uCrack: { value: 0 },
    };

    const mkPtsGeo = (n, fill) => {
      const pos = new Float32Array(n * 3);
      const dir = new Float32Array(n * 3);
      const size = new Float32Array(n);
      const seed = new Float32Array(n);
      const flare = new Float32Array(n);
      const cArr = new Float32Array(n * 3);
      const speed = new Float32Array(n);
      const mode = new Float32Array(n);
      const len = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const d = fill(i, pos, dir);
        size[i] = d.size;
        seed[i] = d.seed;
        flare[i] = d.flare;
        const c = col(d.color);
        cArr[i * 3] = c.r;
        cArr[i * 3 + 1] = c.g;
        cArr[i * 3 + 2] = c.b;
        speed[i] = d.speed || 0;
        mode[i] = d.mode || 0;
        len[i] = d.len || 0;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("aDir", new THREE.BufferAttribute(dir, 3));
      g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      g.setAttribute("aFlare", new THREE.BufferAttribute(flare, 1));
      g.setAttribute("aCol", new THREE.BufferAttribute(cArr, 3));
      g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
      g.setAttribute("aMode", new THREE.BufferAttribute(mode, 1));
      g.setAttribute("aLen", new THREE.BufferAttribute(len, 1));
      return g;
    };

    const randDir = () => {
      const u = Math.random();
      const v = Math.random();
      const th = 2 * Math.PI * u;
      const ph = Math.acos(2 * v - 1);
      return [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)];
    };

    const innerGeo = mkPtsGeo(INNER, (i, pos) => {
      const [dx, dy, dz] = randDir();
      const rr = R * Math.pow(Math.random(), 0.6) * 0.97;
      pos[i * 3] = dx * rr;
      pos[i * 3 + 1] = dy * rr;
      pos[i * 3 + 2] = dz * rr;
      const gold = Math.random() < 0.75;
      const flare = Math.random() < 0.28 ? 1 : 0;
      return {
        size: flare ? 1.8 + Math.random() * 1.6 : 0.7 + Math.random() * 1.3,
        seed: Math.random(),
        flare,
        color: gold ? pick(WHITES) : pick(SILVERS),
      };
    });
    const innerMat = new THREE.ShaderMaterial({
      vertexShader: PTS_VERT,
      fragmentShader: PTS_FRAG,
      uniforms: { ...shared, uSwirl: { value: 0.06 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(innerGeo, innerMat));

    const rainGeo = mkPtsGeo(RAIN, (i, pos, dir) => {
      const rain = Math.random() < 0.62;
      const [dx0, dy0, dz0] = randDir();
      const dy = rain ? -Math.abs(dy0) * 0.9 - 0.05 : dy0;
      const norm = Math.sqrt(dx0 * dx0 + dy * dy + dz0 * dz0) || 1;
      const dx = dx0 / norm;
      const dz = dz0 / norm;
      const dyn = dy / norm;
      const r0 = R * (0.96 + Math.random() * 0.08);
      pos[i * 3] = dx * r0;
      pos[i * 3 + 1] = dyn * r0;
      pos[i * 3 + 2] = dz * r0;
      if (rain) {
        const hl = Math.sqrt(dx * dx + dz * dz) || 1;
        dir[i * 3] = dx / hl + (Math.random() - 0.5) * 0.4;
        dir[i * 3 + 1] = 0;
        dir[i * 3 + 2] = dz / hl + (Math.random() - 0.5) * 0.4;
      } else {
        dir[i * 3] = dx + (Math.random() - 0.5) * 0.55;
        dir[i * 3 + 1] = dyn + (Math.random() - 0.5) * 0.55;
        dir[i * 3 + 2] = dz + (Math.random() - 0.5) * 0.55;
      }
      const gold = Math.random() < 0.8;
      return {
        size: 0.6 + Math.random() * 1.2,
        seed: Math.random(),
        flare: Math.random() < 0.34 ? 1 : 0,
        color: gold ? pick(WHITES) : pick(SILVERS),
        speed: 0.07 + Math.random() * 0.15,
        mode: rain ? 1 : 0,
        len: 1.1 + Math.random() * 2.4,
      };
    });
    const rainMat = new THREE.ShaderMaterial({
      vertexShader: RAIN_VERT,
      fragmentShader: PTS_FRAG,
      uniforms: { ...shared },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(rainGeo, rainMat));

    const glowGeo = new THREE.CircleGeometry(2.6, 48);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: GLOW_VERT,
      fragmentShader: GLOW_FRAG,
      uniforms: { uFade: shared.uFade, uCrack: shared.uCrack },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -2.03;
    group.add(glow);

    const linePos = new Float32Array(LINES * 6);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const shellPts = new Float32Array(LINES * 4 * 3);
    for (let i = 0; i < LINES * 4; i++) {
      const y = 1 - (i / (LINES * 4 - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      shellPts[i * 3] = Math.cos(th) * rad * R;
      shellPts[i * 3 + 1] = y * R;
      shellPts[i * 3 + 2] = Math.sin(th) * rad * R;
    }
    for (let i = 0; i < LINES; i++) {
      const a = Math.floor(Math.random() * LINES * 4);
      const b = (a + 1 + Math.floor(Math.random() * 18)) % (LINES * 4);
      linePos.set(shellPts.slice(a * 3, a * 3 + 3), i * 6);
      linePos.set(shellPts.slice(b * 3, b * 3 + 3), i * 6 + 3);
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

    const dustGeo = mkPtsGeo(DUST, (i, pos) => {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      return {
        size: 1.5 + Math.random() * 4.0,
        seed: Math.random(),
        flare: Math.random() < 0.15 ? 1 : 0,
        color: Math.random() < 0.6 ? pick(SILVERS) : pick(WHITES),
      };
    });
    const dustMat = new THREE.ShaderMaterial({
      vertexShader: DUST_VERT,
      fragmentShader: PTS_FRAG,
      uniforms: { ...shared },
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

    const cur = { x: 0.55, y: 0, z: 0, s: 1, spread: 0, net: 0, fade: 0, crack: 0 };
    let rotY = 0;
    let raf;
    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();

    const applyFrame = (t) => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      const target = sample(p);
      for (const k of Object.keys(cur)) {
        cur[k] += (target[k] - cur[k]) * 0.055;
      }
      tmp.set(ndc.x, ndc.y, 0.5).unproject(camera);
      const dirv = tmp.sub(camera.position).normalize();
      const dist = -camera.position.z / dirv.z;
      const mw = camera.position.clone().add(dirv.multiplyScalar(dist));
      mouseWorld.lerp(mw, 0.08);

      shared.uTime.value = t;
      shared.uMouse.value.copy(mouseWorld);
      shared.uSpread.value = cur.spread;
      shared.uFade.value = cur.fade;
      shared.uCrack.value = cur.crack;
      innerMat.uniforms.uSwirl.value = 0.06 * (1 + cur.crack * 3);
      glow.scale.setScalar(1 + cur.crack * 0.8);
      lineMat.opacity = cur.net * cur.fade * 0.2;

      rotY += 0.0009;
      group.rotation.y += (rotY + ndc.x * 0.4 - group.rotation.y) * 0.05;
      group.rotation.x += (ndc.y * -0.22 - group.rotation.x) * 0.05;
      group.position.set(cur.x, cur.y, cur.z);
      group.scale.setScalar(cur.s);

      renderer.render(scene, camera);
    };

    const tick = () => {
      applyFrame(clock.getElapsedTime());
      raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      cur.fade = 1;
      shared.uFade.value = 1;
      applyFrame(14);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      innerGeo.dispose();
      rainGeo.dispose();
      glowGeo.dispose();
      lineGeo.dispose();
      dustGeo.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
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
      data-testid="crystal-sphere"
      className="fixed inset-0 z-0 pointer-events-none opacity-0 transition-opacity ease-out"
      style={{ transitionDuration: "2200ms" }}
      aria-hidden="true"
    />
  );
}
