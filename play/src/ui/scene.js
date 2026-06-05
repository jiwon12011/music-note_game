// VN 장면 플레이어 — 랜딩 오프닝 모달 느낌. 데이터(step 배열) 기반, 추후 Ink가 대체.
import { charName, charColor } from "../engine/charMeta.js";

const ASSET = "public/img";
const TYPE_MS = 26;

export function playScene(app, steps, { onEnd } = {}) {
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
    <div class="chapter-card"><div><div class="ch-no"></div><div class="ch-title"></div></div></div>
  `;
  app.appendChild(root);

  const $ = (s) => root.querySelector(s);
  const bgEl = $(".scene-bg"), charEl = $(".scene-char");
  const speakerEl = $(".vn-speaker"), textEl = $(".vn-text"), nextEl = $(".vn-next");
  const choicesEl = $(".vn-choices"), cardEl = $(".chapter-card"), affEl = $(".aff-popup");

  const affection = {}; // 데모용 누적 (추후 Ink VAR)
  let i = 0, mode = "line", typing = false, typeTimer = null, replyReturn = 0, curBg = "", curText = "";

  /* ---- 비주얼 ---- */
  const setBg = (key) => {
    if (!key || key === curBg) return;
    curBg = key;
    bgEl.style.backgroundImage = `url('${ASSET}/bg/${key}.webp')`;
  };
  const showChar = (key, outfit, pos = "center") => {
    charEl.hidden = false;
    charEl.className = `scene-char pos-${pos} enter`;
    charEl.src = `${ASSET}/char/${key}/${outfit}.webp`;
    charEl.alt = charName(key);
    requestAnimationFrame(() => requestAnimationFrame(() => charEl.classList.remove("enter")));
  };
  const hideChar = () => { charEl.style.opacity = "0"; setTimeout(() => { charEl.hidden = true; charEl.style.opacity = ""; }, 350); };
  const setSpeaker = (key) => {
    if (key == null) { speakerEl.hidden = true; return; }
    speakerEl.hidden = false;
    speakerEl.textContent = charName(key);
    speakerEl.style.background = charColor(key);
  };

  /* ---- 타이핑 ---- */
  const CURSOR = '<span class="cursor">▍</span>';
  const type = (text) => {
    clearTimeout(typeTimer); typing = true; curText = text; nextEl.hidden = true; let n = 0;
    const step = () => {
      n++;
      textEl.innerHTML = text.slice(0, n) + (n < text.length ? CURSOR : "");
      if (n < text.length) typeTimer = setTimeout(step, TYPE_MS);
      else { typing = false; nextEl.hidden = false; }
    };
    step();
  };
  const finishTyping = () => { clearTimeout(typeTimer); typing = false; textEl.textContent = curText; nextEl.hidden = false; };

  /* ---- 호감도 팝업 ---- */
  const popAff = (key, delta) => {
    affection[key] = (affection[key] || 0) + delta;
    affEl.querySelector(".who").textContent = charName(key);
    affEl.querySelector(".delta").textContent = (delta > 0 ? "+" : "") + delta;
    affEl.classList.remove("play"); void affEl.offsetWidth; affEl.classList.add("play");
  };

  /* ---- 스텝 렌더 ---- */
  const render = () => {
    const s = steps[i];
    if (!s) return end();
    choicesEl.hidden = true; choicesEl.innerHTML = "";

    if (s.chapter) {
      mode = "chapter";
      cardEl.querySelector(".ch-no").textContent = "CHAPTER " + s.chapter[0];
      cardEl.querySelector(".ch-title").textContent = s.chapter[1];
      cardEl.classList.add("show");
      textEl.textContent = ""; speakerEl.hidden = true; nextEl.hidden = true;
      return;
    }
    cardEl.classList.remove("show");

    if (s.choices) {
      mode = "choice"; nextEl.hidden = true; setSpeaker(null);
      choicesEl.hidden = false;
      s.choices.forEach((opt) => {
        const b = document.createElement("button");
        b.className = "vn-choice"; b.textContent = opt.text;
        b.addEventListener("click", () => choose(opt));
        choicesEl.appendChild(b);
      });
      return;
    }

    // 대사/내레이션
    mode = "line";
    if (s.bg) setBg(s.bg);
    if (s.hide) hideChar();
    if (s.char) showChar(...s.char);
    setSpeaker(s.speaker ?? null);
    type(s.text);
  };

  const choose = (opt) => {
    choicesEl.hidden = true; choicesEl.innerHTML = "";
    (opt.aff || []).forEach(([k, d]) => popAff(k, d));
    replyReturn = i + 1;
    if (opt.reply) {
      mode = "reply";
      setSpeaker(opt.reply.speaker ?? null);
      type(opt.reply.text);
    } else { i = replyReturn; render(); }
  };

  const advance = () => {
    if (mode === "choice") return;
    if (typing) { finishTyping(); return; }
    if (mode === "chapter") { cardEl.classList.remove("show"); i++; return render(); }
    if (mode === "reply") { i = replyReturn; return render(); }
    i++; render();
  };

  const end = () => { onEnd && onEnd(affection); };

  // 입력
  root.addEventListener("click", (e) => { if (e.target.closest(".vn-choice")) return; advance(); });
  const onKey = (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); advance(); } };
  document.addEventListener("keydown", onKey);
  root._cleanup = () => document.removeEventListener("keydown", onKey);

  render();
  return root;
}
