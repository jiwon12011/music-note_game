// 인게임 러너 — Ink 구동 + ESC 메뉴(저장/불러오기/설정/타이틀) + 트랙 해금 + 이어하기.
import { Story } from "../../vendor/ink.mjs";
import { charName, charColor, CHARS } from "../engine/charMeta.js";
import { settings } from "../state/settings.js";
import { profile, trackByCg, TRACK_CATALOG } from "../state/profile.js";
import { save, loadInto } from "../state/saves.js";
import { openSaveLoad } from "./saveload.js";
import { openSettings } from "./settings.js";
import { openCollection } from "./collection.js";
import { openAffection } from "./affection.js";
import { openOverlay } from "./overlay.js";
import { toast } from "./toast.js";
import { audio, bgAmbient } from "./audio.js";

const ENDINGS_TOTAL = 12; // 해피 6 + 노멀 6 (솔로 제외)

const ASSET = "public/img";
const STORY_URL = "public/story/chapter1.json";

function parseTags(tags) {
  const o = {};
  for (const t of tags || []) { const i = t.indexOf(":"); if (i === -1) o[t.trim()] = ""; else o[t.slice(0, i).trim()] = t.slice(i + 1).trim(); }
  return o;
}

export async function startGame(app, opts = {}) {
  const { player, onExit, resumeSlot } = opts;

  let json;
  try {
    const res = await fetch(STORY_URL);
    if (!res.ok) throw new Error(`story ${res.status}`);
    json = await res.text();
  } catch (err) {
    // 스토리 로드 실패(오프라인·404 등) → 빈 화면 대신 안내 후 타이틀 복귀
    toast("이야기를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.", 2600);
    if (onExit) setTimeout(onExit, 1600);
    return null;
  }
  const story = new Story(json);

  // 떠나는 화면의 정리 훅(_cleanup) 호출 — keydown 리스너 누수 방지
  // (메뉴 '불러오기'/타이틀 '이어하기'가 startGame을 직접 호출하는 경로 보호)
  app.querySelectorAll("*").forEach((el) => el._cleanup?.());
  app._cleanup?.();
  app.innerHTML = "";
  const root = document.createElement("section");
  root.className = "screen scene active";
  root.innerHTML = `
    <div class="scene-bg"></div>
    <div class="scene-bg scene-bg-next"></div>
    <img class="scene-char enter" alt="" hidden />
    <div class="scene-cg"></div>
    <div class="vn-note" aria-hidden="true"></div>
    <div class="vn-popup" aria-hidden="true"></div>
    <div class="aff-popup"><span class="who"></span> <span class="heart">♥</span> <span class="delta"></span></div>
    <div class="vn-controls">
      <button class="vn-ctrl" data-c="auto" aria-pressed="false" title="자동 진행"><span class="ctrl-ico">▶</span><span class="ctrl-lbl">AUTO</span></button>
      <button class="vn-ctrl" data-c="skip" aria-pressed="false" title="빨리 감기"><span class="ctrl-ico">▸▸</span><span class="ctrl-lbl">SKIP</span></button>
      <button class="vn-ctrl" data-c="log" title="지나온 대사"><span class="ctrl-ico">≡</span><span class="ctrl-lbl">로그</span></button>
    </div>
    <button class="vn-menu-btn" title="메뉴 (ESC)" aria-label="메뉴"><span></span><span></span><span></span></button>
    <div class="scene-stage"><div class="vn-box">
      <span class="vn-speaker" hidden></span>
      <p class="vn-text"></p>
      <span class="vn-next" hidden>▼</span>
      <div class="vn-choices" hidden></div>
    </div></div>
    <div class="chapter-card"><div><div class="ch-no"></div><div class="ch-title"></div></div></div>`;
  app.appendChild(root);

  const $ = (s) => root.querySelector(s);
  const bgEl = $(".scene-bg:not(.scene-bg-next)"), bgNextEl = $(".scene-bg-next"), charEl = $(".scene-char"), cgEl = $(".scene-cg");
  const speakerEl = $(".vn-speaker"), textEl = $(".vn-text"), nextEl = $(".vn-next");
  const choicesEl = $(".vn-choices"), cardEl = $(".chapter-card"), affEl = $(".aff-popup");
  const noteEl = $(".vn-note"), popupEl = $(".vn-popup");

  let mode = "line", typing = false, typeTimer = null, curText = "", pending = null, suppressAff = false, cardTimer = null;
  let lastEnding = null, noteTimer = null, popupTimer = null;
  // 한 줄 출력이 끝날 때 호출되는 훅 (Auto 진행 / 백로그 적재) — Wave 4에서 채움
  let onLineDone = () => {};

  /* 호칭 자막(# note) — 대사창 위 별도 감성 레이어 */
  const showNote = (text) => {
    clearTimeout(noteTimer); noteEl.textContent = text;
    noteEl.classList.remove("show"); void noteEl.offsetWidth; noteEl.classList.add("show");
    noteTimer = setTimeout(() => noteEl.classList.remove("show"), 2800);
  };
  /* 분기 알림(# popup) — 글래스 토스트, 3초 자동/클릭 시 즉시 */
  const showPopup = (text) => {
    clearTimeout(popupTimer); popupEl.textContent = text;
    popupEl.classList.add("show");
    popupTimer = setTimeout(() => popupEl.classList.remove("show"), 3200);
  };
  const view = { bg: "", char: null, speaker: null, line: "", scene: "", cg: null };

  /* 비주얼 */
  const clearCg = () => { if (view.cg) { view.cg = null; cgEl.classList.remove("show"); } };
  const showCg = (id) => {
    view.cg = id; charEl.hidden = true; // CG가 화면을 덮음
    cgEl.style.backgroundImage = `url('${ASSET}/cg/${id}.webp')`; cgEl.classList.add("show");
    const tr = trackByCg(id); if (tr) profile.unlockTrack(tr.id); // 컬렉션 해금
  };
  let bgFadeTimer = null;
  const setBg = (k) => {
    if (!k || k === view.bg) return;
    view.bg = k; clearCg(); audio.setAmbient(bgAmbient(k));
    const url = `url('${ASSET}/bg/${k}.webp')`;
    if (!bgEl.style.backgroundImage) { bgEl.style.backgroundImage = url; return; } // 첫 배경은 즉시
    // 크로스페이드: 다음 배경을 위 레이어에 띄워 페이드인 → 끝나면 본 레이어로 승격(깜빡임 제거)
    bgNextEl.style.backgroundImage = url;
    requestAnimationFrame(() => bgNextEl.classList.add("show"));
    clearTimeout(bgFadeTimer);
    bgFadeTimer = setTimeout(() => { bgEl.style.backgroundImage = url; bgNextEl.classList.remove("show"); }, 600);
  };
  const showChar = (k, o, p = "center") => {
    view.char = { key: k, outfit: o, pos: p };
    const url = `${ASSET}/char/${k}/${o}.webp`;
    const reveal = () => {
      charEl.hidden = false; charEl.style.opacity = ""; charEl.className = `scene-char pos-${p} enter`;
      charEl.src = url; charEl.alt = charName(k);
      requestAnimationFrame(() => requestAnimationFrame(() => charEl.classList.remove("enter")));
    };
    // 디코드 완료 후 표시 → 빈 이미지/깜빡임 프레임 방지
    const pre = new Image(); pre.decoding = "async"; pre.src = url;
    if (pre.decode) pre.decode().then(reveal).catch(reveal); else reveal();
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
    if (t.ending) { profile.markEnding(t.ending); lastEnding = t.ending; } // 본 엔딩 기록 + 크레딧용
    if (t.collect) { // 서브 수집: 폴라로이드(pl-) / 가사조각(ly-)
      const id = t.collect.trim(); let got = false;
      if (id.startsWith("pl-")) got = profile.unlockPolaroid(id);
      else if (id.startsWith("ly-")) got = profile.unlockLyric(id);
      if (got) { audio.playSe("note"); toast(id.startsWith("pl-") ? "📷 폴라로이드를 모았어요" : "🎵 가사 조각을 모았어요"); }
    }
    if (t.note) showNote(t.note);   // 호칭 자막 등 감성 레이어
    if (t.popup) showPopup(t.popup); // 챕터3 분기 알림 등
    setSpeaker(t.speaker || null);
  };

  /* 타이핑 (속도=설정) — 본문은 textContent, 커서만 별도 span (innerHTML 미사용 → Ink 대사의 <,& 안전) */
  const cursorEl = document.createElement("span");
  cursorEl.className = "cursor"; cursorEl.textContent = "▍";
  const type = (text) => {
    clearTimeout(typeTimer); typing = true; curText = text; view.line = text; nextEl.hidden = true;
    const ms = skipOn ? 0 : settings.get().textSpeed; let n = 0; // SKIP 중엔 즉시 출력
    const tick = () => {
      n++; textEl.textContent = text.slice(0, n);
      if (n < text.length) { textEl.appendChild(cursorEl); typeTimer = setTimeout(tick, ms); }
      else { typing = false; nextEl.hidden = false; onLineDone(); }
    };
    if (ms <= 0) { textEl.textContent = text; typing = false; nextEl.hidden = false; onLineDone(); } else tick();
  };
  const finishTyping = () => { clearTimeout(typeTimer); typing = false; textEl.textContent = curText; nextEl.hidden = false; onLineDone(); };

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
  const showCard = (val) => {
    const [no, ...t] = val.split(/\s+/);
    cardEl.querySelector(".ch-no").textContent = "CHAPTER " + no;
    cardEl.querySelector(".ch-title").textContent = t.join(" ");
    cardEl.classList.add("show"); speakerEl.hidden = true; textEl.textContent = ""; nextEl.hidden = true;
    clearTimeout(cardTimer);
    cardTimer = setTimeout(() => { if (mode === "chapter") advance(); }, 1500); // 1.5초 후 자동 진행 (클릭 시 즉시)
  };
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
    else { mode = "ended"; if (lastEnding) showCredits(lastEnding); else onExit && onExit(); }
  };

  /* 엔딩 크레딧 화면 — 수집 현황 + 재플레이 유도 */
  const showCredits = (endingId) => {
    const p = profile.all();
    const seen = p.endings.filter((e) => e !== "solo").length;
    const tracks = p.tracks.length, trackTotal = TRACK_CATALOG.length;
    const isSolo = endingId === "solo";
    const [key, kind] = endingId.split(" ");
    const kindKr = kind === "happy" ? "해피 엔딩" : kind === "normal" ? "노멀 엔딩" : "";
    const cre = document.createElement("div");
    cre.className = "credits-screen";
    cre.innerHTML = `
      <div class="credits-inner">
        <p class="credits-eyebrow">PLAYLIST · BETWEEN US</p>
        <h2 class="credits-title">${isSolo ? "미완성 플레이리스트" : `${charName(key)} · ${kindKr}`}</h2>
        <p class="credits-sub">${isSolo ? "아직 비어 있는 한 곡이 있어요." : "당신의 플레이리스트에, 한 곡이 더해졌습니다."}</p>
        <div class="credits-stats">
          <div class="cstat"><span class="cnum">${seen}<small>/${ENDINGS_TOTAL}</small></span><span class="clbl">엔딩</span></div>
          <div class="cstat"><span class="cnum">${tracks}<small>/${trackTotal}</small></span><span class="clbl">트랙</span></div>
        </div>
        <p class="credits-nudge">${seen >= ENDINGS_TOTAL ? "모든 엔딩을 모았어요 — 당신의 플레이리스트가 완성됐습니다 ♪" : "아직 듣지 못한 곡이 있어요. 다시 재생해볼까요?"}</p>
        <div class="credits-actions">
          <button class="credits-btn primary" data-a="coll"><span>♬</span> 컬렉션 보기</button>
          <button class="credits-btn" data-a="title"><span>▶</span> 타이틀로</button>
        </div>
      </div>`;
    root.appendChild(cre);
    requestAnimationFrame(() => cre.classList.add("show"));
    cre.querySelector('[data-a="coll"]').addEventListener("click", () => openCollection());
    cre.querySelector('[data-a="title"]').addEventListener("click", () => { onExit && onExit(); });
  };
  const advance = () => {
    if (mode === "choice") return;
    if (typing) return finishTyping();
    if (mode === "chapter") { clearTimeout(cardTimer); cardEl.classList.remove("show"); const p = pending; pending = null; applyTags(p.t); mode = "line"; type(p.text); return; }
    next();
  };

  /* ── AUTO(자동 진행) / SKIP(빨리 감기) / 백로그(대사 로그) ── */
  let autoOn = false, skipOn = false, autoTimer = null;
  const clearAuto = () => { clearTimeout(autoTimer); autoTimer = null; };
  const scheduleNext = () => {
    clearAuto();
    if (mode !== "line") return;            // 선택지·챕터·엔딩에선 자동 진행 멈춤
    if (skipOn) { autoTimer = setTimeout(advance, 240); return; }
    if (!autoOn) return;
    const wait = Math.min(4200, 1300 + curText.length * 42); // 글자 수에 비례한 읽기 시간
    autoTimer = setTimeout(advance, wait);
  };
  const autoBtn = $('.vn-ctrl[data-c="auto"]'), skipBtn = $('.vn-ctrl[data-c="skip"]');
  const setAuto = (on) => { autoOn = on; autoBtn.classList.toggle("on", on); autoBtn.setAttribute("aria-pressed", on); if (on) { if (skipOn) setSkip(false); scheduleNext(); } else clearAuto(); };
  const setSkip = (on) => { skipOn = on; skipBtn.classList.toggle("on", on); skipBtn.setAttribute("aria-pressed", on); if (on) { if (autoOn) setAuto(false); scheduleNext(); } else clearAuto(); };
  autoBtn.addEventListener("click", (e) => { e.stopPropagation(); setAuto(!autoOn); });
  skipBtn.addEventListener("click", (e) => { e.stopPropagation(); setSkip(!skipOn); });

  const history = [];
  const pushHistory = () => { if (curText) history.push({ who: view.speaker, text: curText }); if (history.length > 240) history.shift(); };
  const openBacklog = () => {
    clearAuto();
    const panel = document.createElement("div"); panel.className = "panel";
    panel.innerHTML = `<h2 class="panel-title"><span class="panel-eyebrow">LOG &#9834;</span>지나온 대사</h2><div class="backlog-list"></div><div class="panel-actions"><button class="btn" data-act="close">닫기</button></div>`;
    const list = panel.querySelector(".backlog-list");
    if (!history.length) { list.innerHTML = `<div class="backlog-empty">아직 지나온 대사가 없어요.</div>`; }
    else history.forEach((h) => {
      const row = document.createElement("div"); row.className = "backlog-row";
      if (h.who) { const w = document.createElement("span"); w.className = "backlog-who"; w.textContent = charName(h.who); row.appendChild(w); }
      const l = document.createElement("span"); l.className = "backlog-line"; l.textContent = h.text; row.appendChild(l); // textContent → 안전
      list.appendChild(row);
    });
    const { close } = openOverlay(panel);
    panel.querySelector('[data-act="close"]').addEventListener("click", close);
    requestAnimationFrame(() => { list.scrollTop = list.scrollHeight; }); // 최신 대사로 스크롤
  };
  $('.vn-ctrl[data-c="log"]').addEventListener("click", (e) => { e.stopPropagation(); openBacklog(); });

  /* 한 줄 출력 완료 시: 백로그 적재 → Auto/Skip 다음 예약 */
  onLineDone = () => { pushHistory(); scheduleNext(); };

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
    clearAuto(); // 메뉴 떠 있는 동안 자동 진행 정지
    const panel = document.createElement("div"); panel.className = "panel panel--menu";
    // 일시정지 메뉴를 '플레이리스트 트랙 목록'처럼 — 타이틀 메뉴와 같은 디자인 언어
    panel.innerHTML = `<h2 class="panel-title"><span class="panel-eyebrow">PAUSE &#9834;</span>메뉴</h2><div class="menu-list">
      <button class="menu-item" data-a="resume"><span class="mi-no">01</span><span class="mi-lbl">계속하기</span><span class="mi-go">&#9656;</span></button>
      <button class="menu-item" data-a="save"><span class="mi-no">02</span><span class="mi-lbl">저장하기</span><span class="mi-go">&#9656;</span></button>
      <button class="menu-item" data-a="load"><span class="mi-no">03</span><span class="mi-lbl">불러오기</span><span class="mi-go">&#9656;</span></button>
      <button class="menu-item" data-a="affection"><span class="mi-no">04</span><span class="mi-lbl">호감도</span><span class="mi-go">&#9656;</span></button>
      <button class="menu-item" data-a="settings"><span class="mi-no">05</span><span class="mi-lbl">설정</span><span class="mi-go">&#9656;</span></button>
      <button class="menu-item menu-item--exit" data-a="title"><span class="mi-no">06</span><span class="mi-lbl">타이틀로</span><span class="mi-go">&#9656;</span></button></div>`;
    const { close } = openOverlay(panel);
    panel.querySelector('[data-a="resume"]').addEventListener("click", close);
    panel.querySelector('[data-a="save"]').addEventListener("click", () => { close(); openSaveLoad("save", { onPick: (slot) => { const ok = save(slot, story, getPreview()); toast(ok ? `슬롯 ${slot + 1}에 저장했어요 ♪` : "저장에 실패했어요"); } }); });
    panel.querySelector('[data-a="load"]').addEventListener("click", () => { close(); openSaveLoad("load", { onPick: (slot) => { startGame(app, { ...opts, resumeSlot: slot }); } }); });
    panel.querySelector('[data-a="affection"]').addEventListener("click", () => { close(); openAffection(story); });
    panel.querySelector('[data-a="settings"]').addEventListener("click", () => { close(); openSettings(); });
    panel.querySelector('[data-a="title"]').addEventListener("click", () => { close(); onExit && onExit(); });
  };

  root.addEventListener("click", (e) => { if (e.target.closest(".vn-choice") || e.target.closest(".vn-menu-btn") || e.target.closest(".vn-controls")) return; advance(); });
  $(".vn-menu-btn").addEventListener("click", (e) => { e.stopPropagation(); openMenu(); });
  const onKey = (e) => {
    // 오버레이(메뉴/설정/세이브 등)가 떠 있으면 그쪽 ESC 핸들러에 맡기고 게임 입력은 전부 무시
    // (ESC를 먼저 처리하면 '설정창 닫기'와 동시에 게임 메뉴가 새로 열리는 버그가 남)
    if (document.querySelector(".overlay.open")) return;
    if (e.key === "Escape") { openMenu(); return; }
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); advance(); }
  };
  document.addEventListener("keydown", onKey);
  root._cleanup = () => document.removeEventListener("keydown", onKey);

  /* 시작 또는 이어하기 */
  if (resumeSlot != null) {
    suppressAff = true; const slot = loadInto(story, resumeSlot); suppressAff = false;
    if (!slot) { next(); return { root, story }; } // 비호환/손상 세이브 → 처음부터
    for (const k of Object.keys(CHARS)) prevAff[k] = story.variablesState[`aff_${k}`] ?? 0;
    restoreView(slot.preview);
    if (story.currentChoices.length) renderChoices(story.currentChoices);
    else { mode = "line"; nextEl.hidden = false; }
  } else {
    if (player) story.variablesState["player"] = player;
    next();
  }
  return { root, story };
}
