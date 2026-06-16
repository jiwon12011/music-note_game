# 게임 에셋 매니페스트

원본 고해상도 PNG(`무제 폴더/`)는 git에 올리지 않고(용량), **`play/public/img/`의 webp 변환본만** 사용·커밋한다.
캐릭터 height 1300 / 배경 width 1600, webp q82.

> 표정 라벨은 *추정*이라 실제 의도와 다르면 수정하세요. 의상(slug)은 객관적으로 분류했습니다.
> 엔진 매핑: Ink 태그 `# bg: train` → `img/bg/train.webp`, `# char: hanseoa casual` → `img/char/hanseoa/casual.webp`

## UI (img/ui/)
| 파일 | 용도 |
|---|---|
| logo.webp | 타이틀 로고 엠블럼(원형 음표) — 타이틀 화면 사용 중 |
| keyvisual.webp | LP 위 6인 군상 키비주얼 — 추후 컬렉션/스플래시용(타이틀엔 미사용, 캐릭터 스탠딩으로 대체) |
| badge.webp | 획득/뱃지용(미사용, 컬렉션 예정) |
| filmstrip.webp | 필름스트립 장식(미사용, 컬렉션 예정) |

타이틀 화면(`ui/title.js`)은 6인 **개별 스탠딩**을 양옆 3명씩 배치 + 배경 `bg/rooftop-night.webp` + 중앙 글래스 패널 구성.

## 배경 (img/bg/) — 18장
| 파일 | 장소 | 기획서 | 시간대 |
|---|---|---|---|
| train | 기차 안 | BG-01 | 낮 |
| house-ext-day / house-ext-night | 셰어하우스 외관 | BG-02 | 낮/밤 |
| living-day / living-night | 셰어하우스 거실 | BG-03 | 낮/밤 |
| kitchen | 부엌/냉장고 앞 | BG-04 | 밤 |
| room-day / room-night | 주인공 방 | BG-05 | 낮/밤 |
| office | 프로덕션 사무실 | BG-06 | 낮 |
| studio-day / studio-night | 녹음 스튜디오 | BG-07 | 낮/밤 |
| corridor | 연습실 복도 | BG-08 | 낮 |
| practice | 연습실 내부 | BG-09 | 낮 |
| meeting | 회의실 | BG-10 | 낮 |
| stage | 공연장 무대 | BG-11 | 조명 |
| backstage | 공연장 백스테이지 | BG-12 | 밤 |
| rooftop-dusk / rooftop-night | 셰어하우스 옥상 | BG-13 | 석양/밤 |

## 캐릭터 스탠딩 (img/char/<name>/)

### hanseoa 한서아 — 신인 가수
| slug | 의상 | 추정 표정/용도 |
|---|---|---|
| stage | 핑크 스테이지 의상(마이크) | 데뷔 무대, 자신감 |
| casual | 블랙 캐주얼 | 차가운 첫인상 (기본) |
| gothic | 블랙 고딕 드레스 | 시크/차가움 |
| dress-pink | 핑크 드레스 | 부드러운/수줍 |
| dress-white | 화이트 드레스 | 감성/울컥 |
| hoodie | 화이트 후디 | 편안/피곤 |
| offshoulder | 블랙 오프숄더 | 살짝 미소/teasing |
| knit | 화이트 니트 | 지침/소프트 |

### jeongian 정이안 — 프로듀서
| slug | 의상 | 추정 표정/용도 |
|---|---|---|
| suit | 블랙 슈트 | 냉정 (기본) |
| shirt | 화이트 셔츠+태블릿 | 집중 |
| vest | 베스트+타이 | 자신감/집중 |
| knit | 화이트 니트 | 부드러운 |
| cardigan | 크림 가디건 | 부드러운/소프트 |
| messy | 흐트러진 셔츠(머리 짚음) | 무너짐/당황 |

### odaeun 오다은 — 매니저
| slug | 의상 | 추정 표정/용도 |
|---|---|---|
| hoodie | 크림 후디(손가락 입) | 눈치보기 (기본) |
| varsity | 바시티 자켓 | 4차원 웃음/발랄 |
| denim | 데님(손 흔듦) | 반가움 |
| cardigan | 가디건+태블릿 | 진지/관찰 |
| jacket | 블랙 자켓 | 걱정/진지 |
| soft | 화이트 후디 | 부드러운/걱정 |

### kael KAEL — 인기 가수
| slug | 의상 | 추정 표정/용도 |
|---|---|---|
| hoodie-gray | 그레이 후디 | 무관심 (기본/일상) |
| leather | 레더 자켓(브이) | 무대/관심 숨김 |
| stage | 스터드 자켓 | 무대용 |
| hoodie-black | 블랙 후디 | 무관심 |
| shirt | 블랙 셔츠 | 무관심 |
| navy | 네이비 자켓 | 귓속말/관심 숨김 |
| white | 화이트 | 신경질 |
| casual | 네이비 캐주얼 | 소프트 |

### yunjaeho 윤재호 — 작곡가
| slug | 의상 | 추정 표정/용도 |
|---|---|---|
| work | 블랙 자켓+악보 | 집중/작업 (기본) |
| work2 | 악보 읽는 | 집중 |
| sweater | 네이비 스웨터 | 조용한 미소 |
| tired | 머리 짚음 | 지침 |
| green | 그린 자켓(손 가슴) | 고마움 |
| coat | 브라운 코트 | 새벽 감성 |

