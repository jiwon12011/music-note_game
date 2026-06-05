// LP 누끼 이미지의 흰 테두리(매트) 제거 — 정석 버전
//  1) 흰색 디스필: 반투명 픽셀에서 흰 배경 성분을 역산해 제거 (un-premultiply white)
//  2) 정밀 침식: 불투명 흰 테두리 링을 min-filter로 깎아냄
//  3) 살짝 페더링
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "IMG", "lp_with_characters 1.png");
const out = path.join(root, "assets", "hero-lp.webp");

const W = 1500;
const ERODE = Number(process.argv[2] ?? 2);   // 침식 반경(px). 흰선 남으면 ↑, 디테일 깎이면 ↓
const FEATHER = Number(process.argv[3] ?? 0.6);

const { data, info } = await sharp(src)
  .resize({ width: W })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const N = w * h;

// ---- 1) 흰색 디스필 (un-premultiply white) ----
// 관측색 C = a*F + (1-a)*255  =>  F = (C - 255*(1-a)) / a
for (let i = 0; i < data.length; i += 4) {
  const a = data[i + 3] / 255;
  if (a > 0.04 && a < 0.996) {
    for (let c = 0; c < 3; c++) {
      const v = (data[i + c] - 255 * (1 - a)) / a;
      data[i + c] = v < 0 ? 0 : v > 255 ? 255 : v;
    }
  }
}

// ---- 2) 알파 침식 (separable min-filter, 반경 ERODE) ----
if (ERODE > 0) {
  const a = new Uint8Array(N);
  for (let p = 0, i = 3; p < N; p++, i += 4) a[p] = data[i];
  const tmp = new Uint8Array(N);
  const r = Math.round(ERODE);
  // 가로 min
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let m = 255;
      for (let dx = -r; dx <= r; dx++) {
        const xx = x + dx;
        if (xx < 0 || xx >= w) continue;
        const v = a[row + xx];
        if (v < m) m = v;
      }
      tmp[row + x] = m;
    }
  }
  // 세로 min
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let m = 255;
      for (let dy = -r; dy <= r; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        const v = tmp[yy * w + x];
        if (v < m) m = v;
      }
      a[y * w + x] = m;
    }
  }
  for (let p = 0, i = 3; p < N; p++, i += 4) data[i] = a[p];
}

// ---- 3) 페더링(가장자리만 살짝 부드럽게) ----
let pipeline = sharp(data, { raw: { width: w, height: h, channels: 4 } });
if (FEATHER > 0) {
  const softAlpha = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extractChannel(3)
    .blur(FEATHER)
    .toBuffer();
  const rgb = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .removeAlpha()
    .raw()
    .toBuffer();
  pipeline = sharp(rgb, { raw: { width: w, height: h, channels: 3 } })
    .joinChannel(softAlpha, { raw: { width: w, height: h, channels: 1 } });
}

const r2 = await pipeline.webp({ quality: 88 }).toFile(out);
console.log(`de-matted (despill + erode ${ERODE}px) -> assets/hero-lp.webp (${(r2.size / 1024).toFixed(0)} KB, ${r2.width}x${r2.height})`);
