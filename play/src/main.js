// 게임 부트스트랩 — 타이틀 → 닉네임 → Ink 챕터1, 이어하기/컬렉션/설정 연결.
import { createTitle } from "./ui/title.js";
import { createNickname } from "./ui/nickname.js";
import { startGame } from "./ui/game.js";
import { openCollection } from "./ui/collection.js";
import { openSettings } from "./ui/settings.js";
import { toast } from "./ui/toast.js";
import { continueSlot } from "./state/saves.js";

const app = document.getElementById("app");
const onExit = () => { toast("챕터 1 — 다음 이야기는 곧 이어집니다 ♪", 2400); setTimeout(showTitle, 1400); };

function showTitle() {
  app.innerHTML = "";
  app.appendChild(createTitle({
    onNew: showNickname,
    onContinue: () => { const s = continueSlot(); if (s == null) return toast("저장된 곡이 없어요"); startGame(app, { resumeSlot: s, onExit }); },
    onCollection: openCollection,
    onSettings: openSettings,
  }));
}

function showNickname() {
  app.innerHTML = "";
  app.appendChild(createNickname({ onConfirm: (name) => startGame(app, { player: name, onExit }) }));
}

showTitle();
