// 챕터1 오프닝 (데이터 기반 — 추후 Ink story.ink로 대체. 같은 렌더 파이프라인 사용)
// step 종류:
//   { chapter:[번호, "제목"] }                           챕터 전환 카드
//   { bg, char:[key,outfit,pos], hide, speaker, text }    대사/내레이션 (speaker 없으면 독백)
//   { choices:[ { text, aff:[[key,delta]], reply:{speaker,text} } ] }
export const INTRO = [
  { chapter: ["01", "상경"] },

  { bg: "train", text: "서울행 기차. 창밖 풍경이 빠르게 흘러간다." },
  { text: "이어폰 속 누군가의 노래처럼, 내 심장도 빠르게 뛴다." },
  { text: "음악을 만드는 사람들과 한집에서 산다니… 잘할 수 있을까." },

  { bg: "house-ext-night", char: ["choijunhyeok", "sweater", "center"], speaker: "choijunhyeok", text: "어서 와요. 길 안 헷갈렸어요?" },
  { speaker: null, text: "문을 열어준 사람은 셰어하우스 주인, 최준혁. 따뜻한 인상인데 어딘가 한 발짝 물러서 있는 느낌." },

  { bg: "kitchen", char: ["choijunhyeok", "sweater", "center"], text: "늦은 밤. 물을 마시러 나왔다가 냉장고 앞에서 다시 마주쳤다." },
  { speaker: "choijunhyeok", text: "안 자고 뭐 해요?" },
  { speaker: null, text: "뭐라고 답하지." },

  { choices: [
    { text: "“죄송해요, 제가 너무 늦게 들어왔죠?”", aff: [["choijunhyeok", 10]],
      reply: { speaker: "choijunhyeok", text: "아니에요. 편하게 지내요. 여기 그러라고 있는 집이니까." } },
    { text: "그냥 어색하게 웃고 방으로 들어간다", aff: [["choijunhyeok", 5]],
      reply: { speaker: null, text: "어색하게 웃어 보이고 방으로 들어왔다. 등 뒤로 부엌 불이 꺼졌다." } },
    { text: "“배고프세요? …저도요” 먼저 말 건다", aff: [["choijunhyeok", 7], ["odaeun", 3]],
      reply: { speaker: "choijunhyeok", text: "풉. 뭐 좀 만들어줄까요?" } },
  ] },

  { bg: "living-day", hide: "choijunhyeok", char: ["hanseoa", "casual", "center"], speaker: null, text: "첫 아침. 거실에서 마주친 사람은 한서아." },
  { speaker: "hanseoa", text: "……" },
  { speaker: null, text: "인사를 건넸지만, 그녀는 눈도 마주치지 않고 지나갔다. 차가운 첫인상 — 알고 보면 다를까?" },

  { hide: "hanseoa", speaker: null, text: "내일은 첫 출근. 설렘 반, 긴장 반." },
  { text: "각자의 미완성된 곡처럼, 나도 아직 완성되지 않았다." },
];
