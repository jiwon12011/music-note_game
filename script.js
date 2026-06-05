/* ============================================================
   PLAYLIST : Between Us — 인터랙션
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 헤더 스크롤 효과 ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 스크롤 등장 애니메이션 ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal, .reveal-left").forEach((el) => io.observe(el));

  /* ---------- 네비게이션 현재 섹션 하이라이트 ---------- */
  const navLinks = document.querySelectorAll(".nav-link");
  const seen = new Set();
  const sections = [];
  navLinks.forEach((l) => {
    const id = l.getAttribute("href");
    if (id && id.startsWith("#") && !seen.has(id)) { seen.add(id); const s = document.querySelector(id); if (s) sections.push(s); }
  });
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- 모바일 메뉴 ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (menuToggle) menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.addEventListener("click", (e) => { if (e.target.classList.contains("nav-link")) nav.classList.remove("open"); });

  /* ---------- 인터랙티브 캐릭터 전환 ---------- */
  const CHARACTERS = {
    hanseoa:      { name: "한서아", role: "신인 가수",        color: "#f6c9d6", desc: "차가운 첫인상, 알면 알수록 따뜻한 노력파 신인 가수.", img: "assets/char-hanseoa.webp" },
    jeongian:     { name: "정이안", role: "프로듀서",          color: "#c7d4ec", desc: "절대 무너지지 않을 것 같은 완벽주의 쿨녀 프로듀서.", img: "assets/char-jeongian.webp" },
    odaeun:       { name: "오다은", role: "매니저",            color: "#f6dcb0", desc: "엉뚱해 보이지만 사실 다 알고 있는 눈치 100단 매니저.", img: "assets/char-odaeun.webp" },
    kael:         { name: "KAEL",   role: "인기 가수",        color: "#ccd2da", desc: "관심 없는 척하지만 너만 신경 쓰는 도도한 인기 가수.", img: "assets/char-kael.webp" },
    yunjaeho:     { name: "윤재호", role: "작곡가",            color: "#c3d9cc", desc: "말보다 음악으로 감정을 표현하는 조용한 작곡가.", img: "assets/char-yunjaeho.webp" },
    choijunhyeok: { name: "최준혁", role: "셰어하우스 주인",   color: "#ecc7a6", desc: "모두에게 친절한 데에는 이유가 있던 셰어하우스 주인.", img: "assets/char-choijunhyeok.webp" },
  };

  // 캐러셀 순환 순서
  const ORDER = ["hanseoa", "jeongian", "odaeun", "kael", "yunjaeho", "choijunhyeok"];

  const charBand = document.querySelector(".char-band-full");
  const charMain = document.getElementById("charMain");
  const charFace = document.getElementById("charFace");
  const charName = document.getElementById("charName");
  const charRole = document.getElementById("charRole");
  const charDesc = document.getElementById("charDesc");
  const charPrev = document.getElementById("charPrev");
  const charNext = document.getElementById("charNext");

  // 슬롯 버튼: data-slot -1(위/이전) · 0(가운데/현재) · 1(아래/다음)
  const slot = {};
  document.querySelectorAll(".thumb[data-slot]").forEach((b) => { slot[b.dataset.slot] = b; });

  // 이미지 미리 로드 (전환 시 깜빡임 방지)
  Object.values(CHARACTERS).forEach((c) => { const i = new Image(); i.src = c.img; });

  const mod = (n, m) => ((n % m) + m) % m;
  let current = 0;
  let swapTimer = null;

  // 슬롯 썸네일 이미지 갱신
  const setThumb = (btn, key) => {
    if (!btn) return;
    const img = btn.querySelector("img");
    if (img) { img.src = CHARACTERS[key].img; img.alt = btn.classList.contains("center") ? CHARACTERS[key].name : ""; }
    btn.dataset.key = key;
  };

  // 가운데(현재) 캐릭터 → 메인 비주얼/디테일/밴드색 부드러운 전환
  const applyDetail = (key) => {
    const data = CHARACTERS[key];
    if (charBand) charBand.style.background = data.color;
    charMain.classList.add("swapping");
    if (charFace) charFace.style.opacity = "0";
    clearTimeout(swapTimer);
    swapTimer = setTimeout(() => {
      charMain.src = data.img; charMain.alt = data.name;
      if (charFace) { charFace.src = data.img; charFace.style.opacity = ""; }
      charName.textContent = data.name; charRole.textContent = data.role; charDesc.textContent = data.desc;
      charMain.classList.remove("swapping");
    }, 200);
  };

  // 세 슬롯(이전/현재/다음) 그리기
  const render = (animateDetail) => {
    const n = ORDER.length;
    const cur = ORDER[mod(current, n)];
    setThumb(slot["-1"], ORDER[mod(current - 1, n)]);
    setThumb(slot["0"], cur);
    setThumb(slot["1"], ORDER[mod(current + 1, n)]);
    if (animateDetail) applyDetail(cur);
  };

  const go = (dir) => { current = mod(current + dir, ORDER.length); render(true); };

  if (charPrev) charPrev.addEventListener("click", () => go(-1));
  if (charNext) charNext.addEventListener("click", () => go(1));
  if (slot["-1"]) slot["-1"].addEventListener("click", () => go(-1));  // 위 미리보기 클릭 = 이전
  if (slot["1"]) slot["1"].addEventListener("click", () => go(1));     // 아래 미리보기 클릭 = 다음
  // 가운데(현재) 클릭은 변화 없음

  render(false);  // 초기 슬롯 셋업 (디테일은 HTML 기본값 유지)

  /* ---------- 브라운 지그재그(필름) 위 장식 음표 (정적·은은하게) ---------- */
  const story = document.querySelector(".story");
  if (story) {
    const DGLYPHS = ["♪", "♫", "♬", "♩", "♭"];
    const DCOLORS = ["#ef94ac", "#c79be6", "#7ec8c0", "#f4b25c", "#8fb4f0", "#f07ba0", "#9bd17a"];
    const rnd = (a, b) => a + Math.random() * (b - a);
    const pk = (a) => a[Math.floor(Math.random() * a.length)];
    for (let i = 0; i < 9; i++) {
      const top = 5 + i * 10.5;                         // 위→아래 고르게 분포
      const leftMax = Math.max(3, 10 - top * 0.07);     // 아래로 갈수록 브라운이 좁아져 더 왼쪽으로
      const n = document.createElement("span");
      n.className = "story-note";
      n.textContent = pk(DGLYPHS);
      n.style.top = (top + rnd(-2, 2)) + "%";
      n.style.left = rnd(1.5, leftMax) + "%";
      n.style.fontSize = rnd(20, 46) + "px";
      n.style.color = pk(DCOLORS);
      n.style.opacity = rnd(0.3, 0.6);
      n.style.transform = "rotate(" + rnd(-22, 22) + "deg)";
      story.appendChild(n);
    }
  }

  /* ---------- GSAP 모션 (로드된 경우에만, 미로드 시 그대로 동작) ---------- */
  if (window.gsap) {
    const g = window.gsap;
    if (window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);

    // 히어로 LP: 멋진 등장(아래에서 줌인+살짝 회전) — 등장 후 정지(무한 보빙 제거: 스크롤 버벅임 방지)
    g.from(".hero-lp", { scale: 0.82, y: 64, autoAlpha: 0, rotation: 1.5, duration: 1.3, ease: "expo.out",
      onComplete() { g.set(".hero-lp", { clearProps: "transform" }); } });

    // 히어로 LP 호버: 위로 음표(♪♫♬) 하나씩 둥실 떠오름
    const heroLp = document.querySelector(".hero-lp");
    const heroStage = document.querySelector(".hero-stage");
    if (heroLp && heroStage) {
      const GLYPHS = ["♪", "♫", "♬", "♩", "♭", "𝅘𝅥𝅮"];
      // 다양한 파스텔 음표 색 (크림/핑크 테마와 어울리게)
      const COLORS = ["#ef94ac", "#c79be6", "#7ec8c0", "#f4b25c", "#8fb4f0", "#f07ba0", "#9bd17a", "#ff9e7a"];
      const rand = (min, max) => min + Math.random() * (max - min);
      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
      let noteTimer = null;
      const spawnNote = () => {
        const span = document.createElement("span");
        span.className = "note-float";
        span.textContent = pick(GLYPHS);
        // LP 전체 폭(6~94%)에 흩뿌리고, 시작 높이·크기·색도 음표마다 랜덤
        span.style.left = rand(6, 94) + "%";
        span.style.bottom = rand(18, 60) + "%";
        span.style.fontSize = rand(16, 36) + "px";
        span.style.color = pick(COLORS);
        const drift = rand(-40, 40);
        const rise = rand(110, 170);
        heroStage.appendChild(span);
        setTimeout(() => span.remove(), 2600);  // 안전망: 애니메이션 누락돼도 DOM 누적 방지
        g.fromTo(span,
          { y: 0, opacity: 0, scale: 0.5, rotation: rand(-14, 0) },
          { y: -rise, x: drift, opacity: 1, scale: 1, rotation: rand(0, 14),
            duration: rand(1.0, 1.5), ease: "power1.out",
            onComplete() {
              g.to(span, { opacity: 0, y: -rise - 45, duration: 0.5, ease: "power1.in",
                onComplete() { span.remove(); } });
            } });
      };
      heroLp.addEventListener("mouseenter", () => {
        if (noteTimer) return;
        spawnNote();
        noteTimer = setInterval(spawnNote, 320);
      });
      heroLp.addEventListener("mouseleave", () => {
        clearInterval(noteTimer); noteTimer = null;
      });
    }

    if (window.ScrollTrigger) {
      // (히어로 필름 패럴랙스 제거 — 필름은 고정)
      // 캐릭터 메인 등장
      g.from(".char-main", { y: 50, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".characters", start: "top 65%" } });
      // 썸네일 스태거 등장
      g.from(".char-thumbs .thumb", { y: 16, stagger: 0.07, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".char-selector", start: "top 82%" } });
      // 스틸 스태거 등장 — 살짝 회전하며 팝업 (back.out 으로 탄성)
      g.from(".still", { autoAlpha: 0, scale: 0.82, rotation: -3, y: 24,
        transformOrigin: "50% 100%", stagger: { each: 0.1, from: "start" },
        duration: 0.7, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".still-grid", start: "top 80%" } });
    }

    // 호버 (GSAP 인라인이 CSS transform 위로 덮음) — 버튼/스틸/썸네일
    const hov = (el, over, out) => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); };
    document.querySelectorAll(".btn").forEach((b) =>
      hov(b, () => g.to(b, { scale: 1.05, duration: 0.22, ease: "power2.out" }),
             () => g.to(b, { scale: 1, duration: 0.22, ease: "power2.out" })));
    document.querySelectorAll(".still").forEach((s) => {
      const img = s.querySelector("img");
      hov(s, () => { g.to(s, { y: -6, duration: 0.3, ease: "power2.out" }); g.to(img, { scale: 1.08, duration: 0.6, ease: "power2.out" }); },
             () => { g.to(s, { y: 0, duration: 0.3 }); g.to(img, { scale: 1, duration: 0.6 }); });
    });
    document.querySelectorAll(".thumb").forEach((t) =>
      hov(t, () => g.to(t, { y: -4, scale: 1.05, duration: 0.22, ease: "power2.out" }),
             () => g.to(t, { y: 0, scale: 1, duration: 0.22, ease: "power2.out" })));
  }
})();
