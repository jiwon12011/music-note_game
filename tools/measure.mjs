import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import path from "node:path";
const url = pathToFileURL(path.resolve("index.html")).href;
const b = await chromium.launch();
for (const w of [1440, 1920]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important}" });
  const photo = await p.locator(".about-photo").boundingBox();
  const still = await p.locator(".still-grid").boundingBox();
  const banner = await p.locator(".banner-inner").boundingBox();
  console.log("w=" + w + ": photo.R=" + Math.round(photo.x + photo.width) + "  still.R=" + Math.round(still.x + still.width) + "  banner.R=" + Math.round(banner.x + banner.width));
  await p.close();
}
await b.close();
