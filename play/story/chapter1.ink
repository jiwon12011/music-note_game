// 플레이리스트 : 우리 사이의 음표 — 본편 (멀티 루트)
// 구조: 공통 루트(CH1~3, 만남) → 루트 분기(호감도 1위 ♥25+) → 캐릭터별 전용 루트(3챕터) → 해피/노멀 엔딩
// 태그: # bg: / # char: <key> <outfit> [pos] / # hide: <key>|all / # speaker: <key> / # cg: / # chapter: / # scene: / # ending:
// 호감도는 VAR(엔진 ObserveVariable 로 +n 표시). {player} = 닉네임. CG는 기존 에셋 재사용.

VAR player = "당신"
VAR aff_hanseoa = 0
VAR aff_jeongian = 0
VAR aff_odaeun = 0
VAR aff_kael = 0
VAR aff_yunjaeho = 0
VAR aff_choijunhyeok = 0
VAR last_lead = ""
VAR ending_lead = ""
// --- 서사 스파인/복선/회수 ---
VAR ch3_helped_jeongian = false   // CH3 위기 때 정이안 곁을 지킴
VAR ch3_helped_yunjaeho = false   // CH3 위기 때 윤재호와 밤샘
VAR ch3_helped_odaeun = false     // CH3 스캔들 때 오다은과 동선
VAR ch3_kept_files = ""           // 파일 이관 방식(jeongian/odaeun) — 데이터유실 당사자
VAR first_stayed = false          // 주인공 아크: 처음으로 물러서지 않은 순간
VAR spoke_up = false              // 회의실에서 처음으로 목소리를 냄

-> opening

// ======================= CHAPTER 1 — 상경 =======================
=== opening ===
# chapter: 01 상경
# scene: 상경 기차
# track: t01
# bg: train
서울행 기차. 창밖 풍경이 빠르게 흘러간다.
취업 확인 메일을 다시 꺼내 읽는다.
「A&R · 콘텐츠 어시스턴트 (계약직 6개월) 합격을 축하드립니다. 주거는 회사 제휴 셰어하우스로 배정 — 소속 아티스트·스태프와 공동 거주입니다.」
음악이 좋아서 지원했고, 붙을 줄 몰랐고 — 집까지 해결됐다. 설레는 건지 겁나는 건지, 아직 모르겠다.
같은 지붕 아래, 곡을 만들고 부르고 관리하는 사람들이 산다. 나는 그들을 보조하러 왔고 — 그 집에, 오늘부터 함께 산다.
이어폰 속 누군가의 노래처럼, 내 심장도 빠르게 뛴다.
핸드폰이 울린다. 정이안 프로듀서의 메시지다.
# speaker: jeongian
내일 10시까지. 늦지 마세요.
# speaker: jeongian
한서아 데뷔 앨범 마감까지 딱 반 년. 우리한텐 그 6개월이 전부예요. 당신 계약도, 거기까지고요.
앨범의 성패에 프로덕션의 존폐가 — 그리고 내 자리가 걸려 있다는 걸, 그때는 실감하지 못했다.
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
문을 열어준 사람은 최준혁 — 이 집 주인이자, 회사 소속 아티스트.
따뜻한 인상인데, 어딘가 한 발짝 물러서 있는 느낌이 든다.
# speaker: choijunhyeok
집 규칙 같은 건 없어요. 다들 알아서 잘 지내요. …아, 그리고 — 여기 있는 동안 많이 힘들면, 얘기해요.
그 말이 예의 바른 인사인지, 진심인지 — 아직은 모르겠다.
-> luggage

=== luggage ===
# scene: 짐 풀기
# bg: living-night
# char: odaeun hoodie center
# speaker: odaeun
어! 새로 온 사람이다. 음악 좋아해? …좋아하니까 왔겠지. 당연한 걸 물었네.
# speaker: odaeun
난 오다은, 매니저. 잘 부탁해. 아 참, 그 박스 안에 라면 있지? 냄새가 나.
* [“하나 드릴까요?” 라면을 꺼내 건넨다]
    ~ aff_odaeun += 5
    # speaker: odaeun
    오, 센스. 우리 잘 맞겠다. 너.
* [“…그건 제 비상식량인데요.” 박스를 끌어안는다]
    ~ aff_odaeun += 3
    # speaker: odaeun
    풉. 농담도 받을 줄 아네. 합격.
- # hide: odaeun
짐도 다 못 풀었는데, 오다은은 엉뚱한 말만 남기고 사라졌다.
나중에 알았다 — 저 사람이, 내 사수다. 내일부터 매일 붙어 일을 배운다. …정말?
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
    ~ aff_choijunhyeok += 12
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
- -> ch1_rooftop

=== ch1_rooftop ===
# scene: 옥상 밤바람
# bg: rooftop-night
# char: yunjaeho coat center
잠이 오지 않아 옥상에 올라갔다. 먼저 와 있는 사람이 있었다.
작곡가 윤재호. 회사에서 나는, 그의 트랙 파일을 관리하는 보조다. 이 집에서 마주치는 건 오늘이 처음이다.
난간에 기댄 그의 헤드폰 사이로 희미한 멜로디가 새어 나온다 — 한서아 데뷔곡의, 아직 완성되지 않은 트랙이라고 했다.
끝나지 않은 노래처럼, 그도 어딘가 미완성으로 보였다.
인기척에도 그는 돌아보지 않았다. 다만, 헤드폰 한쪽을 슬쩍 내렸다.
* [옆에 나란히 서서 바람을 쐰다]
    ~ aff_yunjaeho += 6
    아무 말 없이, 같은 밤하늘을 한참 봤다. 이상하게, 어색하지 않았다.
* [“안 추우세요?” 말을 건넨다]
    ~ aff_yunjaeho += 4
    # speaker: yunjaeho
    …괜찮아요. 이 시간이, 제일 조용해서.
- 처음 듣는 그의 곡인지, 아니면 그냥 바람 소리였는지. 잘 모르겠는 밤이었다.
-> morning

=== morning ===
# scene: 첫 아침
# track: t04
# bg: living-day
# hide: yunjaeho
# char: hanseoa casual center
첫 아침. 거실에서 마주친 사람은 한서아.
# speaker: hanseoa
……
인사를 건넸지만, 그녀는 눈도 마주치지 않고 지나갔다.
복도 너머, 스태프들이 낮게 속삭였다. — "서아 컨디션이 또…." 데뷔를 코앞에 둔 그녀의 어깨가, 생각보다 무거워 보였다.
내 업무 중엔 그녀의 데뷔 콘텐츠 촬영 동행이 있다. 저 차가운 사람을, 가장 가까이서 담아야 한다.
* [그래도 “좋은 아침이에요” 하고 한 번 더 웃는다]
    ~ aff_hanseoa += 4
    아주 잠깐, 그녀의 발걸음이 멈췄다 — 그러고는, 다시 멀어졌다.
* [무리하지 않고, 그냥 지나 보낸다]
    차가운 첫인상 — 알고 보면, 조금은 다를까?
- -> ch1_end

=== ch1_end ===
# hide: hanseoa
# bg: room-night
방으로 돌아가는 복도 끝, 문 하나가 잠겨 있었다. 손잡이에 먼지가 앉은 걸 보면 — 오래 닫혀 있던 방이었다.
이 집의 누구도, 그 방 이야기는 꺼내지 않았다.
오늘 하루가, 한 곡처럼 지나갔다.
정리하면 — 데뷔 D-180. 나는 오늘부터 A&R 어시스턴트, 계약직 6개월. 이 집에서, 이 사람들의 6개월에 끼어든다.
내일은 첫 출근. 설렘 반, 긴장 반. 각자의 미완성된 곡처럼 — 나도, 아직 완성되지 않았다.
-> ch2_start


// ======================= CHAPTER 2 — 적응 =======================
=== ch2_start ===
# chapter: 02 적응
발굴, 일정, 콘텐츠 보조. 내 일은 결국, 이 사람들 곁에 붙어 있는 것. 그 덕분에 — 이 집 사람들 전부와, 엮일 이유가 생긴다.
# scene: 출근 첫날
# bg: office
# char: jeongian suit center
# speaker: jeongian
지각은 아니네요. 첫날이니 봐줄게요. 한서아 데뷔 일정표부터 정리해요.
정이안 프로듀서. 내 직속 상사. 목소리에 군더더기가 하나도 없다.
# speaker: jeongian
당신 포지션은 A&R 어시스턴트. 파일 관리, 일정 조율, 현장 동행 — 전부 내 지시대로예요. 마감까지 펑크 한 번이면, 다 끝이고요.
말이 적고, 일이 많고, 실수 한 번에 끝나는 자리다. 잘, 알았다.
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
- -> ch2_weekend

=== ch2_weekend ===
# scene: 첫 주말
# bg: living-day
# hide: jeongian
첫 주말. 셰어하우스의 공기가, 조금씩 익숙해진다. 오늘은 누구와 시간을 보낼까. (두 번 고를 수 있다)
- (hub)
* [한서아의 연습을 멀리서 지켜본다]
    ~ aff_hanseoa += 4
    멀리서 본 그녀는, 무대 위와 또 달랐다. 진지한 옆얼굴.
* [윤재호의 작업실 문을 두드린다]
    ~ aff_yunjaeho += 4
    모니터엔 미완성 트랙의 파형. "…마감까지 3주." 그가 혼잣말처럼 중얼거리며, 의자 하나를 더 끌어다 줬다.
* [오다은의 폴라로이드 정리를 돕는다]
    ~ aff_odaeun += 4
    # speaker: odaeun
    오, 일손. 너 자주 와라. 진심으로.
* [KAEL이 연습하는 소리에 귀 기울인다]
    ~ aff_kael += 4
    문 너머, 평소답지 않게 진지한 KAEL의 목소리가 새어 나왔다.
