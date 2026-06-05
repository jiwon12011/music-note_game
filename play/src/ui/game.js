// 인게임 러너 — Ink(story.json) 구동. 렌더는 랜딩 모달 느낌(배경+스탠딩+글래스 대사창) 유지.
import { Story } from "../../vendor/ink.mjs";
import { charName, charColor, CHARS } from "../engine/charMeta.js";

const ASSET = "public/img";
const STORY_URL = "public/story/chapter1.json";
const TYPE_MS = 26;

function parseTags(tags) {
  const o = {};
  for (const t of tags || []) {
    const i = t.indexOf(":");
    if (i === -1) o[t.trim()] = "";
    else o[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return o;
}

export async function startGame(app, { player, onExit } = {}) {
  const json = await fetch(STORY_URL).then((r) => r.text());
  const story = new Story(json);
  if (player) story.variablesState["player"] = player;

  app.innerHTML = "";
  const root = document.createElement("section");
  root.className = "screen scene active";
  root.innerHTML = `
    <div class="scene-bg"></div>
    <img class="scene-char enter" alt="" hidden />
    <div class="aff-popup"><span class="who"></span> <span class="heart">♥</span> <span class="delta"></span></div>
    <div class="scene-stage">
      <div class="vn-box">
        <span class="vn-speaker" hidden></span>
        <p class="vn-text"></p>
        <span class="vn-next" hidden>▼</span>
        <div class="vn-choices" hidden></div>
      </div>
    </div>
    <div class="chapter-card"><div><div class="ch-no"></div><div class="ch-title"></div></div></div>`;
  app.appendChild(root);

  const $ = (s) => root.querySelector(s);
  const bgEl = $(".scene-bg"), charEl = $(".scene-char");
  const speakerEl = $(".vn-speaker"), textEl = $(".vn-text"), nextEl = $(".vn-next");
  const choicesEl = $(".vn-choices"), cardEl = $(".chapter-card"), affEl = $(".aff-popup");

  let mode = "line", typing = false, typeTimer = null, curText = "", curBg = "";
  let pending = null; // 챕터 카드 후 표시할 줄

  /* 비주얼 */
  const setBg = (key) => { if (key && key !== curBg) { curBg = key; bgEl.style.backgroundImage = `url('${ASSET}/bg/${key}.webp')`; } };
  const showChar = (key, outfit, pos = "center") => {
    charEl.hidden = false; charEl.style.opacity = "";
    charEl.className = `scene-char pos-${pos} enter`;
    charEl.src = `${ASSET}/char/${key}/${outfit}.webp`;
    charEl.alt = charName(key);
    requestAnimationFrame(() => requestAnimationFrame(() => charEl.classList.remove("enter")));
  };
  const hideChar = () => { charEl.style.opacity = "0"; setTimeout(() => { charEl.hidden = true; }, 350); };
  const setSpeaker = (key) => {
    if (!key) { speakerEl.hidden = true; return; }
    speakerEl.hidden = false; speakerEl.textContent = charName(key); speakerEl.style.background = charColor(key);
  };
  const applyTags = (t) => {
    if (t.bg) setBg(t.bg);
    if (t.hide) hideChar();
    if (t.char) { const [k, o, p] = t.char.split(/\s+/); showChar(k, o, p || "center"); }
    setSpeaker(t.speaker || null);
  };

  /* 타이핑 */
  const CURSOR = '<span class="cursor">▍</span>';
  const type = (text) => {
    clearTimeout(typeTimer); typing = true; curText = text; nextEl.hidden = true; let n = 0;
    const tick = () => { n++; textEl.innerHTML = text.slice(0, n) + (n < text.length ? CURSOR : "");
      if (n < text.length) typeTimer = setTimeout(tick, TYPE_MS); else { typing = false; nextEl.hidden = false; } };
    tick();
  };
  const finishTyping = () => { clearTimeout(typeTimer); typing = false; textEl.textContent = curText; nextEl.hidden = false; };

  /* 호감도 +n */
  const prevAff = {};
  for (const k of Object.keys(CHARS)) {
    prevAff[k] = story.variablesState[`aff_${k}`] ?? 0;
    story.ObserveVariable(`aff_${k}`, (_n, val) => {
      const delta = val - (prevAff[k] ?? val); prevAff[k] = val;
      if (delta === 0) return;
      affEl.querySelector(".who").textContent = charName(k);
      affEl.querySelector(".delta").textContent = (delta > 0 ? "+" : "") + delta;
      affEl.classList.remove("play"); void affEl.offsetWidth; affEl.classList.add("play");
    });
  }

  /* 진행 */
  const renderChoices = (choices) => {
    mode = "choice"; nextEl.hidden = true; choicesEl.hidden = false; choicesEl.innerHTML = "";
    choices.forEach((c) => {
      const b = document.createElement("button");
      b.className = "vn-choice"; b.textContent = c.text;
      b.addEventListener("click", (e) => { e.stopPropagation(); story.ChooseChoiceIndex(c.index); choicesEl.hidden = true; next(); });
      choicesEl.appendChild(b);
    });
  };
  const showCard = (val) => {
    const [no, ...t] = val.split(/\s+/);
    cardEl.querySelector(".ch-no").textContent = "CHAPTER " + no;
    cardEl.querySelector(".ch-title").textContent = t.join(" ");
    cardEl.classList.add("show"); speakerEl.hidden = true; textEl.textContent = ""; nextEl.hidden = true;
  };
  const next = () => {
    choicesEl.hidden = true;
    if (story.canContinue) {
      const text = story.Continue().trim();
      const t = parseTags(story.currentTags);
      if (t.chapter) { pending = { text, t }; mode = "chapter"; showCard(t.chapter); return; }
      applyTags(t);
      if (!text) return next(); // 태그만 있는 빈 줄 스킵
      mode = "line"; type(text);
    } else if (story.currentChoices.length) {
      renderChoices(story.currentChoices);
    } else {
      mode = "ended"; onExit && onExit();
    }
  };

  const advance = () => {
    if (mode === "choice") return;
    if (typing) return finishTyping();
    if (mode === "chapter") {
      cardEl.classList.remove("show");
      const p = pending; pending = null;
      applyTags(p.t); mode = "line"; type(p.text);
      return;
    }
    next();
  };

  root.addEventListener("click", (e) => { if (e.target.closest(".vn-choice")) return; advance(); });
  const onKey = (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); advance(); } };
  document.addEventListener("keydown", onKey);
  root._cleanup = () => document.removeEventListener("keydown", onKey);

  next();
  return { root, story };
}
