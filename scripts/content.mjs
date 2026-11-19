export const email = 'garam@moai.co';
export const projects = [
 {id:'moai',name:'MOAI',page:3,image:null,code:null,
  ko:{category:'AX · 업무 데이터',period:'2026.09–현재',role:'AX Engineer Intern',summary:'필터가 바뀌어도 결과가 뒤섞이지 않게.',
   lead:'실제 업무에서 사용하는 관리자 기능을 개선했습니다.',problem:'검색 조건을 바꿨는데 이전 요청의 결과가 늦게 도착해 목록을 덮었습니다. 통계와 목록의 업무 상태 분류도 달랐습니다.',scope:'검색·필터·페이지네이션 구현, 집계 기준과 응답 처리 개선.',
   decisions:[['최신 요청만 반영','이전 조건으로 보낸 요청은 늦게 도착해도 현재 목록을 바꾸지 않습니다.'],['전체 집계와 현재 목록 분리','통계는 전체 업무, 목록은 현재 필터를 기준으로 계산합니다. 진행 중 업무도 일관되게 집계합니다.'],['오류를 구분','날짜 오류·대상 누락·처리 실패를 나눠 다음 행동을 판단할 수 있게 했습니다.']],
   result:'관리자 기능 PR 병합',evidence:'관리자 PR #898 · 비공개 저장소',note:'사내 코드·운영 화면을 제외하고 처리 원리를 정리했습니다.',decisionTitle:'도착한 순서보다, 현재의 선택.'},
  en:{category:'AX · Operational data',period:'Sep 2026–present',role:'AX Engineer Intern',summary:'Keep the current view consistent as filters change.',
   lead:'Improved admin features used in day-to-day operations.',problem:'A response from an earlier filter could arrive late and overwrite the current list. Aggregate counts and the list also classified task states differently.',scope:'Task search, filters, pagination, aggregate counts and response handling.',
   decisions:[['Accept only the current request','Responses for an earlier query cannot replace results for the current selection.'],['Separate totals from filtered results','Aggregate counts describe all tasks. The list follows the active filter. In-progress tasks use consistent classification.'],['Distinguish failure causes','Separate invalid dates, missing targets and processing failures so users can choose what to do next.']],
   result:'Admin feature PR merged',evidence:'Admin PR #898 · Private repository',note:'Internal code and screens are omitted; the diagrams explain the approach.',decisionTitle:'The current choice comes first.'}
 },
 {id:'eum',name:'EUM',page:5,image:'eum-whiteboard.png',code:'https://github.com/kgr0831/EUM2',video:'https://www.youtube.com/watch?v=Pnjw9WitAXg',
  ko:{category:'실시간 협업 · 그래픽스',period:'2025.12–2026.01',role:'5인 팀 · 화이트보드 풀스택',summary:'화상회의 중에도 자연스럽게 함께 그리기.',
   lead:'AI 번역 화상회의와 실시간 화이트보드를 함께 쓰는 협업 서비스입니다.',problem:'영상통화와 드로잉을 함께 쓰면 화면 반응이 느려지고 선이 꺾였습니다. 렌더링·입력·전송을 나눠 원인을 다뤘습니다.',scope:'드로잉 렌더러, 실시간 동기화, 포스트잇과 권한 등 화이트보드 기능.',
   decisions:[['렌더링 전환','PixiJS v8·WebGPU로 옮기고 미지원 환경에는 WebGL 폴백을 적용했습니다.'],['입력과 표시 보정','One Euro Filter로 떨림을 줄이고 Bézier 보간으로 드로잉의 꺾임을 완화했습니다.'],['전송량 조절','Douglas–Peucker로 좌표를 단순화하고 50ms 단위로 묶어 전송했습니다.']],
   result:'평균 23.7에서 58.7 FPS',evidence:'프로젝트 당시 평균 · 장비·객체 수 미기록',note:'동시 편집은 나중 변경을 반영하며 자동 병합은 지원하지 않습니다.',decisionTitle:'렌더링, 입력, 전송을 따로 다루다.'},
  en:{category:'Real-time collaboration · Graphics',period:'Dec 2025–Jan 2026',role:'Five-person team · Whiteboard full-stack',summary:'Draw together while the conversation keeps moving.',
   lead:'A collaboration service combining AI-translated video meetings and a real-time whiteboard.',problem:'Drawing slowed down and strokes became uneven during video calls. I separated the rendering, input and transmission problems.',scope:'The drawing renderer, real-time synchronization, notes, permissions and other whiteboard features.',
   decisions:[['Replace the renderer','Moved to PixiJS v8 and WebGPU, with WebGL fallback for unsupported environments.'],['Improve input and display','Used a One Euro Filter for jitter and Bézier interpolation for smoother strokes.'],['Reduce transmitted data','Simplified coordinates with Douglas–Peucker and batched updates every 50ms.']],
   result:'Average 23.7 to 58.7 FPS',evidence:'Original project measurement · Hardware and object count not recorded',note:'Concurrent edits use the latest change; automatic merging is not implemented.',decisionTitle:'Treat rendering, input and transport separately.'}
 },
 {id:'dudri',name:'두드리',enName:'Dudri',page:7,image:'dudri-studio.png',code:'https://github.com/kgr0831/KOSSCCHTHON_2026',video:'https://www.youtube.com/watch?v=vvsyQIOtiUQ',
  ko:{category:'AI 제품 · 경험 정리와 교류',period:'2026',role:'AI 제품 개발 · 해커톤 및 후속 개선',summary:'화면에서 편집해도, 직접 고친 코드는 남게.',
   lead:'대학생의 경험을 문서로 정리하고 커피챗·프로젝트로 연결하는 플랫폼입니다.',problem:'AI의 생성 결과와 사용자 편집이 같은 흐름에 섞이면 오래된 결과가 반영되거나 직접 고친 코드가 사라질 수 있습니다.',scope:'명세·구현·검증에 참여하고, 수상 후 AI 스튜디오의 데이터 일관성과 편집 경험을 개선했습니다.',
   decisions:[['생성·버전·게시 분리','작업 실행, 문서 저장, 공개 여부를 별도 상태로 관리합니다.'],['편집 내용 보존','저장 직전 원본 변경 여부를 확인하고 바뀐 영역만 갱신해 사용자 코드와 레이아웃을 보존합니다.'],['실행 범위 제한','생성 코드의 실행 영역을 격리하고 접근 가능한 자원을 제한합니다.']],
   result:'2026 KOSSCCHTHON 대상 · 1위',evidence:'국민대·숭실대·순천향대 연합 경진대회',note:'편집·안정성 개선은 수상 이후 작업을 포함합니다. 무료 서버의 첫 응답 지연은 남아 있습니다.',decisionTitle:'AI의 생성과 사용자의 결정을 분리하다.'},
  en:{category:'AI product · Experience and community',period:'2026',role:'AI product development · Hackathon and follow-up',summary:'Edit visually without overwriting hand-written code.',
   lead:'A platform that helps university students turn their experience into profiles, coffee chats and projects.',problem:'When AI output and user edits share the same lifecycle, stale results can be published or hand-edited code can be overwritten.',scope:'Contributed to specification, implementation and verification. Improved the AI studio’s consistency and editing experience after the competition.',
   decisions:[['Separate generation, versions and publication','Model execution, saved documents and publication as separate states.'],['Preserve user edits','Check source changes before saving and update only changed regions, preserving user code and layout.'],['Restrict generated code','Isolate execution and limit which resources generated code can access.']],
   result:'1st prize · 2026 KOSSCCHTHON',evidence:'Joint competition of Kookmin, Soongsil and Soonchunhyang universities',note:'Editing and reliability changes include post-award work. Initial response delays on the free server remain.',decisionTitle:'Separate AI generation from the user’s decision.'}
 },
 {
  id: 'on-your-mark', name: 'On Your Mark', page: 9, image: 'on-your-mark-hud.png',
  trailer: 'assets/work/on-your-mark-trailer.mp4', poster: 'on-your-mark-still.jpg',
  code: 'https://github.com/Architecture-UnityAIGameJam2026/UnityAIGameJam2026',
  validation: 'https://github.com/Architecture-UnityAIGameJam2026/UnityAIGameJam2026/commit/f7f915260cd932a2b654f19bca8b59d3c0c25cee',
  release: 'https://github.com/Architecture-UnityAIGameJam2026/UnityAIGameJam2026/releases/tag/build-2026-11-19-level-flow',
  ko: {
   category: 'Unity AI 게임잼 · 24시간 AI 네이티브 개발', period: '2026.11', role: 'Architecture 4인 팀 · 개발 전반 담당',
   imageAlt: 'SenseLink HUD 시안. 왼쪽 위에는 체력, 오른쪽 위에는 지도, 아래에는 파츠와 탄약이 보인다.',
   lead: '우주 잔해를 건너던 두 파일럿의 슈트가 고장납니다. 내 화면에 동료의 정보가 뜨고, 내가 누른 키로 동료의 스킬이 발동합니다.',
   problem: '4명이 24시간 동안 기획안, 그래픽, 사운드, 코드를 모두 AI로 생성해 플레이 가능한 협동 게임을 만드는 데 도전했습니다. 생성한 3D 메시에서는 모서리와 파츠 경계가 뭉개져, 그대로 씬에 넣으면 물체의 형태를 알아보기 어려웠습니다.',
   scope: '개발 전반을 맡았습니다. AI로 만든 에셋을 Unity HDRP 아레나에 통합하고, 동료 AI·팀 무전·교차 HUD를 타이틀부터 협동 미션까지 이어지는 흐름으로 연결했습니다.',
   decisionTitle: '형태가 뭉개진 3D 메시를 파츠 단위로 다시 만들다',
   decisions: [
    ['재생성 범위를 파츠로 좁히기', '여러 메시 생성 방식을 비교한 뒤 형태가 무너진 부분만 다시 생성했습니다. 각 파츠를 확인하고 쓸 수 있는 것부터 조립했습니다.'],
    ['모서리와 표면 복원', '바리케이드에는 고밀도 메시를 복원하고 다른 메시를 다듬을 때는 모서리를 보존했습니다. 2K·4K 노멀 맵과 컬러 텍스처로 표면 디테일을 되살렸습니다.'],
    ['플레이 씬에서 재사용', '씬의 배치, 에셋 참조, 충돌체를 유지한 채 모델을 교체했습니다. Unity 검증을 통과한 프리팹은 64개이며, 그중 52개에 노멀 맵을 적용했습니다.']
   ],
   result: 'Windows 협동 데모 공개', evidence: '2026년 11월 19일 공개 빌드 · 4개 구역, 12개 웨이브',
   note: '혼자서는 AI 동료와 출격하고, 같은 네트워크의 두 플레이어는 6자리 방 코드로 합류합니다.',
   profile: '4인 팀이 24시간 동안 기획·그래픽·사운드·코드를 모두 AI로 생성해 만든 협동 게임입니다. 개발 전반을 맡아 뭉개진 메시를 파츠별로 재생성하고 Unity에서 프리팹 64개를 검증했습니다. 동료 AI·무전·교차 HUD도 플레이 흐름에 통합했습니다.'
  },
  en: {
   category: 'Unity AI Game Jam · 24-hour AI-native development', period: 'Nov 2026', role: 'Programmer across game systems · Team Architecture (4 people)',
   imageAlt: 'SenseLink HUD prototype with health at the top left, a map at the top right, and parts and ammunition below.',
   lead: 'Two pilots cross a field of space debris. When their suits malfunction, each pilot sees the other’s instruments and gains control of the other’s skill.',
   problem: 'Our four-person team gave itself 24 hours to build a playable co-op game using AI to generate the design, art, sound and code. Generated meshes lost hard edges and distinct parts, making objects difficult to read in the scene.',
   scope: 'I worked across development, integrating generated assets into the Unity HDRP arena and connecting the companion AI, team radio and shared HUD from the title screen through the co-op mission.',
   decisionTitle: 'Rebuilding generated meshes one part at a time',
   decisions: [
    ['Regenerate individual parts', 'I compared several mesh generation methods, regenerated parts that had lost their shape, then checked each piece before assembling the model.'],
    ['Restore edges and surface detail', 'I restored a higher-density barricade mesh, preserved creases on the remaining meshes, and brought back 2K and 4K normal and color textures.'],
    ['Keep the scene intact', 'I preserved scene placement, asset references and colliders when swapping the models. All 64 prefabs passed Unity validation, including 52 with normal maps.']
   ],
   result: 'Playable Windows co-op demo', evidence: 'November 19, 2026 build · Four zones and 12 waves',
   note: 'Play solo with an AI pilot, or join a second player on the same network using a six-character room code.',
   profile: 'In 24 hours, our four-person team built a co-op game using AI to generate the design, art, sound and code. I regenerated malformed meshes part by part, validated 64 Unity prefabs and integrated the companion AI, radio and shared HUD.'
  }
 }
];
export const portfolioPageCount = 4 + projects.length * 2;
export const career = [
 {date:['2026.09–현재','Sep 2026–present'],name:['MOAI','MOAI'],role:['AX Engineer Intern','AX Engineer Intern']},
 {date:['2026.04–08','Apr–Aug 2026'],name:['숭실평화통일 연구원 · SmartAI Lab','Soongsil Institute for Peace and Unification · SmartAI Lab'],role:['학부연구생','Undergraduate Researcher']},
 {date:['2026.03–현재','Mar 2026–present'],name:['숭실대학교','Soongsil University'],role:['AI소프트웨어학부','AI Software']},
 {date:['2025.09–2026.01','Sep 2025–Jan 2026'],name:['크래프톤 정글','KRAFTON Jungle'],role:['SW-AI Lab 11기','SW-AI Lab · 11th cohort']},
 {date:['2023.03–2026.02','Mar 2023–Feb 2026'],name:['한국게임과학고등학교','Korea Game Science High School'],role:['컴퓨터게임개발과','Computer Game Development']}
];
export const labels = {
 ko:{work:'작업',about:'소개',contact:'연락',portfolio:'포트폴리오',close:'닫기',open:'자세히 보기',tabs:['개요','결정','결과'],problem:'문제',scope:'담당',code:'코드',video:'발표 영상',evidence:'근거',selected:'대표 프로젝트',role:'Problem Solver',aboutText:'게임을 만들며 시작했습니다. 지금은 AI가 쓰이는 제품을 만듭니다.',copy:'이메일 복사',copied:'복사했습니다.',copyFail:'주소를 직접 선택해 주세요.',cv:'CV',pdf:'PDF 다운로드',site:'사이트',print:'인쇄',experience:'경력',education:'학력·교육',skills:'기술',projects:'대표 프로젝트',index:'목차',name:'김가람'},
 en:{work:'Work',about:'About',contact:'Contact',portfolio:'Portfolio',close:'Close',open:'View case',tabs:['Overview','Decisions','Results'],problem:'Problem',scope:'My role',code:'Code',video:'Presentation',evidence:'Evidence',selected:'Selected work',role:'Problem Solver',aboutText:'I started with games. Today, I build products that put AI to use.',copy:'Copy email',copied:'Email copied.',copyFail:'Please select the address to copy it.',cv:'CV',pdf:'Download PDF',site:'Website',print:'Print',experience:'Experience',education:'Education',skills:'Skills',projects:'Selected projects',index:'Contents',name:'Garam Kim'}
};

