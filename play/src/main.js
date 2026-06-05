// 게임 부트스트랩 — 타이틀 → 닉네임 → Ink 챕터1.
import { createTitle } from "./ui/title.js";
import { createNickname } from "./ui/nickname.js";
import { startGame } from "./ui/game.js";
import { toast } from "./ui/toast.js";

const app = document.getElementById("app");

function showTitle() {
  app.innerHTML = "";
  app.appendChild(createTitle({
    onNew: showNickname,
    onContinue: () => toast("이어서 듣기 — 세이브 시스템 준비 중"),
    onCollection: () => toast("내 플레이리스트 — 준비 중"),
    onSettings: () => toast("설정 — 준비 중"),
  }));
}

function showNickname() {
  app.innerHTML = "";
  app.appendChild(createNickname({
    onConfirm: (name) => startGame(app, {
      player: name,
      onExit: () => { toast("챕터 1 — 다음 이야기는 곧 이어집니다 ♪", 2600); setTimeout(showTitle, 1600); },
    }),
  }));
}

showTitle();
