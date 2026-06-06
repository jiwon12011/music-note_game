// 세이브 슬롯 (Ink 상태 직렬화). 진실=story.state.ToJson(), preview=슬롯목록 표시용 캐시.
import { storage } from "./storage.js";

export const SLOT_COUNT = 5;
const SCHEMA_V = 1;
// 스토리 구조 버전 — 본편(Ink) 구조가 크게 바뀌면 올린다. 옛 세이브의 Ink 상태는
// 컨테이너 인덱스가 어긋나 LoadJson 시 throw 할 수 있으므로, 불일치 세이브는 무효 처리.
const STORY_V = 2;

export function getSlot(i) { return storage.get(`save:${i}`); }
// 현재 스토리 버전과 호환되는 세이브만 유효로 간주
function compatible(d) { return !!d && d.v === SCHEMA_V && d.sv === STORY_V; }

export function hasAnySave() { for (let i = 0; i < SLOT_COUNT; i++) if (compatible(getSlot(i))) return true; return false; }

export function continueSlot() {
  const last = storage.get("lastSlot");
  if (last != null && compatible(getSlot(last))) return last;
  let best = null;
  for (let i = 0; i < SLOT_COUNT; i++) {
    const d = getSlot(i);
    if (compatible(d) && (!best || d.savedAt > best.savedAt)) best = { i, savedAt: d.savedAt };
  }
  return best ? best.i : null;
}

// story: inkjs Story, preview: {player, scene, bg, line, affection}
export function save(slot, story, preview) {
  const ok = storage.set(`save:${slot}`, {
    v: SCHEMA_V, sv: STORY_V, savedAt: Date.now(),
    ink: story.state.ToJson(),
    preview: preview || {},
  });
  if (ok) storage.set("lastSlot", slot);
  return ok;
}

// story 에 슬롯 상태 복원 — 불일치/손상 세이브는 null (호출측이 새로 시작)
export function loadInto(story, slot) {
  const d = getSlot(slot);
  if (!compatible(d)) return null;
  try {
    story.state.LoadJson(d.ink);
  } catch (e) {
    console.warn("[saves] 손상된 세이브 — 무시하고 새로 시작:", e);
    return null;
  }
  storage.set("lastSlot", slot);
  return d;
}

export function deleteSlot(slot) { storage.remove(`save:${slot}`); }
