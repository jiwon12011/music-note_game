// 게임 부트스트랩 — 타이틀 + 오프닝 장면(랜딩 모달 느낌) 데모.
// (닉네임/세이브/컬렉션/설정/Ink 챕터는 이후 단계에서 연결)
import { createTitle } from "./ui/title.js";
import { playScene } from "./ui/scene.js";
import { toast } from "./ui/toast.js";
import { INTRO } from "./story/intro.js";

const app = document.getElementById("app");

function showTitle() {
  app.innerHTML = "";
  app.appendChild(createTitle({
    onNew: startIntro,
    onContinue: () => toast("이어서 듣기 — 세이브 시스템 준비 중"),
    onCollection: () => toast("내 플레이리스트 — 준비 중"),
    onSettings: () => toast("설정 — 준비 중"),
  }));
}

function startIntro() {
  playScene(app, INTRO, {
    onEnd: () => {
      toast("챕터 1 도입부 — 다음 이야기는 곧 이어집니다 ♪", 2600);
      setTimeout(showTitle, 1400);
    },
  });
}

showTitle();
