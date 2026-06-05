// 캐릭터 단일 출처 — romaji 키(ASSETS.md와 1:1) → 표시명 + 이름표 테마색
export const CHARS = {
  hanseoa:      { name: "한서아", color: "#ef94ac" },
  jeongian:     { name: "정이안", color: "#8a9be8" },
  odaeun:       { name: "오다은", color: "#f0b75c" },
  kael:         { name: "KAEL",   color: "#9aa2b1" },
  yunjaeho:     { name: "윤재호", color: "#7fc0a8" },
  choijunhyeok: { name: "최준혁", color: "#e0a878" },
};

export function charName(key) {
  return CHARS[key]?.name ?? key;
}
export function charColor(key) {
  return CHARS[key]?.color ?? "var(--c-primary)";
}
