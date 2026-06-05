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
VAR ending_lead = ""

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
{ lv < 14:
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
-> ch4_start


// ======================= CHAPTER 4 — 심화 =======================
=== ch4_start ===
# chapter: 04 심화
# scene: 스캔들 여파
# bg: backstage
# char: kael white center
스캔들은 가라앉았다. 그런데 KAEL은, 유독 나한테만 가시가 돋아 있다.
# speaker: kael
왜 자꾸 챙겨. 동정이야?
* [“동정 아니에요. 그냥, 두고 볼 수가 없어서.”]
    ~ aff_kael += 15
    # speaker: kael
    …하. 그런 말, 함부로 하지 마. 진심으로 들리니까.
* [“신경 쓰이면, 안 챙길게요.” 한 발 물러선다]
    ~ aff_kael += 8
    # speaker: kael
    …아니. 됐어. 그냥… 있어.
- -> ch4_jeongian

=== ch4_jeongian ===
# scene: 정이안의 균열
# bg: office
# char: jeongian messy center
서류를 두 번이나 틀렸다. 늘 완벽하던 정이안이.
# speaker: jeongian
…이상하네요. 당신 앞에서만, 자꾸 흐트러져요.
* [“가끔은 흐트러져도 돼요. 제가 볼게요.”]
    ~ aff_jeongian += 15
    # speaker: jeongian
    …그 말, 책임질 수 있어요? 나, 한번 기대면 잘 못 놓는데.
* [“제가 다시 정리할게요.” 서류를 챙긴다]
    ~ aff_jeongian += 8
    # speaker: jeongian
    …고마워요. 역시, 일은 당신이 편하네요.
- -> ch4_hanseoa

=== ch4_hanseoa ===
# scene: 데뷔 준비
# bg: practice
# char: hanseoa stage center
리허설 내내 완벽하던 한서아가, 끝나고 조용히 나를 붙잡았다.
# speaker: hanseoa
…저기. 부탁이, 하나 있는데.
# speaker: hanseoa
무대 날… 객석 어딘가에, 있어 줄래요? 아는 얼굴 하나는, 있었으면 해서.
* [“그럼요. 제일 크게 박수칠게요.”]
    ~ aff_hanseoa += 15
    # speaker: hanseoa
    …처음이에요. 누구한테 이런 거 부탁하는 거.
* [“무대 뒤에서라도, 꼭 지켜볼게요.”]
    ~ aff_hanseoa += 8
    # speaker: hanseoa
    …응. 그거면, 충분해요.
- -> ch4_yunjaeho

=== ch4_yunjaeho ===
# scene: 윤재호의 새 트랙
# bg: studio-night
# char: yunjaeho green center
# speaker: yunjaeho
복구는 끝내 안 됐어요. 그래서… 새로 썼어요.
윤재호가, 처음으로 먼저 헤드폰을 내밀었다.
# speaker: yunjaeho
이 곡, {player}한테 제일 먼저 들려주고 싶었어요.
* [말없이 끝까지 듣고, 가만히 눈을 맞춘다]
    ~ aff_yunjaeho += 15
    # speaker: yunjaeho
    …당신이 들으니까, 이제야 완성된 것 같아요.
* [“좋아요. 진짜, 좋아요.” 감탄한다]
    ~ aff_yunjaeho += 8
    # speaker: yunjaeho
    …다행이다. 당신 취향, 좀 신경 썼거든요.
- -> ch4_odaeun

=== ch4_odaeun ===
# scene: 오다은의 진짜 얼굴
# bg: rooftop-night
# char: odaeun cardigan center
늘 4차원이던 오다은이, 옥상에서 진지한 얼굴로 기다리고 있었다.
# speaker: odaeun
나 사실… 너 처음 왔을 때, 좀 걱정했어. 여기 사람들, 다 상처 하나씩 안고 살거든.
# speaker: odaeun
근데 너 오고 나서, 다들 조금씩 밝아졌어. 너는… 그거 알아?
* [“다은 씨가 제일 먼저 웃어줘서예요.”]
    ~ aff_odaeun += 15
    # speaker: odaeun
    …야. 그렇게 말하면, 나 진짜 착각한다?
* [“다들 원래 좋은 사람들인걸요.”]
    ~ aff_odaeun += 8
    # speaker: odaeun
    …그래. 너도, 꽤 좋은 애야.
- -> ch4_choi

=== ch4_choi ===
# scene: 최준혁의 과거
# bg: living-night
# char: choijunhyeok intense center
# speaker: choijunhyeok
이 셰어하우스… 왜 시작했는지, 말한 적 없죠.
처음 보는, 가라앉은 얼굴이었다.
# speaker: choijunhyeok
혼자인 사람들이, 혼자가 아니게. 그게 다였어요. …나부터가, 혼자였으니까.
* [“이제, 준혁 씨 옆엔 제가 있잖아요.”]
    ~ aff_choijunhyeok += 15
    # speaker: choijunhyeok
    …그 말, 오늘 처음으로, 믿고 싶어지네요.
* [조용히 그의 손 위에, 내 손을 포갠다]
    ~ aff_choijunhyeok += 15
    ~ aff_odaeun += 3
    # speaker: choijunhyeok
    …{player} 씨. 나, 흔들려요. 당신 때문에.
- -> ch4_end

=== ch4_end ===
# hide: all
# bg: room-night
# speaker:
방에 돌아와 불을 끄고 누웠다.
여섯 사람의 얼굴이 차례로 떠오르고 — 그 중 한 사람에서, 자꾸 멈춘다.
이제 인정할 수밖에 없다. 나는, 누군가를 좋아하고 있다.
-> ch5_start


// ======================= CHAPTER 5 — 엔딩 =======================
=== ch5_start ===
# chapter: 05 엔딩
# scene: 한서아 데뷔 무대
# bg: stage
# cg: cg-08
# track: t05
드디어, 한서아의 데뷔 무대.
조명이 쏟아지고 첫 음이 터지는 순간 — 객석도, 무대 뒤도, 모두 숨을 멈췄다.
여섯 사람이 각자의 자리에서, 같은 무대를 바라보고 있었다.
그리고 나는, 그 사람들 사이에서 — 내 마음이 어디로 향하는지 분명히 알았다.
-> ch5_party

=== ch5_party ===
# scene: 데뷔 후 파티
# bg: living-night
무대가 끝나고, 셰어하우스는 오랜만에 웃음으로 가득 찼다.
밤이 깊고, 하나둘 자리를 비운 새벽.
# speaker:
그날 밤, 당신의 발길이 향한 곳은 —
* [한서아에게]
    ~ aff_hanseoa += 28
    ~ ending_lead = "hanseoa"
* [정이안에게]
    ~ aff_jeongian += 28
    ~ ending_lead = "jeongian"
* [오다은에게]
    ~ aff_odaeun += 28
    ~ ending_lead = "odaeun"
* [KAEL에게]
    ~ aff_kael += 28
    ~ ending_lead = "kael"
* [윤재호에게]
    ~ aff_yunjaeho += 28
    ~ ending_lead = "yunjaeho"
* [최준혁에게]
    ~ aff_choijunhyeok += 28
    ~ ending_lead = "choijunhyeok"
- -> ch5_branch

// ---- 엔딩 분기: 선택한 사람의 ♥로 해피(52+)/노멀(30+)/솔로 ----
=== ch5_branch ===
{ ending_lead == "hanseoa": -> route_hanseoa }
{ ending_lead == "jeongian": -> route_jeongian }
{ ending_lead == "odaeun": -> route_odaeun }
{ ending_lead == "kael": -> route_kael }
{ ending_lead == "yunjaeho": -> route_yunjaeho }
{ ending_lead == "choijunhyeok": -> route_choijunhyeok }
-> end_solo

=== route_hanseoa ===
{ aff_hanseoa >= 52: -> end_hanseoa_happy }
{ aff_hanseoa >= 30: -> end_hanseoa_normal }
-> end_solo
=== route_jeongian ===
{ aff_jeongian >= 52: -> end_jeongian_happy }
{ aff_jeongian >= 30: -> end_jeongian_normal }
-> end_solo
=== route_odaeun ===
{ aff_odaeun >= 52: -> end_odaeun_happy }
{ aff_odaeun >= 30: -> end_odaeun_normal }
-> end_solo
=== route_kael ===
{ aff_kael >= 52: -> end_kael_happy }
{ aff_kael >= 30: -> end_kael_normal }
-> end_solo
=== route_yunjaeho ===
{ aff_yunjaeho >= 52: -> end_yunjaeho_happy }
{ aff_yunjaeho >= 30: -> end_yunjaeho_normal }
-> end_solo
=== route_choijunhyeok ===
{ aff_choijunhyeok >= 52: -> end_choijunhyeok_happy }
{ aff_choijunhyeok >= 30: -> end_choijunhyeok_normal }
-> end_solo

// ---------------- 한서아 ----------------
=== end_hanseoa_happy ===
# scene: 해피엔딩 · 한서아
# bg: backstage
# cg: cg-09-s1
# ending: hanseoa happy
무대를 막 내려온 한서아가, 숨도 고르기 전에 나를 향해 달려왔다.
# speaker: hanseoa
무대 위에서, 딱 한 사람만 보였어요. …당신이었어요.
# speaker: hanseoa
이 노래, 사실 당신 생각하면서 불렀어요. 받아줄래요?
그 손을 잡았다. 데뷔보다 환한 얼굴이, 거기 있었다.
-> credits
=== end_hanseoa_normal ===
# scene: 노멀엔딩 · 한서아
# bg: backstage
# cg: cg-09-n1
# ending: hanseoa normal
# speaker: hanseoa
…고마워요. 와줘서.
무언가 더 말할 듯, 그녀는 입을 다물었다.
# speaker: hanseoa
아직… 데뷔한 지 얼마 안 됐으니까요. 지금은, 노래에만 집중할래요.
대답 대신 남은 건, 길고 옅은 여운이었다.
-> credits

// ---------------- 정이안 ----------------
=== end_jeongian_happy ===
# scene: 해피엔딩 · 정이안
# bg: studio-night
# cg: cg-09-s2
# ending: jeongian happy
앨범을 끝낸 새벽, 정이안이 처음으로 책상에 엎드렸다. 무너지듯이.
# speaker: jeongian
나, 원래 이런 사람 아닌데. …당신 앞에서만, 자꾸 약해져요.
먼저 그의 손을 잡았다. 차갑던 그 손이, 조심스레 마주 쥐어 왔다.
# speaker: jeongian
…{player}. 이름, 불러도 돼요? 이제, 일 말고.
-> credits
=== end_jeongian_normal ===
# scene: 노멀엔딩 · 정이안
# bg: studio-night
# cg: cg-09-n2
# ending: jeongian normal
# speaker: jeongian
…고마워요. 덕분에, 앨범 잘 끝냈어요.
그러고는, 한 걸음 물러섰다.
# speaker: jeongian
일이랑 감정, 섞고 싶지 않아요. …그래도, 당신을 보는 눈은 달라졌네요.
그 눈빛만이, 못다 한 말을 대신했다.
-> credits

// ---------------- 오다은 ----------------
=== end_odaeun_happy ===
# scene: 해피엔딩 · 오다은
# bg: rooftop-night
# cg: cg-09-s3
# ending: odaeun happy
# speaker: odaeun
나 사실, 너 마음 다 알고 있었어. 처음부터.
오다은이 장난기 없는 얼굴로 웃었다.
* [“나도. 다은 씨 마음, 다 알았어요.”]
    ~ aff_odaeun += 2
- # speaker: odaeun
    …야, 반칙이다. 그건 내가 하려던 말인데.
새벽 옥상에서, 우리는 한참을 그냥 웃었다.
-> credits
=== end_odaeun_normal ===
# scene: 노멀엔딩 · 오다은
# bg: rooftop-night
# cg: cg-09-n3
# ending: odaeun normal
서로 다 알면서도, 아무도 먼저 말을 꺼내지 않았다.
# speaker: odaeun
…됐어. 말 안 해도, 우리 사이엔 다 통하잖아?
그냥 웃고 말았다. 그 웃음이, 어떤 고백보다 길게 남았다.
-> credits

// ---------------- KAEL ----------------
=== end_kael_happy ===
# scene: 해피엔딩 · KAEL
# bg: stage
# cg: cg-09-s4
# ending: kael happy
KAEL이 예고 없이 신곡을 발표했다. 듣는 순간, 알았다 — 내 얘기였다.
무대를 내려온 그가, 귓가에 낮게 속삭였다.
# speaker: kael
이거, 너 얘기야. …끝까지 모른 척하면, 진짜 화낼 거야.
관심 없는 척하던 그 눈이, 처음으로 똑바로 나를 향했다.
-> credits
=== end_kael_normal ===
# scene: 노멀엔딩 · KAEL
# bg: stage
# cg: cg-09-n4
# ending: kael normal
신곡은 분명, 누군가를 향한 노래였다. 그게 나라는 걸, 나만 알았다.
# speaker: kael
…노래는 노래고. 굳이 말로 해야 알아?
끝내 직접은 말하지 못한 그 마음을, 가사 속에서만 읽었다.
-> credits

// ---------------- 윤재호 ----------------
=== end_yunjaeho_happy ===
# scene: 해피엔딩 · 윤재호
# bg: studio-night
# cg: cg-09-s5
# ending: yunjaeho happy
밤샘 작업이 끝난 새벽. 윤재호가 헤드폰을 내려놓고, 나를 마주 봤다.
# speaker: yunjaeho
…옆에 있어줘서, 고마워요. 말로는 늘 모자라서.
그가 먼저, 조심스럽게 나를 안았다. 노래보다 따뜻한 침묵이었다.
-> credits
=== end_yunjaeho_normal ===
# scene: 노멀엔딩 · 윤재호
# bg: studio-night
# cg: cg-09-n5
# ending: yunjaeho normal
# speaker: yunjaeho
…고마워요. 진심으로.
그 말 이상은, 끝내 나오지 않았다.
하지만 그날 이후, 그는 새 곡을 쓸 때마다 제일 먼저 나를 찾았다.
-> credits

// ---------------- 최준혁 ----------------
=== end_choijunhyeok_happy ===
# scene: 해피엔딩 · 최준혁
# bg: rooftop-night
# cg: cg-09-s6
# ending: choijunhyeok happy
# speaker: choijunhyeok
사실은… 꽤 오래, 기다렸어요. 당신이 먼저 알아줄 때까지.
모두에게 친절하던 그가, 처음으로 한 사람만을 바라봤다.
* [“나도, 준혁 씨를 알고 싶었어요.” 먼저 다가간다]
    ~ aff_choijunhyeok += 2
- # speaker: choijunhyeok
    …그 말, 평생 못 잊을 것 같네요.
새벽 옥상 위, 두 사람의 그림자가 처음으로 겹쳐졌다.
-> credits
=== end_choijunhyeok_normal ===
# scene: 노멀엔딩 · 최준혁
# bg: rooftop-night
# cg: cg-09-n6
# ending: choijunhyeok normal
# speaker: choijunhyeok
…놀랐죠? 나도, 이런 말 할 줄 몰랐어요.
반전 같던 고백 앞에서, 나는 아직 마음을 다 정리하지 못했다.
그렇게 우리는, 조금 어색한 일상으로 다시 돌아갔다. 다만, 예전과는 달랐다.
-> credits

// ---------------- 솔로(여운) ----------------
=== end_solo ===
# scene: 엔딩 · 미완성
# bg: room-night
# ending: solo
누구의 손도, 끝내 잡지 못한 밤이었다.
어쩌면 아직, 내 노래가 완성되지 않은 것뿐일지도 모른다.
다음 계절엔, 조금 더 솔직해질 수 있을까.
-> credits

// ---------------- 공통 크레딧 ----------------
=== credits ===
# hide: all
# bg: room-night
# speaker:
— 당신의 플레이리스트가 완성됐습니다 —
음악이 좋아서 시작한 6개월. 그 끝에 남은 건, 한 사람과 — 그리고 여러 곡이었다.
( 플레이해주셔서 고마워요 ♪  ·  컬렉션에서 모은 트랙을 다시 들어보세요 )
-> END
