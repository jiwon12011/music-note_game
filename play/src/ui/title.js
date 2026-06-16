// 타이틀(게임 시작) 화면 — 영상 배경 버전
import { hasAnySave } from "../state/saves.js";

export function createTitle({ onNew, onContinue, onCollection, onSettings }) {
  const screen = document.createElement("section");
  screen.className = "screen title active";

  const canContinue = hasAnySave();

  // 랜딩으로 돌아가는 경로
  const inPlay = location.pathname.includes("/play/");
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const homeHref = inPlay ? "../index.html" : (isLocal ? "http://localhost:8080/" : "/");

  screen.innerHTML = `
    <a class="title-home" href="${homeHref}" aria-label="웹사이트로 돌아가기"><span>←</span> 웹사이트</a>
    <video class="title-video" autoplay loop muted playsinline aria-hidden="true">
      <source src="public/playlist_intro.mp4" type="video/mp4">
    </video>
    <div class="title-video-scrim" aria-hidden="true"></div>
    <div class="title-inner">
      <div class="title-logo">
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

  const acts = { new: onNew, continue: onContinue, collection: onCollection, settings: onSettings };
  screen.querySelectorAll(".title-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      acts[btn.dataset.act]?.();
    });
  });

  return screen;
}
