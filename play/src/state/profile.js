// 프로필(전 슬롯 공유) — 컬렉션 트랙 해금 + 본 엔딩. 한 번 해금하면 영구.
import { storage } from "./storage.js";

// 기존 프로필에 polaroids/lyrics 가 없을 수 있으므로 기본 배열을 항상 보강
function read() { const p = storage.get("profile") || {}; return { v: 1, tracks: [], endings: [], polaroids: [], lyrics: [], ...p }; }
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
  unlockPolaroid(id) {
    const p = read();
    if (!p.polaroids.includes(id)) { p.polaroids.push(id); write(p); return true; }
    return false;
  },
  unlockLyric(id) {
    const p = read();
    if (!p.lyrics.includes(id)) { p.lyrics.push(id); write(p); return true; }
    return false;
  },
  unlockedTracks() { return new Set(read().tracks); },
  unlockedPolaroids() { return new Set(read().polaroids); },
  unlockedLyrics() { return new Set(read().lyrics); },
  all() { return read(); },
};

// 트랙 마스터 카탈로그 — Ink `# track: <id>` 로 해금. 썸네일은 CG(이벤트 일러)가 있으면 그걸, 없으면 배경.
export const TRACK_CATALOG = [
  { id: "t01", name: "상경, 첫 곡", bg: "train" },
  { id: "t02", name: "셰어하우스의 밤", bg: "house-ext-night" },
  { id: "t03", name: "냉장고 앞에서", bg: "kitchen", cg: "cg-01" },
  { id: "t04", name: "차가운 첫인상", bg: "living-day" },
  { id: "t05", name: "데뷔 무대", bg: "stage", cg: "cg-08" },
  // 루트 전용 트랙 — 각 루트의 '그 사람의 밤' CG로 해금 (재플레이 동기)
  { id: "t-hanseoa", name: "가사 속 네 이름 · 한서아", bg: "studio-night", cg: "cg-07-1" },
  { id: "t-jeongian", name: "무언의 허락 · 정이안", bg: "studio-night", cg: "cg-07-2" },
  { id: "t-odaeun", name: "갑옷을 벗은 밤 · 오다은", bg: "rooftop-night", cg: "cg-07-3" },
  { id: "t-kael", name: "들켜버린 진심 · KAEL", bg: "rooftop-night", cg: "cg-07-4" },
  { id: "t-yunjaeho", name: "메모가 일기였어요 · 윤재호", bg: "studio-night", cg: "cg-07-5" },
  { id: "t-choijunhyeok", name: "혼자가 아니라는 말 · 최준혁", bg: "living-night", cg: "cg-07-6" },
  // 루트별 디테일 CG — 같은 루트라도 감정의 문턱을 따로 기억하게 한다.
  { id: "t-hs-practice", name: "무대 밖에서 무너진 밤 · 한서아", bg: "practice", cg: "cg-10-hanseoa-practice" },
  { id: "t-hs-note", name: "덮어둔 비밀 노트 · 한서아", bg: "rooftop-dusk", cg: "cg-17-hanseoa-rooftop-lyric" },
  { id: "t-hs-stage", name: "무대 직전의 약속 · 한서아", bg: "stage", cg: "cg-16-hanseoa-stage-late" },
  { id: "t-ji-late", name: "야근의 작은 틈 · 정이안", bg: "office", cg: "cg-11-jeongian-vending" },
  { id: "t-ji-demo", name: "안 끄고 둔 데모 · 정이안", bg: "studio-night", cg: "cg-19-jeongian-control-room" },
  { id: "t-ji-credit", name: "크레딧에 남은 이름 · 정이안", bg: "office", cg: "cg-18-jeongian-dawn-meeting" },
  { id: "t-od-polaroid", name: "제일 앞 장의 사진 · 오다은", bg: "living-day", cg: "cg-12-odaeun-polaroid" },
  { id: "t-od-rain", name: "젖은 우산과 기다림 · 오다은", bg: "house-ext-night", cg: "cg-21-odaeun-rain-polaroids" },
  { id: "t-kl-backstage", name: "고맙다는 말의 뒷모습 · KAEL", bg: "backstage", cg: "cg-22-kael-backstage" },
  { id: "t-kl-booth", name: "유리 너머의 진짜 곡 · KAEL", bg: "studio-night", cg: "cg-23-kael-booth" },
  { id: "t-kl-practice", name: "멋있는 척이 안 되는 밤 · KAEL", bg: "practice", cg: "cg-13-kael-practice" },
  { id: "t-yj-score", name: "방문 앞의 악보 · 윤재호", bg: "room-night", cg: "cg-14-yunjaeho-score" },
  { id: "t-yj-dawn", name: "새벽에 완성된 한 소절 · 윤재호", bg: "studio-night", cg: "cg-24-yunjaeho-dawn-score" },
  { id: "t-yj-stage", name: "단 한 번의 무대 뒤 · 윤재호", bg: "backstage", cg: "cg-25-yunjaeho-backstage" },
  { id: "t-cj-kitchen", name: "둘도 나쁘지 않은 새벽 · 최준혁", bg: "kitchen", cg: "cg-26-choijunhyeok-kitchen" },
  { id: "t-cj-clock", name: "멈춘 시계의 문장 · 최준혁", bg: "living-night", cg: "cg-15-choijunhyeok-clock" },
  { id: "t-cj-room", name: "잠긴 방이 열린 날 · 최준혁", bg: "room-day", cg: "cg-27-choijunhyeok-locked-room" },
];

