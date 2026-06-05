// 플레이리스트 : 우리 사이의 음표 — 챕터 1 "상경"
// 태그 규약: # bg: / # char: <key> <outfit> [pos] / # hide: <key>|all / # speaker: <key> / # chapter: / # scene:
// 호감도는 VAR 로 관리(엔진이 ObserveVariable 로 +n 표시). {player} = 닉네임(입력 화면에서 주입)

VAR player = "당신"
VAR aff_hanseoa = 0
VAR aff_jeongian = 0
VAR aff_odaeun = 0
VAR aff_kael = 0
VAR aff_yunjaeho = 0
VAR aff_choijunhyeok = 0

-> opening

=== opening ===
# chapter: 01 상경
# scene: 상경 기차
# track: t01
# bg: train
서울행 기차. 창밖 풍경이 빠르게 흘러간다.
이어폰 속 누군가의 노래처럼, 내 심장도 빠르게 뛴다.
음악을 만드는 사람들과 한집에서 산다니… 정말 잘할 수 있을까.
핸드폰이 울린다. 정이안 프로듀서의 메시지다.
# speaker: jeongian
내일 10시까지. 늦지 마세요.
# speaker: jeongian
이름 확인용으로 뭐라고 부르면 될까요?
잠시 망설이다, '{player}'라고 답을 보냈다.
-> arrival

=== arrival ===
# scene: 셰어하우스 도착
# track: t02
# bg: house-ext-night
# char: choijunhyeok sweater center
# speaker: choijunhyeok
어서 와요, {player} 씨. 길 안 헷갈렸어요?
문을 열어준 사람은 셰어하우스 주인, 최준혁.
따뜻한 인상인데, 어딘가 한 발짝 물러서 있는 느낌이 든다.
-> luggage

=== luggage ===
# scene: 짐 풀기
# bg: living-night
# char: odaeun hoodie center
# speaker: odaeun
어! 새로 온 사람이다. 음악 좋아해? …좋아하니까 왔겠지. 당연한 걸 물었네.
# speaker: odaeun
난 오다은, 매니저. 잘 부탁해. 아 참, 그 박스 안에 라면 있지? 냄새가 나.
# hide: odaeun
짐도 다 못 풀었는데, 오다은은 엉뚱한 말만 남기고 사라졌다.
-> fridge

=== fridge ===
# scene: 냉장고 앞
# track: t03
# bg: kitchen
# char: choijunhyeok sweater center
늦은 밤. 물을 마시러 나왔다가, 냉장고 앞에서 다시 최준혁과 마주쳤다.
# speaker: choijunhyeok
안 자고 뭐 해요?
뭐라고 답하지.
* [“죄송해요, 제가 너무 늦게 들어왔죠?”]
    ~ aff_choijunhyeok += 10
    # speaker: choijunhyeok
    아니에요. 편하게 지내요. 여기, 그러라고 있는 집이니까.
* [그냥 어색하게 웃고 방으로 들어간다]
    ~ aff_choijunhyeok += 5
    어색하게 웃어 보이고 방으로 들어왔다. 등 뒤로 부엌 불이 꺼졌다.
* [“배고프세요? …저도요” 먼저 말 건다]
    ~ aff_choijunhyeok += 7
    ~ aff_odaeun += 3
    # speaker: choijunhyeok
    풉. {player} 씨, 뭐 좀 만들어줄까요?
- -> morning

=== morning ===
# scene: 첫 아침
# track: t04
# bg: living-day
# hide: choijunhyeok
# char: hanseoa casual center
첫 아침. 거실에서 마주친 사람은 한서아.
# speaker: hanseoa
……
인사를 건넸지만, 그녀는 눈도 마주치지 않고 지나갔다.
차가운 첫인상 — 알고 보면, 조금은 다를까?
-> ch1_end

=== ch1_end ===
# hide: hanseoa
# bg: room-night
오늘 하루가, 한 곡처럼 지나갔다.
내일은 첫 출근. 설렘 반, 긴장 반.
각자의 미완성된 곡처럼 — 나도, 아직 완성되지 않았다.
-> END