* [정이안이 두고 간 자료를 정리해 둔다]
    ~ aff_jeongian += 4
    # speaker: jeongian
    …누가 정리했어요? 깔끔하네요.
* [최준혁의 부엌일을 거든다]
    ~ aff_choijunhyeok += 4
    # speaker: choijunhyeok
    …같이 하니까, 빠르네요.
- (back)
    { hub < 2: -> hub }
짧은 주말이 지나고, 본격적인 한 주가 시작됐다.
-> ch2_hanseoa

=== ch2_hanseoa ===
# scene: 연습실 복도
# bg: corridor
# char: hanseoa hoodie center
복도 끝, 벽에 기대 지쳐 있는 한서아.
# speaker: hanseoa
…뭘 봐요.
* [말없이 이온음료를 건넨다]
    ~ aff_hanseoa += 12
    ~ last_lead = "hanseoa"
    # cg: cg-02
    그녀는 멈칫하더니, 작게 받아 들었다.
    # speaker: hanseoa
    …고마워요. 진짜로.
* [“괜찮아요?” 하고 묻는다]
    ~ aff_hanseoa += 6
    # speaker: hanseoa
    괜찮아요. 늘 이래요.
- -> ch2_yunjaeho

=== ch2_yunjaeho ===
# scene: 야근 스튜디오
# bg: studio-night
# char: yunjaeho work center
오늘 오후, 정이안이 지시했다. "윤재호 트랙 폴더, 네가 백업 관리해요."
새벽 스튜디오. 그가 말없이 트랙을 만지고 있다. 이제 저 파일들은, 내 책임이기도 하다.
# speaker: yunjaeho
…아직 안 갔어요?
* [말없이 옆에 앉아 같이 듣는다]
    ~ aff_yunjaeho += 10
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
KAEL — 회사 메인 아티스트, 데뷔 선배. 신입인 나는 그의 기존 업무를 이관받는다. 정이안이 말했다. "KAEL 쪽 자료 정리, 네가 맡아요."
녹음 부스 앞, 그는 관심 없다는 듯 폰만 보고 있다.
# speaker: kael
새로 온 스태프? 굳이 인사 안 해도 돼요.
* [“네, 바쁘실 텐데요.” 담담히 지나친다]
    ~ aff_kael += 12
    ~ last_lead = "kael"
    # cg: cg-04
    힐끔. 그가 처음으로 시선을 들었다.
    # speaker: kael
    …뭐야. 안 들이대네. 신기하게.
* [“팬이에요! 잘 부탁드려요!” 들뜬다]
    ~ aff_kael += 3
    # speaker: kael
    하아… 또 한 명 늘었네.
- 돌아서는 길, 그가 잠깐 사람 없는 쪽을 봤다. 스크린 속 화려한 KAEL과, 지금 이 지친 옆얼굴이 같은 사람이라는 게 — 아직 실감이 안 났다.
-> ch2_odaeun

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
    ~ aff_choijunhyeok += 12
    ~ last_lead = "choijunhyeok"
    # speaker: choijunhyeok
    …오랜만이네요. 같이 먹자는 말.
* [“잘 먹겠습니다!” 받아 들고 방으로]
    ~ aff_choijunhyeok += 4
    # speaker: choijunhyeok
    네, 편하게요.
- -> ch2_office_night

=== ch2_office_night ===
# scene: 사무실 야참
# bg: office
# char: odaeun jacket center
야근이 길어진 밤. 자판기 앞에서 오다은과 정이안이 나란히 서 있었다.
# speaker: odaeun
이안 씨는 진짜… 커피를 무슨 밥처럼 먹어. 몸 좀 챙겨요.
# speaker: jeongian
…잔소리는 됐고. 일정표나 다시 봐요.
떠받드는 듯하면서도 거침없이 쏘아붙이는 오다은. 두 사람의 오래된 호흡이 보였다.
잠깐, 오다은의 말이 끊겼다. 자판기 불빛이 그녀의 얼굴을 비췄는데 — 늘 붐비는 이 공간에서, 이상하게 혼자인 사람처럼 보였다.
* [슬며시 끼어 캔커피를 같이 고른다]
    ~ aff_odaeun += 5
    ~ aff_jeongian += 3
    # speaker: odaeun
    오, 눈치 빠른데? 합격.
* [방해될까, 멀리서 지켜보다 자리로 돌아온다]
    ~ aff_jeongian += 4
    묘하게, 저 두 사람 사이엔 내가 모르는 시간이 쌓여 있는 것 같았다.
- -> ch2_window

=== ch2_window ===
# scene: 연습실 창문 앞
# bg: practice
# char: hanseoa dress-white center
리허설이 끝난 빈 연습실. 문을 잘못 열었다가, 창가에 선 한서아와 눈이 마주쳤다.
작은 목소리로 가사를 중얼거리던 그녀가, 멈칫 입을 다문다.
# speaker: hanseoa
…노크, 안 배웠어요?
* [“죄송해요. 못 들은 걸로 할게요.” 조용히 문을 닫는다]
    ~ aff_hanseoa += 8
    # speaker: hanseoa
    …아니. 됐어요. 어차피, 아직 미완성이라.
    문틈으로, 그녀가 다시 작게 노래하는 소리가 들렸다.
* [“방금 그 가사… 좋았어요.” 솔직하게 말한다]
    ~ aff_hanseoa += 4
    # speaker: hanseoa
    …그런 말, 함부로 하지 말아요. 기대하게 되잖아.
* [“…더 들어도 돼요?” 문을 닫지 않는다]
    ~ aff_hanseoa += 6
    ~ first_stayed = true
    # speaker: hanseoa
    …뻔뻔하네요. …좋아요, 딱 한 소절만.
    물러서는 대신 남기로 한 건, 처음이었다. 그게 나를 조금 바꿔놓을 줄은, 아직 몰랐다.
- # bg: room-night
# hide: hanseoa
# scene: 챕터2 마무리
다들, 보이는 것과 조금씩 다르다.
누군가의 미완성된 부분에, 자꾸 마음이 머문다.
-> ch3_start


// ======================= CHAPTER 3 — 균열 =======================
=== ch3_start ===
# chapter: 03 균열
데뷔 D-60. 앨범이 흔들리고, 집도 흔들린다. 그리고 — 나도.
# scene: 스캔들
# bg: office
# char: odaeun jacket center
# speaker: odaeun
큰일 났어. KAEL 열애설. 근데 기사에 셰어하우스 골목이 찍혔어.
# cg: cg-05
# speaker: odaeun
기자들이 몰린대. 오늘 스튜디오, 사람 다 빼야 해. 작업이고 백업이고 손도 못 대.
# speaker: kael
…내 일이야. {player}는 빠져.
* [“같이 수습해요. 혼자 다 안고 가지 말고.”]
    ~ aff_kael += 8
    # speaker: kael
    …왜 자꾸, 신경 쓰이게 해.
* [오다은과 먼저 동선부터 짠다]
    ~ aff_odaeun += 6
    ~ ch3_helped_odaeun = true
    # speaker: odaeun
    역시. 일머리 있어, 너.
- -> ch3_files

=== ch3_files ===
# scene: 빈 스튜디오
# bg: studio-night
# hide: all
사람들이 다 빠진 새벽 스튜디오. 한서아 데뷔곡 가이드 트랙의 백업이, 하필 나한테 맡겨졌다.
정이안은 "원본 폴더 구조 그대로", 오다은은 "급한 것부터 약식으로"라고 했다. 둘의 방식이 달랐다.
* [정이안 방식대로 — 원본 구조 그대로 옮긴다]
    ~ ch3_kept_files = "jeongian"
    꼼꼼했지만 느렸다. 새벽이 깊도록, 폴더 하나하나를 손으로 옮겼다.
* [오다은 방식대로 — 급한 것부터 빠르게]
    ~ ch3_kept_files = "odaeun"
    빨랐지만 어딘가 불안했다. 임시 폴더가 자꾸 쌓여 갔다.
- 새벽 세 시. 마지막 파일을 옮기고, 잠깐 눈을 감았다. 정말, 잠깐이면 된다고 생각했다.
-> ch3_data

=== ch3_data ===
# scene: 데이터 유실
# bg: studio-night
# cg: cg-06
# speaker: jeongian
…앨범 핵심 트랙이, 날아갔어요.
처음으로, 정이안의 목소리가 흔들렸다. 어젯밤 마지막으로 파일을 만진 건, 나였다. 등줄기가 서늘해졌다.
{ ch3_kept_files == "odaeun": 급하게 옮긴 임시 폴더 어딘가에서 — 원본이 덮어쓰기 됐다. }
{ ch3_kept_files == "jeongian": 원본은 지켰지만, 미처 옮기지 못한 최신 가이드가 사라졌다. }
윤재호는 말없이 복구를 시작한다.
* [정이안 곁에서 침착하게 정리한다]
    ~ aff_jeongian += 6
    ~ ch3_helped_jeongian = true
    # speaker: jeongian
    …고마워요. 지금, 그 말이 필요했어요. 당신 탓이 아니에요. …그렇게 생각해요.
* [윤재호와 밤새 파일을 뒤진다]
    ~ aff_yunjaeho += 6
    ~ ch3_helped_yunjaeho = true
    # speaker: yunjaeho
    …혼자였으면, 못 버텼을 거예요. 당신이 있어서 — 다시 쓸 용기가 났어요.
- -> ch3_hanseoa

=== ch3_hanseoa ===
# scene: 위기 속 한서아
# bg: practice
# char: hanseoa casual center
혼란한 틈, 한서아는 혼자 연습실에 남아 있었다.
날아간 트랙은 — 그녀의 데뷔곡 가이드 보컬이었다. 결국 가장 흔들릴 사람은, 한서아였다.
# speaker: hanseoa
…나, 데뷔할 수 있을까요. 이런 와중에.
* [“할 수 있어요. 내가 봤으니까.”]
    ~ aff_hanseoa += 8
    # speaker: hanseoa
    …당신이 그러니까, 조금 믿어볼래요.
