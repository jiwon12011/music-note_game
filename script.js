/* ============================================================
   PLAYLIST : Between Us — 인터랙션
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 모션 민감 사용자 존중 ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1920 기준 통째 스케일 (데스크탑) ----------
     디자인을 1920px 고정 폭으로 두고 transform: scale 로 뷰포트 폭에 맞춘다.
     → 1440·1920 등 어떤 데스크탑 폭에서도 "1920을 그대로 축소한" 동일 비율.
     transform 은 레이아웃 높이를 줄이지 않으므로 음수 margin 으로 문서 높이를 보정. */
  const DESIGN_W = 1920;
  const SCALE_MIN_W = 900; // 이 이하(태블릿/모바일)는 기존 반응형 유지
  const scaleOuter = document.getElementById("scaleOuter");
  const scaleInner = document.getElementById("scaleInner");
  const applyScale = () => {
    if (!scaleInner) return;
    const w = window.innerWidth;
    if (w > SCALE_MIN_W) {
      document.body.classList.add("is-scaled");
      // 1920 폭으로 레이아웃한 뒤 transform:scale 로 축소 (GPU 합성 → 스크롤 시 재페인트 없음).
      // transform 은 레이아웃 높이를 안 줄이므로, 줄어든 시각 높이를 outer 에 직접 지정 + overflow:hidden 클립.
      const s = w / DESIGN_W;
      scaleInner.style.width = DESIGN_W + "px";
      scaleInner.style.transform = "none"; // 스케일 없는 1920 레이아웃 높이 측정
      const h = scaleInner.offsetHeight;
      scaleInner.style.transform = "scale(" + s + ")";
      if (scaleOuter) scaleOuter.style.height = h * s + "px";
    } else {
      document.body.classList.remove("is-scaled");
      scaleInner.style.width = "";
      scaleInner.style.transform = "";
      if (scaleOuter) scaleOuter.style.height = "";
    }
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  };
  applyScale();
  // 콘텐츠 높이가 바뀔 때(이미지 로드 등) margin 보정을 다시 — 무한 루프 방지 위해 rAF 디바운스
  if (scaleInner && "ResizeObserver" in window) {
    let roTick = false;
    const ro = new ResizeObserver(() => {
      if (roTick) return;
      roTick = true;
      requestAnimationFrame(() => { roTick = false; applyScale(); });
    });
    ro.observe(scaleInner);
  }
  // 창 폭이 바뀌면 스케일 값(s) 재계산 (inner 는 1920 고정폭이라 RO 가 못 잡음)
  let scaleRT;
  window.addEventListener("resize", () => { clearTimeout(scaleRT); scaleRT = setTimeout(applyScale, 120); });
  window.addEventListener("load", applyScale);

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
    hanseoa:      { name: "한서아", role: "신인 가수",        color: "#f6c9d6", desc: "차가운 첫인상, 알면 알수록 따뜻한 노력파 신인 가수.", quote: "저… 아직 안 끝났어요. 한 번만 더 할게요.", img: "assets/char-hanseoa.webp" },
    jeongian:     { name: "정이안", role: "프로듀서",          color: "#c7d4ec", desc: "절대 무너지지 않을 것 같은 완벽주의 쿨녀 프로듀서.", quote: "감정은 됐고, 박자나 맞춰.", img: "assets/char-jeongian.webp" },
    odaeun:       { name: "오다은", role: "매니저",            color: "#f6dcb0", desc: "엉뚱해 보이지만 사실 다 알고 있는 눈치 100단 매니저.", quote: "내가 모를 줄 알았지? 다 보여.", img: "assets/char-odaeun.webp" },
    kael:         { name: "KAEL",   role: "인기 가수",        color: "#ccd2da", desc: "관심 없는 척하지만 너만 신경 쓰는 도도한 인기 가수.", quote: "왜 자꾸… 신경 쓰이게 해.", img: "assets/char-kael.webp" },
    yunjaeho:     { name: "윤재호", role: "작곡가",            color: "#c3d9cc", desc: "말보다 음악으로 감정을 표현하는 조용한 작곡가.", quote: "…말보다, 그냥 한 번 들어봐요.", img: "assets/char-yunjaeho.webp" },
    choijunhyeok: { name: "최준혁", role: "셰어하우스 주인",   color: "#ecc7a6", desc: "모두에게 친절한 데에는 이유가 있던 셰어하우스 주인.", quote: "다들 모르는 게, 하나 있어.", img: "assets/char-choijunhyeok.webp" },
  };

  // 캐러셀 순환 순서
  const ORDER = ["hanseoa", "jeongian", "odaeun", "kael", "yunjaeho", "choijunhyeok"];

  const charBand = document.querySelector(".char-band-full");
  const charMain = document.getElementById("charMain");
  const charFace = document.getElementById("charFace");
  const charName = document.getElementById("charName");
  const charRole = document.getElementById("charRole");
  const charDesc = document.getElementById("charDesc");
  const charQuote = document.getElementById("charQuote");
  const charPrev = document.getElementById("charPrev");
  const charNext = document.getElementById("charNext");

  // 슬롯 버튼: data-slot -1(위/이전) · 0(가운데/현재) · 1(아래/다음)
  const slot = {};
  document.querySelectorAll(".thumb[data-slot]").forEach((b) => { slot[b.dataset.slot] = b; });

  // 캐릭터 이미지 프리로드: 초기 로딩(히어로 LCP)과 대역폭 경쟁을 피하려고
  // 캐릭터 섹션이 뷰포트에 가까워질 때 한 번에 미리 로드 (전환 시 깜빡임 방지)
  const preloadChars = () => Object.values(CHARACTERS).forEach((c) => { const i = new Image(); i.src = c.img; });
  const charsSection = document.querySelector(".characters");
  if (charsSection && "IntersectionObserver" in window) {
    const preIo = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { preloadChars(); preIo.disconnect(); }
    }, { rootMargin: "600px 0px" });
    preIo.observe(charsSection);
  } else {
    preloadChars();
  }

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
      if (charQuote) charQuote.textContent = data.quote;
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

  /* ---------- 브라운 지그재그(필름) 위 장식 음표 ---------- */
  /* 좌측 브라운 영역에 배치하되, 텍스트 박스를 실측해 겹치는 자리는 피함 */
  const story = document.querySelector(".story");
  const storyNotes = [];
  if (story) {
    const DGLYPHS = ["♪", "♫", "♬", "♩", "♭", "♪", "♫"];
    const DCOLORS = ["#ef94ac", "#c79be6", "#7ec8c0", "#f4b25c", "#8fb4f0", "#f07ba0", "#9bd17a", "#ff9e7a"];
    const rnd = (a, b) => a + Math.random() * (b - a);
    const pk = (a) => a[Math.floor(Math.random() * a.length)];
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const COUNT = 11;
    for (let i = 0; i < COUNT; i++) {
      const accent = i % 4 === 1;                         // 4개당 1개는 큼직한 강조 음표
      const op = rnd(0.36, 0.6);
      const rot = rnd(-22, 22);
      const size = accent ? rnd(38, 50) : rnd(18, 32);
      const n = document.createElement("span");
      n.className = "story-note";
      n.textContent = pk(DGLYPHS);
      n.style.fontSize = size + "px";
      n.style.color = pk(DCOLORS);
      n.style.opacity = op;                               // GSAP 미로드 시 정적 표시용
      n.style.transform = "rotate(" + rot + "deg)";       // GSAP 미로드 시 회전 유지용
      story.appendChild(n);
      storyNotes.push({ el: n, op: op, rot: rot, accent: accent, size: size });
    }

    // 텍스트와 안 겹치게 배치 (이미지 로드/리사이즈로 레이아웃이 바뀌면 재배치)
    const layoutNotes = () => {
      const s = story.getBoundingClientRect();
      const pad = 12;
      const textEls = story.querySelectorAll(
        ".section-num, .section-eyebrow, .section-title, .about-lead, .about-body, .char-name, .char-role, .char-desc"
      );
      const blocks = [...textEls].map((el) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - s.left - pad, t: r.top - s.top - pad, r: r.right - s.left + pad, b: r.bottom - s.top + pad };
      });
      const hit = (x, y, sz) => blocks.some((b) => x < b.r && x + sz > b.l && y < b.b && y + sz > b.t);
      storyNotes.forEach((o, i) => {
        const band = 5 + i * (86 / (COUNT - 1));          // 위→아래 고르게 분포 시드
        let placed = false;
        for (let t = 0; t < 28 && !placed; t++) {
          const top = clamp(band + rnd(-7, 7), 3, 95);
          const leftMax = clamp(13 - top * 0.08, 4, 13);  // 아래로 갈수록 브라운이 좁아짐
          const left = rnd(1, leftMax);
          if (!hit((left / 100) * s.width, (top / 100) * s.height, o.size * 1.15)) {
            o.el.style.top = top + "%"; o.el.style.left = left + "%"; o.el.style.display = "";
            placed = true;
          }
        }
        if (!placed) o.el.style.display = "none";          // 빈자리 없으면 숨김(겹치느니 생략)
      });
    };
    layoutNotes();
    window.addEventListener("load", layoutNotes);          // 이미지 로드 후 정확한 위치로
    let rT; window.addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(layoutNotes, 200); });
  }

  /* ---------- 오프닝 독백 모달 (히어로 LP 클릭) ---------- */
  const vnHeroLp = document.querySelector(".hero-lp");
  const vnModal = document.getElementById("vnModal");
  if (vnHeroLp && vnModal) {
    const vnText = document.getElementById("vnText");
    const vnClose = document.getElementById("vnClose");
    const vnCta = document.getElementById("vnCta");
    const LINES = [
      "서울행 기차. 창밖 풍경이 빠르게 흘러간다.",
      "이어폰 속 누군가의 노래처럼, 내 심장도 빠르게 뛴다.",
      "음악을 만드는 사람들과 한집에서 산다니… 잘할 수 있을까.",
      "각자의 미완성된 곡처럼, 나도 아직 완성되지 않았다.",
      "그래도 — 이제, 첫 곡을 재생할 시간이야.",
    ];
    const CURSOR = '<span class="cursor">▍</span>';
    let li = 0, typing = false, typeTimer = null, lastFocus = null;

    const typeLine = (text) => {
      clearTimeout(typeTimer);
      if (reduceMotion) { vnText.textContent = text; typing = false; return; }
      typing = true; let i = 0;
      const step = () => {
        i++;
        vnText.innerHTML = text.slice(0, i) + (i < text.length ? CURSOR : "");
        if (i < text.length) { typeTimer = setTimeout(step, 38); } else { typing = false; }
      };
      step();
    };
    const showLine = (idx) => { li = idx; typeLine(LINES[idx]); };
    const advance = () => {
      if (vnModal.classList.contains("ended")) return;
      if (typing) { clearTimeout(typeTimer); typing = false; vnText.textContent = LINES[li]; }
      else if (li + 1 < LINES.length) { showLine(li + 1); }
      else { vnModal.classList.add("ended"); }   // 마지막 줄 다음 → CTA 노출
    };
    const openVn = () => {
      lastFocus = document.activeElement;
      vnModal.classList.remove("ended");
      vnModal.setAttribute("aria-hidden", "false");
      vnModal.classList.add("open");
      document.body.style.overflow = "hidden";
      showLine(0);
      vnClose.focus();
    };
    const closeVn = () => {
      clearTimeout(typeTimer); typing = false;
      vnModal.classList.remove("open");
      vnModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    };

    vnHeroLp.setAttribute("role", "button");
    vnHeroLp.setAttribute("tabindex", "0");
    vnHeroLp.setAttribute("aria-label", "오프닝 보기 — 이야기 재생하기");
    vnHeroLp.addEventListener("click", openVn);
    vnHeroLp.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openVn(); }
    });

    // 대사창/배경 클릭으로 진행 (닫기·CTA 클릭은 제외)
    vnModal.addEventListener("click", (e) => {
      if (e.target === vnClose || e.target === vnCta) return;
      advance();
    });
    vnClose.addEventListener("click", (e) => { e.stopPropagation(); closeVn(); });
    vnCta.addEventListener("click", () => { closeVn(); });   // href="#home" 네이티브 앵커로 상단 이동 + 닫기
    document.addEventListener("keydown", (e) => {
      if (!vnModal.classList.contains("open")) return;
      if (e.key === "Escape") { closeVn(); }
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); advance(); }
    });
  }

  /* ---------- GSAP 모션 (로드된 경우에만, 미로드 시 그대로 동작) ----------
     prefers-reduced-motion 사용자는 모든 GSAP 연출을 건너뛴다.
     (콘텐츠는 CSS 기본 상태/IntersectionObserver 로 정적 표시되어 그대로 보임) */
  if (window.gsap && !reduceMotion) {
    const g = window.gsap;
    if (window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);

    // 히어로 LP 등장: 아래에서 떠오르며 줌인 + 살짝 기울었다 탄성있게 제자리로
    // (등장 후 transform 정리 → 스크롤은 매끄럽게 유지)
    g.from(".hero-lp", { autoAlpha: 0, y: 92, scale: 0.78, rotation: -5,
      duration: 1.4, ease: "back.out(1.5)",
      onComplete() { g.set(".hero-lp", { clearProps: "transform" }); } });

    // 브라운 위 음표: 스크롤 진입 시 하나씩 팝 등장 + 각자 살짝 둥실
    if (storyNotes.length) {
      const els = storyNotes.map((o) => o.el);
      if (window.ScrollTrigger) {
        storyNotes.forEach((o) => g.set(o.el, { autoAlpha: 0, scale: 0.3, rotation: o.rot, transformOrigin: "50% 50%" }));
        g.to(els, {
          autoAlpha: (i) => storyNotes[i].op, scale: 1, duration: 0.55, ease: "back.out(1.9)",
          stagger: { each: 0.13, from: "start" },
          scrollTrigger: { trigger: ".story", start: "top 72%" },
        });
      } else {
        storyNotes.forEach((o) => g.set(o.el, { rotation: o.rot, transformOrigin: "50% 50%" }));
      }
      // 살짝 둥실 (가벼운 무한 보빙 — 작은 텍스트라 스크롤 부담 없음)
      storyNotes.forEach((o, i) => {
        g.to(o.el, { y: "+=" + (o.accent ? 10 : 6), duration: 2 + (i % 5) * 0.35,
          ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.2 + i * 0.12 });
      });
    }

    // 히어로 LP 호버: 위로 음표(♪♫♬) 하나씩 둥실 떠오름
    const heroLp = document.querySelector(".hero-lp");
    const heroStage = document.querySelector(".hero-stage");
    if (heroLp && heroStage) {
      // 폰트에 없는 astral 문자(𝅘𝅥𝅮)는 두부(□)로 깨져서 제외 — BMP 음표만 사용
      const GLYPHS = ["♪", "♫", "♬", "♩", "♭", "♮"];
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
      let wobble = null;
      heroLp.addEventListener("mouseenter", () => {
        // 음표 떠오르기
        if (!noteTimer) { spawnNote(); noteTimer = setInterval(spawnNote, 320); }
        // 살짝 흔들흔들 (작은 진폭 좌우 회전 — will-change로 필터 레이어 캐싱해 매끄럽게)
        if (wobble) wobble.kill();
        heroLp.style.willChange = "transform";
        g.set(heroLp, { transformOrigin: "50% 58%" });
        wobble = g.fromTo(heroLp, { rotation: -0.6 },
          { rotation: 0.6, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
      heroLp.addEventListener("mouseleave", () => {
        clearInterval(noteTimer); noteTimer = null;
        if (wobble) { wobble.kill(); wobble = null; }
        g.to(heroLp, { rotation: 0, duration: 0.4, ease: "power2.out",
          onComplete() { heroLp.style.willChange = ""; } });
      });
    }

    if (window.ScrollTrigger) {
      // (히어로 필름 패럴랙스 제거 — 필름은 고정)
      // 캐릭터 메인 등장: 왼쪽에서 휘리릭 슈욱(skew 잔상) → 탄성 정착 — 화려하게
      // (배경 흐린 얼굴은 지금처럼 유지 / 등장 후 인라인 정리해 캐릭터 전환 정상)
      if (charMain) charMain.style.transition = "none";  // GSAP 모션 ↔ CSS transition 충돌 방지
      g.timeline({
        scrollTrigger: { trigger: ".characters", start: "top 65%", once: true },
        onComplete() { g.set(".char-main", { clearProps: "all" }); if (charMain) charMain.style.transition = ""; },
      })
        .from(".char-main", { x: -280, skewX: 16, rotation: -13, scale: 0.8, autoAlpha: 0,
          transformOrigin: "50% 100%", duration: 0.8, ease: "power4.out" })
        .to(".char-main", { rotation: 3.5, duration: 0.15, ease: "sine.out" })   // 살짝 오버슈트
        .to(".char-main", { rotation: 0, duration: 0.75, ease: "elastic.out(1, 0.45)" });  // 탄성 정착
      // 썸네일 스태거 등장
      g.from(".char-thumbs .thumb", { y: 16, stagger: 0.07, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".char-selector", start: "top 82%", once: true } });
      // 스틸 스태거 등장 — 3D 카드 플립 인 (왼쪽 축으로 펼쳐지듯)
      g.set(".still-grid", { perspective: 900 });
      g.from(".still", { autoAlpha: 0, rotationY: -58, y: 16, transformOrigin: "left center",
        stagger: { each: 0.09, from: "start" }, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ".still-grid", start: "top 80%", once: true } });
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
