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
VAR last_lead = ""

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
# bg: kitchen
# cg: cg-01
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
-> ch2_start


// ======================= CHAPTER 2 — 적응 =======================
=== ch2_start ===
# chapter: 02 적응
# scene: 출근 첫날
# bg: office
# cg:
# char: jeongian suit center
# speaker: jeongian
지각은 아니네요. 첫날이니 봐줄게요. 자료 정리부터 시작해요.
정이안 프로듀서. 목소리에 군더더기가 하나도 없다.
# speaker: jeongian
질문 있어요?
* [“바로 시작하겠습니다.” (담백하게)]
    ~ aff_jeongian += 8
    ~ last_lead = "jeongian"
    # speaker: jeongian
    …좋아요. 말 많은 것보다 낫네요.
* [“자, 잘 부탁드립니다!” (밝게)]
    ~ aff_jeongian += 3
    ~ aff_odaeun += 2
    # speaker: jeongian
    …그 텐션이 한 달은 가길 바랄게요.
- -> ch2_hanseoa

=== ch2_hanseoa ===
# scene: 연습실 복도
# bg: corridor
# char: hanseoa hoodie center
복도 끝, 벽에 기대 지쳐 있는 한서아.
# speaker: hanseoa
…뭘 봐요.
* [말없이 이온음료를 건넨다]
    ~ aff_hanseoa += 8
    ~ last_lead = "hanseoa"
    # cg: cg-02
    그녀는 멈칫하더니, 작게 받아 들었다.
    # speaker: hanseoa
    …고마워요. 진짜로.
* [“괜찮아요?” 하고 묻는다]
    ~ aff_hanseoa += 4
    # speaker: hanseoa
    괜찮아요. 늘 이래요.
- -> ch2_yunjaeho

=== ch2_yunjaeho ===
# scene: 야근 스튜디오
# bg: studio-night
# char: yunjaeho work center
새벽 스튜디오. 윤재호는 말없이 트랙을 만지고 있다.
# speaker: yunjaeho
…아직 안 갔어요?
* [말없이 옆에 앉아 같이 듣는다]
    ~ aff_yunjaeho += 8
    ~ last_lead = "yunjaeho"
    # cg: cg-03
    그는 아무 말도 하지 않았지만, 헤드폰 한쪽을 내밀었다.
    # speaker: yunjaeho
    …이 부분, 어때요.
* [“뭐 도와드릴까요?” 묻는다]
    ~ aff_yunjaeho += 4
    # speaker: yunjaeho
    괜찮아요. 거의 다 됐어요.
- -> ch2_kael

=== ch2_kael ===
# scene: 녹음 부스
# bg: studio-day
# char: kael leather center
녹음 부스 앞, KAEL이 관심 없다는 듯 폰만 보고 있다.
# speaker: kael
새로 온 스태프? 굳이 인사 안 해도 돼요.
* [“네, 바쁘실 텐데요.” 담담히 지나친다]
    ~ aff_kael += 8
    ~ last_lead = "kael"
    # cg: cg-04
    힐끔. 그가 처음으로 시선을 들었다.
    # speaker: kael
    …뭐야. 안 들이대네. 신기하게.
* [“팬이에요! 잘 부탁드려요!” 들뜬다]
    ~ aff_kael += 2
    # speaker: kael
    하아… 또 한 명 늘었네.
- -> ch2_odaeun

=== ch2_odaeun ===
# scene: 점심시간
# bg: office
# char: odaeun varsity center
# speaker: odaeun
점심! 근데 오늘 메뉴가 운명을 결정해. 진지하게 골라.
오다은은 정말 진지한 얼굴로 메뉴판을 노려본다.
* [“그럼… 운명의 김치찌개로.” 장단 맞춘다]
    ~ aff_odaeun += 8
    ~ last_lead = "odaeun"
    # speaker: odaeun
    오, 통했다. 너 좀 마음에 들어.
* [“그냥 아무거나 먹어요.” 정색한다]
    ~ aff_odaeun += 3
    # speaker: odaeun
    …재미없게. 그래도 봐줄게.
- -> ch2_choi

=== ch2_choi ===
# scene: 셰어하우스 저녁
# bg: living-night
# char: choijunhyeok sweater center
# speaker: choijunhyeok
{player} 씨, 밥은요? 다들 안 챙겨 먹어서 내가 좀 해놨어요.
모두에게 친절한 사람. 그런데 그 친절이, 왜 조금 쓸쓸해 보일까.
* [“같이 드실래요?” 마주 앉는다]
    ~ aff_choijunhyeok += 8
    ~ last_lead = "choijunhyeok"
    # speaker: choijunhyeok
    …오랜만이네요. 같이 먹자는 말.
* [“잘 먹겠습니다!” 받아 들고 방으로]
    ~ aff_choijunhyeok += 4
    # speaker: choijunhyeok
    네, 편하게요.
- # bg: room-night
# scene: 챕터2 마무리
다들, 보이는 것과 조금씩 다르다.
누군가의 미완성된 부분에, 자꾸 마음이 머문다.
-> ch3_start


// ======================= CHAPTER 3 — 균열 =======================
=== ch3_start ===
# chapter: 03 균열
# scene: 스캔들
# bg: office
# char: odaeun jacket center
# speaker: odaeun
큰일 났어. KAEL 열애설. 근데 기사에 셰어하우스 골목이 찍혔어.
# cg: cg-05
# speaker: kael
…내 일이야. {player}는 빠져.
* [“같이 수습해요. 혼자 다 안고 가지 말고.”]
    ~ aff_kael += 6
    # speaker: kael
    …왜 자꾸, 신경 쓰이게 해.
