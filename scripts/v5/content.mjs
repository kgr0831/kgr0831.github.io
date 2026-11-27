// Korean site and CV copy. Facts follow the portfolio (Figma page "Portfolio v4 · Problem Solver"),
// which was checked against the project sources. Change the portfolio first, then this file.

export const person = {
  name: '김가람',
  role: 'Problem Solver',
  field: 'AX · AI Native',
  tagline: '문제를 발견하고 필요한 기술로 해결합니다',
  intro: '게임을 만들며 시작했습니다. 지금은 AI가 쓰이는 제품을 만듭니다.',
  now: 'MOAI에서 AX Engineer Intern으로 사내 AI 업무 도구를 만들고 BeeRFriend의 CPO로 AI 컴패니언 서비스 VFriend를 만듭니다.',
  email: 'garam@moai.co',
  links: [
    ['GitHub', 'https://github.com/kgr0831', 'github.com/kgr0831'],
    ['LinkedIn', 'https://www.linkedin.com/in/kimgalam0831/', 'linkedin.com/in/kimgalam0831'],
    ['기술 블로그', 'https://kgr0831.tistory.com/', 'kgr0831.tistory.com'],
  ],
};

export const docs = {
  portfolio: 'portfolio.pdf', // also copied to portfolio/Garam_Kim_Portfolio.pdf
  cvPdf: 'Garam_Kim_CV.pdf', // also copied to CV.pdf
  cvPage: 'cv/',
};

export const workflow = [
  ['Problem Definition', '해결할 문제와 기준을 먼저 정의'],
  ['Interview', '현업에서 막히는 일부터 질문'],
  ['MVP', 'AI 에이전트와 빠른 구현'],
  ['Iteration', '써 본 사람의 반응으로 수정'],
  ['Adoption', '실제 업무와 서비스에 적용'],
];

// home cards: problem and result lines are the ones on the portfolio's contents page
export const projects = [
  { slug: 'moai', name: 'MOAI', sub: '사내 AI 업무 자동화', opener: '04', when: '2026.09 – 현재 · AX Engineer Intern',
    problem: '영업 담당자가 메일 한 통을 쓰기 전에 흩어진 자료를 다시 찾음',
    result: 'AI가 후보와 근거, 초안을 준비하고 담당자가 승인하는 메일 도구. 영업팀이 실제 발송에 사용. 사내 도구 넷을 더 만듦',
    image: { src: 'moai-envelope.jpg', alt: '편지 봉투 그림', caption: '회사 내부 화면과 실제 수치는 싣지 않았습니다' } },
  { slug: 'vfriend', name: 'VFriend', sub: 'AI 컴패니언 서비스', opener: '10', when: '2026.10 – 현재 · BeeRFriend CPO',
    problem: '엔딩 뒤에도 캐릭터를 만나고 싶은 팬, 후속 콘텐츠를 만들 여력이 없는 원작사(사업 가설)',
    result: '한 캐릭터와 채팅하다 통화로 이어지는 서비스. 팀의 오리지널 캐릭터로 이미지 생성, 통화, 기억 선별 시스템을 개발해 배포',
    image: { src: 'vf-discover.jpg', alt: 'VFriend 탐색 화면', caption: '실제 서비스의 탐색 화면' } },
  { slug: 'eum', name: 'EUM', sub: 'AI 네이티브 협업 워크스페이스', opener: '19', when: '2025.12 – 2026.01 · 크래프톤 정글 5인 팀',
    problem: '선이 쌓일수록 느려지는 공동 화이트보드',
    result: '낯선 그래픽스 기술을 AI와 배우며 구조를 재설계. 당시 기록한 평균 23.7 → 58.7 FPS',
    image: { src: 'eum-board.jpg', alt: 'EUM 회의 화면의 공동 화이트보드', caption: '회의 화면 안의 공동 화이트보드' } },
  { slug: 'on-your-mark', name: 'On Your Mark', sub: 'AI 네이티브로 만든 2인 협동 게임', opener: '24', when: '2026.11 · Unity AI Game Jam 4인 팀',
    problem: '네 명이 24시간 안에 모델, 음성, 코드를 한 장면으로 맞추기',
    result: '기획부터 빌드까지 AI를 쓴 제작 과정과 게임 속 AI 무전. Unity AI Game Jam 팀 수상',
    image: { src: 'oym-hud.jpg', alt: 'On Your Mark 플레이 화면', caption: '두 파일럿의 HUD가 뒤바뀌는 실제 플레이 화면' } },
  { slug: 'remnents-of-light', name: 'Remnents of Light', sub: 'AI 네이티브 게임 개발 워크플로우', opener: '30', when: '2026.07 – 09 · 맵 제작에 팀원 참여',
    problem: '노트북 한 대로는 밖에서 떠오른 수정을 시험할 수 없음',
    result: 'Discord 명령으로 수정, 실행, 검증을 반복하는 원격 에이전트 루프. 첫 스테이지 데모 구현, 플레이 영상 공개',
    image: { src: 'rol-laser.jpg', alt: 'Remnents of Light 플레이 화면', caption: '보스의 레이저를 피하는 실제 플레이 화면' } },
  { slug: 'dudri', name: '두드리', sub: 'AI 네이티브 + 애자일 워크플로우', opener: '35', when: '2026.09 · KOSSCCHTHON 2026 5인 팀',
    problem: '전공과 학년만으로는 알 수 없는 동문의 실제 경험',
    result: '혼자서 AI와 구현하고 팀원 QA로 다듬어 하루 만에 완성. KOSSCCHTHON 2026 팀 대상',
    image: { src: 'dudri-coffee.jpg', alt: '두드리 커피챗 약속 화면', caption: '실제 커피챗 약속 화면' } },
];

