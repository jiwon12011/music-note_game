// 프롤로그 — 게임 진입 시 타이틀 화면 전에 재생되는 시네마틱 오프닝 독백.
// 클릭/스페이스로 진행을 빠르게, "건너뛰기"로 즉시 타이틀로. (랜딩 오프닝 모달과 같은 내레이션)

const ASSET = "public/img";

// 장면(배경)과 함께 흐르는 독백. bg가 바뀌는 줄에서 크로스페이드.
const BEATS = [
  { bg: "train",            text: "서울행 기차. 창밖 풍경이 빠르게 흘러간다." },
  { bg: "train",            text: "이어폰 속 누군가의 노래처럼, 내 심장도 빠르게 뛴다." },
  { bg: "house-ext-night",  text: "음악을 만드는 사람들과 한집에서 산다니… 잘할 수 있을까." },
  { bg: "room-night",       text: "각자의 미완성된 곡처럼, 나도 아직 완성되지 않았다." },
  { bg: "rooftop-night",    text: "그래도 — 이제, 첫 곡을 재생할 시간이야." },
];

const GLYPHS = ["♪", "♫", "♬", "♩"];

export function playPrologue(app, { onDone }) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const screen = document.createElement("section");
  screen.className = "screen prologue active";
  screen.innerHTML = `
    <div class="pro-bg" aria-hidden="true"></div>
    <div class="pro-bg pro-bg-next" aria-hidden="true"></div>
    <div class="pro-vignette" aria-hidden="true"></div>
    <div class="pro-bar pro-bar-top" aria-hidden="true"></div>
    <div class="pro-bar pro-bar-bottom" aria-hidden="true"></div>
    <div class="pro-notes" aria-hidden="true"></div>
    <p class="pro-line" aria-live="polite"></p>
    <button class="pro-skip" type="button">건너뛰기 ▸</button>
    <div class="pro-hint">클릭하여 넘기기</div>
  `;
  app.appendChild(screen);

  const $ = (s) => screen.querySelector(s);
  const bgA = $(".pro-bg"), bgB = $(".pro-bg-next"), lineEl = $(".pro-line");
  const notesBox = $(".pro-notes");
  let curBg = "";

  // 떠다니는 음표 장식 (절제)
  if (!reduce) {
    for (let i = 0; i < 5; i++) {
      const n = document.createElement("span");
      n.className = "pro-note";
      n.textContent = GLYPHS[i % GLYPHS.length];
      n.style.left = 10 + i * 18 + Math.random() * 8 + "%";
      n.style.fontSize = 14 + Math.random() * 16 + "px";
      n.style.animationDuration = 8 + Math.random() * 6 + "s";
      n.style.animationDelay = -Math.random() * 8 + "s";
      notesBox.appendChild(n);
    }
  }

  const setBg = (key) => {
    if (key === curBg) return;
    bgB.style.backgroundImage = `url('${ASSET}/bg/${key}.webp')`;
    bgB.classList.add("show");
    // 다음 배경이 페이드인된 뒤 메인으로 승격 (간단히: 둘 다 같은 이미지로 두고 처리)
    bgA.style.backgroundImage = bgB.style.backgroundImage;
    setTimeout(() => bgB.classList.remove("show"), 900);
    curBg = key;
  };

  let idx = 0, typing = false, typeTimer = null, holdTimer = null, finished = false;
  const TYPE_MS = reduce ? 0 : 34;
  const HOLD_MS = reduce ? 1100 : 1900;

  const typeLine = (text) => {
    clearTimeout(typeTimer);
    lineEl.classList.remove("fade-out");
    lineEl.classList.add("fade-in");
    if (TYPE_MS <= 0) { lineEl.textContent = text; typing = false; scheduleHold(); return; }
    typing = true; let i = 0;
    const cursor = '<span class="pro-cursor">▍</span>';
    const step = () => {
      i++;
      lineEl.innerHTML = text.slice(0, i) + (i < text.length ? cursor : "");
      if (i < text.length) typeTimer = setTimeout(step, TYPE_MS);
      else { typing = false; scheduleHold(); }
    };
    step();
  };

  const scheduleHold = () => {
    clearTimeout(holdTimer);
    holdTimer = setTimeout(nextBeat, HOLD_MS);
  };

  const showBeat = (i) => {
    const b = BEATS[i];
    setBg(b.bg);
    typeLine(b.text);
  };

  const nextBeat = () => {
    if (finished) return;
    if (idx + 1 < BEATS.length) {
      idx++;
      lineEl.classList.remove("fade-in");
      lineEl.classList.add("fade-out");
      setTimeout(() => showBeat(idx), reduce ? 0 : 420);
    } else {
      finish();
    }
  };

  // 클릭/키 = 타이핑 중이면 즉시 완성, 아니면 다음 비트
  const advance = () => {
    if (finished) return;
    if (typing) {
      clearTimeout(typeTimer); typing = false;
      lineEl.textContent = BEATS[idx].text;
      scheduleHold();
    } else {
      clearTimeout(holdTimer);
      nextBeat();
    }
  };

  let finishing = false;
  const finish = () => {
    if (finishing) return; finishing = true; finished = true;
    clearTimeout(typeTimer); clearTimeout(holdTimer);
    screen.classList.add("pro-out");           // 화이트/페이드 아웃
    setTimeout(() => { cleanup(); onDone && onDone(); }, reduce ? 0 : 700);
  };

  const onKey = (e) => {
    if (e.key === "Escape") { finish(); return; }
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); advance(); }
  };
  const onClick = (e) => { if (e.target.closest(".pro-skip")) return; advance(); };

  const cleanup = () => {
    clearTimeout(typeTimer); clearTimeout(holdTimer);
    document.removeEventListener("keydown", onKey);
  };
  screen._cleanup = cleanup;

  $(".pro-skip").addEventListener("click", (e) => { e.stopPropagation(); finish(); });
  screen.addEventListener("click", onClick);
  document.addEventListener("keydown", onKey);

  // 시작
  requestAnimationFrame(() => showBeat(0));
}
