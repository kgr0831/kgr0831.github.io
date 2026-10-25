// Copy: Garam_Kim_Portfolio_Content.md. Media: the accompanying editable PDF assets.
// Text pairs are Korean and English. Screenshots and prototype art are captioned separately.
const portfolioProjects = {
  "eum": {
    "title": [
      "EUM",
      "EUM"
    ],
    "period": [
      "2025.12 — 2026.01 · 5인 팀",
      "Dec 2025 — Jan 2026 · Five-person team"
    ],
    "headline": [
      "느려진 협업 화면을 부드럽게",
      "Making collaboration feel responsive"
    ],
    "summary": [
      "화상회의와 드로잉을 함께 쓸 때의 렌더링 병목을 개선했습니다.",
      "Resolved the rendering bottleneck when video meetings and drawing run together."
    ],
    "role": [
      "화이트보드 풀스택 개발 · 5인 팀",
      "Whiteboard full-stack developer · Team of five"
    ],
    "stack": "WebGPU · PixiJS v8 · WebGL",
    "intro": [
      "AI 번역 화상회의와 실시간 화이트보드를 같은 공간에서 사용하는 브라우저 협업 서비스입니다.",
      "A browser collaboration workspace combining AI-translated video meetings and a real-time whiteboard."
    ],
    "metric": "23.7 → 58.7 FPS",
    "metricLabel": [
      "평균 프레임 · 렌더러 전환 프로젝트 당시 측정값",
      "Average frame rate measured during the renderer migration"
    ],
    "details": [
      [
        [
          "본인 기여",
          "My contribution"
        ],
        [
          "드로잉 렌더러, 실시간 동기화, 포스트잇·권한 등 화이트보드 기능을 담당했습니다. 낯선 그래픽스 원리를 AI와 학습해 구현하고, 구조 변경의 근거를 문서와 발표로 공유해 팀을 설득했습니다.",
          "Owned the drawing renderer, real-time synchronization, sticky notes, and permissions. Learned unfamiliar graphics concepts with AI and built them into the product, explaining the migration to the team through documentation and a presentation."
        ]
      ],
      [
        [
          "렌더링 병목",
          "Rendering bottleneck"
        ],
        [
          "Fabric.js의 CPU 렌더링이 영상 디코딩·소켓 동기화와 메인 스레드에서 겹쳤습니다. WebGPU 기반 PixiJS v8로 전환해 GPU 렌더링과 배치 처리를 적용했습니다.",
          "Fabric.js rendering competed with video decoding and socket synchronization on the main thread. Migrated to PixiJS v8 with WebGPU for GPU rendering and batching."
        ]
      ],
      [
        [
          "입력·전송·표시의 품질",
          "Input, transfer, and display quality"
        ],
        [
          "입력의 떨림은 One Euro Filter로 보정하고, 전송할 좌표는 Douglas–Peucker로 줄이며, 표시할 선은 Bézier 곡선으로 부드럽게 표현했습니다. 전송은 50ms 단위로 묶고 압축했습니다.",
          "Used a One Euro Filter to reduce input jitter, Douglas–Peucker to reduce transferred points, and Bézier curves to smooth displayed strokes. Batched transmission every 50ms and compressed the data."
        ]
      ],
      [
        [
          "팀과 결정한 전환",
          "Making the migration decision"
        ],
        [
          "성능·호환성·도입 비용을 비교해 변경 근거를 팀에 설명했습니다. WebGL 폴백으로 호환성을 보완했고, 동시 편집은 마지막 변경을 반영합니다. 충돌을 자동으로 병합하지는 않습니다.",
          "Explained the migration by comparing performance, compatibility, and adoption cost. Added a WebGL fallback. Concurrent edits keep the last change; conflicts are not automatically merged."
        ]
      ]
    ],
    "links": [
      [
        [
          "구현 코드",
          "Implementation"
        ],
        "https://github.com/kgr0831/EUM2"
      ],
      [
        [
          "발표 영상",
          "Presentation"
        ],
        "https://www.youtube.com/watch?v=Pnjw9WitAXg"
      ],
      [
        [
          "팀 코드 · 비공개",
          "Team repository · Private"
        ],
        "https://github.com/jb0xyz/EUM"
      ]
    ],
    "logo": "./assets/icons/eum.png",
    "logoStyle": "dark",
    "media": [
      {
        "src": "./assets/eum-whiteboard-original.png",
        "caption": [
          "실시간 화이트보드 화면",
          "Real-time whiteboard"
        ],
        "width": 1498,
        "height": 845
      },
      {
        "src": "./assets/eum-meeting.png",
        "caption": [
          "화상회의 화면",
          "Video meeting"
        ],
        "width": 1509,
        "height": 838
      },
      {
        "src": "./assets/eum-architecture.png",
        "caption": [
          "서비스 구성도",
          "Service architecture"
        ],
        "width": 1600,
        "height": 1061
      }
    ]
  },
  "moai": {
    "title": [
      "MOAI",
      "MOAI"
    ],
    "period": [
      "2026.09 — 현재 · 인턴 · AX Engineer",
      "Sep 2026 — Present · AX Engineer intern"
    ],
    "headline": [
      "업무 현황을 정확히 확인하도록",
      "A consistent view of ongoing work"
    ],
    "summary": [
      "검색 조건을 바꿔도 현재 결과를 유지하고, 통계와 목록의 업무 분류 기준을 맞췄습니다.",
      "Kept results consistent after filter changes and aligned the status rules used by lists and totals."
    ],
    "role": [
      "AX Engineer 인턴 · 2026.09 — 현재",
      "AX Engineer intern · Sep 2026 — Present"
    ],
    "stack": "관리 API · 사용량 원장 · 리드봇",
    "intro": [
      "MOAI의 업무 자동화 제품에서 사용량 기록, 관리자 기능, 채팅 기반 업무 연결을 개발했습니다.",
      "Contributed usage tracking, admin features, and chat-connected workflows to MOAI’s work automation product."
    ],
    "details": [
      [
        [
          "흩어진 기록과 업무 연결",
          "Connecting records and tasks"
        ],
        [
          "도구별 AI 사용 내역을 수집·기록·확인하는 원장 운영에 참여했습니다. 관리자 화면의 작업 검색·필터·목록 추가 조회를 구현했습니다.",
          "Participated in collecting, recording, and reviewing AI usage across tools. Implemented task search, filters, and incremental loading in the admin interface."
        ]
      ],
      [
        [
          "응답 순서와 데이터 일관성",
          "Response ordering and consistency"
        ],
        [
          "필터를 바꾼 뒤 늦게 도착한 이전 응답이 현재 목록을 덮어쓰지 않도록 처리했습니다. 전체·미완료·오늘 마감·기한 초과 통계를 목록과 분리해 전체 건수로 집계하고, 진행 중 업무에도 같은 상태 기준을 적용했습니다.",
          "Prevented older responses from overwriting results after a filter change. Calculated total, incomplete, due-today, and overdue counts independently of the paginated list, using consistent status rules for in-progress tasks."
        ]
      ],
      [
        [
          "예외 처리와 개발 중인 기능",
          "Errors and ongoing work"
        ],
        [
          "날짜 오류·업무 대상 정보 누락·처리 실패를 구분해 안내했습니다. 웹 채팅과 Google Chat의 요청을 후속 업무로 연결하는 리드봇 개발에 참여하고 있습니다.",
          "Distinguished date errors, missing task-target information, and processing failures. Currently contributing to a lead bot connecting web chat and Google Chat requests to follow-up work."
        ]
      ]
    ],
    "links": [
      [
        [
          "관리자 기능 구현 · 비공개",
          "Admin implementation · Private"
        ],
        "https://github.com/moai-technologies/moai/pull/898"
      ],
      [
        [
          "저장소 · 비공개",
          "Repository · Private"
        ],
        "https://github.com/moai-technologies/moai"
      ]
    ],
    "logo": "./assets/icons/moai.png",
    "logoStyle": "light",
    "media": []
  },
  "rolai": {
    "title": [
      "Remnents of Light / ROLAI",
      "Remnents of Light / ROLAI"
    ],
    "period": [
      "1인 개발 · Windows 데모 배포",
      "Solo development · Windows demo released"
    ],
    "headline": [
      "게임 제작을 원격 개발로 확장",
      "Taking game development beyond the desk"
    ],
    "summary": [
      "직접 만든 게임을 배포하고, PC 앞에 없어도 Discord에서 구현·검증을 요청하는 흐름을 만들었습니다.",
      "Released a game and built a Discord workflow to request implementation and verification away from the PC."
    ],
    "role": [
      "개발·기획·아트 · 원격 개발 루프 구축",
      "Development, design, art · Remote development loop"
    ],
    "stack": "Unity · Discord · AI CLI · Unity MCP",
    "intro": [
      "콤보·패링·벽 타기·대시로 방을 돌파하는 2D 액션 게임입니다. 첫 스테이지 Windows 데모를 itch.io에 배포하고, 제작 과정의 반복 작업을 ROLAI로 자동화했습니다.",
      "A 2D action game with combos, parries, wall climbing, and dashes. Released a first-stage Windows demo on itch.io and automated recurring development work through ROLAI."
    ],
    "metric": [
      "Windows 데모",
      "Windows demo"
    ],
    "metricLabel": [
      "첫 스테이지 · itch.io 배포",
      "First stage · Released on itch.io"
    ],
    "details": [
      [
        [
          "원격 요청부터 보고까지",
          "From remote request to report"
        ],
        [
          "릴레이 봇이 Discord 요청을 받고 FIFO 큐로 순차 실행합니다. AI CLI와 Unity MCP로 구현·실행을 연결하고 결과를 Discord로 보고합니다.",
          "A relay bot receives Discord requests and runs them through a FIFO queue. AI CLI and Unity MCP connect implementation and execution, with results reported back to Discord."
        ]
      ],
      [
        [
          "매번 달라지던 테스트 조건",
          "Inconsistent test conditions"
        ],
        [
          "씬 상태·잔여 애니메이션·튜닝값 때문에 결과가 달라졌습니다. 별도의 실행용 테스트 씬과 새 세션으로 조건을 고정하고, 테스트 준비 실패와 기능 실패를 구분했습니다.",
          "Scene state, remaining animations, and tuning values changed results. Fixed the conditions with a separate runtime test scene and fresh sessions, distinguishing setup failures from feature failures."
        ]
      ],
      [
        [
          "검증과 수정",
          "Verification and iteration"
        ],
        [
          "검증 로그와 짧은 플레이 영상을 대조하고 실패 원인에 맞춰 수정·재실행합니다. 통과 조건을 먼저 정의해 구현과 수정을 반복할 기준을 마련했습니다.",
          "Compare verification logs with short gameplay recordings, then fix and rerun based on the cause. Define pass conditions first to guide implementation and iteration."
        ]
      ],
      [
        [
          "자동화 범위와 확인 비용",
          "Automation scope and review cost"
        ],
        [
          "삭제·커밋·씬 변경은 승인을 거칩니다. 반복 확인에는 빠른 로그 검증을, 최종 확인에는 짧은 영상을 사용합니다. 초기 구축·유지 비용은 남으며, 이 흐름이 완전한 정답을 보장하지는 않습니다.",
          "Deletion, commits, and scene changes require approval. Use fast log checks during iteration and short videos for final review. Setup and maintenance costs remain; this workflow does not guarantee correctness."
        ]
      ]
    ],
    "links": [
      [
        [
          "게임 다운로드",
          "Download demo"
        ],
        "https://kgr0831.itch.io/remnents-of-light"
      ],
      [
        [
          "플레이 영상",
          "Gameplay"
        ],
        "https://www.youtube.com/watch?v=WHP7L8P5Be8"
      ],
      [
        [
          "프로젝트 코드",
          "Source code"
        ],
        "https://github.com/kgr0831/Remnents-of-Light"
      ]
    ],
    "logo": "./assets/icons/rol.png",
    "logoStyle": "dark",
    "media": [
      {
        "src": "./assets/rol-poster.jpg",
        "caption": [
          "게임 플레이 영상의 한 장면",
          "A frame from the gameplay video"
        ],
        "width": 1280,
        "height": 720
      },
      {
        "src": "./assets/rol-discord.png",
        "caption": [
          "Discord에서 요청하고 결과를 확인하는 화면",
          "Requesting work and reviewing results in Discord"
        ],
        "width": 637,
        "height": 549
      },
      {
        "src": "./assets/rol-test-scene.png",
        "caption": [
          "동작 검증을 위한 테스트 씬",
          "A test scene for behavior verification"
        ],
        "width": 1600,
        "height": 962
      },
      {
        "src": "./assets/rol-architecture.png",
        "caption": [
          "원격 개발 흐름의 구성",
          "Remote development architecture"
        ],
        "width": 1325,
        "height": 772
      }
    ]
  },
  "gammaru": {
    "title": [
      "겜마루 웹 · 데일리 브리프",
      "Gammaru Web · Daily Brief"
    ],
    "period": [
      "동아리 · 개인 자동화",
      "Club and personal automation"
    ],
    "summary": [
      "매일 찾던 지원 정보를 보고서 보관함과 Discord 알림으로 연결했습니다.",
      "Connected daily funding research to a report archive and Discord notifications."
    ],
    "intro": [
      "숭실대학교 게임 제작 동아리 겜마루의 소개·게임 아카이브 웹에 후원·지원 정보를 읽는 보고서 공간을 연결했습니다.",
      "Connected a sponsorship and funding report archive to the website and game archive of Soongsil University’s Gammaru game development club."
    ],
    "details": [
      [
        [
          "본인 구현",
          "My implementation"
        ],
        [
          "날짜별 보관·검색, Discord 로그인, 구독 승인과 알림을 구현했습니다. 개인 공모전·채용 브리프도 목적과 수신 대상을 나누어 운영합니다.",
          "Implemented date-based archives, search, Discord login, subscription approval, and notifications. Also operate personal competition and recruitment briefs with separate purposes and recipients."
        ]
      ],
      [
        [
          "반복 확인과 운영 비용",
          "Repeated checks and operating cost"
        ],
        [
          "이름 조회 실패와 수신 대상 변경을 구분해, 승인된 채널 ID가 같으면 반복 확인을 줄였습니다. 불필요한 저장소 조회를 줄이고 복구 절차를 문서화했습니다.",
          "Distinguished failed name lookups from recipient changes to reduce repeated approvals for the same channel ID. Reduced unnecessary storage queries and documented recovery procedures."
        ]
      ],
      [
        [
          "공개 소개와 회원 보고서의 분리",
          "Separate public pages and member reports"
        ],
        [
          "누구나 볼 동아리 소개·게임 아카이브와 회원용 보고서는 접근 범위가 달랐습니다. 공개 화면은 GitHub Pages에 배포하고 로그인·보고서·알림은 기존 AWS에 유지했습니다. 공개 빌드에 회원 데이터나 로그인 세션을 넣지 않았습니다.",
          "The club introduction and game archive are public, while reports require member access. Deployed public pages on GitHub Pages and retained login, reports, and notifications on AWS, keeping member data and login sessions out of the public build."
        ]
      ],
      [
        [
          "배운 점",
          "What I learned"
        ],
        [
          "보고서 생성 이후의 보관·접근 권한·알림·운영 비용까지 연결해야 반복 업무를 줄일 수 있었습니다.",
          "Reducing recurring work required connecting report generation with storage, access control, notifications, and operating costs."
        ]
      ]
    ],
    "links": [
      [
        [
          "동아리 웹",
          "Club website"
        ],
        "https://gammaru.dev/"
      ],
      [
        [
          "보고서 보관함",
          "Report archive"
        ],
        "https://d3ktbkaahtexzk.cloudfront.net/reports"
      ],
      [
        [
          "웹 코드",
          "Website source"
        ],
        "https://github.com/kgr0831/Gammarupage"
      ],
      [
        [
          "브리프 코드",
          "Brief source"
        ],
        "https://github.com/kgr0831/DailyScrum_Bundle"
      ],
      [
        [
          "공개 홈페이지 코드",
          "Public homepage source"
        ],
        "https://github.com/gammaru-dev/homepage"
      ]
    ],
    "logo": "./assets/icons/gammaru.png",
    "logoStyle": "light",
    "media": [
      {
        "src": "./assets/gammaru-site.png",
        "caption": [
          "겜마루 공개 홈페이지 · 2026.10 배포 화면",
          "Gammaru public homepage · October 2026 deployment"
        ],
        "width": 1440,
        "height": 900
      }
    ]
  },
  "abstraction": {
    "title": [
      "Abstraction Bot",
      "Abstraction Bot"
    ],
    "period": [
      "개인 자동화 도구",
      "Personal automation tool"
    ],
    "summary": [
      "대화에 묻히는 논의와 결정을 모아 요약하고 기록합니다.",
      "Collects, summarizes, and records decisions buried in conversations."
    ],
    "intro": [
      "Discord 대화에 묻히는 논의와 결정을 수집하고, 연결된 AI가 요약한 결과를 Notion과 Discord에 기록하는 도구입니다.",
      "Collects discussions and decisions buried in Discord, then uses a connected AI to summarize them for Notion and Discord."
    ],
    "details": [
      [
        [
          "수집과 요약 분리",
          "Separating collection from summarization"
        ],
        [
          "요약 방식을 바꿀 때 수집 봇까지 수정하지 않도록 구성했습니다. 연결된 CLI 에이전트를 활용해 Notion 기록과 Discord 결과 공유로 이어집니다.",
          "Separated the collector from the summary agent so changing the summarization method does not require rewriting the bot. Connected agents produce Notion records and share results on Discord."
        ]
      ],
      [
        [
          "웹 콘솔과 운영",
          "Web console and operation"
        ],
        [
          "웹 콘솔에서 수집·연결·결산을 관리하고 자동 결산과 수동 실행을 함께 제공합니다. 원문 보존 기간과 연결 상태를 관리합니다.",
          "The web console manages collection, connections, automatic reports, and manual runs, including retention periods and connection status."
        ]
      ],
      [
        [
          "대화 원문 처리",
          "Handling conversation content"
        ],
        [
          "수집한 메시지를 명령으로 신뢰하지 않도록 결산 CLI의 도구 사용을 제한했습니다. CLI가 연결되지 않으면 통계 결산으로 전환합니다.",
          "Restricted the reporting CLI’s tool access so collected messages are not treated as trusted instructions. Fall back to statistical reports when no CLI is connected."
        ]
      ]
    ],
    "links": [
      [
        [
          "코드·구조",
          "Source and architecture"
        ],
        "https://github.com/kgr0831/Abstraction-Bot"
      ]
    ],
    "logo": "./assets/ui/chat.svg",
    "logoStyle": "light",
    "media": []
  },
  "golf": {
    "title": [
      "무인 스크린골프 CMS",
      "Unstaffed Golf CMS"
    ],
    "period": [
      "CMS·정산 기능 구현 및 시연",
      "CMS and settlement features implemented and demonstrated"
    ],
    "summary": [
      "예약·기기·결제를 관리하고 거래별 원장으로 정산 근거를 추적.",
      "Managed bookings, devices, and payments with transaction-ledger-based settlement."
    ],
    "intro": [
      "예약·기기 관제·결제·정산을 관리하는 Next.js 기반 웹 시스템입니다. 운영 화면과 정산 집계가 같은 원장을 참조하도록 설계했습니다.",
      "A Next.js web system for bookings, device control, payments, and settlements. Operational views and settlement calculations reference the same ledger."
    ],
    "details": [
      [
        [
          "구현 범위",
          "Implementation scope"
        ],
        [
          "매장·기기·예약·회원 관리, 예약과 기기 상태 대조, 정산 확정·대사 차이·감사 기록을 구현했습니다. 정산 계산을 공통 도메인으로 모았습니다.",
          "Implemented store, device, booking and member management, booking/device state checks, settlement confirmation, reconciliation differences, and audit records. Consolidated settlement calculations in a shared domain."
        ]
      ],
      [
        [
          "금액의 근거 추적",
          "Tracing settlement amounts"
        ],
        [
          "환불은 반대 부호의 원장 기록으로 남기고, 거래번호로 중복 반영을 차단했습니다. 마감 뒤 도착한 거래는 확정 정산서를 유지한 채 다음 기간으로 이월합니다.",
          "Record refunds as inverse ledger entries and reject duplicates by transaction ID. Carry late-arriving transactions to the next period without changing confirmed settlements."
        ]
      ],
      [
        [
          "실운영 연결",
          "Production integrations"
        ],
        [
          "CMS·정산 기능과 예외 검증까지 구현·시연했습니다. 외부 PG·IoT의 실운영 연결은 별도 범위입니다.",
          "Implemented and demonstrated CMS, settlement, and exception checks. Live external payment gateway and IoT integrations are outside this scope."
        ]
      ]
    ],
    "links": [
      [
        [
          "구현 저장소 · 비공개",
          "Implementation repository · Private"
        ],
        "https://github.com/kgr0831/golf-cms"
      ]
    ],
    "logo": "./assets/ui/grid.svg",
    "logoStyle": "light",
    "media": []
  },
  "paperbridge": {
    "title": [
      "PaperBridge",
      "PaperBridge"
    ],
    "period": [
      "AI 연결·리더 상호작용·백엔드 기여",
      "AI integration, reader interaction, and backend contributions"
    ],
    "summary": [
      "논문의 선택 문맥을 AI 질문으로 전달하고 리더 안에서 근거를 확인.",
      "Connected selected paper passages to AI questions and source checking inside the reader."
    ],
    "intro": [
      "논문 원문을 복사하고 대화 도구에서 문맥을 다시 설명하는 왕복을 줄이는 연구 작업 공간입니다.",
      "A research workspace that reduces copying paper excerpts and repeatedly explaining context in a separate chat tool."
    ],
    "details": [
      [
        [
          "본인 기여",
          "My contribution"
        ],
        [
          "AI 연결·선택 문맥 전달·질의 흐름을 리더 안에 구성했습니다. 인증과 연구 작업 공간을 뒷받침하는 백엔드 구현에도 참여했습니다.",
          "Implemented AI connections, selected-context transfer, and question flows within the reader. Also contributed to authentication and the research workspace backend."
        ]
      ],
      [
        [
          "실행 환경 연결",
          "Connecting execution environments"
        ],
        [
          "지정 실행 파일 → PATH → 알려진 설치 위치 순으로 CLI를 찾고 실패 원인을 구분했습니다. CLI 연결 확인과 모델 호출을 분리해, 사용자가 질문·문맥·모델을 확인한 뒤 실행하도록 구성했습니다.",
          "Resolve the CLI through an explicit executable, PATH, then known install locations. Separate connection checks from model calls so users can review the question, context, and model before running."
        ]
      ]
    ],
    "links": [
      [
        [
          "프로젝트 소개",
          "Project overview"
        ],
        "https://github.com/kgr0831/PaperBridge"
      ],
      [
        [
          "기여 코드 · 비공개",
          "Contribution repository · Private"
        ],
        "https://github.com/myunhh/PaperBridge-Refectored"
      ]
    ],
    "logo": "./assets/icons/paperbridge-wordmark.png",
    "logoStyle": "light",
    "media": [
      {
        "src": "./assets/paperbridge-reader.png",
        "caption": [
          "샘플 문서로 확인한 리더 화면",
          "Reader verification with a sample document"
        ],
        "width": 1280,
        "height": 900
      }
    ]
  },
  "pintos": {
    "title": [
      "PintOS",
      "PintOS"
    ],
    "period": [
      "크래프톤 정글 · 4인 팀",
      "Krafton Jungle · Four-person team"
    ],
    "summary": [
      "기부 관계와 락 해제를 재설계해 경쟁 상태를 해결했습니다.",
      "Redesigned donation tracking and lock release to resolve race conditions."
    ],
    "intro": [
      "크래프톤 정글에서 교육용 운영체제의 스레드 스케줄링·사용자 프로그램·가상 메모리를 구현했습니다. 우선순위 역전을 해결하는 과정에서 설계 가설을 검증하고 수정했습니다.",
      "Implemented thread scheduling, user programs, and virtual memory in an educational OS at Krafton Jungle. Tested and revised a design hypothesis while addressing priority inversion."
    ],
    "details": [
      [
        [
          "발견한 문제",
          "The problem"
        ],
        [
          "높은 우선순위 스레드도 낮은 우선순위 스레드의 락 해제를 기다리면 실행이 밀렸습니다. 우선순위 기부의 의존 관계를 관리하는 비용을 줄이려 Release-Trigger를 실험했습니다.",
          "High-priority threads could be delayed while waiting for locks held by lower-priority threads. Tried Release-Trigger to reduce the cost of managing priority-donation dependencies."
        ]
      ],
      [
        [
          "단순화가 놓친 조건",
          "What the simplification missed"
        ],
        [
          "해제할 락과 원래 우선순위를 단일 트리거에 담고, 스케줄링 시점에 함께 처리하려 했습니다. 다중·중첩 기부에서 교착 상태와 우선순위 유실이 발생했습니다. 기부는 계속 변하는 상태이고, 여러 락의 의존 관계와 임계 구역 종료 시점의 해제를 유지해야 했습니다.",
          "Stored a lock and original priority in a single trigger, deferring release and restoration until scheduling. Multiple and nested donation produced deadlocks and lost priorities. Donations must be tracked as changing state, with lock-specific dependencies and release at the end of the critical section."
        ]
      ],
      [
        [
          "표준 알고리즘으로 재설계",
          "Redesign with the standard algorithm"
        ],
        [
          "락별 기부를 추적하는 표준 우선순위 스케줄링 방식으로 리팩토링했습니다. 해제한 락의 기부만 제거하고 남은 기부로 유효 우선순위를 다시 계산합니다. 더 높은 우선순위의 스레드가 실행 가능하면 실행을 양보하도록 정리했습니다.",
          "Refactored to standard priority scheduling with per-lock donation tracking. Remove only donations associated with the released lock, recompute effective priority from the remaining donations, and yield when a higher-priority thread is ready."
        ]
      ],
      [
        [
          "결과와 배운 점",
          "Result and learning"
        ],
        [
          "다중·중첩 기부의 경쟁 상태를 해결하고 관련 테스트를 통과했습니다. 목록 관리 비용보다, 반드시 유지해야 하는 상태와 락 해제 시점을 먼저 파악해야 한다는 점을 배웠습니다.",
          "Resolved race conditions in multiple and nested donation and passed the related tests. Learned to identify the state and lock-release timing that must be preserved before optimizing list-management costs."
        ]
      ]
    ],
    "links": [
      [
        [
          "프로젝트 · 비공개",
          "Project · Private"
        ],
        "https://github.com/kgr0831/KAIST_PintOS"
      ]
    ],
    "metric": [
      "경쟁 상태 해결",
      "Race conditions resolved"
    ],
    "metricLabel": [
      "다중·중첩 기부 재설계 · 관련 테스트 통과",
      "Redesigned multiple and nested donation · Related tests passed"
    ],
    "logo": "./assets/icons/jungle.png",
    "logoStyle": "light",
    "media": []
  },
  "simulation": {
    "title": [
      "평성시 사회 시뮬레이션",
      "Pyongsong Social Simulation"
    ],
    "period": [
      "2026.04 — 2026.08 · SmartAI Lab 학부연구생",
      "Apr — Aug 2026 · SmartAI Lab undergraduate researcher"
    ],
    "summary": [
      "ABM·LLM 연구의 에이전트 구조와 기억·성찰·계획 루프 구현.",
      "Built agent structures and memory, reflection, and planning loops for ABM and LLM research."
    ],
    "intro": [
      "서로 다른 환경과 기억이 행동에 어떤 차이를 만드는지 탐구하는 평성시 사회 시뮬레이션 연구에 참여했습니다.",
      "Contributed to research exploring how different environments and memories influence behavior in a Pyongsong social simulation."
    ],
    "details": [
      [
        [
          "연구 참여",
          "Research participation"
        ],
        [
          "SmartAI Lab 학부연구생으로 시뮬레이션 연구에 참여했습니다. 직접 관찰하기 어려운 사회적 맥락을 에이전트 기반 모델링과 LLM으로 탐구했습니다.",
          "Contributed to simulation research as an undergraduate researcher at SmartAI Lab, using agent-based modeling and LLMs to explore social contexts that are difficult to observe directly."
        ]
      ],
      [
        [
          "본인 기여",
          "My contribution"
        ],
        [
          "초기 시뮬레이션 라이브러리의 에이전트·공간·월드 공통 구조, 기억·성찰·계획 루프, 인터뷰와 이벤트·기억 내보내기 기능을 구현했습니다.",
          "Implemented shared agent, space, and world structures in the initial simulation library, along with memory, reflection, and planning loops, interviews, and event/memory export."
        ]
      ],
      [
        [
          "연구 모형의 범위",
          "Model scope"
        ],
        [
          "인터뷰와 이벤트 기록으로 행동의 맥락을 추적했습니다. 연구용 모형의 결과를 실제 사회의 예측으로 단정하지 않습니다.",
          "Used interviews and event records to trace behavioral context. The research model’s results are not treated as predictions of real society."
        ]
      ]
    ],
    "links": [
      [
        [
          "연구 코드 · 비공개",
          "Research code · Private"
        ],
        "https://github.com/kgr0831/SimulationProject"
      ]
    ],
    "logo": "./assets/icons/soongsil.svg",
    "logoStyle": "light",
    "media": []
  },
  "duduri": {
    "title": [
      "두드리",
      "Duduri"
    ],
    "period": [
      "2026 KOSSCCHTHON · 수상 이후 개선",
      "2026 KOSSCCHTHON · Continued development after the event"
    ],
    "summary": [
      "경험을 자기 PR 문서와 커피챗 기회로 연결했습니다. 연합 경진대회 대상.",
      "Connected experience to self-introductions and coffee chats. Grand prize at a joint university competition."
    ],
    "intro": [
      "대학생이 커피챗·프로젝트 참여로 경험을 나누고, 본인의 자료를 AI 자기 PR 문서로 정리하는 플랫폼입니다.",
      "A platform for university students to share experience through coffee chats and projects, and turn their materials into AI-assisted self-introduction documents."
    ],
    "metric": [
      "대상 · 1위",
      "Grand prize · 1st"
    ],
    "metricLabel": [
      "국민대·숭실대·순천향대 2026 연합 경진대회 KOSSCCHTHON",
      "2026 KOSSCCHTHON · Kookmin, Soongsil, and Soonchunhyang universities"
    ],
    "details": [
      [
        [
          "AI와 연결한 개발 흐름",
          "Development with AI"
        ],
        [
          "짧은 해커톤 일정에서 명세 작성·기능 구현·동작 검증을 연결해 개발에 참여했습니다. 수상 이후에도 생성 데이터의 일관성과 사용자 편집 기능을 개선했습니다.",
          "Connected specification, implementation, and verification with AI during the short hackathon. Continued improving generated-data consistency and user editing after the award."
        ]
      ],
      [
        [
          "오래된 결과의 게시 방지",
          "Preventing outdated publication"
        ],
        [
          "생성 작업·수정 버전·게시 상태를 분리했습니다. 저장 직전에 원본의 변경 여부를 다시 확인하고, 오래된 결과나 충돌한 결과가 게시되지 않도록 막았습니다.",
          "Separated generation jobs, edited versions, and publication state. Recheck the source before saving and prevent outdated or conflicting results from being published."
        ]
      ],
      [
        [
          "사용자가 수정한 내용 보존",
          "Preserving user edits"
        ],
        [
          "수정 가능한 영역에 표시를 두고 필요한 부분만 갱신해 사용자 코드와 레이아웃을 보존했습니다. 실행 환경과 권한을 제한하고, 생성 자료 선택·수정·게시는 사용자가 결정하도록 했습니다.",
          "Marked editable regions and updated only the necessary parts to preserve user code and layout. Isolated execution and limited permissions; users choose source material and decide what to edit and publish."
        ]
      ],
      [
        [
          "복구와 남은 제약",
          "Recovery and remaining limitations"
        ],
        [
          "백그라운드 작업의 처리 권한과 상태를 기록해 중단된 생성을 복구합니다. 무료 서버가 유휴 상태에서 깨어날 때의 첫 응답 지연은 남아 있습니다.",
          "Record background-job ownership and state to recover interrupted generation. The first response can still be delayed when free-tier servers wake from an idle state."
        ]
      ]
    ],
    "links": [
      [
        [
          "서비스 소개 영상",
          "Overview video"
        ],
        "https://www.youtube.com/watch?v=vvsyQIOtiUQ"
      ],
      [
        [
          "코드·설계",
          "Source and design"
        ],
        "https://github.com/kgr0831/KOSSCCHTHON_2026"
      ]
    ],
    "logo": "./assets/icons/dudri.png",
    "logoStyle": "light",
    "media": [
      {
        "src": "./assets/dudri-studio-original.png",
        "caption": [
          "AI 스튜디오 화면",
          "AI studio"
        ],
        "width": 1600,
        "height": 840
      },
      {
        "src": "./assets/dudri-coffeechat.png",
        "caption": [
          "커피챗 화면",
          "Coffee chat"
        ],
        "width": 1600,
        "height": 834
      },
      {
        "src": "./assets/dudri-award.jpg",
        "caption": [
          "2026 KOSSCCHTHON 대상 수상",
          "2026 KOSSCCHTHON grand prize"
        ],
        "width": 649,
        "height": 490
      }
    ]
  },
  "spell": {
    "title": [
      "Spell Thrower",
      "Spell Thrower"
    ],
    "period": [
      "게임잼 · 멀티플레이·매칭 담당",
      "Game jam · Multiplayer and matchmaking"
    ],
    "summary": [
      "1:1 대전의 멀티플레이·매칭·플레이 UI 구현과 인증·재시도 문제 수정.",
      "Built multiplayer, matchmaking, and gameplay UI, fixing authentication and retry issues."
    ],
    "intro": [
      "1:1 대전 게임에서 멀티플레이·매칭·플레이 UI를 담당했습니다. 같은 PC에서 두 빌드를 실행할 때 인증 상태가 겹치는 문제를 발견하고 수정했습니다.",
      "Owned multiplayer, matchmaking, and gameplay UI for a 1:1 game. Found and fixed shared authentication state when running two builds on the same PC."
    ],
    "details": [
      [
        [
          "연결과 복구",
          "Connections and recovery"
        ],
        [
          "같은 PC의 두 빌드가 인증을 공유하지 않도록 프로세스 ID로 익명 인증 프로필을 분리했습니다. 초기화 실패·취소 후 준비 작업을 다시 만들고 나가기 시 세션 참조를 정리했습니다.",
          "Separated anonymous authentication profiles by process ID so two builds on one PC could connect independently. Recreated initialization work after failure or cancellation and cleared session references on exit."
        ]
      ],
      [
        [
          "성과와 남은 과제",
          "Result and remaining work"
        ],
        [
          "매치메이커·Relay 연결을 팀의 게임플레이와 통합했습니다. UnityTLS/Burst 충돌을 피한 UDP 전송은 시제품 선택이며, 공개 배포 전 DTLS 복구가 필요합니다.",
          "Integrated matchmaking and Relay connections with the team’s gameplay. UDP transport was a prototype workaround for a UnityTLS/Burst conflict; DTLS must be restored before public release."
        ]
      ]
    ],
    "links": [
      [
        [
          "멀티플레이 구현 · 비공개",
          "Multiplayer implementation · Private"
        ],
        "https://github.com/kgr0831/GameJam2026/pull/1"
      ],
      [
        [
          "매칭 구현 · 비공개",
          "Matchmaking implementation · Private"
        ],
        "https://github.com/kgr0831/GameJam2026/pull/2"
      ]
    ],
    "logo": "./assets/ui/game.svg",
    "logoStyle": "light",
    "media": []
  },
  "planet": {
    "title": [
      "PlanetGame",
      "PlanetGame"
    ],
    "period": [
      "Unity 3D 전략 게임 · v0.1",
      "Unity 3D strategy game · v0.1"
    ],
    "summary": [
      "은하·카메라·튜토리얼·시네마틱을 하나의 플레이 흐름으로 구성.",
      "Connected galaxy exploration, cameras, tutorials, and cinematics into a playable flow."
    ],
    "intro": [
      "은하를 탐색하며 자원·생산·점령·연구를 진행하는 Unity 3D 전략 게임입니다.",
      "A Unity 3D strategy game about galaxy exploration, resources, production, capture, and research."
    ],
    "details": [
      [
        [
          "본인 구현",
          "My implementation"
        ],
        [
          "v0.1에서 은하 확장·카메라·튜토리얼·시네마틱을 구현해 공간 탐색, 조작, 규칙 학습, 사건 연출을 연결했습니다.",
          "Implemented galaxy expansion, cameras, tutorials, and cinematics in v0.1, connecting exploration, controls, rule learning, and event presentation."
        ]
      ],
      [
        [
          "입력 충돌과 진입 흐름",
          "Input conflicts and onboarding"
        ],
        [
          "UI·메뉴·일시정지 중 카메라 입력을 차단했습니다. 튜토리얼은 한 번에 한 행동을 안내하고, 컷씬 중 게임을 멈추며 건너뛰기·다시 보기를 연결했습니다.",
          "Block camera input during UI interaction, menus, and pauses. Tutorials guide one action at a time; cutscenes pause gameplay and support skipping and replay."
        ]
      ]
    ],
    "links": [
      [
        [
          "프로젝트 코드",
          "Source code"
        ],
        "https://github.com/kgr0831/PlanetGame"
      ],
      [
        [
          "v0.1 구현",
          "v0.1 implementation"
        ],
        "https://github.com/kgr0831/PlanetGame/commit/d1c2f6430e98d31c0ec3b510762b64c16065f504"
      ]
    ],
    "logo": "./assets/ui/game.svg",
    "logoStyle": "light",
    "media": [
      {
        "src": "./assets/planet-concept.jpg",
        "caption": [
          "초기 행성·UI 콘셉트 스케치",
          "Early planet and UI concept sketch"
        ],
        "width": 1531,
        "height": 1449
      }
    ]
  },
  "triniacle": {
    "title": [
      "Unitrio / Triniacle",
      "Unitrio / Triniacle"
    ],
    "period": [
      "5인 팀 · 팀 리더 · Unity",
      "Five-person team · Team lead · Unity"
    ],
    "summary": [
      "팀 리딩과 함께 보스·몬스터·전투 스킬·튜토리얼을 구현했습니다.",
      "Led the team and implemented bosses, monsters, combat skills, and tutorials."
    ],
    "intro": [
      "전투와 탐험을 연결하는 팀 기반 2D 액션 RPG 샌드박스입니다. 게임플레이·렌더링과 팀 리딩을 맡아 기능을 나누어 구현하고 병합했습니다.",
      "A team-built 2D action RPG sandbox combining combat and exploration. Led the team and contributed gameplay and rendering through separately implemented and merged features."
    ],
    "details": [
      [
        [
          "본인 기여",
          "My contribution"
        ],
        [
          "게임플레이·렌더링과 팀 리딩을 맡았습니다. 보스 행동 트리, 중립 몬스터 AI, 전투 스킬과 튜토리얼을 구현하고 팀의 코드와 통합했습니다.",
          "Led the team and contributed gameplay and rendering. Implemented boss behavior trees, neutral-monster AI, combat skills, and tutorials, integrating them into the team codebase."
        ]
      ],
      [
        [
          "보스 스킬의 실행 순서",
          "Boss skill execution order"
        ],
        [
          "스킬 전에 쿨다운을 두면 짧은 스킬에서 다음 행동·애니메이션이 겹치고 이동이 떨렸습니다. 예고 → 애니메이션·공격 → 쿨다운 순으로 바꾸어 행동의 경계를 정리했습니다.",
          "A cooldown before a short skill let subsequent actions and animations overlap, causing movement jitter. Changed the order to telegraph, animation and attack, then cooldown to clarify action boundaries."
        ]
      ]
    ],
    "links": [
      [
        [
          "코드·기여 내역",
          "Source and contributions"
        ],
        "https://github.com/kgr0831/UniTrio-Game-2026"
      ],
      [
        [
          "보스 행동 구현",
          "Boss behavior implementation"
        ],
        "https://github.com/kgr0831/UniTrio-Game-2026/pull/11"
      ],
      [
        [
          "전투 스킬 구현",
          "Combat skill implementation"
        ],
        "https://github.com/kgr0831/UniTrio-Game-2026/pull/17"
      ]
    ],
    "logo": "./assets/icons/triniacle.png",
    "logoStyle": "dark",
    "media": []
  },
  "sprite": {
    "title": [
      "SpriteAIMaker",
      "SpriteAIMaker"
    ],
    "period": [
      "게임용 AI 자산 제작 도구",
      "AI game-asset production tool"
    ],
    "summary": [
      "캐릭터 생성부터 방향별 애니메이션·프레임 정규화·Unity 출력까지 연결.",
      "Connected character generation, directional animation, frame normalization, and Unity export."
    ],
    "intro": [
      "AI로 만든 캐릭터 이미지를 게임에 넣을 때 프레임 위치·크기·방향이 맞지 않는 문제를 줄이는 제작 도구입니다.",
      "A production tool that addresses inconsistent frame alignment, scale, and direction when bringing AI-generated characters into a game."
    ],
    "details": [
      [
        [
          "제작 흐름",
          "Production workflow"
        ],
        [
          "기준 캐릭터를 먼저 확인하고 방향별 움직임을 생성한 뒤 픽셀 편집·시트 조립·Unity 셀 분할로 이어집니다.",
          "Confirm a reference character, generate directional movement, then continue through pixel editing, sheet assembly, and Unity cell slicing."
        ]
      ],
      [
        [
          "프레임 품질과 작업 완료 확인",
          "Frame quality and completion tracking"
        ],
        [
          "중복된 첫 프레임을 제거하고 아래쪽 중앙을 기준으로 위치와 크기를 맞췄습니다. 완성된 픽셀 이미지를 다시 양자화하지 않아 품질 손상을 줄였습니다. 방향별 작업의 완료 상태를 확인해 4방향 스프라이트 시트로 조립합니다.",
          "Removed duplicate first frames and aligned position and scale to the bottom center. Avoided requantizing finished pixel art to preserve quality. Track each direction’s job completion and assemble a four-direction sprite sheet."
        ]
      ]
    ],
    "links": [
      [
        [
          "프로젝트 코드",
          "Source code"
        ],
        "https://github.com/kgr0831/SpriteAIMaker"
      ],
      [
        [
          "문제·수정 기록",
          "Change log"
        ],
        "https://github.com/kgr0831/SpriteAIMaker/blob/master/CHANGELOG.md"
      ]
    ],
    "logo": "./assets/icons/sprite.svg",
    "logoStyle": "light",
    "media": []
  },
  "vfriend": {
    "title": [
      "Virtual Friend",
      "Virtual Friend"
    ],
    "period": [
      "WIP · 개인 프로젝트 · 사업화 구상",
      "WIP · Personal project · Business concept"
    ],
    "summary": [
      "맞장구·끼어들기·기억의 불일치를 찾아, 같은 AI 친구와 이어지는 대화를 연구합니다.",
      "Building continuity with an AI friend by tackling interruptions, turn-taking, and inconsistent memory."
    ],
    "intro": [
      "목소리·외형·기억이 이어지는 AI 친구 서비스입니다. 통화와 채팅을 연결한 앱을 만들고, 자연스러운 대화의 조건을 별도 음성 연구 프로토타입에서 검증하고 있습니다.",
      "An AI companion service built around a consistent voice, appearance, and memory. The app connects calls and chat, while a separate voice research prototype explores what makes conversations feel natural."
    ],
    "details": [
      [
        [
          "발견한 문제 · 빠르기만 해서는 자연스럽지 않은 대화",
          "Problem · Speed alone does not make a natural conversation"
        ],
        [
          "문제를 “빠른 응답” 하나로 보면 놓치는 것이 있었습니다. 맞장구에도 통화가 끊기고, 사용자가 말을 고치면 미리 만든 답이 틀려지며, 듣지 않은 답변이 기억에 남으면 다음 대화가 어긋났습니다. 응답 속도·차례 전환·기억의 일관성을 나눠 다뤘습니다.",
          "Latency alone missed important failures: acknowledgments cut off replies, corrections invalidated prepared answers, and unheard replies distorted later memories. I treated latency, turn-taking, and memory consistency as separate problems."
        ]
      ],
      [
        [
          "실시간 통화와 기억 연결",
          "Real-time calls and connected memory"
        ],
        [
          "로컬 앱에서 자동 말끝 감지, 끼어들기, 캐릭터 목소리의 스트리밍 재생을 구현했습니다. 확정 발화와 재생 완료 답변만 기록하고 통화 기억을 다음 채팅·통화에 전달합니다. 기억 추출은 응답 재생을 막지 않으며, 중단된 작업은 재시작 후 복구합니다.",
          "Implemented automatic turn detection, interruptions, and streaming character voices in the local app. Only confirmed speech and played replies enter the record, with call memories carried into later chats and calls. Memory extraction runs without blocking playback and resumes after interruption."
        ]
      ],
      [
        [
          "계정별 기록과 이미지 생성",
          "Per-account records and image generation"
        ],
        [
          "기록·설정·초안을 계정별 서버 저장소로 옮기고, 캐릭터 이미지 후보를 생성·비교·선택하도록 구현했습니다. 생성 실패 시 재시도와 진행 상태 복원을 포함합니다. 관련 기능은 모의 외부 API를 사용하는 자동 검사로 검증했습니다.",
          "Moved records, settings, and drafts to per-account server storage. Added generation, comparison, and selection of character images, with retries and progress recovery. Automated checks use mock external providers."
        ]
      ],
      [
        [
          "음성 연구 · 맞장구와 끼어들기 구분",
          "Voice research · Acknowledgments versus interruptions"
        ],
        [
          "“응·어”는 재생을 유지하고, “잠깐·그만”은 생성·합성·재생을 취소하도록 구현했습니다. 짧은 말이 긴 문장으로 확장되면 전체 입력을 보존해 차례를 넘깁니다. 캐릭터도 사용자의 긴 발화 중 짧게 반응하되 듣기를 끝내지 않습니다. 2026.10.25의 실제 API·텍스트 입력 브라우저 기록에서 맞장구·중단·긴 발화 시나리오를 확인했습니다. 자막 규칙 기반의 로컬 연구이며, 사람의 마이크와 억양까지 검증된 완성형 통화는 아닙니다.",
          "Implemented playback preservation for “mm-hm,” cancellation for “wait/stop,” and turn transfer when a short fragment grows into a sentence. The character can also react briefly while still listening. Recorded browser checks on October 25 used real APIs and text input for acknowledgment, stop, and long-utterance scenarios. This local research uses transcript rules; human microphone input and prosody still need evaluation."
        ]
      ],
      [
        [
          "기술적 챌린지 · 먼저 준비하고 안전하게 취소",
          "Technical challenge · Prepare early and cancel safely"
        ],
        [
          "중간 자막으로 답변을 미리 준비하되 최종 발화와 입력이 일치할 때만 재사용합니다. 달라지면 기존 생성을 취소하고 최종 입력으로 새 답을 만듭니다. 아직 시작하지 않은 추임새보다 본답을 우선하며, 생성 시작·음성 준비·실제 재생 예약을 따로 계측합니다. 현재 검증은 정규화한 입력의 일치 여부를 보는 방식으로, 학습형 라우터나 의미 기반 답변 비교는 후속 과제입니다.",
          "Prepare a draft from partial transcripts and reuse it only when the normalized final input matches. Otherwise, cancel and regenerate. Prioritize the main answer over fillers that have not started, and measure generation, audio readiness, and playback scheduling separately. Current validation checks input equality; a trained router and semantic answer comparison remain future work."
        ]
      ],
      [
        [
          "실험 결과 · 서로 다른 지연을 구분",
          "Experiment · Keep latency measurements distinct"
        ],
        [
          "텍스트 입력을 사용한 3개 경로의 각 1회 시험에서, 최종 자막 수신부터 본답 재생 예약까지 2.063초·1.359초·1.893초를 기록했습니다. 음성 인식과 실제 스피커 출력은 제외되며, 같은 조건의 전후 비교가 아닙니다. 짧은 추임새의 속도는 본답 속도와 구분합니다. 잘게 나눈 음성의 억양 단절도 발견해 문장 단위 합성을 실험했습니다.",
          "One text-input trial per path recorded 2.063s, 1.359s, and 1.893s from final-transcript receipt to main-audio scheduling. These exclude recognition and physical speaker output and are not a controlled before/after comparison. Quick fillers are measured separately from the answer. I also tested sentence grouping after tiny audio chunks broke intonation."
        ]
      ],
      [
        [
          "앱과 연구 데모의 범위 · 남은 과제",
          "App and research scope · Remaining work"
        ],
        [
          "기존 앱에는 계정별 통화·채팅 기억이 연결돼 있지만, 새 음성 연구 데모는 세션 문맥과 수동 테스트 기억을 사용하며 계정 기억에는 아직 연결하지 않았습니다. 초기 앱의 실제 API·합성 마이크 입력 1회 시험은 첫 음성 3.48초였고, 0.5초 목표는 미달입니다. 다른 조건의 후속 실험과 속도 개선률로 비교하지 않습니다. 실제 마이크·장시간 통화, 의미 기반 차례 판단, 로컬 LoRA를 통한 외형 일관성은 검증·연구 과제입니다.",
          "The main app connects account-level call and chat memory. The new voice research demo uses session context and manually entered test memories and is not yet connected to account memory. An earlier app trial with real APIs and synthetic microphone input recorded 3.48s to first audio; the 0.5s target remains unmet. Its different conditions do not support a speedup claim against later trials. Human microphone use, long calls, semantic turn decisions, and LoRA-based visual consistency remain open."
        ]
      ],
      [
        [
          "사업화 가설",
          "Business hypothesis"
        ],
        [
          "캐릭터의 일관성과 대화 품질이 재방문 이유가 될 수 있다는 가설을 검증할 계획입니다. 반복 사용, 선호 캐릭터, 음성 경험, 운영 비용과 지불 의향을 함께 살펴봅니다.",
          "Plan to test whether character consistency and conversation quality encourage return visits, examining repeat use, character preferences, voice experience, operating costs, and willingness to pay."
        ]
      ]
    ],
    "links": [
      [
        [
          "진행 코드 · 비공개",
          "Work-in-progress code · Private"
        ],
        "https://github.com/kgr0831/vfriend"
      ]
    ],
    "logo": "./assets/icons/vfriend.svg",
    "logoStyle": "light",
    "media": [
      {
        "src": "./assets/vfriend-voice-lab.png",
        "caption": [
          "로컬 음성 연구 화면 · 정해진 테스트 문장으로 맞장구·중단·긴 발화를 검사",
          "Local voice research prototype · Scripted checks for acknowledgment, interruption, and long utterances"
        ],
        "width": 1280,
        "height": 1298
      },
      {
        "src": "./assets/vfriend-star-mender.png",
        "caption": [
          "캐릭터 프로토타입 일러스트",
          "Character prototype illustration"
        ],
        "width": 1024,
        "height": 1024
      },
      {
        "src": "./assets/vfriend-night-bookseller.png",
        "caption": [
          "캐릭터 프로토타입 일러스트",
          "Character prototype illustration"
        ],
        "width": 1024,
        "height": 1024
      }
    ]
  }
};
