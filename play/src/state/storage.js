// localStorage 저수지 — 네임스페이스 pbu:, JSON 가드
const NS = "pbu:";

export const storage = {
  get(key) {
    try {
      const v = localStorage.getItem(NS + key);
      return v == null ? null : JSON.parse(v);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
      return true;
    } catch {
      return false; // QuotaExceeded 등
    }
  },
  remove(key) {
    localStorage.removeItem(NS + key);
  },
};
