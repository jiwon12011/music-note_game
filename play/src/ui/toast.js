// 가벼운 토스트 알림
let el = null;
let timer = null;

export function toast(message, ms = 1800) {
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  // 리플로우 후 show (전환 보장)
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("show"), ms);
}
