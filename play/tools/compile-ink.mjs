// .ink → .json 컴파일 (node tools/compile-ink.mjs)
// 브라우저는 가벼운 런타임(vendor/ink.mjs)으로 public/story/*.json 만 로드 → 런타임 컴파일 비용 없음
import { Compiler } from "inkjs/full";
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";
import { join } from "path";

const SRC = "story";
const OUT = "public/story";
mkdirSync(OUT, { recursive: true });

let n = 0;
for (const f of readdirSync(SRC).filter((f) => f.endsWith(".ink"))) {
  const src = readFileSync(join(SRC, f), "utf8");
  const story = new Compiler(src).Compile();
  const json = story.ToJson();
  const out = join(OUT, f.replace(/\.ink$/, ".json"));
  writeFileSync(out, json);
  console.log(`✓ ${f} → ${out} (${json.length} bytes)`);
  n++;
}
console.log(`compiled ${n} file(s).`);