### choijunhyeok 최준혁 — 셰어하우스 주인
| slug | 의상 | 추정 표정/용도 |
|---|---|---|
| sweater | 브라운 스웨터+머그 | 친절한 미소 (기본) |
| coat | 브라운 코트 | 친절/외출 |
| knit | 크림 니트 | 부드러운 |
| suit | 네이비 슈트 | 선 긋기/포멀 |
| jacket | 그레이 자켓 | 선 긋기 |
| vest | 베스트+블루셔츠 | 포멀/친절 |
| intense | 블랙 셔츠(진지) | 새벽 진지/반전 고백 |
| black | 블랙 티 | 진지 |
| surprised | 그레이 후디(당황) | 당황/반전 |

## CG 이벤트 일러스트 (img/cg/) — 43장
webp(width 1600, q82). Ink `# cg: <id>` 로 표시+해금. 캐릭터 순서 = 1 한서아 / 2 정이안 / 3 오다은 / 4 KAEL / 5 윤재호 / 6 최준혁 (기획서 순, *확인 필요*).

| 파일 | 장면 | 캐릭터 | 챕터 | 획득(제안) |
|---|---|---|---|---|
| cg-01 | 냉장고 앞 마주침 | 최준혁 | 1 | 진행형(자동) — 현재 연결됨 |
| cg-02 | 연습실 벽에 기댄 | 한서아 | 2 | 한서아 씬 적극 선택 |
| cg-03 | 야근 스튜디오 나란히 | 윤재호 | 2 | 윤재호 씬 적극 선택 |
| cg-04 | 녹음 부스 첫 대면 | KAEL | 2 | KAEL 씬 적극 선택 |
| cg-05 | 스캔들 수습 | KAEL·오다은 | 3 | 진행형 |
| cg-06 | 밤샘 복구 | 윤재호·정이안 | 3 | 진행형 |
| cg-07-1~6 | 챕터3 힌트 씬 | 각 캐릭터(1~6 순) | 3 | **호감도 1위 ♥40+ → 그 캐릭터 것** |
| cg-08 | 한서아 데뷔 무대(전체) | 공통 | 5 | 진행형 |
| cg-09-n1~6 | 노멀 엔딩 | 각 캐릭터 | 5 | **1위 ♥50~69 → 그 캐릭터 노멀** |
| cg-09-s1~6 | 해피 엔딩 | 각 캐릭터 | 5 | **1위 ♥70+ → 그 캐릭터 해피** |
| cg-10-hanseoa-practice | 리허설 뒤 무너진 얼굴 | 한서아 | 루트 CH4 | 루트 진행 |
| cg-11-jeongian-vending | 야근의 작은 틈 | 정이안 | 루트 CH4 | 루트 진행 |
| cg-12-odaeun-polaroid | 폴라로이드 앨범 | 오다은 | 루트 CH4/CH6 | 루트 진행/폴라로이드 |
| cg-13-kael-practice | 혼자 연습하는 밤 | KAEL | 루트 CH5 | 루트 진행 |
| cg-14-yunjaeho-score | 방문 앞의 악보 | 윤재호 | 루트 CH5 | 가사 조각 |
| cg-15-choijunhyeok-clock | 멈춘 시계와 계약서 | 최준혁 | 루트 CH5/CH6 | 루트 진행 |
| cg-16-hanseoa-stage-late | 무대 직전의 약속 | 한서아 | 루트 CH6 | 루트 진행 |
| cg-17-hanseoa-rooftop-lyric | 덮어둔 비밀 노트 | 한서아 | 루트 CH5 | 루트 진행 |
| cg-18-jeongian-dawn-meeting | 크레딧에 남은 이름 | 정이안 | 루트 CH6 | 루트 진행 |
| cg-19-jeongian-control-room | 안 끄고 둔 데모 | 정이안 | 루트 CH4/CH5 | 루트 진행 |
| cg-20-odaeun-vending | 캔커피 두 개 | 오다은 | 공통/수집 | 폴라로이드 |
| cg-21-odaeun-rain-polaroids | 젖은 우산과 기다림 | 오다은 | 루트 CH5 | 루트 진행 |
| cg-22-kael-backstage | 고맙다는 말의 뒷모습 | KAEL | 루트 CH4/CH6 | 루트 진행 |
| cg-23-kael-booth | 유리 너머의 진짜 곡 | KAEL | 루트 CH4 | 루트 진행 |
| cg-24-yunjaeho-dawn-score | 새벽에 완성된 한 소절 | 윤재호 | 루트 CH4 | 루트 진행 |
| cg-25-yunjaeho-backstage | 단 한 번의 무대 뒤 | 윤재호 | 루트 CH6 | 루트 진행 |
| cg-26-choijunhyeok-kitchen | 둘도 나쁘지 않은 새벽 | 최준혁 | 루트 CH4 | 루트 진행 |
| cg-27-choijunhyeok-locked-room | 잠긴 방이 열린 날 | 최준혁 | 루트 CH6 | 루트 진행 |

엔진: `# cg: id` → 전체화면 CG 레이어(`.scene-cg`) + `trackByCg`로 컬렉션 트랙 해금. 다음 `# bg:` 에서 CG 해제.
