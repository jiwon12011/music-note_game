// 오버레이 헬퍼 — 백드롭/ESC 닫기
export function openOverlay(contentEl, { onClose } = {}) {
  const ov = document.createElement("div");
  ov.className = "overlay";
  ov.appendChild(contentEl);
  document.body.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add("open"));

  const close = () => {
    ov.classList.remove("open");
    document.removeEventListener("keydown", onKey);
    setTimeout(() => { ov.remove(); onClose && onClose(); }, 350);
  };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
  return { el: ov, close };
}