* [조용히 곁을 지킨다]
    ~ aff_hanseoa += 4
- -> ch3_meeting

=== ch3_meeting ===
# scene: 회의실 긴장
# bg: meeting
# char: jeongian suit center
스캔들 수습 후 긴급 회의. 처음으로 KAEL과 정이안이 정면으로 부딪쳤다.
# speaker: kael
그러니까, 내 사생활까지 회사가 관리하겠다는 거예요?
# speaker: jeongian
관리가 아니라 책임이에요. 지금 흔들리면, 다 같이 무너져요.
오다은이 둘 사이를 조율하는 동안, 말단인 나는 끝자리에 앉아 있었다.
* [용기를 내 한마디 보탠다]
    ~ aff_hanseoa += 2
    ~ aff_jeongian += 2
    ~ aff_kael += 2
    ~ spoke_up = true
    # speaker: odaeun
    …오, 새내기. 의외로 핵심을 찌르네.
    그 순간, 뭔가 바뀐 것 같았다 — 다른 누구도 아닌, 나 자신이.
* [지금은 나설 때가 아니다, 침묵을 지킨다]
    회의는 결론 없이 끝났지만, 각자의 균열만은 또렷이 보였다.
- -> ch3_secret

=== ch3_secret ===
# scene: 정이안의 비밀
# bg: studio-night
# char: jeongian knit center
모두 퇴근한 스튜디오. 불 꺼진 줄 알았던 작업실에서, 희미한 데모가 흘러나왔다.
정이안이 혼자, 오래된 곡을 듣고 있었다. 아니 — 직접 부른, 옛날의 자기 목소리.
# speaker: jeongian
…안 들은 걸로 해줘요.
* [“…방금 그 목소리, 정이안 씨예요?” 솔직하게 묻는다]
    ~ aff_jeongian += 6
    # speaker: jeongian
    프로듀서가 되기 전엔… 다른 꿈도 있었어요. 그냥, 그게 다예요.
* [못 들은 척 조용히 문을 닫는다]
    ~ aff_jeongian += 3
    그녀에게도, 아직 들려주지 않은 곡이 있는 모양이었다.
- -> ch3_choi

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
# hide: all
# bg: room-night
폭풍 같던 며칠이 지나갔다. 잃어버린 트랙은 다시 쓰이기 시작했고, 데뷔는 — 아직, 무너지지 않았다.
앨범 마감까지 이제 한 달 남짓. 내 계약도 딱 그만큼. 시간이 줄어드는 만큼, 마음은 자꾸 한 사람에게로 기울었다.
이제, 외면할 수 없을 것 같다 — 누군가를, 좋아하고 있다는 걸.
# speaker:
( 누군가, 당신을 위한 곡을 쓰기 시작한 것 같아요. )
-> route_select


// ======================= 루트 분기 =======================
// 호감도 1위가 ♥25 이상이면 그 인물의 전용 루트로. 미만이면 솔로(이른 여운).
=== route_select ===
~ ending_lead = "hanseoa"
~ temp lv = aff_hanseoa
{ aff_jeongian > lv:
    ~ ending_lead = "jeongian"
    ~ lv = aff_jeongian
}
{ aff_odaeun > lv:
    ~ ending_lead = "odaeun"
    ~ lv = aff_odaeun
}
{ aff_kael > lv:
    ~ ending_lead = "kael"
    ~ lv = aff_kael
}
{ aff_yunjaeho > lv:
    ~ ending_lead = "yunjaeho"
    ~ lv = aff_yunjaeho
}
{ aff_choijunhyeok > lv:
    ~ ending_lead = "choijunhyeok"
    ~ lv = aff_choijunhyeok
}
{ lv < 20:
    -> end_solo_early
}
{ ending_lead == "hanseoa": -> route_hanseoa_a1 }
{ ending_lead == "jeongian": -> route_jeongian_b1 }
{ ending_lead == "odaeun": -> route_odaeun_c1 }
{ ending_lead == "kael": -> route_kael_d1 }
{ ending_lead == "yunjaeho": -> route_yunjaeho_e1 }
{ ending_lead == "choijunhyeok": -> route_choijunhyeok_f1 }
-> end_solo_early


// ======================= 루트 A — 한서아 "무대 밖의 목소리" =======================
=== route_hanseoa_a1 ===
# chapter: 04 한서아 · 무대 밖의 목소리
# scene: 리허설 뒤의 얼굴
# bg: backstage
# char: hanseoa stage center
데뷔가 확정됐다. 정신없는 축하 속에서, 한서아가 조용히 나를 찾아왔다.
# speaker: hanseoa
…고마워요. 그동안, 같이 있어줘서.
처음이었다. 그녀가 먼저, 그렇게 말해준 건.
~ aff_hanseoa += 5
-> hanseoa_a1_2

=== hanseoa_a1_2 ===
# scene: 첫 단독 리허설
# bg: practice
# char: hanseoa stage center
# cg: cg-02
데뷔 무대 리허설. 콘텐츠 촬영 때문에 따라간 자리에서, 나는 보고 말았다.
혼자라고 생각한 한서아가, 같은 소절에서 세 번이나 음을 놓치고 — 끝내 주저앉는 걸.
# speaker: hanseoa
……
* [녹화를 멈추고, 카메라를 내려놓는다]
    ~ aff_hanseoa += 12
    “지금은, 그냥 한서아 씨가 먼저예요.” 그 말에 그녀가 천천히 고개를 들었다.
    # speaker: hanseoa
    …왜, 안 찍어요. 이런 것도 좋은 그림일 텐데.
* [모른 척 카메라를 끄고, 조용히 기다린다]
    ~ aff_hanseoa += 7
    한참 뒤, 그녀는 스스로 일어났다. 아무 일도 없었던 것처럼.
- -> hanseoa_a1_3

=== hanseoa_a1_3 ===
# scene: 편의점 앞 새벽
# bg: house-ext-night
# char: hanseoa casual center
리허설이 끝난 새벽, 셰어하우스 앞 편의점. 한서아가 아이스크림을 두 개 샀다.
# speaker: hanseoa
하나는, 당신 거. …오해는 말고. 그냥 손이 두 개라서.
# speaker: hanseoa
…데뷔 전에, 다 그만두고 싶었던 적 있어요?
* [“있어요. 지금도, 가끔.” 솔직하게 답한다]
    ~ aff_hanseoa += 14
    # speaker: hanseoa
    …다행이다. 나만 그런 게, 아니라서.
* [“한서아 씨는 잘 해낼 거예요.” 격려한다]
    ~ aff_hanseoa += 8
    # speaker: hanseoa
    …그런 말 말고. 그냥, 같이 무서워해 줘요. 가끔은.
- -> hanseoa_a1_4

=== hanseoa_a1_4 ===
# scene: 흔들리는 마음
# bg: office
# char: kael navy center
다음 날 사무실. KAEL이 한서아와 편하게 웃으며 이야기하고 있었다.
음악 선배의 조언이라는 건 알지만 — 두 사람이 나누는 공기가, 묘하게 신경 쓰였다.
이 감정의 이름을, 아직은 모른 척하고 싶었다.
# hide: kael
-> route_hanseoa_a2

=== route_hanseoa_a2 ===
# chapter: 05 한서아 · 가사 속 네 이름
# scene: 첫 인터뷰
# bg: office
# char: hanseoa dress-pink center
한서아의 첫 매체 인터뷰. 기자가 물었다. "음악을 시작한 이유가 있나요?"
대답 대신, 그녀의 시선이 아주 잠깐 — 내 쪽으로 흘렀다.
-> hanseoa_a2_2

=== hanseoa_a2_2 ===
# scene: 가사 한 줄
# bg: studio-night
# char: hanseoa dress-pink center
# cg: cg-07-1
녹음 부스. 한서아가 데뷔곡 가사 한 줄을 바꾸려 한다.
원래 가사 속 단어가, 내 이름과 닮아 있다는 걸 — 나만 알아챘다.
# speaker: hanseoa
…왜 그렇게 봐요.
* [“그 가사… 안 바꿨으면 좋겠어요.” 조심스레 말한다]
    ~ aff_hanseoa += 14
    # speaker: hanseoa
    …눈치챘구나. 그럼, 더 못 바꾸겠네.
* [“아무것도 아니에요.” 모른 척한다]
    ~ aff_hanseoa += 8
    그녀는 결국 가사를 바꾸지 않았다. 이유는, 말해주지 않았다.
- -> hanseoa_a2_3

=== hanseoa_a2_3 ===
# scene: KAEL의 경고
# bg: corridor
# char: kael navy center
# speaker: kael
한서아, 지금이 제일 흔들릴 때야. …너무 가까이 가서, 부담 주지 마.
진심 어린 충고인지, 아니면 다른 마음인지. 그 눈빛만으로는 알 수 없었다.
* [“부담인지 아닌지는, 한서아 씨가 정할 일이에요.”]
    ~ aff_hanseoa += 8
    ~ aff_kael -= 3
    # speaker: kael
    …하. 너, 생각보다 안 물러서네.
* [“…조심할게요.” 한 발 물러선다]
    ~ aff_hanseoa += 4
    그의 말이, 하루 종일 마음에 걸렸다.
- # hide: kael
-> hanseoa_a2_4

=== hanseoa_a2_4 ===
# scene: 비밀 노트
# bg: living-night
# char: hanseoa knit center
잠 못 드는 새벽, 거실. 한서아가 노트에 뭔가를 적다가, 인기척에 덮었다.
# speaker: hanseoa
…뭐 쓰냐고요? 비밀. 나중에, 다 완성되면 보여줄게요.
그 "나중에"가, 이상하게 오래 기다려졌다.
-> route_hanseoa_a3

