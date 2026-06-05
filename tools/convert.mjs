// PNG(IMG/) → WebP(assets/) 변환 스크립트
// 원본은 IMG 폴더에 그대로 보존, 웹용 webp만 assets/ 에 생성
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "IMG");
const OUT = path.join(root, "assets");

// 원본 파일명 → { out: 출력 이름(확장자 제외), width: 최대 가로폭 }
const MAP = {
  "lp_with_characters 1.png": { out: "hero-lp", width: 1500 },
  "image 557.png": { out: "badge-play", width: 500 },
  "image 549.png": { out: "char-hanseoa", width: 800 },
  "image 546.png": { out: "char-jeongian", width: 800 },
  "image 552.png": { out: "char-odaeun", width: 800 },
  "image 551.png": { out: "char-kael", width: 800 },
  "image 554.png": { out: "char-yunjaeho", width: 800 },
  "image 556.png": { out: "char-choijunhyeok", width: 800 },
  "image 553.png": { out: "about-room", width: 1400 },
  "Mask group.png": { out: "about-room-cut", width: 1200 },
  "image 559.png": { out: "still-stage", width: 1400 },
  "image 561.png": { out: "still-office", width: 1400 },
  "image 555.png": { out: "banner-bottom", width: 1600 },
  "image 560.png": { out: "scene-rooftop", width: 1400 },
  "image 562.png": { out: "scene-workroom", width: 1400 },
  "image 563.png": { out: "scene-rain", width: 1400 },
  "image 564.png": { out: "scene-study", width: 1400 },
  "image 569.png": { out: "scene-station", width: 1400 },
  "Subtract.png": { out: "filmstrip", width: 1000 },
  "Union.png": { out: "zigzag", width: 800 },
  "logo.png": { out: "logo", width: 140 },
};

await mkdir(OUT, { recursive: true });

let total = 0;
for (const [file, cfg] of Object.entries(MAP)) {
  const src = path.join(SRC, file);
  const dst = path.join(OUT, cfg.out + ".webp");
  try {
    const info = await sharp(src)
      .resize({ width: cfg.width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(dst);
    const kb = (info.size / 1024).toFixed(0);
    console.log(`OK  ${file}  ->  assets/${cfg.out}.webp  (${kb} KB, ${info.width}x${info.height})`);
    total += info.size;
  } catch (e) {
    console.log(`ERR ${file}: ${e.message}`);
  }
}
console.log(`\n총 ${Object.keys(MAP).length}개, 합계 ${(total / 1024 / 1024).toFixed(2)} MB`);
