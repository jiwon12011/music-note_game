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
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

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

  const charStage = document.getElementById("charStage");
  const charBand = document.querySelector(".char-band-full");
  const charMain = document.getElementById("charMain");
  const charFace = document.getElementById("charFace");
  const charName = document.getElementById("charName");
  const charRole = document.getElementById("charRole");
  const charDesc = document.getElementById("charDesc");
  const thumbs = document.querySelectorAll(".thumb");

  // 이미지 미리 로드 (전환 시 깜빡임 방지)
  Object.values(CHARACTERS).forEach((c) => { const i = new Image(); i.src = c.img; });

  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const data = CHARACTERS[btn.dataset.key];
      if (!data || btn.classList.contains("active")) return;

      thumbs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (charBand) charBand.style.background = data.color;  /* 핑크 띠 색 캐릭터마다 */
      charMain.classList.add("swapping");
      if (charFace) charFace.style.opacity = "0";
      setTimeout(() => {
        charMain.src = data.img;
        charMain.alt = data.name;
        if (charFace) { charFace.src = data.img; charFace.style.opacity = ""; }
        charName.textContent = data.name;
        charRole.textContent = data.role;
        charDesc.textContent = data.desc;
        charMain.classList.remove("swapping");
      }, 200);
    });
  });

  /* ---------- 썸네일 캐러셀 (한 번에 3개 + 위/아래 화살표) ---------- */
  const thumbsList = document.getElementById("charThumbs");
  const charPrev = document.getElementById("charPrev");
  const charNext = document.getElementById("charNext");
  const STEP = 96;     // 썸네일 84 + 간격 12
  const VISIBLE = 3;
  const maxOffset = Math.max(0, thumbs.length - VISIBLE);
  let offset = 0;
  const updateCarousel = () => {
    if (thumbsList) thumbsList.style.transform = "translateY(" + (-offset * STEP) + "px)";
    if (charPrev) charPrev.disabled = offset <= 0;
    if (charNext) charNext.disabled = offset >= maxOffset;
  };
  if (charPrev) charPrev.addEventListener("click", () => { if (offset > 0) { offset--; updateCarousel(); } });
  if (charNext) charNext.addEventListener("click", () => { if (offset < maxOffset) { offset++; updateCarousel(); } });
  updateCarousel();
})();
