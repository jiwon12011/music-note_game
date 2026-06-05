// 호감도 게이지 화면 — 6명 ♥ 수치 + 바 (story 변수에서 읽음)
import { CHARS } from "../engine/charMeta.js";
import { openOverlay } from "./overlay.js";

export function openAffection(story) {
  const panel = document.createElement("div");
  panel.className = "panel";
  const rows = Object.entries(CHARS).map(([k, c]) => {
    const v = Math.max(0, Math.min(100, story.variablesState[`aff_${k}`] ?? 0));
    const tier = v >= 70 ? "♥ 깊어지는 중" : v >= 40 ? "♥ 가까워지는 중" : v > 0 ? "♥ 알아가는 중" : "—";
    return `<div class="aff-row">
      <span class="aff-name" style="color:${c.color}">${c.name}</span>
      <div class="aff-bar"><div class="aff-fill" style="width:${v}%;background:${c.color}"></div></div>
      <span class="aff-num">${v}<small>/100</small></span>
      <span class="aff-tier">${tier}</span>
    </div>`;
  }).join("");
  panel.innerHTML = `<h2 class="panel-title">호감도</h2>
    <p class="coll-count">♥ 70 이상이면 해피엔딩 · 그 외엔 노멀엔딩으로 이어져요</p>
    <div class="aff-list">${rows}</div>
    <div class="panel-actions"><button class="btn" data-act="close">닫기</button></div>`;
  const { close } = openOverlay(panel);
  panel.querySelector('[data-act="close"]').addEventListener("click", close);
}