=== route_hanseoa_a3 ===
# chapter: 06 한서아 · 무대가 끝나고
# scene: 두 번째 무대 전야
# bg: backstage
# char: hanseoa stage center
한서아의 두 번째 무대, 그 전날 밤.
# speaker: hanseoa
이번엔… 혼자서도 잘할 수 있을 것 같아요.
성장의 말이라는 걸 안다. 그런데도, 어쩐지 가슴 한구석이 서늘했다.
* [“그래도, 나도 보고 싶어요. 당신 무대.”]
    ~ aff_hanseoa += 14
    # speaker: hanseoa
    …그럼, 와요. 객석 말고, 제일 가까운 데로.
* [“잘 다녀와요.” 웃으며 보내준다]
    ~ aff_hanseoa += 8
    # speaker: hanseoa
    …응. 다녀올게요.
- -> hanseoa_a3_2

=== hanseoa_a3_2 ===
# scene: 거리
# bg: rooftop-night
# hide: hanseoa
회사가 한서아의 스케줄을 바꾸며, 나를 담당에서 뺐다.
한서아가 항의했지만, 오히려 일이 커졌다.
"내가 있으면, 오히려 방해되는 거 아닐까." 그 생각이 자꾸 발목을 잡았다.
조용히 곁에 있는 것이 전부였던 때가 있었다. 지금은 다르다 — 뭔가를 선택한다는 게, 처음으로 두렵지 않다.
* [“…나, 한 발 물러설게요.” 거리를 두려 한다]
    돌아서는데, 등 뒤에서 발소리가 빠르게 다가왔다.
    # char: hanseoa stage center
    # speaker: hanseoa
    …가지 마요.
    처음이었다. 늘 먼저 멀어지던 그녀가, 먼저 붙잡은 건.
    # speaker: hanseoa
    내가 무대에서 안 흔들렸던 건, 당신이 있어서였어요. 그러니까 — 물러서지 마요. 이건, 내 부탁이에요.
    ~ aff_hanseoa += 13
* [“그래도 끝까지, 당신 곁에 있을래요.”]
    ~ aff_hanseoa += 15
    # speaker: hanseoa
    …그 말, 무를 수 없어요. 알죠?
- -> hanseoa_a3_3

=== hanseoa_a3_3 ===
# scene: 무대 직전
# bg: backstage
# char: hanseoa dress-white center
# cg: cg-08
# track: t05
공연 직전 백스테이지. 한서아가 노트 한 권을 내밀었다.
# speaker: hanseoa
이거… 내 첫 번째 가사예요. 처음 만난 날부터, 썼어.
# speaker: hanseoa
이 사람 덕분에 데뷔할 수 있었다고… 쓰고 싶었는데. 아직, 이름 쓸 용기가 안 나서.
* [노트에, 내 손으로 직접 이름을 적어준다]
    ~ aff_hanseoa += 16
    # speaker: hanseoa
    …이제, 무를 수 없어요. 둘 다.
* [“그 이름, 무대 끝나고 직접 들을게요.”]
    ~ aff_hanseoa += 10
    # speaker: hanseoa
    …약속이에요. 꼭, 들어요.
- -> hanseoa_ending

=== hanseoa_ending ===
{ aff_hanseoa >= 95: -> end_hs_happy }
-> end_hs_normal

=== end_hs_happy ===
# scene: 해피엔딩 · 한서아
# bg: backstage
# char: hanseoa stage center
# cg: cg-09-s1
# ending: hanseoa happy
무대가 끝나고, 한서아가 숨도 고르기 전에 달려와 내 손을 잡았다.
# speaker: hanseoa
무대 위에서, 딱 한 사람만 보였어요. …당신이었어요.
# speaker: hanseoa
이 노래, 제목 정했어요. — '{player}'. 바꿀 생각, 없어요.
펼쳐진 가사 노트 마지막 줄에, 내 이름이 또렷이 적혀 있었다. 데뷔보다 환한 얼굴로, 그녀가 웃었다.
# speaker:
( 그날, 한서아가 처음으로 내 이름을 불렀다. )
-> credits

=== end_hs_normal ===
# scene: 노멀엔딩 · 한서아
# bg: backstage
# char: hanseoa dress-white center
# cg: cg-09-n1
# ending: hanseoa normal
# speaker: hanseoa
…와줘서, 고마워요. 진심으로.
무언가 더 말할 듯, 그녀는 노트를 도로 가져갔다.
# speaker: hanseoa
아직… 데뷔한 지 얼마 안 됐으니까요. 이 감정이 뭔지, 좀 더 알고 싶어요.
대답 대신 남은 건, 길고 옅은 여운이었다. 그래도, 분명 처음과는 다른 거리였다.
-> credits


// ======================= 루트 B — 정이안 "쿨하다는 착각" =======================
=== route_jeongian_b1 ===
# chapter: 04 정이안 · 틈
# scene: 이름과 호칭
# bg: office
# char: jeongian suit center
루트 확정 — 업무 보고 중, 정이안이 무심코 내 이름을 "씨" 없이 불렀다가, 곧 다시 "씨"를 붙였다.
그 찰나의 흔들림을, 나만 들었다.
~ aff_jeongian += 5
-> jeongian_b1_2

=== jeongian_b1_2 ===
# scene: 늦은 야근
# bg: studio-night
# char: jeongian shirt center
둘만 남은 야근. 정이안이 펜을 떨어뜨렸고, 주우려다 손이 닿았다. 그녀가 바로 손을 뺐다.
# speaker: jeongian
…미안해요.
* [“괜찮아요.” 모른 척 자연스럽게 넘긴다]
    ~ aff_jeongian += 12
    # speaker: jeongian
    …당신은, 이상하게 같이 있으면 편하네요. 그게 더 이상해요.
* [어색하게 웃으며 펜을 건넨다]
    ~ aff_jeongian += 7
    # speaker: jeongian
    …일이나 합시다.
- -> jeongian_b1_3

=== jeongian_b1_3 ===
# scene: 커피와 실수
# bg: office
# char: jeongian messy center
내 실수로 계획서가 잘못 제출됐다. 정이안이 말없이 수습하고는, 이렇게 말했다.
# speaker: jeongian
이번 한 번이에요.
화가 아니었다. 그 눈빛은, 분명 걱정이었다.
* [“어떻게 갚으면 돼요?” 진지하게 묻는다]
    ~ aff_jeongian += 14
    # speaker: jeongian
    …그냥, 내 옆에 좀 더 오래 있어요. 그걸로 됐어요.
* [“정말 죄송합니다.” 고개 숙인다]
    ~ aff_jeongian += 8
    # speaker: jeongian
    됐어요. 다음부턴, 나한테 먼저 가져와요.
- -> jeongian_b1_4

=== jeongian_b1_4 ===
# scene: 무언의 허락
# bg: studio-night
# char: jeongian knit center
# cg: cg-07-2
밤늦은 작업실. 정이안이 예전 그 데모를 다시 틀었다. 이번엔, 내가 듣는 걸 아는 채로.
# speaker: jeongian
…안 끄고 둘게요. 한 번쯤은, 누가 들어줘도 괜찮을 것 같아서.
무언의 허락 같은, 그런 밤이었다.
-> route_jeongian_b2

=== route_jeongian_b2 ===
# chapter: 05 정이안 · 프로듀서가 아닌 이안
# scene: 비밀
# bg: studio-night
# char: jeongian knit center
# speaker: jeongian
…나, 가수 지망생이었어요. 데뷔 직전에 접었고.
처음으로, 그녀가 스스로 그 이야기를 꺼냈다.
* [“왜, 지금 나한테 말해줘요?”]
    ~ aff_jeongian += 14
    # speaker: jeongian
    …모르겠어요. 당신한텐, 숨기는 게 더 어려워서.
* [말없이 끝까지 들어준다]
    ~ aff_jeongian += 8
    # speaker: jeongian
    …고마워요. 안 물어봐 줘서.
- -> jeongian_b2_2

=== jeongian_b2_2 ===
# scene: 처음 나란히
# bg: house-ext-day
# char: jeongian cardigan center
일 아닌 이유로, 둘이 처음 나란히 걸었다. 정이안이 한 번도 먼저 묻지 않던 말을 했다.
# speaker: jeongian
…괜찮아요? 요즘, 무리하는 것 같아서.
* [“괜찮아요. 당신이 있어서.”]
    ~ aff_jeongian += 14
    # speaker: jeongian
    …그런 말, 업무 시간에 하면 반칙이에요.
* [“이안 씨가 더 무리하잖아요.”]
    ~ aff_jeongian += 8
    # speaker: jeongian
    …나 걱정은, 안 해도 되는데.
- -> jeongian_b2_3

=== jeongian_b2_3 ===
# scene: 오다은의 간섭
# bg: office
# char: odaeun cardigan center
# speaker: odaeun
이안이한테 너무 깊이 들어가지 마. 그 사람, 한번 기대면 혼자 다 안고 가다 부서지는 스타일이야.
오다은의 말에는, 오래 지켜본 사람만의 무게가 있었다.
* [“그래도, 정이안 씨를 믿어볼래요.”]
    ~ aff_jeongian += 6
    # speaker: odaeun
    …하여간. 말려도 안 되겠네.
* [“…기억해 둘게요.” 새겨듣는다]
    ~ aff_odaeun += 5
- # hide: odaeun
-> jeongian_b2_4

=== jeongian_b2_4 ===
# scene: 신곡 시연
# bg: studio-night
# char: jeongian cardigan center
# cg: cg-06
정이안이 직접 쓴 곡을, 나에게만 들려줬다. 가사 속에, 우리가 나눈 대화가 녹아 있었다.
# speaker: jeongian
…알아챘죠? 그럼, 더는 모른 척 못 하겠네요.
* [“처음부터, 알았어요.”]
    ~ aff_jeongian += 14
    # speaker: jeongian
    …이안이라고 불러줘요. 일 끝나면, 한 번쯤은.
* [“좋은 곡이에요.” 가슴에 담아둔다]
    ~ aff_jeongian += 8
