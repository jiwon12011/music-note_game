// 세이브 슬롯 (Ink 상태 직렬화). 진실=story.state.ToJson(), preview=슬롯목록 표시용 캐시.
import { storage } from "./storage.js";

export const SLOT_COUNT = 5;
const SCHEMA_V = 1;

export function getSlot(i) { return storage.get(`save:${i}`); }
export function hasAnySave() { for (let i = 0; i < SLOT_COUNT; i++) if (getSlot(i)) return true; return false; }

export function continueSlot() {
  const last = storage.get("lastSlot");
  if (last != null && getSlot(last)) return last;
  let best = null;
  for (let i = 0; i < SLOT_COUNT; i++) {
    const d = getSlot(i);
    if (d && (!best || d.savedAt > best.savedAt)) best = { i, savedAt: d.savedAt };
  }
  return best ? best.i : null;
}

// story: inkjs Story, preview: {player, scene, bg, line, affection}
export function save(slot, story, preview) {
  const ok = storage.set(`save:${slot}`, {
    v: SCHEMA_V, savedAt: Date.now(),
    ink: story.state.ToJson(),
    preview: preview || {},
  });
  if (ok) storage.set("lastSlot", slot);
  return ok;
}

// story 에 슬롯 상태 복원
export function loadInto(story, slot) {
  const d = getSlot(slot);
  if (!d || d.v !== SCHEMA_V) return null;
  story.state.LoadJson(d.ink);
  storage.set("lastSlot", slot);
  return d;
}

export function deleteSlot(slot) { storage.remove(`save:${slot}`); }
