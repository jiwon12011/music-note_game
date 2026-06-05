// 프로필(전 슬롯 공유) — 컬렉션 트랙 해금 + 본 엔딩. 한 번 해금하면 영구.
import { storage } from "./storage.js";

function read() { return storage.get("profile") || { v: 1, tracks: [], endings: [] }; }
function write(p) { storage.set("profile", p); }

export const profile = {
  unlockTrack(id) {
    const p = read();
    if (!p.tracks.includes(id)) { p.tracks.push(id); write(p); return true; }
    return false;
  },
  markEnding(id) {
    const p = read();
    if (!p.endings.includes(id)) { p.endings.push(id); write(p); }
  },
  unlockedTracks() { return new Set(read().tracks); },
  all() { return read(); },
};

// 트랙 마스터 카탈로그 — Ink `# track: <id> <name>` 로 해금. 썸네일은 그 씬의 배경 재활용.
export const TRACK_CATALOG = [
  { id: "t01", name: "상경, 첫 곡", bg: "train" },
  { id: "t02", name: "셰어하우스의 밤", bg: "house-ext-night" },
  { id: "t03", name: "냉장고 앞에서", bg: "kitchen" },
  { id: "t04", name: "차가운 첫인상", bg: "living-day" },
];