export const additionalWork = {
  ko: {
    title: '다른 프로젝트 기여',
    items: [
      {
        name: '숭실대 시간표 데모',
        url: 'https://github.com/kgr0831/openSourceProject/tree/main/timetable-demo',
        description: '2026년 두 학기 4,722개 분반을 학기·학과별로 선택할 수 있게 했습니다. 시간이 미등록된 108개 분반은 목록에 남기고 추천에서 제외했습니다.',
      },
      {
        name: 'BeeRFriend 채용 페이지',
        url: 'https://beerfriend.co/apply.html',
        description: '지원자가 이력서와 포트폴리오를 각각 링크나 파일로 낼 수 있게 지원서를 개편했습니다. 자료가 빠지면 제출 전에 해당 입력란에 표시합니다.',
      },
    ],
  },
  en: {
    title: 'Other project contributions',
    items: [
      {
        name: 'Soongsil timetable demo',
        url: 'https://github.com/kgr0831/openSourceProject/tree/main/timetable-demo',
        description: 'I made 4,722 class sections from both 2026 terms selectable by term and department. The 108 sections without meeting times stay in the catalog and are excluded from recommendations.',
      },
      {
        name: 'BeeRFriend careers page',
        url: 'https://beerfriend.co/apply.html',
        description: 'I updated the application form so applicants can provide a link or upload a file for each of their CV and portfolio. It flags missing material before submission.',
      },
    ],
  },
};

export function additionalWorkHtml(lang) {
  const { title, items } = additionalWork[lang];
  const entries = items.map(({ name, url, description }) =>
    `<li><a href="${url}">${name}</a><p>${description}</p></li>`
  ).join('');
  return `<section class="additional-work"><h3>${title}</h3><ul>${entries}</ul></section>`;
}