export const career = [
  ['2026.10 – 현재', 'BeeRFriend · CPO', '3인 창업 · 제품, 개발, 사업 구상'],
  ['2026.09 – 현재', 'MOAI · AX Engineer Intern', '사내 AI 업무 도구 개발'],
  ['2026.04 – 08', '숭실평화통일 연구원 · SmartAI Lab', '학부연구생'],
  ['2026.03 – 현재', '숭실대학교 AI소프트웨어학부', '1학년 재학'],
  ['2025.09 – 2026.01', '크래프톤 정글 SW-AI Lab 11기', '협업 서비스 EUM 팀 프로젝트'],
  ['2023.03 – 2026.02', '한국게임과학고등학교', '컴퓨터게임개발과 수석 졸업'],
];

export const awards = [
  ['2026.11', 'Unity AI Game Jam', '‘AI는 거들 뿐상’ · 팀 수상'],
  ['2026.09', 'KOSSCCHTHON 2026', '대상 · 팀 수상'],
];

export const skills = [
  ['웹·서버', 'Next.js · Node.js · NestJS · FastAPI · PostgreSQL'],
  ['실시간·그래픽', 'WebSocket · Socket.IO · PixiJS'],
  ['게임', 'Unity 6'],
  ['AI 개발 도구', 'Claude Code · Codex CLI · MCP'],
];

export const otherWork = [
  ['겜마루 웹 · 데일리 브리프', '2026.09 – 10', '동아리 소개와 작품 아카이브, 보고서 구독', '아카이브와 계정 흐름, Discord 알림'],
  ['Abstraction Bot', '2026.08', 'Discord 대화를 요약해 Notion에 정리하는 도구', '에이전트 연동과 배포, 웹 콘솔'],
  ['무인 스크린골프 CMS', '2026.08', '매장 운영과 예약, 정산을 다루는 관리자 웹', '정산과 거래 대조, 운영 작업 자동화'],
  ['PaperBridge', '2026.08 – 09', '논문 읽기와 AI 질의를 잇는 연구 워크스페이스', '백엔드 동시 처리, AI 계정 연결, 읽기 화면 개선'],
  ['HELIX', '2026.05 – 06', '여러 LLM의 토론과 검증을 조율하는 플랫폼', '개인 프로젝트 · 서비스 계층과 프런트엔드, 배포'],
  ['평성시 사회 시뮬레이션', '2026.04 – 08', 'SmartAI Lab의 에이전트 사회 시뮬레이션', '시뮬레이션 라이브러리 초기 구현'],
  ['Triniacle', '2026.03 – 06', '5인 팀의 2D 탑다운 액션 RPG', '팀 리더 · 튜토리얼, 전투 스킬, 몬스터 AI 구현'],
  ['Spell Thrower', '2026.08', '게임잼에서 만든 카드 전투 게임', '멀티플레이 시스템과 덱 구성 UI'],
];

