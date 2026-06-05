// 세이브/불러오기 슬롯 그리드 (mode: "save" | "load")
import { SLOT_COUNT, getSlot } from "../state/saves.js";
import { openOverlay } from "./overlay.js";

const ASSET = "public/img";

export function openSaveLoad(mode, { onPick } = {}) {
  const panel = document.createElement("div");
  panel.className = "panel";
  const slots = [];
  for (let i = 0; i < SLOT_COUNT; i++) {
    const d = getSlot(i);
    if (d) {
      const p = d.preview || {};
      const when = new Date(d.savedAt).toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
      slots.push(`<button class="slot" data-i="${i}">
        <img class="slot-thumb" src="${ASSET}/bg/${p.bg || "train"}.webp" alt="" />
        <span class="slot-meta">
          <span class="slot-title">슬롯 ${i + 1} · ${p.scene || "진행 중"}</span>
          <span class="slot-sub">${p.player || ""} · ${when}</span>
        </span></button>`);
    } else {
      slots.push(`<button class="slot" data-i="${i}" ${mode === "load" ? "disabled" : ""}>
        <span class="slot-thumb"></span>
        <span class="slot-meta"><span class="slot-title">슬롯 ${i + 1}</span><span class="slot-empty">— 빈 슬롯 —</span></span></button>`);
    }
  }
  panel.innerHTML = `
    <h2 class="panel-title">${mode === "save" ? "저장하기" : "불러오기"}</h2>
    <div class="slot-list">${slots.join("")}</div>
    <div class="panel-actions"><button class="btn btn-ghost" data-act="close">닫기</button></div>`;

  const { close } = openOverlay(panel);
  panel.querySelector('[data-act="close"]').addEventListener("click", close);
  panel.querySelectorAll(".slot").forEach((b) => {
    if (b.disabled) return;
    b.addEventListener("click", () => { const ok = onPick && onPick(+b.dataset.i); if (ok !== false) close(); });
  });
}