- -> route_jeongian_b3

=== route_jeongian_b3 ===
# chapter: 06 정이안 · 한 번 기대면 못 놓는다
# scene: 밀어내기
# bg: office
# char: jeongian suit center
정이안이 갑자기 업무적으로 돌아왔다. 개인적인 말을 꺼내자, 선을 그었다.
# speaker: jeongian
…우린, 상사와 직원 사이예요.
예전의 나라면, 여기서 물러섰을 것이다. 그런데 지금은 — 한 발 더 들어가는 게, 두렵지 않았다.
* [“그 선, 안 지킬래요.” 끝까지 버틴다]
    ~ aff_jeongian += 15
    # speaker: jeongian
    …진짜, 못 말리는 사람이네.
* [“…알겠습니다.” 물러선다]
    그녀의 표정이, 아주 잠깐 무너졌다 다시 단단해졌다.
- -> jeongian_b3_2

=== jeongian_b3_2 ===
# scene: 이유
# bg: rooftop-night
# char: jeongian cardigan center
# speaker: jeongian
이전에 한 번, 누군가에게 의지했다가 — 먼저 떠나보낸 적이 있어요. 당신도, 6개월 계약이잖아요.
밀어낸 이유는, 두려움이었다.
# speaker: jeongian
…알아요. 내가 먼저 밀어냈다는 거. 6개월 뒤에 당신이 없어지는 게 무서워서, 그 전에 내가 없애버리려고 한 거예요. …비겁하죠.
처음으로, 그녀가 자기 자신을 정면으로 바라보고 있었다.
{ ch3_helped_jeongian:
    # speaker: jeongian
    …트랙 날아갔던 그날 밤. 당신이 옆에 있었을 때, 처음으로 혼자가 아니어도 괜찮다고 생각했어요. 그게, 더 무서웠고요.
}
* [“계약이 끝나도, 안 떠날게요.”]
    ~ aff_jeongian += 15
    # speaker: jeongian
    …그 말, 증명할 자신 있어요?
* [“지금 이 순간이 중요하잖아요.”]
    ~ aff_jeongian += 9
    # speaker: jeongian
    …당신은, 자꾸 내 논리를 무너뜨려요.
- -> jeongian_b3_3

=== jeongian_b3_3 ===
# scene: 크레딧
# bg: studio-night
# char: jeongian knit center
새벽 녹음이 끝난 스튜디오. 정이안이 앨범 크레딧에 내 이름을 넣었다며, 물었다.
# speaker: jeongian
이 곡 제목, 뭐라고 하면 좋을까요.
* [“제 이름으로 해요.” 마주 본다]
    ~ aff_jeongian += 16
    # speaker: jeongian
    …그럴 줄 알았어요. 이미, 그렇게 적어놨거든요.
* [“이안 씨가 정해요. 당신 곡이니까.”]
    ~ aff_jeongian += 10
    # speaker: jeongian
    …우리 곡이에요. 이제.
- -> jeongian_ending

=== jeongian_ending ===
{ aff_jeongian >= 95: -> end_jg_happy }
-> end_jg_normal

=== end_jg_happy ===
# scene: 해피엔딩 · 정이안
# bg: studio-night
# char: jeongian knit center
# cg: cg-09-s2
# ending: jeongian happy
앨범을 끝낸 새벽, 정이안이 처음으로 책상에 엎드렸다. 무너지듯이, 그러나 편안하게.
# speaker: jeongian
나, 원래 이런 사람 아닌데. …당신 앞에서만, 자꾸 약해져요.
먼저, 그 손을 잡았다. 차갑던 손이 조심스레 마주 쥐어 왔다.
# speaker: jeongian
…{player}. 이제, 이름 불러도 돼요? 일 말고.
# speaker:
( 프로듀서가 아니라 — 이안이, 처음으로 내 이름을 불렀다. )
-> credits

=== end_jg_normal ===
# scene: 노멀엔딩 · 정이안
# bg: studio-night
# char: jeongian suit center
# cg: cg-09-n2
# ending: jeongian normal
# speaker: jeongian
…고마워요. 덕분에, 앨범 잘 끝냈어요.
그러고는, 한 걸음 물러섰다.
# speaker: jeongian
일이랑 감정, 아직은 섞고 싶지 않아요. …그래도, 당신을 보는 눈은 달라졌네요.
그 눈빛만이, 못다 한 말을 대신했다.
-> credits


// ======================= 루트 C — 오다은 "다 보이는데, 나만" =======================
=== route_odaeun_c1 ===
# chapter: 04 오다은 · 다 보이는데, 나만
# scene: 이상한 새내기
# bg: office
# char: odaeun varsity center
# speaker: odaeun
나는 뭐든 다 봐. 근데 너는… 좀 이상해. 안 읽혀.
루트 확정 — 그 말이, 어쩐지 칭찬처럼 들렸다.
~ aff_odaeun += 5
-> odaeun_c1_2

=== odaeun_c1_2 ===
# scene: 사고 수습
# bg: backstage
# char: odaeun jacket center
# cg: cg-05
KAEL 스케줄이 겹치는 사고. 오다은이 혼자 다 떠안다 무너지기 직전, 내가 끼어들었다.
# speaker: odaeun
…왜 도와줘. 네 일 아니잖아.
{ ch3_helped_odaeun:
    # speaker: odaeun
    …하긴. 스캔들 그날 밤에도, 네가 동선부터 같이 짜줬지. 그때부터였나 봐. 내가 너 다시 본 게.
}
* [“같이 하면 빠르잖아요.” 적극 나선다]
    ~ aff_odaeun += 14
    # speaker: odaeun
    …야. 너 진짜, 좀 미워할 수가 없네.
* [말없이 뒤에서 보조한다]
    ~ aff_odaeun += 8
    # speaker: odaeun
    …고마워. 티 안 나게 돕는 거, 제일 어려운 건데.
- -> odaeun_c1_3

=== odaeun_c1_3 ===
# scene: 폴라로이드
# bg: rooftop-dusk
# char: odaeun varsity center
오다은의 취미가 폴라로이드라는 걸 처음 알았다. 나를 몰래 찍으려다, 딱 걸렸다.
# speaker: odaeun
…아, 들켰다. 이건 그냥, 빛이 예뻐서.
* [“같이 찍어요.” 옆으로 다가간다]
    ~ aff_odaeun += 14
    # speaker: odaeun
    …둘이 찍는 건, 오랜만이네. 좀 설레잖아, 이거.
* [“찍어도 돼요. 잘 나오게.”]
    ~ aff_odaeun += 8
    # speaker: odaeun
    …너, 사진보다 실물이 낫다. 농담이야.
- -> odaeun_c1_4

=== odaeun_c1_4 ===
# scene: 당황
# bg: living-night
# char: odaeun soft center
오다은에게 처음으로 먼저 말했다. "오늘, 고생 많았어요."
늘 남을 챙기던 그녀가, 그 말 한마디에 말을 잃었다.
# speaker: odaeun
…뭐야. 그런 말, 나한테 하는 사람 없는데.
-> route_odaeun_c2

=== route_odaeun_c2 ===
# chapter: 05 오다은 · 나도 챙김 받아도 돼?
# scene: 갑옷의 균열
# bg: office
# char: odaeun soft center
복도 너머, 오다은이 최준혁에게 내 이야기를 하고 있었다.
# speaker: odaeun
새내기가 자꾸… 내 걱정을 해. 그게 왜 이렇게 어색하지.
못 들은 척했지만, 심장이 빠르게 뛰었다.
-> odaeun_c2_2

=== odaeun_c2_2 ===
# scene: 비 오는 밤
# bg: house-ext-night
# char: odaeun cardigan center
우산을 두고 나간 오다은이 흠뻑 젖어 돌아왔다. 현관엔, 나 혼자 기다리고 있었다.
# speaker: odaeun
…왜 안 자고. 기다린 거야?
* [“왜 이렇게 늦게 왔어요.” 타올을 건넨다]
    ~ aff_odaeun += 14
    # speaker: odaeun
    …이런 거, 익숙하지 않아서. 좀, 봐줘.
* [말없이 따뜻한 차를 내민다]
    ~ aff_odaeun += 9
    # speaker: odaeun
    …너 진짜, 반칙이야.
- -> odaeun_c2_3

=== odaeun_c2_3 ===
# scene: 누가 먼저 봤나
# bg: studio-day
# char: yunjaeho work center
# speaker: yunjaeho
오다은, 요즘 좀 이상하죠. …혹시, 모르는 거예요? 당신 때문인 거.
윤재호가, 오다은의 마음을 나보다 먼저 읽고 있었다.
* [“…알아요. 조금은.”]
    ~ aff_odaeun += 6
* [“그래요? 잘 모르겠는데.” 흘려넘긴다]
    ~ aff_yunjaeho += 3
- # hide: yunjaeho
-> odaeun_c2_4

=== odaeun_c2_4 ===
# scene: 진짜 얼굴
# bg: rooftop-night
# char: odaeun cardigan center
# cg: cg-07-3
# speaker: odaeun
나 사실, 여기서 제일 오래됐는데 — 제일 외로웠어. 그게 습관이 돼서, 혼자가 편한 줄 알았어.
처음 보는, 갑옷을 벗은 얼굴이었다.
* [“이제, 혼자 두지 않을게요.”]
    ~ aff_odaeun += 14
    # speaker: odaeun
    …그 말, 책임질 거지? 나 기억력 좋아.
* [“지금은, 안 외롭잖아요.”]
    ~ aff_odaeun += 8
- -> route_odaeun_c3

