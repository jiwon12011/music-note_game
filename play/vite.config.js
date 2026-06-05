import { defineConfig } from "vite";

export default defineConfig({
  // 어떤 하위 경로(/music-note_game/play/ 등)에 배포돼도 동작하도록 상대 경로 사용
  base: "./",
  server: { port: 5180, open: true },
  build: { outDir: "dist", target: "es2020" },
});
