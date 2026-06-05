# 게임 메타 설계 — 플레이리스트 : 우리 사이의 음표

> 본편 스토리/캐릭터/호감도/엔딩은 `../visual_novel_game_plan.md`.
> 이 문서는 **플레이어 정체성 + 메타 시스템(타이틀·닉네임·컬렉션·세이브·설정)** 설계. (team 기획 확정안)
> 에셋 규칙은 `ASSETS.md`.

---

## 1. 플레이어 정체성 (확정)

- **역할: A&R / 콘텐츠 어시스턴트** (신입 계약직, 6개월). 발굴·일정·콘텐츠 보조라 6명 전원과 자연 접점:
  | 캐릭터 | 접점 |
  |---|---|
  | 정이안 | 직속 상사 — 앨범 서류·파일 관리 지시 |
  | 오다은 | 사수(시니어) — 매일 붙어 현장 학습 |
  | 윤재호 | 트랙 파일 관리 보조 → **챕터3 데이터 유실 사건 당사자** |
  | 한서아 | 데뷔 콘텐츠 촬영 동행·리허설 일정 |
  | KAEL | 기존 아티스트 업무 이관받으며 첫 접촉 |
  | 최준혁 | **셰어하우스 = 회사 주거지원 제휴처** (입주 정당화) |
- **성격 아크**: 조심스러운 관찰자 → 결정적 순간 먼저 움직임. 챕터1~2 선택지 = 관찰형 2 + 능동형 1(능동이 호감도↑), 후반 = 능동=해피/머뭇=노멀.
- **성별 미지정 유지**: 1인칭만, 호칭에 오빠/언니/누나/형 없음, 플레이어 CG는 뒷모습·손·발만(얼굴 없는 POV), 엔딩 CG도 두 손/나란한 뒷모습.
- **고정 백스토리(최소)**: 지방 출신·상경(챕터1 기차), "음악이 좋아서"(막연한 애정·비전문). 가족/연애사 등은 **선택지로 열어둠**.

## 2. 닉네임 시스템 (확정: 이름 입력 + 캐릭터별 호칭 분화)

- **입력 연출**: 오프닝 기차 씬, 정이안 카톡 *"내일 10시까지. 이름 확인용으로 뭐라고 부를까요?"* → 입력창. 시스템 UI가 아니라 픽션 안에서.
- 입력값은 `player`(이름) / `player_last`(성) 분리 저장 → 호칭 조합.
- **캐릭터별 호칭 = 호감도 마일스톤**:
  | 캐릭터 | 평소 호칭 | 변화 시점 |
  |---|---|---|
  | 정이안 | 성씨+"씨" | 해피엔딩서 처음 이름 (감정 전환점) |
  | KAEL | 성씨만 | 챕터4부터 이름 (변화 신호) |
  | 한서아 | (초반 무시) | 챕터2 "…이름이 뭐랬지" 후 이름 |
  | 오다은 | 별명("우리 새내기") | 챕터2서 스스로 정함 |
  | 윤재호 | 처음부터 이름(조용히) | — (말수 적은 그가 기억=캐릭터성) |
  | 최준혁 | "우리 집 막내" | 챕터3 이후 이름(친밀 표지) |
- 호칭 바뀌는 순간 자막 노트 *"(처음으로 이름을 불렀다)"* 로 임팩트.
- 입력 검증: 빈값→"당신" 폴백, 길이 8자, `{`·`}` 차단, DOM 삽입은 textContent만(XSS 방지).

## 3. 컬렉션 = "내 플레이리스트" (확정)

- 갤러리가 **음악 스트리밍 UI**. 명장면이 **트랙**으로 추가됨:
  - 트랙 = 이벤트 CG + 그 씬 BGM 번호 + 한 줄 감정 메모 + 트랙명(예: "냉장고 앞에서", "새벽 스튜디오")
  - 잠긴 트랙 = 제목만 흐릿, 이미지 미로드(스포·대역폭 방지)
- 서브 수집: **폴라로이드**(오다은이 찍은 사진 설정), **가사 조각**(윤재호 노트 — 다 모으면 그의 엔딩곡 가사 완성=반전)
- 게임 제목이 메타적으로 이 컬렉션을 지칭. 엔딩 크레딧 *"당신의 플레이리스트가 완성됐습니다 — 트랙 NN장"*.

## 4. 메타 화면 흐름 & 카피

- **타이틀**(배경 rooftop-night + LP 로고 + 글래스 메뉴):
  `▶ 새로운 플레이리스트`(새 게임) · `◀◀ 이어서 듣기`(이어하기) · `저장된 트랙`(로드) · `컬렉션` · `설정`
  - 새 게임 카피: *"어떤 노래는 처음 들었을 때부터 알아요. 이 노래, 나한테 중요해질 것 같다고."*
  - 이어하기 카피: *"아직 끝나지 않은 곡이에요. 중간부터 들어도 괜찮아요."*