// `# cg: <id>` 로 해금된 CG → 매칭되는 트랙 찾기
export function trackByCg(cgId) { return TRACK_CATALOG.find((t) => t.cg === cgId); }

// ── 서브 수집 ① 오다은의 폴라로이드 (일상의 순간, 기존 배경/CG를 사진으로 재사용) ──
// Ink `# collect: pl-N` 로 해금. 일부는 공통 루트(누구나), 나머지는 오다은 루트.
export const POLAROID_CATALOG = [
  { id: "pl-1", img: "cg-01",   isCg: true,  date: "D-179", cap: "냉장고 앞 — 처음 마주친 새벽" },
  { id: "pl-2", img: "living-day",  isCg: false, date: "D-168", cap: "첫 주말 — 일손 자처한 신입" },
  { id: "pl-3", img: "office",      isCg: false, date: "D-150", cap: "운명의 김치찌개 — 메뉴 고르던 점심" },
  { id: "pl-4", img: "cg-20-odaeun-vending", isCg: true, date: "D-132", cap: "야근의 밤 — 캔커피 두 개" },
  { id: "pl-5", img: "cg-12-odaeun-polaroid", isCg: true,  date: "D-30",  cap: "제일 앞 장 — 몰래 모아둔 마음" },
  { id: "pl-6", img: "rooftop-night", isCg: false, date: "D-7", cap: "옥상의 약속 — 이제 혼자 두지 않을게" },
];

// ── 서브 수집 ② 윤재호의 가사 조각 (다 모으면 엔딩곡 가사 완성 = 반전) ──
// Ink `# collect: ly-N` 로 해금. 순서대로 모이면 한 곡이 된다.
export const LYRIC_CATALOG = [
  { id: "ly-1", line: "창밖으로 흘러가던, 그 밤의 멜로디" },
  { id: "ly-2", line: "완성하지 못한 채 접어둔 한 소절" },
  { id: "ly-3", line: "네가 건넨 이어폰 한쪽, 같은 박자로 뛰던 마음" },
  { id: "ly-4", line: "잃어버린 줄 알았던 메모 — 사실은, 너에게 쓴 일기였어" },
  { id: "ly-5", line: "말이 모자란 나 대신, 음표가 너를 부른다" },
  { id: "ly-6", line: "이 노래의 마지막 줄에 — 너의 이름을 적어" },
];

export const LYRIC_TITLE = "우리 사이의 음표";
