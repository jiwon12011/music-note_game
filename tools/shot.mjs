// 로컬 index.html을 렌더해서 스크린샷 저장 (레이아웃 점검용)
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1"), "..");
const url = pathToFileURL(path.join(root, "index.html")).href;

const width = Number(process.argv[2] || 1440);
const full = process.argv[3] !== "viewport";
const out = path.join(root, "tools", `shot-${width}.png`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle" });
// 스크롤 등장 애니메이션을 강제로 보이게 (캡처용)
await page.addStyleTag({ content: ".reveal{opacity:1 !important;transform:none !important;}" });
// GSAP ScrollTrigger 발동을 위해 끝까지 스크롤 후 복귀
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y <= h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 250));
});
await page.waitForTimeout(500);
await page.screenshot({ path: out, fullPage: full });
await browser.close();
console.log("saved", out);
