// 프로시저럴 오디오 — 음원 파일 없이 Web Audio API로 배경 앰비언스/효과음을 "합성".
// 지하철 럼블·바람·스튜디오 험·실내 톤 등을 코드로 생성하고, 설정(bgmVolume/seVolume)에 연동.
// 오토플레이 정책 때문에 첫 사용자 제스처(클릭/키)에서 audio.unlock() 으로 활성화한다.
import { settings } from "../state/settings.js";

let ctx = null, master = null, bgmGain = null, seGain = null, noiseBuf = null;
let bed = null;            // 현재 앰비언스 { type, gain, stop() }
let curType = "none";      // unlock 전에도 기억해 뒀다가 활성화 시 시작
let unlocked = false;

// 배경(bg) → 어떤 앰비언스를 깔지
export function bgAmbient(bg) {
  if (!bg) return "room";
  if (bg === "train") return "subway";
  if (bg.startsWith("rooftop") || bg.startsWith("house-ext")) return "wind";
  if (bg.startsWith("studio")) return "hum";
  if (bg === "kitchen") return "hum";
  return "room"; // office/meeting/corridor/living/room/practice/stage/backstage…
}

function build() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
  bgmGain = ctx.createGain(); bgmGain.connect(master);
  seGain = ctx.createGain(); seGain.connect(master);
  applyVolumes();
  // 핑크빛 노이즈 2초 버퍼 (앰비언스 재료, 루프)
  const len = ctx.sampleRate * 2;
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + w * 0.0990460;
    b1 = 0.96300 * b1 + w * 0.2965164;
    b2 = 0.57000 * b2 + w * 1.0526913;
    d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.25;
  }
  return true;
}

function applyVolumes() {
  if (!ctx) return;
  const s = settings.get();
  bgmGain.gain.value = Math.max(0, Math.min(1, s.bgmVolume ?? 0.6)) * 0.42; // 앰비언스는 은은하게
  seGain.gain.value = Math.max(0, Math.min(1, s.seVolume ?? 0.8)) * 0.7;
}

export const audio = {
  // 첫 사용자 제스처에서 호출
  unlock() {
    if (unlocked) { if (ctx && ctx.state === "suspended") ctx.resume(); return; }
    if (!build()) return;
    unlocked = true;
    if (ctx.state === "suspended") ctx.resume();
    if (curType && curType !== "none") this.setAmbient(curType, true);
  },
  applyVolumes,
  setAmbient(type, force = false) {
    curType = type || "none";
    if (!ctx) return; // unlock 전 — 기억만
    if (bed && bed.type === type && !force) return;
    if (bed) { // 이전 베드 페이드 아웃 후 정리
      const old = bed; bed = null;
      old.gain.gain.cancelScheduledValues(ctx.currentTime);
      old.gain.gain.setValueAtTime(old.gain.gain.value, ctx.currentTime);
      old.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      setTimeout(() => old.stop(), 900);
    }
    if (!type || type === "none") return;
    bed = makeBed(type);
  },
  playSe(name) {
    if (!ctx) return;
    if (name === "note" || name === "track") seNote();
    else if (name === "heart") seHeart();
    else if (name === "tick") seTick();
  },
  stop() { this.setAmbient("none"); },
};

/* ── 앰비언스 합성 ── */
function noise() { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; s.start(); return s; }
function lfo(param, rate, depth, base) {
  const o = ctx.createOscillator(); o.frequency.value = rate;
  const g = ctx.createGain(); g.gain.value = depth;
  o.connect(g); g.connect(param); param.value = base; o.start();
  return o;
}

function makeBed(type) {
  const nodes = [];
  const gain = ctx.createGain(); gain.gain.value = 0; gain.connect(bgmGain);
  const keep = (n) => { nodes.push(n); return n; };

  if (type === "subway") {
    // 저음 럼블 (움직이는 느낌)
    const n1 = keep(noise());
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 170; lp.Q.value = 0.7;
    const rg = ctx.createGain();
    n1.connect(lp); lp.connect(rg); rg.connect(gain);
    keep(lfo(rg.gain, 0.18, 0.32, 0.8));
    // 레일 휘파람 (고역 밴드)
    const n2 = keep(noise());
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 1.2;
    const hg = ctx.createGain(); hg.gain.value = 0.05;
    n2.connect(bp); bp.connect(hg); hg.connect(gain);
    // 모터 험
    const o = keep(ctx.createOscillator()); o.type = "sine"; o.frequency.value = 58;
    const og = ctx.createGain(); og.gain.value = 0.05; o.connect(og); og.connect(gain); o.start();
  } else if (type === "rain") {
    const n = keep(noise());
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 900;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 6000;
    const g = ctx.createGain();
    n.connect(hp); hp.connect(lp); lp.connect(g); g.connect(gain);
    keep(lfo(g.gain, 0.3, 0.08, 0.45));
  } else if (type === "wind") {
    const n = keep(noise());
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 2;
    const g = ctx.createGain();
    n.connect(bp); bp.connect(g); g.connect(gain);
    keep(lfo(bp.frequency, 0.07, 280, 480)); // 게이지 바람 — 주파수 스윕
    keep(lfo(g.gain, 0.09, 0.2, 0.3));
  } else if (type === "hum") {
    const o1 = keep(ctx.createOscillator()); o1.type = "sine"; o1.frequency.value = 60;
    const g1 = ctx.createGain(); g1.gain.value = 0.05; o1.connect(g1); g1.connect(gain); o1.start();
    const o2 = keep(ctx.createOscillator()); o2.type = "sine"; o2.frequency.value = 120;
    const g2 = ctx.createGain(); g2.gain.value = 0.02; o2.connect(g2); g2.connect(gain); o2.start();
    const n = keep(noise());
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2000;
    const ng = ctx.createGain(); ng.gain.value = 0.035; n.connect(lp); lp.connect(ng); ng.connect(gain);
  } else { // room — 아주 은은한 실내 톤
    const n = keep(noise());
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 420;
    const g = ctx.createGain();
    n.connect(lp); lp.connect(g); g.connect(gain);
    keep(lfo(g.gain, 0.05, 0.04, 0.1));
  }

  gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.0); // 페이드 인
  return {
    type, gain,
    stop() { nodes.forEach((n) => { try { n.stop && n.stop(); } catch (e) {} try { n.disconnect && n.disconnect(); } catch (e) {} }); try { gain.disconnect(); } catch (e) {} },
  };
}

/* ── 효과음 ── */
function seNote() {
  const t = ctx.currentTime;
  [659.25, 987.77].forEach((f, i) => { // E5 → B5
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t + i * 0.06);
    g.gain.linearRampToValueAtTime(0.25, t + 0.02 + i * 0.06);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.7 + i * 0.06);
    o.connect(g); g.connect(seGain); o.start(t + i * 0.06); o.stop(t + 0.8 + i * 0.06);
  });
}
function seHeart() {
  const t = ctx.currentTime;
  [0, 0.28].forEach((dt, i) => {
    const o = ctx.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(70, t + dt); o.frequency.exponentialRampToValueAtTime(45, t + dt + 0.15);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t + dt);
    g.gain.linearRampToValueAtTime(i ? 0.3 : 0.4, t + dt + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.22);
    o.connect(g); g.connect(seGain); o.start(t + dt); o.stop(t + dt + 0.25);
  });
}
function seTick() {
  const t = ctx.currentTime;
  const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = 1200;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  o.connect(g); g.connect(seGain); o.start(t); o.stop(t + 0.1);
}
