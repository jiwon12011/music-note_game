// 인게임 러너 — Ink 구동 + ESC 메뉴(저장/불러오기/설정/타이틀) + 트랙 해금 + 이어하기.
import { Story } from "../../vendor/ink.mjs";
import { charName, charColor, CHARS } from "../engine/charMeta.js";
import { settings } from "../state/settings.js";
import { profile, trackByCg } from "../state/profile.js";
import { save, loadInto } from "../state/saves.js";
import { openSaveLoad } from "./saveload.js";
import { openSettings } from "./settings.js";
import { openAffection } from "./affection.js";
import { openOverlay } from "./overlay.js";

const ASSET = "public/img";
const STORY_URL = "public/story/chapter1.json";

function parseTags(tags) {
  const o = {};
  for (const t of tags || []) { const i = t.indexOf(":"); if (i === -1) o[t.trim()] = ""; else o[t.slice(0, i).trim()] = t.slice(i + 1).trim(); }
  return o;
}

export async function startGame(app, opts = {}) {
  const { player, onExit, resumeSlot } = opts;
  const json = await fetch(STORY_URL).then((r) => r.text());
  const story = new Story(json);

  app.innerHTML = "";
  const root = document.createElement("section");
  root.className = "screen scene active";
  root.innerHTML = `
    <div class="scene-bg"></div>
    <img class="scene-char enter" alt="" hidden />
    <div class="scene-cg"></div>
    <div class="aff-popup"><span class="who"></span> <span class="heart">♥</span> <span class="delta"></span></div>
    <button class="vn-menu-btn" title="메뉴 (ESC)">☰</button>
    <div class="scene-stage"><div class="vn-box">
      <span class="vn-speaker" hidden></span>
      <p class="vn-text"></p>
      <span class="vn-next" hidden>▼</span>
      <div class="vn-choices" hidden></div>
    </div></div>
    <div class="chapter-card"><div><div class="ch-no"></div><div class="ch-title"></div></div></div>`;
  app.appendChild(root);

  const $ = (s) => root.querySelector(s);
  const bgEl = $(".scene-bg"), charEl = $(".scene-char"), cgEl = $(".scene-cg");
  const speakerEl = $(".vn-speaker"), textEl = $(".vn-text"), nextEl = $(".vn-next");
  const choicesEl = $(".vn-choices"), cardEl = $(".chapter-card"), affEl = $(".aff-popup");

  let mode = "line", typing = false, typeTimer = null, curText = "", pending = null, suppressAff = false;
  const view = { bg: "", char: null, speaker: null, line: "", scene: "", cg: null };

  /* 비주얼 */
  const clearCg = () => { if (view.cg) { view.cg = null; cgEl.classList.remove("show"); } };
  const showCg = (id) => {
    view.cg = id; charEl.hidden = true; // CG가 화면을 덮음
    cgEl.style.backgroundImage = `url('${ASSET}/cg/${id}.webp')`; cgEl.classList.add("show");
    const tr = trackByCg(id); if (tr) profile.unlockTrack(tr.id); // 컬렉션 해금
  };
  const setBg = (k) => { if (k && k !== view.bg) { view.bg = k; bgEl.style.backgroundImage = `url('${ASSET}/bg/${k}.webp')`; clearCg(); } };
  const showChar = (k, o, p = "center") => {
    view.char = { key: k, outfit: o, pos: p };
    charEl.hidden = false; charEl.style.opacity = ""; charEl.className = `scene-char pos-${p} enter`;
    charEl.src = `${ASSET}/char/${k}/${o}.webp`; charEl.alt = charName(k);
    requestAnimationFrame(() => requestAnimationFrame(() => charEl.classList.remove("enter")));
  };
  const hideChar = () => { view.char = null; charEl.style.opacity = "0"; setTimeout(() => { charEl.hidden = true; }, 350); };
  const setSpeaker = (k) => {
    view.speaker = k || null;
    if (!k) { speakerEl.hidden = true; return; }
    speakerEl.hidden = false; speakerEl.style.background = charColor(k);
    const v = story.variablesState[`aff_${k}`] ?? 0;
    speakerEl.innerHTML = `${charName(k)}<span class="heart-mini">♥${v}</span>`;
  };
  const applyTags = (t) => {
    if (t.scene) view.scene = t.scene;
    if (t.track) profile.unlockTrack(t.track);
    if (t.bg) setBg(t.bg);
    if (t.hide) hideChar();
    if (t.char) { const [k, o, p] = t.char.split(/\s+/); showChar(k, o, p || "center"); }
    if (t.cg) showCg(t.cg); // CG 는 bg/char 다음 (화면 덮음)
    setSpeaker(t.speaker || null);
  };

  /* 타이핑 (속도=설정) */
  const CURSOR = '<span class="cursor">▍</span>';
  const type = (text) => {
    clearTimeout(typeTimer); typing = true; curText = text; view.line = text; nextEl.hidden = true;
    const ms = settings.get().textSpeed; let n = 0;
    const tick = () => { n++; textEl.innerHTML = text.slice(0, n) + (n < text.length ? CURSOR : ""); if (n < text.length) typeTimer = setTimeout(tick, ms); else { typing = false; nextEl.hidden = false; } };
    if (ms <= 0) { textEl.textContent = text; typing = false; nextEl.hidden = false; } else tick();
  };
  const finishTyping = () => { clearTimeout(typeTimer); typing = false; textEl.textContent = curText; nextEl.hidden = false; };

  /* 호감도 +n */
  const prevAff = {};
  for (const k of Object.keys(CHARS)) {
    prevAff[k] = story.variablesState[`aff_${k}`] ?? 0;
    story.ObserveVariable(`aff_${k}`, (_n, val) => {
      const delta = val - (prevAff[k] ?? val); prevAff[k] = val;
      if (suppressAff || delta === 0) return;
      affEl.querySelector(".who").textContent = charName(k);
      affEl.querySelector(".delta").textContent = (delta > 0 ? "+" : "") + delta;
      affEl.classList.remove("play"); void affEl.offsetWidth; affEl.classList.add("play");
    });
  }

  /* 진행 */
  const renderChoices = (choices) => {
    mode = "choice"; nextEl.hidden = true; choicesEl.hidden = false; choicesEl.innerHTML = "";
    choices.forEach((c) => { const b = document.createElement("button"); b.className = "vn-choice"; b.textContent = c.text;
      b.addEventListener("click", (e) => { e.stopPropagation(); story.ChooseChoiceIndex(c.index); choicesEl.hidden = true; next(); }); choicesEl.appendChild(b); });
  };
  const showCard = (val) => { const [no, ...t] = val.split(/\s+/); cardEl.querySelector(".ch-no").textContent = "CHAPTER " + no; cardEl.querySelector(".ch-title").textContent = t.join(" "); cardEl.classList.add("show"); speakerEl.hidden = true; textEl.textContent = ""; nextEl.hidden = true; };
  const next = () => {
    choicesEl.hidden = true;
    if (story.canContinue) {
      const text = story.Continue().trim(); const t = parseTags(story.currentTags);
      if (t.track) profile.unlockTrack(t.track);
      if (t.chapter) { pending = { text, t }; mode = "chapter"; showCard(t.chapter); return; }
      applyTags(t);
      if (!text) return next();
      mode = "line"; type(text);
    } else if (story.currentChoices.length) { renderChoices(story.currentChoices); }
    else { mode = "ended"; onExit && onExit(); }
  };
  const advance = () => {
    if (mode === "choice") return;
    if (typing) return finishTyping();
    if (mode === "chapter") { cardEl.classList.remove("show"); const p = pending; pending = null; applyTags(p.t); mode = "line"; type(p.text); return; }
    next();
  };

  /* 메뉴(ESC) */
  const getPreview = () => ({ player: story.variablesState["player"], scene: view.scene, bg: view.bg, char: view.char, speaker: view.speaker, line: view.line, cg: view.cg });
  const restoreView = (pv) => {
    if (!pv) return;
    if (pv.bg) setBg(pv.bg);
    if (pv.char) showChar(pv.char.key, pv.char.outfit, pv.char.pos);
    if (pv.cg) showCg(pv.cg);
    setSpeaker(pv.speaker || null);
    textEl.textContent = pv.line || ""; view.line = pv.line || ""; view.scene = pv.scene || "";
  };
  const openMenu = () => {
    const panel = document.createElement("div"); panel.className = "panel";
    panel.innerHTML = `<h2 class="panel-title">메뉴</h2><div class="menu-list">
      <button class="menu-item" data-a="resume">계속하기</button>
      <button class="menu-item" data-a="save">저장하기</button>
      <button class="menu-item" data-a="load">불러오기</button>
      <button class="menu-item" data-a="affection">호감도</button>
      <button class="menu-item" data-a="settings">설정</button>
      <button class="menu-item" data-a="title">타이틀로</button></div>`;
    const { close } = openOverlay(panel);
    panel.querySelector('[data-a="resume"]').addEventListener("click", close);
    panel.querySelector('[data-a="save"]').addEventListener("click", () => { close(); openSaveLoad("save", { onPick: (slot) => { save(slot, story, getPreview()); } }); });
    panel.querySelector('[data-a="load"]').addEventListener("click", () => { close(); openSaveLoad("load", { onPick: (slot) => { startGame(app, { ...opts, resumeSlot: slot }); } }); });
    panel.querySelector('[data-a="affection"]').addEventListener("click", () => { close(); openAffection(story); });
    panel.querySelector('[data-a="settings"]').addEventListener("click", () => { close(); openSettings(); });
    panel.querySelector('[data-a="title"]').addEventListener("click", () => { close(); onExit && onExit(); });
  };

  root.addEventListener("click", (e) => { if (e.target.closest(".vn-choice") || e.target.closest(".vn-menu-btn")) return; advance(); });
  $(".vn-menu-btn").addEventListener("click", (e) => { e.stopPropagation(); openMenu(); });
  const onKey = (e) => {
    if (e.key === "Escape") { openMenu(); return; }
    if (document.querySelector(".overlay.open")) return; // 오버레이 떠 있으면 진행 막음
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); advance(); }
  };
  document.addEventListener("keydown", onKey);
  root._cleanup = () => document.removeEventListener("keydown", onKey);

  /* 시작 또는 이어하기 */
  if (resumeSlot != null) {
    suppressAff = true; const slot = loadInto(story, resumeSlot); suppressAff = false;
    for (const k of Object.keys(CHARS)) prevAff[k] = story.variablesState[`aff_${k}`] ?? 0;
    if (slot) restoreView(slot.preview);
    if (story.currentChoices.length) renderChoices(story.currentChoices);
    else { mode = "line"; nextEl.hidden = false; }
  } else {
    if (player) story.variablesState["player"] = player;
    next();
  }
  return { root, story };
}