=== route_odaeun_c3 ===
# chapter: 06 오다은 · 매니저가 아니고 싶어
# scene: 오래된 마음
# bg: office
# char: odaeun jacket center
매니지먼트에서 오다은의 역할이 커졌는데도, 그녀는 이상하게 자꾸 내 곁을 맴돌았다.
조용히 지켜보기만 하던 내가, 이번엔 먼저 다가가고 싶었다. 그게, 두렵지 않았다.
# speaker: odaeun
…나, 너한테 모아둔 말이 좀 있거든. 하나씩 꺼내면 시간 오래 걸려서, 그냥 안 했어. 근데 이제 보니까 — 너무 많이 쌓였더라.
오다은은 밀어내는 법이 없었다. 다만, 오래 참아온 것이었다.
* [“지금 들을게요. 전부.”]
    ~ aff_odaeun += 15
    # speaker: odaeun
    …큰일이네. 일 년 치는 되는데. 각오해.
* [“천천히, 하나씩 들려줘요.”]
    ~ aff_odaeun += 9
    # speaker: odaeun
    …그래. 어차피 너, 어디 안 갈 거잖아.
- -> odaeun_c3_2

=== odaeun_c3_2 ===
# scene: 폴라로이드 앨범
# bg: living-night
# char: odaeun soft center
오다은이 혼자만 보던 폴라로이드 앨범을 꺼냈다. 그 안엔, 내 사진이 제일 많았다.
# speaker: odaeun
…언제 이렇게 많이 찍었냐고? 모르게 찍었거든. 이 앨범 제일 앞 장이 너인 거 — 사실, 한참 됐어.
한 장 한 장이, 그녀가 말 대신 모아온 시간이었다.
* [“이거, 다 저예요.” 진지하게 본다]
    ~ aff_odaeun += 16
    # speaker: odaeun
    …응. 나도 모르는 새에, 제일 많이 담겼더라. 너가.
* [웃으며 한 장을 집어 든다]
    ~ aff_odaeun += 10
- -> odaeun_c3_3

=== odaeun_c3_3 ===
# scene: 무서운 마음
# bg: rooftop-night
# char: odaeun varsity center
# speaker: odaeun
나, 매니저 안 하면 아무것도 아닌데 — 너 앞에서는, 그냥 나 하나로도 괜찮을 것 같아서. 그게 무서워.
* [“그냥 다은 씨가, 제일 좋아요.”]
    ~ aff_odaeun += 16
    # speaker: odaeun
    …반칙. 또 반칙이야, 너.
* [말 대신, 그 손을 잡는다]
    ~ aff_odaeun += 12
    # speaker: odaeun
    …이런 건, 사진으로 못 남기겠다. 너무 좋아서.
- -> odaeun_ending

=== odaeun_ending ===
{ aff_odaeun >= 95: -> end_od_happy }
-> end_od_normal

=== end_od_happy ===
# scene: 해피엔딩 · 오다은
# bg: rooftop-night
# char: odaeun varsity center
# cg: cg-09-s3
# ending: odaeun happy
오다은이 폴라로이드로 둘의 셀카를 찍었다. 사진을 확인하다, 처음으로 먼저 기댔다.
# speaker: odaeun
…우리, 진짜 잘 어울린다. 이건, 내 앨범 제일 앞에 꽂을 거야.
새벽 옥상, 한 장의 사진 속에 우리가 나란히 웃고 있었다.
# speaker:
( '우리 새내기'라던 그 별명이, 오늘은 고백처럼 들렸다. )
-> credits

=== end_od_normal ===
# scene: 노멀엔딩 · 오다은
# bg: rooftop-night
# char: odaeun soft center
# cg: cg-09-n3
# ending: odaeun normal
# speaker: odaeun
…나 아직, 나도 잘 모르겠어. 좀만 더, 지켜봐 줄 수 있어?
폴라로이드 한 장을, 내 손에 쥐여줬다.
서로 다 알면서도 서두르지 않는, 그 여운이 오래 남았다.
-> credits


// ======================= 루트 D — KAEL "관심 없는 척" =======================
=== route_kael_d1 ===
# chapter: 04 KAEL · 관심 없는 척
# scene: 도발
# bg: studio-day
# char: kael leather center
# speaker: kael
너, 나한테 관심 없지.
루트 확정 — 그 말투엔, 묘하게 떠보는 기색이 섞여 있었다.
~ aff_kael += 5
* [“업무적으로는, 있어요.”]
    ~ aff_kael += 8
    # speaker: kael
    …하. 재미없는 대답이네. 마음에 들어.
* [“네, 별로요.” 담담히 답한다]
    ~ aff_kael += 12
    # speaker: kael
    …뭐야. 그렇게까지 단호할 일이야?
- -> kael_d1_2

=== kael_d1_2 ===
# scene: 스캔들 그 후
# bg: backstage
# char: kael white center
# cg: cg-05
스캔들이 수습된 뒤, 혼자 남은 백스테이지. KAEL이 나에게만 "고마워"라고 말하고는, 바로 자리를 떴다.
* [그 뒷모습을 따라간다]
    ~ aff_kael += 12
    # speaker: kael
    …따라오지 말랬잖아. 근데, 왜 안 미운지 모르겠네.
* [그냥, 가게 둔다]
    ~ aff_kael += 7
    그의 "고마워"는, 평소보다 한 박자 느렸다.
- -> kael_d1_3

=== kael_d1_3 ===
# scene: 새벽 작업
# bg: studio-night
# char: kael hoodie-gray center
야밤 스튜디오. KAEL이 혼자, 발매용이 아닌 개인적인 곡을 쓰고 있었다. 눈이 마주쳤다.
# speaker: kael
…봤어? 못 본 걸로 해.
* [“무슨 곡이에요?” 다가간다]
    ~ aff_kael += 14
    # speaker: kael
    …몰라도 돼. 아직, 너한테 들려줄 단계 아니야.
* [모른 척, 조용히 자리를 비킨다]
    ~ aff_kael += 8
- -> kael_d1_4

=== kael_d1_4 ===
# scene: 들킨 사이
# bg: backstage
# char: kael stage center
공개 행사장. 팬들이 나와 KAEL이 가깝다는 걸 포착해 기사가 났다. 당황하는 KAEL을, 처음 봤다.
# speaker: kael
…이런 거, 익숙할 줄 알았는데. 너랑 엮이니까, 좀 다르네.
-> route_kael_d2

=== route_kael_d2 ===
# chapter: 05 KAEL · 원래 이런 사람 아니야
# scene: 혼자 연습
# bg: practice
# char: kael casual center
무대 위의 그와 전혀 다르게, 혼자 연습하며 투덜대는 KAEL. 또, 나한테 들켰다.
# speaker: kael
…웃지 마. 이거 비밀이야.
* [작게 박수를 쳐준다]
    ~ aff_kael += 14
    # speaker: kael
    …너 앞에선, 멋있는 척이 안 돼. 이상하게.
* [못 본 척, 문을 닫아준다]
    ~ aff_kael += 8
- -> kael_d2_2

=== kael_d2_2 ===
# scene: 과거
# bg: rooftop-night
# char: kael hoodie-black center
# cg: cg-07-4
# speaker: kael
나 데뷔할 때, 주변에 진짜 나를 아는 사람이 한 명도 없었어. …다들, 'KAEL'만 봤지.
처음 꺼내는 이야기였다.
* [“나는, 당신을 알고 싶어요.”]
    ~ aff_kael += 15
    # speaker: kael
    …그 말, 무책임하게 하지 마. 진짜로 믿어버리니까.
* [말없이, 곁에 오래 있어준다]
    ~ aff_kael += 9
- -> kael_d2_3

=== kael_d2_3 ===
# scene: 질투
# bg: corridor
# char: kael hoodie-black center
오다은과 내가 떠드는 걸 멀리서 보던 KAEL이, 나중에 아무렇지 않게 물었다.
# speaker: kael
…오다은이랑, 친해?
* [“왜요, 질투해요?” 웃으며 받아친다]
    ~ aff_kael += 14
    # speaker: kael
    …하. 인정. 됐냐?
* [“그냥 동료죠.” 담담히 답한다]
    ~ aff_kael += 8
- -> kael_d2_4

=== kael_d2_4 ===
# scene: 그 곡
# bg: studio-night
# char: kael leather center
KAEL이 소속사 몰래 쓰던 곡을, 나에게만 들려줬다. 가사 한 줄 — "처음으로 나를 모르는 척 안 해준 사람".
* [“…그게, 저예요?”]
    ~ aff_kael += 16
    # speaker: kael
    …끝까지 모른 척하려 했는데. 너 때문에, 다 들켰네.
* [말없이, 고개를 끄덕인다]
    ~ aff_kael += 10
- -> route_kael_d3

=== route_kael_d3 ===
# chapter: 06 KAEL · 끝까지 안 말할 뻔했잖아
# scene: 압박
# bg: meeting
# char: kael stage center
소속사가 신곡을 상업적으로 바꾸길 요구했다. KAEL이 처음으로, 거절했다.
* [“이 곡, 이대로가 좋아요.” 지지한다]
    ~ aff_kael += 14
    # speaker: kael
    …너가 그러니까, 안 물러설 수 있겠다.
* [“현실적으로 생각해요.” 조언한다]
    ~ aff_kael += 8
- -> kael_d3_2

=== kael_d3_2 ===
# scene: 대결 전야
# bg: backstage
# char: kael white center
# speaker: kael
나, 내일 소속사 결정 뒤집을 거야. 이 곡, 고치지 않고 그대로 낸다. …근데 일 커지면, 너까지 휩쓸려.
# speaker: kael
그러니까 이제 그만 신경 꺼. 네가 가까우면 — 나, 못 싸워.
조용히 지켜보기만 하던 내가, 이번엔 그의 싸움에 같이 서고 싶었다. 그게, 두렵지 않았다.
* [“같이 싸워요. 나도 안 물러서요.”]
    ~ aff_kael += 15
    # speaker: kael
    …너 진짜, 끝까지 안 놔주네. …그래. 그럼 둘이서, 이기자.
* [“…멀리서, 끝까지 지켜볼게요.”]
    ~ aff_kael += 8
    # speaker: kael
    …그래. 그거면, 됐어.