- **닉네임 입력**: 글래스 박스, 정이안 카톡 맥락.
- **컬렉션 갤러리**: 스트리밍 트랙 목록 + 잠금 타일(블러+자물쇠) + 라이트박스(CG+BGM 재생). 랜딩 스틸 호버 오버레이 패턴 재활용.
- **설정**: 텍스트 속도 / BGM·SE 음량 / 전체화면 / (자동·스킵). 글래스 슬라이더·토글.
- **ESC 메뉴**: 계속/세이브/불러오기/설정/타이틀로. 반투명 오버레이.
- **대사창**: 배경+스탠딩+대사창(상단 호감도 바 + 이름표 핑크 펠릿)+선택지. 랜딩 오프닝 모달을 persistent로 확장.
- **챕터3 분기 팝업**: *"누군가, 당신을 위한 곡을 쓰기 시작한 것 같아요."*
- 톤: 크림+핑크 글래스 유지. 다크 게임 씬 위 글래스는 다크 틴트(70%)+핑크 1.5px 보더로 대비. `prefers-reduced-motion` 시 즉시표시.

## 5. 기술 골격 (확정 방향)

- **단일 진실 = Ink 상태** (`story.state.ToJson()` / `LoadJson()`). JS는 읽어서 그릴 뿐, 게임 상태 중복 보관 금지.
- **저장 구조** (localStorage, 네임스페이스 `pbu:`):
  - `pbu:save:0..4` — 슬롯 5개 = `{ v, storyV, savedAt, ink, preview{player,chapter,scene,affection,line,bg} }`. preview는 슬롯목록 표시용 캐시.
  - `pbu:profile` — 전 슬롯 공유 = `{ cgs[], endings[], metChars[] }` (한 번 본 건 영구).
  - `pbu:settings`, `pbu:lastSlot`(이어하기).
  - 썸네일은 캡처 안 함 → **현재 배경 webp 재활용**(용량 절약).
- **닉네임**: 새 게임 = `ResetState()` → `variablesState["player"]=nick` → 첫 `Continue()`. (반드시 첫 Continue 전 주입.)
- **호감도**: Ink VAR `aff_<key>` += n (로직으로). JS는 `ObserveVariable`로 변화 감지 +n 팝업. 로드 시 `suppress` 플래그 + prevAff 재동기화.
- **컬렉션**: `# cg: cg-01` 태그 → director가 CG 표시 + `profile.unlockCg`. 갤러리는 마스터 카탈로그 × 해금 교집합.
- **Ink 태그 컨벤션** (`key: value`, 한 줄 다중 가능):
  | 태그 | 예 | 의미 |
  |---|---|---|
  | bg | `# bg: rooftop-night` | 배경 크로스페이드 → `img/bg/*.webp` |
  | char | `# char: hanseoa knit [center/left/right]` | 스탠딩 → `img/char/hanseoa/knit.webp` |
  | hide | `# hide: kael` / `all` | 스탠딩 퇴장 |
  | speaker | `# speaker: hanseoa`(키) | 이름표(charMeta서 한글명+테마색) / 없으면 독백 |
  | bgm / se | `# bgm: studio-night` / `# se: heart` | 오디오 |
  | cg | `# cg: cg-01` | CG + 해금 |
  | chapter / scene | `# chapter: 3 균열` / `# scene: 냉장고 앞` | 전환카드 / 스냅샷 라벨 |
  | ending | `# ending: hanseoa happy` | 엔딩 + profile 기록 |
  | clear | `# clear` | 화면 정리(독백) |
- **모듈 구조** (`play/src/`): `engine/`(Story·tagHandlers·director·charMeta·affection) · `ui/`(Dialogue·Choices·Title·Menu·SaveLoad·Gallery·Settings·AffectionPopup) · `state/`(storage·saves·profile·settings) · `audio/`. engine=ink만, ui=DOM만, state=localStorage만, director=접착층.
- **⚠️ 함정**: ① 런타임 .ink 컴파일 금지 → 빌드타임 `.ink.json`(가벼운 `inkjs` 러너로 fetch). ② 세이브에 `storyV` 박아 스토리 패치 시 불일치 세이브 거부(마이그레이션 안 만듦). ③ `currentTags`는 Continue 직후만 유효. ④ 자동진행 줄마다 저장 X → 선택지 직후/씬 경계서만.

### charMeta (단일 출처, romaji 키 = ASSETS.md와 1:1)
hanseoa 한서아 / jeongian 정이안 / odaeun 오다은 / kael KAEL / yunjaeho 윤재호 / choijunhyeok 최준혁

## 6. 구현 우선순위
1. `storage.js`+`settings.js`+`charMeta.js` (기반)
2. `engine/Story.js`+`tagHandlers.js`+더미 director → **챕터1 ch1.ink 루프 검증**
3. `Dialogue.js`/`Choices.js` 실 UI + director DOM 반영 (수직 슬라이스 = 오프닝→냉장고 앞 선택지→호감도)
4. `saves.js`+`SaveLoad.js`(슬롯/이어하기)
5. 호감도 옵저버 + `AffectionPopup.js`
6. `profile.js`+`Gallery.js`(내 플레이리스트)
7. 타이틀/닉네임/설정 화면 + `audio.js`
