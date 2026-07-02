// 컬렉션 — 플레이리스트(트랙) + 오다은 폴라로이드 + 윤재호 가사 조각.
import { profile, TRACK_CATALOG, POLAROID_CATALOG, LYRIC_CATALOG, LYRIC_TITLE } from "../state/profile.js";
import { openOverlay } from "./overlay.js";

const ASSET = "public/img";

export function openCollection() {
  const panel = document.createElement("div");
  panel.className = "panel panel-coll";
  panel.innerHTML = `
    <h2 class="panel-title"><span class="panel-eyebrow">MY PLAYLIST &#9834;</span>컬렉션</h2>
    <div class="coll-tabs">
      <button class="coll-tab active" data-tab="tracks">플레이리스트</button>
      <button class="coll-tab" data-tab="polaroids">폴라로이드</button>
      <button class="coll-tab" data-tab="lyrics">가사 조각</button>
    </div>
    <div class="coll-body"></div>
    <div class="panel-actions"><button class="btn" data-act="close">닫기</button></div>`;

  const body = panel.querySelector(".coll-body");
  const render = (tab) => {
    body.innerHTML = tab === "tracks" ? tracksHTML() : tab === "polaroids" ? polaroidsHTML() : lyricsHTML();
    body.querySelectorAll("[data-img]").forEach((t) =>
      t.addEventListener("click", () => showLightbox(t.dataset.img, t.dataset.name, t.dataset.sub)));
  };

  const { close } = openOverlay(panel);
  panel.querySelector('[data-act="close"]').addEventListener("click", close);
  panel.querySelectorAll(".coll-tab").forEach((b) =>
    b.addEventListener("click", () => {
      panel.querySelectorAll(".coll-tab").forEach((x) => x.classList.toggle("active", x === b));
      render(b.dataset.tab);
    }));
  render("tracks");
}

function tracksHTML() {
  const on = profile.unlockedTracks();
  const rows = TRACK_CATALOG.map((t, i) => {
    const no = String(i + 1).padStart(2, "0");
    const img = t.cg ? `${ASSET}/cg/${t.cg}.webp` : `${ASSET}/bg/${t.bg}.webp`;
    return on.has(t.id)
      ? `<button class="track unlocked" data-img="${img}" data-name="${t.name}">
           <span class="track-no">${no}</span>
           <img class="track-thumb" src="${img}" alt="" loading="lazy" />
           <span class="track-name">${t.name}</span></button>`
      : `<div class="track locked">
           <span class="track-no">${no}</span>
           <span class="track-thumb lock">♪</span>
           <span class="track-name">??? · 아직 듣지 못한 곡</span></div>`;
  }).join("");
  return `<p class="coll-count">${on.size} / ${TRACK_CATALOG.length} 트랙 수집</p><div class="track-list">${rows}</div>`;
}

function polaroidsHTML() {
  const on = profile.unlockedPolaroids();
  const cards = POLAROID_CATALOG.map((p) => {
    const img = p.isCg ? `${ASSET}/cg/${p.img}.webp` : `${ASSET}/bg/${p.img}.webp`;
    return on.has(p.id)
      ? `<figure class="polaroid" data-img="${img}" data-name="${p.cap}" data-sub="${p.date}">
           <img src="${img}" alt="" loading="lazy" />
           <figcaption><span class="pl-date">${p.date}</span><span class="pl-cap">${p.cap}</span></figcaption></figure>`
      : `<figure class="polaroid locked"><div class="pl-empty">?</div>
           <figcaption><span class="pl-cap">— 아직 담지 못한 순간 —</span></figcaption></figure>`;
  }).join("");
  return `<p class="coll-count">${on.size} / ${POLAROID_CATALOG.length} · 오다은이 몰래 모은 순간들 📷</p>
    <div class="polaroid-grid">${cards}</div>`;
}

function lyricsHTML() {
  const on = profile.unlockedLyrics();
  const complete = on.size === LYRIC_CATALOG.length;
  const lines = LYRIC_CATALOG.map((l, i) =>
    on.has(l.id)
      ? `<li class="lyric-line on"><span class="ly-no">${i + 1}</span><span>${l.line}</span></li>`
      : `<li class="lyric-line off"><span class="ly-no">${i + 1}</span><span class="ly-blur">잃어버린 한 소절…</span></li>`
  ).join("");
  const done = complete
    ? `<div class="lyric-complete">
         <span class="ly-badge">♪ 가사 완성</span>
         <h3 class="ly-title">${LYRIC_TITLE}</h3>
         <p class="ly-full">${LYRIC_CATALOG.map((l) => l.line).join("<br>")}</p>
         <small class="ly-credit">— 윤재호가 끝내 완성한, 당신을 위한 곡.</small>
       </div>`
    : `<p class="lyric-hint">조각을 다 모으면 — 윤재호가 완성하지 못했던 곡의 가사가 드러납니다.</p>`;
  return `<p class="coll-count">${on.size} / ${LYRIC_CATALOG.length} · 윤재호의 잃어버린 가사 🎵</p>
    <ul class="lyric-list">${lines}</ul>${done}`;
}

function showLightbox(img, name, sub) {
  const lb = document.createElement("div");
  lb.className = "overlay open";
  lb.style.zIndex = 2300;
  lb.innerHTML = `<div style="max-width:90vw;text-align:center">
    <img src="${img}" style="max-width:90vw;max-height:70vh;border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,.6)" />
    <p style="margin-top:16px;color:var(--c-cream);font-family:var(--font-display);font-weight:700;font-size:1.1rem">${name}</p>
    ${sub ? `<p style="margin-top:4px;color:rgba(246,233,227,.6);font-size:.85rem">${sub}</p>` : ""}</div>`;
  document.body.appendChild(lb);
  lb.addEventListener("click", () => lb.remove());
}