- -> kael_d3_3

=== kael_d3_3 ===
# scene: 무대
# bg: stage
# char: kael stage center
신곡 발표 무대. KAEL이 처음으로, 고친 데 없는 가사 그대로를 불렀다 — 소속사의 결정을 정면으로 뒤집은, 그의 승리였다.
무대를 내려온 그가, 귓가에 낮게 속삭였다.
# speaker: kael
이거, 너 얘기야. 이제, 알겠지?
* [“알아요. 처음부터.”]
    ~ aff_kael += 16
    # speaker: kael
    …그럼 됐어. 두 번은, 말 안 해.
* [처음 듣는 말처럼, 그를 본다]
    ~ aff_kael += 10
- -> kael_ending

=== kael_ending ===
{ aff_kael >= 95: -> end_kl_happy }
-> end_kl_normal

=== end_kl_happy ===
# scene: 해피엔딩 · KAEL
# bg: stage
# char: kael stage center
# cg: cg-09-s4
# ending: kael happy
# speaker: kael
네가 없었으면, 이 노래도 없었어. 그 말은… 가사 말고, 직접 하고 싶었어.
관심 없는 척하던 그 눈이, 처음으로 똑바로 나를 향했다. 그리고 처음으로, 먼저 다가왔다.
# speaker:
( 성씨로만 부르던 그가, 처음으로 — 가장 가깝게, 내 이름을 불렀다. )
-> credits

=== end_kl_normal ===
# scene: 노멀엔딩 · KAEL
# bg: stage
# char: kael leather center
# cg: cg-09-n4
# ending: kael normal
신곡은 분명, 누군가를 향한 노래였다. 그게 나라는 걸, 나만 알았다.
# speaker: kael
…노래는 노래고. 굳이, 말로 해야 알아?
끝내 직접은 말하지 못한 그 마음을, 나는 가사 속에서만 읽었다.
-> credits


// ======================= 루트 E — 윤재호 "말로는 못 해서" =======================
=== route_yunjaeho_e1 ===
# chapter: 04 윤재호 · 말 없는 사람이 제일 많이 봐
# scene: 먼저 보여준 것
# bg: studio-night
# char: yunjaeho work center
루트 확정 — 윤재호가, 처음으로 먼저 작업물을 내밀었다.
# speaker: yunjaeho
…이 부분, 어때요. 솔직하게.
~ aff_yunjaeho += 5
* [“여기, 숨 쉬는 구간이 좋아요.” 솔직히 말한다]
    ~ aff_yunjaeho += 12
    # speaker: yunjaeho
    …당신은, 음악을 장면으로 듣네요. 신기해요.
* [“좋아요.” 짧게 답한다]
    ~ aff_yunjaeho += 7
- -> yunjaeho_e1_2

=== yunjaeho_e1_2 ===
# scene: 공동 작업
# bg: studio-night
# char: yunjaeho sweater center
# cg: cg-03
윤재호가 가사 피드백을 부탁했다. "이 부분 듣다가, 새벽 기차가 떠올랐어요"라고 하자, 그가 멈췄다.
# speaker: yunjaeho
…그거예요. 내가 못 찾던 단어가.
* [더 말해준다]
    ~ aff_yunjaeho += 14
    # speaker: yunjaeho
    …당신이랑 만들면, 곡이 자꾸 길어져요. 끝내기 싫어서.
* [“계속해 봐요.” 멈춘다]
    ~ aff_yunjaeho += 8
- -> yunjaeho_e1_3

=== yunjaeho_e1_3 ===
# scene: 유실된 메모
# bg: studio-night
# char: yunjaeho tired center
복구 실패한 파일 이야기가 나왔다.
{ ch3_helped_yunjaeho:
    # speaker: yunjaeho
    그날 밤, 혼자였으면 — 그냥 다 포기했을 거예요. {player}가 옆에서 밤새 같이 뒤져줘서, 버텼어요.
}
# speaker: yunjaeho
그 안에… 메모 같은 게 있었어요. 곡은, 아니었고.
* [“무슨 메모였어요?” 조심스레 묻는다]
    ~ aff_yunjaeho += 14
    # speaker: yunjaeho
    …언젠가, 말할게요. 복구되면. 아니, 복구 안 돼도.
* [그냥, 넘어가 준다]
    ~ aff_yunjaeho += 8
- -> yunjaeho_e1_4

=== yunjaeho_e1_4 ===
# scene: 같은 이어폰
# bg: rooftop-night
# char: yunjaeho coat center
옥상 새벽, 이어폰 한쪽씩 나눠 끼고 미완성 트랙을 들었다. 침묵이, 처음으로 편안했다.
# speaker: yunjaeho
…이 시간이, 요즘 제일 좋아요.
-> route_yunjaeho_e2

=== route_yunjaeho_e2 ===
# chapter: 05 윤재호 · 메모가 곡이 아니었어요
# scene: 가사 있는 곡
# bg: studio-night
# char: yunjaeho green center
# cg: cg-06
새 트랙이 완성됐다. 이번엔, 가사가 있었다. 그가 쓴 첫 가사를, 나에게 먼저 들려줬다.
* [가사에 대해 말한다]
    ~ aff_yunjaeho += 14
    # speaker: yunjaeho
    …알아챘죠. 누구 얘긴지.
* [음악에 대해 말한다]
    ~ aff_yunjaeho += 8
- -> yunjaeho_e2_2

=== yunjaeho_e2_2 ===
# scene: 일기였어요
# bg: studio-night
# char: yunjaeho sweater center
# cg: cg-07-5
# speaker: yunjaeho
유실된 메모, 사실은 일기였어요. 당신 처음 본 날부터 쓴. 복구는 안 됐지만 — 다, 기억해요.
* [“뭐라고 썼어요?”]
    ~ aff_yunjaeho += 15
    # speaker: yunjaeho
    …다시 쓰면 돼요. 이번엔, 당신 보면서.
* [말없이, 고개를 끄덕인다]
    ~ aff_yunjaeho += 9
- -> yunjaeho_e2_3

=== yunjaeho_e2_3 ===
# scene: 들킨 미소
# bg: corridor
# char: odaeun soft center
# speaker: odaeun
재호 요즘 웃어. …너 때문인 거, 알아?
오다은의 말에, 괜히 가슴이 간지러웠다.
* [“…알아요. 조금은.”]
    ~ aff_yunjaeho += 6
* [“그래요?” 모른 척한다]
    ~ aff_odaeun += 3
- # hide: odaeun
-> yunjaeho_e2_4

=== yunjaeho_e2_4 ===
# scene: 문 앞의 악보
# bg: room-night
방문 앞에, 악보 한 장이 끼워져 있었다. 제목은 없고, 마지막 줄엔 — 내 이름만 적혀 있었다.
말로 못 한 마음이, 음표로 거기 있었다.
-> route_yunjaeho_e3

=== route_yunjaeho_e3 ===
# chapter: 06 윤재호 · 말로 해도 돼요, 이제
# scene: 무대 제안
# bg: office
# char: yunjaeho work2 center
소속사가 윤재호에게 직접 무대에 서길 제안했다. 거절하려는 그에게, 내가 말했다.
늘 곁에서 듣기만 하던 내가, 이번엔 그를 무대로 밀어주고 싶었다. 그게, 두렵지 않았다.
* [“한 번만, 서보면 어때요.” 설득한다]
    ~ aff_yunjaeho += 14
    # speaker: yunjaeho
    …당신이 거기 있으면, 해볼 수 있을 것 같아요.
* [“무리하진 말아요.” 물러선다]
    ~ aff_yunjaeho += 8
- -> yunjaeho_e3_2

=== yunjaeho_e3_2 ===
# scene: 단 한 번의 무대
# bg: stage
# char: yunjaeho work center
윤재호가, 처음으로 무대에 섰다. 작은 쇼케이스. 오직 한 사람을 위해, 새 트랙을 직접 연주했다.
객석 맨 앞에서, 나는 숨도 쉬지 못했다.
-> yunjaeho_e3_3

=== yunjaeho_e3_3 ===
# scene: 무대 뒤
# bg: backstage
# char: yunjaeho green center
공연이 끝난 백스테이지. 윤재호가, 처음으로 눈을 똑바로 마주쳤다.
# speaker: yunjaeho
말로는 늘 모자라다고 했는데… 오늘은, 말해도 될 것 같아요. {player}, 좋아해요.
악보로, 이어폰으로, 무대로 — 한 계절을 빙 돌아 닿은 한 문장. 그 짧은 말이, 세상 어떤 긴 고백보다 무겁게 내려앉았다.
* [“나도요.” 마주 본다]
    ~ aff_yunjaeho += 16
    # speaker: yunjaeho
    …다행이다. 곡으로만, 안 끝나서.
* [말 대신, 그를 안아준다]
    ~ aff_yunjaeho += 12
- -> yunjaeho_ending

=== yunjaeho_ending ===
{ aff_yunjaeho >= 95: -> end_yj_happy }
-> end_yj_normal

=== end_yj_happy ===
# scene: 해피엔딩 · 윤재호
# bg: studio-night
# char: yunjaeho sweater center
# cg: cg-09-s5
# ending: yunjaeho happy
새벽 스튜디오. 윤재호가 헤드폰을 내려놓고, 나를 마주 봤다.
# speaker: yunjaeho
이 트랙, 제목 정했어요. — {player}. 바꿀 생각, 없어요.
그가 먼저, 조심스럽게 나를 안았다. 노래보다 따뜻한 침묵이었다.
# speaker:
( 말이 아니라 늘 음악이던 그가, 곡의 제목에 내 이름을 새겼다. )
-> credits

