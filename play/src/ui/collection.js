// 컬렉션 — "내 플레이리스트" 트랙 갤러리. 잠긴 트랙은 ???.
import { profile, TRACK_CATALOG } from "../state/profile.js";
import { openOverlay } from "./overlay.js";

const ASSET = "public/img";

export function openCollection() {
  const unlocked = profile.unlockedTracks();
  const panel = document.createElement("div");
  panel.className = "panel";
  const rows = TRACK_CATALOG.map((t, i) => {
    const on = unlocked.has(t.id);
    const no = String(i + 1).padStart(2, "0");
    const img = t.cg ? `${ASSET}/cg/${t.cg}.webp` : `${ASSET}/bg/${t.bg}.webp`;
    return on
      ? `<button class="track unlocked" data-img="${img}" data-name="${t.name}">
           <span class="track-no">${no}</span>
           <img class="track-thumb" src="${img}" alt="" loading="lazy" />
           <span class="track-name">${t.name}</span></button>`
      : `<div class="track locked">
           <span class="track-no">${no}</span>
           <span class="track-thumb lock">♪</span>
           <span class="track-name">??? · 아직 듣지 못한 곡</span></div>`;
  }).join("");
  panel.innerHTML = `
    <h2 class="panel-title">내 플레이리스트</h2>
    <p class="coll-count">${unlocked.size} / ${TRACK_CATALOG.length} 트랙 수집</p>
    <div class="track-list">${rows}</div>
    <div class="panel-actions"><button class="btn" data-act="close">닫기</button></div>`;

  const { close, el } = openOverlay(panel);
  panel.querySelector('[data-act="close"]').addEventListener("click", close);
  panel.querySelectorAll(".track.unlocked").forEach((t) => {
    t.addEventListener("click", () => showLightbox(t.dataset.img, t.dataset.name));
  });
}

function showLightbox(img, name) {
  const lb = document.createElement("div");
  lb.className = "overlay open";
  lb.style.zIndex = 2300;
  lb.innerHTML = `<div style="max-width:90vw;text-align:center">
    <img src="${img}" style="max-width:90vw;max-height:74vh;border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,.6)" />
    <p style="margin-top:16px;color:var(--c-cream);font-family:var(--font-display);font-weight:700;font-size:1.1rem">♪ ${name}</p></div>`;
  document.body.appendChild(lb);
  lb.addEventListener("click", () => lb.remove());
}
