// 게임 부트스트랩 — 현재는 타이틀 화면까지.
// (닉네임/챕터1/컬렉션/설정 화면은 이후 단계에서 연결)
import { createTitle } from "./ui/title.js";
import { toast } from "./ui/toast.js";

const app = document.getElementById("app");

function showTitle() {
  app.innerHTML = "";
  const title = createTitle({
    onNew: () => toast("닉네임 입력 → 챕터1 — 다음 단계에서 연결됩니다"),
    onContinue: () => toast("이어서 듣기 — 세이브 시스템 준비 중"),
    onCollection: () => toast("내 플레이리스트 — 준비 중"),
    onSettings: () => toast("설정 — 준비 중"),
  });
  app.appendChild(title);
}

showTitle();