=== end_yj_normal ===
# scene: 노멀엔딩 · 윤재호
# bg: studio-night
# char: yunjaeho tired center
# cg: cg-09-n5
# ending: yunjaeho normal
# speaker: yunjaeho
…고마워요. 진심으로.
그 말 이상은, 끝내 나오지 않았다.
하지만 그날 이후, 그는 새 곡을 쓸 때마다 — 제일 먼저, 나를 찾았다.
-> credits


// ======================= 루트 F — 최준혁 "친절의 이유" =======================
=== route_choijunhyeok_f1 ===
# chapter: 04 최준혁 · 친절의 껍질
# scene: 먹고 싶은 거 있어요?
# bg: living-night
# char: choijunhyeok sweater center
루트 확정 — 늘 모두를 위해 밥을 하는 최준혁에게, 처음으로 물었다. "준혁 씨는, 먹고 싶은 거 있어요?"
그가, 국자를 든 채로 멈췄다.
# speaker: choijunhyeok
…그런 거, 물어봐 준 사람. 오랜만이라.
~ aff_choijunhyeok += 5
-> choijunhyeok_f1_2

=== choijunhyeok_f1_2 ===
# scene: 잠긴 방
# bg: living-day
# char: choijunhyeok coat center
집을 구경하다, 한 방만 잠겨 있는 걸 발견했다. 그의 방은 아닌, 옛날 방.
# speaker: choijunhyeok
…거긴, 예전에 살던 사람 방이에요.
* [“…물어봐도 돼요?” 조심스레]
    ~ aff_choijunhyeok += 14
    # speaker: choijunhyeok
    언젠가. 지금은, 아직.
* [모른 척, 더 묻지 않는다]
    ~ aff_choijunhyeok += 8
- -> choijunhyeok_f1_3

=== choijunhyeok_f1_3 ===
# scene: 옛 친구
# bg: living-day
# char: choijunhyeok vest center
최준혁의 지인이 셰어하우스를 찾았다. "얘, 예전엔 엄청 달랐어요." 그 말에, 그가 긴장했다.
* [“어떻게 달랐는데요?” 더 듣는다]
    ~ aff_choijunhyeok += 8
    # speaker: choijunhyeok
    …그 얘긴, 내가 직접 할게요. 다른 사람 말 말고.
* [자연스럽게, 화제를 돌린다]
    ~ aff_choijunhyeok += 14
    # speaker: choijunhyeok
    …고마워요. 방금, 구해준 거.
- -> choijunhyeok_f1_4

=== choijunhyeok_f1_4 ===
# scene: 새벽의 루틴
# bg: kitchen
# char: choijunhyeok black center
# cg: cg-01
매일 새벽 혼자 부엌에서 커피를 마시는 그의 루틴에, 우연히 함께하게 됐다.
# speaker: choijunhyeok
…이 시간엔, 보통 아무도 없거든요. 근데, 둘도 나쁘지 않네요.
처음으로, 대화다운 대화를 나눈 새벽이었다.
-> route_choijunhyeok_f2

=== route_choijunhyeok_f2 ===
# chapter: 05 최준혁 · 잠긴 방
# scene: 떠난 사람
# bg: living-night
# char: choijunhyeok jacket center
# speaker: choijunhyeok
그 방 사람은… 떠났어요. 아직 못 치우고 있는 건, 내가 아직 못 보내서.
첫 번째 균열이었다.
* [“…혼자, 많이 힘들었겠어요.”]
    ~ aff_choijunhyeok += 14
    # speaker: choijunhyeok
    …그렇게 말해주는 사람이, {player} 씨가 처음이에요.
* [말없이, 곁에 있어준다]
    ~ aff_choijunhyeok += 9
- -> choijunhyeok_f2_2

=== choijunhyeok_f2_2 ===
# scene: 계약서의 한 줄
# bg: room-day
짐을 정리하다, 셰어하우스 계약서를 다시 봤다. 맨 아래 한 줄 —
"이 집에 있는 동안, 당신은 혼자가 아닙니다."
처음으로, 그 문장을 오래 들여다봤다.
-> choijunhyeok_f2_3

=== choijunhyeok_f2_3 ===
# scene: 문구의 의미
# bg: living-night
# char: choijunhyeok intense center
# cg: cg-07-6
# speaker: choijunhyeok
…이 문구, 직접 쓰셨어요?
* [“혹시, 준혁 씨한테 필요한 말이기도 했어요?”]
    ~ aff_choijunhyeok += 15
    # speaker: choijunhyeok
    …들켰네요. 나부터가, 그 말이 필요한 사람이었어요.
* [“저도, 그 말 덕분에 버텼어요.”]
    ~ aff_choijunhyeok += 11
    # speaker: choijunhyeok
    …그럼, 우리 둘 다 구한 문장이네요.
- -> choijunhyeok_f2_4

=== choijunhyeok_f2_4 ===
# scene: 들킨 마음
# bg: living-day
# char: choijunhyeok sweater center
셰어하우스 작은 행사. 모두를 챙기면서도 나만 유독 신경 쓰는 그를, 오다은이 먼저 눈치챘다.
# speaker: odaeun
…준혁이가 저런 얼굴 하는 거, 처음 보네. 누구 덕분일까?
-> route_choijunhyeok_f3

=== route_choijunhyeok_f3 ===
# chapter: 06 최준혁 · 모두가 아니라 너 하나
# scene: 방을 열다
# bg: living-night
# char: choijunhyeok knit center
최준혁이, 입주 첫날 봤던 그 잠긴 방을 처음으로 열어줬다. 안은 텅 비어 있었고 — 벽시계 하나가, 오래전에 멈춰 있었다.
# speaker: choijunhyeok
그 사람이 떠난 날, 시계도 멈췄어요. 다음 사람을 위해 비워뒀다고 했지만 — 사실은, 시간을 멈춰둔 거였어요.
조용히 머물기만 하던 내가, 이번엔 그 멈춘 시간을 같이 움직이고 싶었다. 그게, 두렵지 않았다.
# speaker: choijunhyeok
…근데 이제, 그 다음 사람이 누군지 알 것 같아서.
* [멈춘 벽시계의 태엽을, 대신 감아준다]
    ~ aff_choijunhyeok += 16
    # speaker: choijunhyeok
    …다시 가네요. 시계도. …나도.
* [“…무슨 뜻이에요?”]
    ~ aff_choijunhyeok += 12
    # speaker: choijunhyeok
    …끝까지 말하게 하네요. 좋아해요, {player} 씨.
- -> choijunhyeok_f3_2

=== choijunhyeok_f3_2 ===
# scene: 선을 넘다
# bg: rooftop-night
# char: choijunhyeok intense center
# speaker: choijunhyeok
나, 모두한테 친절한 사람인데 — 당신한테는, 자꾸 특별하게 하고 싶어져서. 그게, 무서워요.
* [“나도, 준혁 씨가 특별해요.”]
    ~ aff_choijunhyeok += 16
    # speaker: choijunhyeok
    …그 말, 오늘부터 평생 붙잡고 살 것 같네요.
* [“아직, 잘 모르겠어요.” 솔직히 말한다]
    ~ aff_choijunhyeok += 8
- -> choijunhyeok_f3_3

=== choijunhyeok_f3_3 ===
# scene: 연장 계약서
# bg: living-night
# char: choijunhyeok surprised center
계약 종료 일주일 전. 최준혁이, 종이 한 장을 내밀었다.
# speaker: choijunhyeok
연장 계약서예요. 금액은… 없어요. 그냥, 더 있어줬으면 해서.
처음으로, 완전히 무너지는 표정이었다.
* [망설임 없이, 서명한다]
    ~ aff_choijunhyeok += 16
    # speaker: choijunhyeok
    …고마워요. 이 집, 이제 진짜 완성됐어요.
* [“…말로, 먼저 듣고 싶어요.”]
    ~ aff_choijunhyeok += 12
    # speaker: choijunhyeok
    좋아해요. 모두가 아니라 — {player} 씨, 당신 하나를.
- -> choijunhyeok_ending

=== choijunhyeok_ending ===
{ aff_choijunhyeok >= 95: -> end_cj_happy }
-> end_cj_normal

=== end_cj_happy ===
# scene: 해피엔딩 · 최준혁
# bg: living-night
# char: choijunhyeok knit center
# cg: cg-09-s6
# ending: choijunhyeok happy
계약서에 서명한 나를 보며, 최준혁이 처음으로 한 사람만을 향해 웃었다.
# speaker: choijunhyeok
이 집, 이제 당신 것도 돼요. …나도, 당신 거고.
모두에게 친절하던 사람이, 마침내 한 사람의 곁에 머물렀다.
# speaker:
( '우리 집 막내'가 아니라, 처음으로 내 이름 하나만을 불렀다. )
-> credits

=== end_cj_normal ===
# scene: 노멀엔딩 · 최준혁
# bg: living-night
# char: choijunhyeok surprised center
# cg: cg-09-n6
# ending: choijunhyeok normal
# speaker: choijunhyeok
…아직 대답, 못 해도 돼요. 이 집은 항상 여기 있을 테니까.
반전 같던 고백 앞에서, 나는 아직 마음을 다 정리하지 못했다.
어색한 일상이 다시 시작됐지만 — 계약서엔, 날짜 하나가 더 적혀 있었다.
-> credits


=== end_solo_early ===
# scene: 엔딩 · 미완성
# bg: room-night
# ending: solo
아직, 누구의 플레이리스트에도 완전히 들어가지 못한 것 같았다.
서두를 필요는 없다. 누군가에게 조금 더 마음을 기울였다면, 다른 계절이 열렸을지도.
-> credits


// ======================= 공통 크레딧 =======================
=== credits ===
# hide: all
# bg: room-night
# speaker:
— 당신의 플레이리스트가 완성됐습니다 —
음악이 좋아서 시작한 계절. 그 끝에 남은 건, 한 사람과 — 그리고 여러 곡이었다.
( 플레이해주셔서 고마워요 ♪  ·  컬렉션에서 모은 트랙을 다시 들어보세요 )
-> END
