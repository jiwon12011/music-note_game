// 닉네임 입력 — 정이안의 메시지 안에서 자연스럽게 (기차 배경)
const ASSET = "public/img";

export function createNickname({ onConfirm }) {
  const screen = document.createElement("section");
  screen.className = "screen nickname active";
  screen.innerHTML = `
    <div class="nick-bg" style="background-image:url('${ASSET}/bg/train.webp')"></div>
    <div class="nick-box">
      <div class="nick-thread">
        <span class="nick-from">정이안 · 프로듀서</span>
        <p class="nick-bubble">내일 10시까지 와요. 늦지 마세요.</p>
        <p class="nick-bubble">아, 이름 확인용으로… 뭐라고 부르면 될까요?</p>
      </div>
      <div class="nick-reply">
        <input class="nick-input" type="text" maxlength="8" placeholder="불릴 이름을 입력하세요" autocomplete="off" spellcheck="false" />
        <button class="nick-send">보내기 ↵</button>
      </div>
      <p class="nick-hint">캐릭터들이 이 이름으로 당신을 부릅니다 (최대 8자)</p>
    </div>`;

  const input = screen.querySelector(".nick-input");
  const submit = () => {
    let v = input.value.trim().replace(/[{}<>]/g, "");
    if (!v) v = "당신";
    onConfirm(v.slice(0, 8));
  };
  screen.querySelector(".nick-send").addEventListener("click", submit);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } });
  setTimeout(() => input.focus(), 500);
  return screen;
}
