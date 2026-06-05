// 세이브 슬롯 조회 (이어하기 활성 여부용) — 본격 세이브/로드는 추후 확장
import { storage } from "./storage.js";

export const SLOT_COUNT = 5;

export function getSlot(i) {
  return storage.get(`save:${i}`);
}

export function hasAnySave() {
  for (let i = 0; i < SLOT_COUNT; i++) if (getSlot(i)) return true;
  return false;
}

// "이어서 듣기"가 향할 슬롯: lastSlot 우선, 없으면 가장 최근 savedAt
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
