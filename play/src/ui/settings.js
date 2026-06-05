// 설정 오버레이 — 텍스트 속도 / BGM·SE 음량
import { settings } from "../state/settings.js";
import { openOverlay } from "./overlay.js";

export function openSettings() {
  const s = settings.get();
  const panel = document.createElement("div");
  panel.className = "panel";
  const speedLabel = (v) => (v <= 8 ? "매우 빠름" : v <= 20 ? "빠름" : v <= 35 ? "보통" : "느림");
  panel.innerHTML = `
    <h2 class="panel-title">설정</h2>
    <div class="set-group">
      <div class="set-row"><span class="set-label">텍스트 속도</span><span class="set-val" data-v="speed">${speedLabel(s.textSpeed)}</span></div>
      <input class="set-slider" type="range" min="4" max="50" step="2" value="${s.textSpeed}" data-k="textSpeed" />
    </div>
    <div class="set-group">
      <div class="set-row"><span class="set-label">BGM 음량</span><span class="set-val" data-v="bgm">${Math.round(s.bgmVolume*100)}%</span></div>
      <input class="set-slider" type="range" min="0" max="100" value="${Math.round(s.bgmVolume*100)}" data-k="bgmVolume" />
    </div>
    <div class="set-group">
      <div class="set-row"><span class="set-label">효과음 음량</span><span class="set-val" data-v="se">${Math.round(s.seVolume*100)}%</span></div>
      <input class="set-slider" type="range" min="0" max="100" value="${Math.round(s.seVolume*100)}" data-k="seVolume" />
    </div>
    <div class="panel-actions"><button class="btn" data-act="close">완료</button></div>`;

  const { close } = openOverlay(panel);
  panel.querySelectorAll(".set-slider").forEach((sl) => {
    sl.addEventListener("input", () => {
      const k = sl.dataset.k;
      if (k === "textSpeed") { settings.set({ textSpeed: +sl.value }); panel.querySelector('[data-v="speed"]').textContent = speedLabel(+sl.value); }
      else { const val = +sl.value / 100; settings.set({ [k]: val }); panel.querySelector(`[data-v="${k === "bgmVolume" ? "bgm" : "se"}"]`).textContent = sl.value + "%"; }
    });
  });
  panel.querySelector('[data-act="close"]').addEventListener("click", close);
}
