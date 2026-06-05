// 타이틀(게임 시작) 화면
import { hasAnySave } from "../state/saves.js";

// 정적 서빙 기준 에셋 경로 (index.html = /play/). Vite 도입 시 base만 조정.
const ASSET = "public/img";

const GLYPHS = ["♪", "♫", "♬", "♩", "♭"];

export function createTitle({ onNew, onContinue, onCollection, onSettings }) {
  const screen = document.createElement("section");
  screen.className = "screen title active";

  const canContinue = hasAnySave();

  screen.innerHTML = `
    <div class="title-bg" style="background-image:url('${ASSET}/bg/rooftop-night.webp')"></div>
    <div class="title-notes" aria-hidden="true"></div>
    <div class="title-inner">
      <div class="title-logo">
        <div class="title-logo-disc">♪</div>
        <h1 class="title-wordmark">PLAYLIST</h1>
        <p class="title-sub">Between Us</p>
        <p class="title-kr">우리 사이의 음표</p>
      </div>
      <nav class="title-menu">
        <button class="title-item" data-act="new"><span class="ico">▶</span>새로운 플레이리스트</button>
        <button class="title-item" data-act="continue" ${canContinue ? "" : "disabled"}>
          <span class="ico">◀◀</span>이어서 듣기${canContinue ? "" : "<small>저장된 곡 없음</small>"}
        </button>
        <button class="title-item" data-act="collection"><span class="ico">♬</span>컬렉션</button>
        <button class="title-item" data-act="settings"><span class="ico">⚙</span>설정</button>
      </nav>
    </div>
    <div class="title-footer">© 2026 Playlist : Between Us</div>
  `;

  // 떠다니는 음표 장식
  const notesBox = screen.querySelector(".title-notes");
  for (let i = 0; i < 7; i++) {
    const n = document.createElement("span");
    n.className = "title-note";
    n.textContent = GLYPHS[i % GLYPHS.length];
    n.style.left = 8 + i * 12 + Math.random() * 6 + "%";
    n.style.bottom = Math.random() * 40 + "%";
    n.style.fontSize = 16 + Math.random() * 22 + "px";
    n.style.animationDuration = 6 + Math.random() * 6 + "s";
    n.style.animationDelay = -Math.random() * 8 + "s";
    notesBox.appendChild(n);
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