* [오다은과 먼저 동선부터 짠다]
    ~ aff_odaeun += 6
    # speaker: odaeun
    역시. 일머리 있어, 너.
- -> ch3_data

=== ch3_data ===
# scene: 데이터 유실
# bg: studio-night
# cg: cg-06
# speaker: jeongian
…앨범 핵심 트랙이, 날아갔어요.
처음으로, 정이안의 목소리가 흔들렸다. 윤재호는 말없이 복구를 시작한다.
* [정이안 곁에서 침착하게 정리한다]
    ~ aff_jeongian += 6
    # speaker: jeongian
    …고마워요. 지금, 그 말이 필요했어요.
* [윤재호와 밤새 파일을 뒤진다]
    ~ aff_yunjaeho += 6
    # speaker: yunjaeho
    …혼자였으면, 못 버텼을 거예요.
- -> ch3_hanseoa

=== ch3_hanseoa ===
# scene: 위기 속 한서아
# bg: practice
# char: hanseoa casual center
혼란한 틈, 한서아는 혼자 연습실에 남아 있었다.
# speaker: hanseoa
…나, 데뷔할 수 있을까요. 이런 와중에.
* [“할 수 있어요. 내가 봤으니까.”]
    ~ aff_hanseoa += 6
    # speaker: hanseoa
    …당신이 그러니까, 조금 믿어볼래요.
+ [조용히 곁을 지킨다]
    ~ aff_hanseoa += 4
- -> ch3_branch

// ---- 챕터3 분기: 호감도 1위 ♥40+ → 그 캐릭터 힌트 씬 ----
=== ch3_branch ===
~ temp lead = "hanseoa"
~ temp lv = aff_hanseoa
{ aff_jeongian > lv:
    ~ lead = "jeongian"
    ~ lv = aff_jeongian
}
{ aff_odaeun > lv:
    ~ lead = "odaeun"
    ~ lv = aff_odaeun
}
{ aff_kael > lv:
    ~ lead = "kael"
    ~ lv = aff_kael
}
{ aff_yunjaeho > lv:
    ~ lead = "yunjaeho"
    ~ lv = aff_yunjaeho
}
{ aff_choijunhyeok > lv:
    ~ lead = "choijunhyeok"
    ~ lv = aff_choijunhyeok
}
{ lv < 40:
    # bg: rooftop-night
    아직, 누구의 마음도 또렷하게 향하지 않았다. 그게 더 마음에 걸렸다.
    -> ch3_choi
}
{ lead == "hanseoa": -> hint_hanseoa }
{ lead == "jeongian": -> hint_jeongian }
{ lead == "odaeun": -> hint_odaeun }
{ lead == "kael": -> hint_kael }
{ lead == "yunjaeho": -> hint_yunjaeho }
{ lead == "choijunhyeok": -> hint_choijunhyeok }
-> ch3_choi

=== hint_hanseoa ===
# scene: 그 사람의 밤
# cg: cg-07-1
# speaker: hanseoa
…사실은 무서워요. 근데 당신 앞에선, 조금 솔직해져도 될 것 같아.
누군가의 마음이, 조용히 이쪽으로 기울고 있었다.
-> ch3_choi
=== hint_jeongian ===
# scene: 그 사람의 밤
# cg: cg-07-2
# speaker: jeongian
…나, 원래 안 무너지는 사람인데. 당신 앞에서만 자꾸 틈이 생겨요.
-> ch3_choi
=== hint_odaeun ===
# scene: 그 사람의 밤
# cg: cg-07-3
# speaker: odaeun
나 사실 다 보고 있었어. 너가 누구한테 마음 쓰는지도. …나한테도, 좀 써줘.
-> ch3_choi
=== hint_kael ===
# scene: 그 사람의 밤
# cg: cg-07-4
# speaker: kael
관심 없는 척, 잘했지. 근데 너한텐 자꾸 들켜. 짜증나게.
-> ch3_choi
=== hint_yunjaeho ===
# scene: 그 사람의 밤
# cg: cg-07-5
# speaker: yunjaeho
…말로는 못 해서, 곡을 썼어요. 들어볼래요? 당신 얘기예요.
-> ch3_choi
=== hint_choijunhyeok ===
# scene: 그 사람의 밤
# cg: cg-07-6
# speaker: choijunhyeok
모두한테 친절한 데엔 이유가 있었어요. …당신한텐, 그 이유가 달라지고 있고.
-> ch3_choi

=== ch3_choi ===
# scene: 최준혁의 새벽
# bg: rooftop-night
# char: choijunhyeok knit center
모두 잠든 새벽, 옥상. 최준혁이 먼저 와 있었다.
# speaker: choijunhyeok
…가끔은, 나도 누군가한테 기대고 싶을 때가 있어요.
처음 듣는, 그의 진짜 목소리였다.
-> ch3_end

=== ch3_end ===
# hide: choijunhyeok
# bg: room-night
폭풍 같던 며칠이 지나갔다.
이제, 외면할 수 없을 것 같다 — 누군가를, 좋아하고 있다는 걸.
# speaker:
( 챕터 3 까지 플레이하셨습니다 · 다음 이야기는 준비 중 ♪ )
-> END
