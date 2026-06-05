// 타이틀(게임 시작) 화면 — 6인 캐스트 라인업 키비주얼
import { hasAnySave } from "../state/saves.js";

// 정적 서빙 기준 에셋 경로 (index.html = /play/). Vite 도입 시 base만 조정.
const ASSET = "public/img";

const GLYPHS = ["♪", "♫", "♬", "♩", "♭"];

// 캐스트 배치: 로고 양옆 안쪽 → 바깥 순서. pos = 좌/우 + 깊이(1 안쪽 ~ 3 바깥)
const CAST = [
  { name: "hanseoa",     slug: "stage",   pos: "l1", label: "한서아" },
  { name: "kael",        slug: "leather", pos: "r1", label: "KAEL" },
  { name: "choijunhyeok",slug: "sweater", pos: "l2", label: "최준혁" },
  { name: "jeongian",    slug: "suit",    pos: "r2", label: "정이안" },
  { name: "yunjaeho",    slug: "coat",    pos: "l3", label: "윤재호" },
  { name: "odaeun",      slug: "varsity", pos: "r3", label: "오다은" },
];

export function createTitle({ onNew, onContinue, onCollection, onSettings }) {
  const screen = document.createElement("section");
  screen.className = "screen title active";

  const canContinue = hasAnySave();

  const castHTML = CAST.map(
    (c) =>
      `<img class="cast cast-${c.pos}" src="${ASSET}/char/${c.name}/${c.slug}.webp" alt="${c.label}" draggable="false" loading="eager">`
  ).join("");

  screen.innerHTML = `
    <div class="title-stage" aria-hidden="true">
      <div class="title-bg" style="background-image:url('${ASSET}/bg/rooftop-night.webp')"></div>
      <div class="title-grooves"></div>
      <div class="title-cast">${castHTML}</div>
      <div class="title-scrim"></div>
      <div class="title-notes"></div>
    </div>
    <div class="title-inner">
      <div class="title-logo">
        <img class="title-emblem" src="${ASSET}/ui/logo.webp" alt="" draggable="false">
        <h1 class="title-wordmark">PLAYLIST</h1>
        <p class="title-sub">Between Us<span class="dot">·</span>우리 사이의 음표</p>
        <p class="title-tag">Every song holds a story.</p>
      </div>
      <nav class="title-menu">
        <button class="title-item" data-act="new"><span class="ico">▶</span><span class="lbl">새로운 플레이리스트</span></button>
        <button class="title-item" data-act="continue" ${canContinue ? "" : "disabled"}>
          <span class="ico">◀◀</span><span class="lbl">이어서 듣기</span>${canContinue ? "" : "<small>저장된 곡 없음</small>"}
        </button>
        <button class="title-item" data-act="collection"><span class="ico">♬</span><span class="lbl">컬렉션</span></button>
        <button class="title-item" data-act="settings"><span class="ico">⚙</span><span class="lbl">설정</span></button>
      </nav>
    </div>
    <div class="title-footer">© 2026 Playlist : Between Us</div>
  `;

  // 떠다니는 음표 (장식 — 절제해서 4개만)
  const notesBox = screen.querySelector(".title-notes");
  for (let i = 0; i < 4; i++) {
    const n = document.createElement("span");
    n.className = "title-note";
    n.textContent = GLYPHS[i % GLYPHS.length];
    n.style.left = 14 + i * 22 + Math.random() * 8 + "%";
    n.style.bottom = Math.random() * 30 + "%";
    n.style.fontSize = 15 + Math.random() * 16 + "px";
    n.style.animationDuration = 7 + Math.random() * 5 + "s";
    n.style.animationDelay = -Math.random() * 8 + "s";
    notesBox.appendChild(n);
  }

  // 등장 애니가 끝나면 will-change 해제 (GPU 레이어 상시 유지 방지)
  screen.querySelectorAll(".cast").forEach((el) => {
    el.addEventListener("animationend", () => { el.style.willChange = "auto"; }, { once: true });
  });

  // 마우스 패럴랙스 (캐스트에 공기감) — reduced-motion이면 비활성
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cast = screen.querySelector(".title-cast");
  if (!reduce && cast && window.matchMedia("(pointer: fine)").matches) {
    let raf = 0, tx = 0, ty = 0;
    const onMove = (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 2;  // -1..1
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      tx = -dx * 14;
      ty = -dy * 8;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      if (!cast.isConnected) { window.removeEventListener("mousemove", onMove); return; }
      cast.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    // 화면이 교체될 때 정리
    screen._cleanup = () => window.removeEventListener("mousemove", onMove);
  }

  const acts = { new: onNew, continue: onContinue, collection: onCollection, settings: onSettings };
  screen.querySelectorAll(".title-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      acts[btn.dataset.act]?.();
    });
  });

  return screen;
}
