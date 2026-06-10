// 게임 부트스트랩 — 타이틀 → 닉네임 → Ink 챕터1, 이어하기/컬렉션/설정 연결.
import { playPrologue } from "./ui/prologue.js";
import { createTitle } from "./ui/title.js";
import { createNickname } from "./ui/nickname.js";
// game.js(+ink.mjs 125KB)는 실제 게임 시작 직전 동적 로드 → 타이틀/프롤로그 초기 비용에서 제외
const loadGame = () => import("./ui/game.js").then((m) => m.startGame);
import { openCollection } from "./ui/collection.js";
import { openSettings } from "./ui/settings.js";
import { toast } from "./ui/toast.js";
import { audio } from "./ui/audio.js";
import { continueSlot } from "./state/saves.js";

const app = document.getElementById("app");
const onExit = () => { toast("이야기를 끝까지 함께해 주셔서 고마워요 ♪", 2400); setTimeout(showTitle, 1400); };

// 오토플레이 정책 — 첫 사용자 제스처에서 오디오 활성화
const unlockAudio = () => audio.unlock();
window.addEventListener("pointerdown", unlockAudio);
window.addEventListener("touchstart", unlockAudio);
window.addEventListener("keydown", unlockAudio);

// 화면 교체: 떠나는 화면의 정리 훅(_cleanup)을 호출해 이벤트 리스너 누수 방지
function clearApp() {
  app.querySelectorAll("*").forEach((el) => el._cleanup?.());
  app._cleanup?.();
  app.innerHTML = "";
}

function showTitle() {
  clearApp();
  audio.setAmbient("none"); // 타이틀에선 배경음 정지
  loadGame();               // 게임 모듈을 타이틀 유휴 시간에 미리 데워둠(클릭 후 대기 단축)
  app.appendChild(createTitle({
    onNew: showNickname,
    onContinue: async () => {
      const s = continueSlot(); if (s == null) return toast("저장된 곡이 없어요");
      const startGame = await loadGame();
      startGame(app, { resumeSlot: s, onExit });
    },
    onCollection: openCollection,
    onSettings: openSettings,
  }));
}

function showNickname() {
  clearApp();
  app.appendChild(createNickname({ onConfirm: async (name) => {
    const startGame = await loadGame();
    startGame(app, { player: name, onExit });
  } }));
}

// 게임 진입 → 프롤로그(시네마틱 오프닝) 먼저 재생 → 타이틀 화면
// (타이틀로 돌아올 땐 showTitle 직접 호출하므로 프롤로그는 최초 진입 1회만)
clearApp();
playPrologue(app, { onDone: showTitle });
