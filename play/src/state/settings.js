// 설정 — localStorage 영속 + 즉시 적용
import { storage } from "./storage.js";

const DEFAULTS = { v: 1, textSpeed: 26, bgmVolume: 0.6, seVolume: 0.8 };

let cache = null;
export const settings = {
  get() {
    if (!cache) cache = { ...DEFAULTS, ...(storage.get("settings") || {}) };
    return cache;
  },
  set(patch) {
    cache = { ...this.get(), ...patch };
    storage.set("settings", cache);
    return cache;
  },
  reset() { cache = { ...DEFAULTS }; storage.set("settings", cache); return cache; },
};
