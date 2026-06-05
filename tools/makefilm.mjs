// 깔끔한 얇은 필름 스트립 생성 (세로 막대 → CSS로 회전해서 대각선으로 사용)
// 양쪽 가장자리에 스프로켓 구멍(투명)
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "assets", "filmstrip.webp");

const W = 150, H = 1300;
const film = "#352a27";
const holeW = 20, holeH = 30, gap = 56;
const leftX = 16, rightX = W - 16 - holeW;

let holes = "";
for (let y = 34; y + holeH < H; y += gap) {
  holes += `<rect x="${leftX}" y="${y}" width="${holeW}" height="${holeH}" rx="5" fill="black"/>`;
  holes += `<rect x="${rightX}" y="${y}" width="${holeW}" height="${holeH}" rx="5" fill="black"/>`;
}

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><mask id="m">
    <rect width="${W}" height="${H}" fill="white"/>
    ${holes}
  </mask></defs>
  <rect width="${W}" height="${H}" rx="6" fill="${film}" mask="url(#m)"/>
</svg>`;

const info = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
console.log(`film strip -> assets/filmstrip.webp (${(info.size / 1024).toFixed(1)} KB, ${info.width}x${info.height})`);