// contributions the previous site listed (kept with their original wording)
export const contributions = [
  ['숭실대 시간표 데모', '2026년 두 학기 4,722개 분반을 학기·학과별로 선택할 수 있게 했습니다. 시간이 미등록된 108개 분반은 목록에 남기고 추천에서 제외했습니다.', 'https://github.com/kgr0831/openSourceProject/tree/main/timetable-demo'],
  ['BeeRFriend 채용 페이지', '지원자가 이력서와 포트폴리오를 각각 링크나 파일로 낼 수 있게 지원서를 개편했습니다. 자료가 빠지면 제출 전에 해당 입력란에 표시합니다.', 'https://beerfriend.co/apply.html'],
];

// one-page CV
export const cv = {
  summary: '해결할 문제와 기준을 먼저 정의하고 현업에서 막히는 일을 인터뷰로 확인합니다. AI 에이전트로 MVP를 빠르게 만들고 써 본 사람의 반응으로 고쳐 실제 업무와 서비스에 적용합니다.',
  work: [
    { when: '2026.10 – 현재', org: 'BeeRFriend', role: 'CPO · 3인 창업팀의 제품, 개발, 사업 구상', head: 'VFriend · 캐릭터와 채팅하고 통화하는 AI 컴패니언 서비스. 웹과 음성 MVP 배포, 원작사 IP를 들여오는 B2B2C 구상(제휴 전 가설)',
      items: [
        '기준 시트로 캐릭터 외형을 맞추고 품질 등급별로 생성 경로를 나눔. 고급 등급은 다섯 항목을 검사해 반려되면 한 번 다시 그림',
        '통화의 차례를 인식된 말로 판단하고 구간별 지연을 재서 고침. 일대일 통화의 새 엔진에서 추임새 시작을 0.92초에서 0.32초로 당김',
        '사용자가 실제로 한 말에서만 기억을 만들고 관련성, 중요도, 최근성으로 최대 30개를 골라 씀',
      ] },
    { when: '2026.09 – 현재', org: 'MOAI', role: 'AX Engineer Intern', head: '직원 인터뷰에서 시작한 사내 AI 업무 자동화',
      items: [
        '영업 메일 자동화를 제안해 구현. AI가 후보와 근거, 초안을 준비하고 담당자가 승인하며 영업팀이 실제 발송에 사용',
        '사내 문서 초안 작성을 설치형 도우미 대신 직원이 쓰던 AI 도구와 회사 MCP 연결로 바꿔 배포',
        '후속 업무 통계 기준 정리, 영업 리드 챗봇과 AI 사용량 수집 시제품',
      ] },
    { when: '2026.04 – 08', org: '숭실평화통일 연구원 SmartAI Lab', role: '학부연구생', head: '평성시 에이전트 사회 시뮬레이션 라이브러리 초기 구현', items: [] },
  ],
  projects: [
    { when: '2025.12 – 2026.01', name: 'EUM', role: '크래프톤 정글 5인 팀 · 공동 화이트보드의 프런트엔드와 서버',
      desc: '느려지는 원인을 저장, 전송, 렌더링으로 나눠 팀과 합의하고 고침. AI 조사 보고서의 추천을 직접 시험해 필기 보정을 조합하고 벡터 객체와 쿼드트리로 재설계. 당시 기록한 평균 23.7 → 58.7 FPS' },
    { when: '2026.11', name: 'On Your Mark', role: 'Unity AI Game Jam 4인 팀 · 렌더링, 아트, 게임 속 AI, 통합',
      desc: '24시간 동안 기획부터 빌드까지 AI로 제작. 무전 AI는 미리 만든 대사 가운데 하나만 고르게 설계하고 음성 300개를 모두 다시 받아써 대본과 대조. ‘AI는 거들 뿐상’ 팀 수상' },
    { when: '2026.07 – 09', name: 'Remnents of Light', role: '2D 액션 게임 · 전투, 연출, 원격 개발 도구 · 맵 제작에 팀원 참여',
      desc: 'Discord 명령으로 구현, 실행, 영상 판정을 반복하는 원격 에이전트 루프를 만들고 명령별 권한과 사람 승인을 나눔. 운영하며 생긴 멈춤, 유실, 재실행 문제를 원인까지 찾아 고침' },
    { when: '2026.09', name: '두드리', role: 'KOSSCCHTHON 2026 5인 팀 · MVP 단독 개발',
      desc: '명세와 구현을 AI와 혼자 맡고 팀원 QA와 Figma 피드백을 반영. 저장소를 만든 뒤 15시간 만에 MVP를 합치고 자동 검사 91개 통과. 대상 · 팀 수상' },
  ],
};
