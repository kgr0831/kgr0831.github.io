import {createSite,banner} from './site-template.mjs';
import {conceptOptions,conceptComparison} from './concept-template.mjs';
import {createPortfolio,createCV} from './document-template.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const write=(file,text)=>{mkdirSync(path.dirname(path.join(root,file)),{recursive:true});writeFileSync(path.join(root,file),text.trimEnd()+'\n','utf8')};
for(const lang of ['ko','en']){
 const en=lang==='en';
 const options=conceptOptions(lang,'motion',{base:en?'../':'',portfolioPdf:'portfolio/'+(en?'Garam_Kim_Portfolio_EN.pdf':'Garam_Kim_Portfolio.pdf'),production:true});
 write(en?'en/index.html':'index.html',createSite(lang,options));
 write(en?'portfolio/en/index.html':'portfolio/index.html',createPortfolio(lang,{concept:'motion'}));
 write(en?'cv/en/index.html':'cv/index.html',createCV(lang,{concept:'motion'}));
}
if(process.argv.includes('--concepts')){
for(const concept of ['metallic','motion'])for(const lang of ['ko','en']){
 const options=conceptOptions(lang,concept);
 write(`concepts/${concept}/${lang==='en'?'en/':''}index.html`,createSite(lang,options));
 write(`concepts/${concept}/${lang==='en'?'en/':''}portfolio.html`,createPortfolio(lang,{...options,pdfHref:(lang==='en'?'../':'')+(lang==='en'?'Garam_Kim_Portfolio_EN.pdf':'Garam_Kim_Portfolio.pdf')}));
}
write('concepts/index.html',conceptComparison());
}
write('assets/brand/banner.html',banner);
write('assets/brand/mark.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#174c48"/><path d="M45 20c-3-4-7-6-13-6-11 0-19 8-19 18s8 18 19 18c6 0 11-2 15-6V31H32v6h8v4c-2 2-5 3-8 3-7 0-12-5-12-12s5-12 12-12c4 0 6 1 9 4" fill="none" stroke="#f2efe7" stroke-width="4"/></svg>');
const profileEN=`[한국어](README.ko.md) / English

![Garam Kim · Problem Solver](assets/profile-banner.png)

I build products that put AI to use. AX Engineer Intern at MOAI.

[Website](https://kgr0831.github.io/en/) · [Portfolio](portfolio/Garam_Kim_Portfolio_EN.pdf) · [CV](https://kgr0831.github.io/Garam_Kim_CV_EN.pdf) · [garam@moai.co](mailto:garam@moai.co)

| Selected work | My contribution |
| --- | --- |
| **MOAI** | Admin search, filters, pagination and consistent aggregate counts. Admin feature PR merged. |
| **[EUM](https://github.com/kgr0831/EUM2)** | Real-time whiteboard in a five-person team. PixiJS v8 / WebGPU renderer, input smoothing and batched updates. Average 23.7 to 58.7 FPS in the original project measurement; hardware and object count were not recorded. |
| **[Dudri](https://github.com/kgr0831/KOSSCCHTHON_2026)** | AI profiles and community. 1st prize at 2026 KOSSCCHTHON. Post-award work separated generation, versions and publication while preserving hand-written code during visual editing. |

TypeScript · Next.js · Python · PixiJS · WebGPU · C · C# · Unity
`;
const profileKO=`한국어 / [English](README.md)

![김가람 · Problem Solver](assets/profile-banner.png)

AI가 쓰이는 제품을 만듭니다. MOAI에서 AX Engineer Intern으로 일하고 있습니다.

[사이트](https://kgr0831.github.io/) · [포트폴리오](portfolio/Garam_Kim_Portfolio.pdf) · [CV](https://kgr0831.github.io/Garam_Kim_CV.pdf) · [garam@moai.co](mailto:garam@moai.co)

| 주요 작업 | 담당 |
| --- | --- |
| **MOAI** | 관리자 검색·필터·페이지네이션, 집계 기준과 응답 처리 개선. 관리자 기능 PR 병합. |
| **[EUM](https://github.com/kgr0831/EUM2)** | 5인 팀에서 실시간 화이트보드 풀스택 개발. PixiJS v8·WebGPU 렌더러, 입력 보정과 전송 배칭. 당시 평균 23.7에서 58.7 FPS. 장비·객체 수 미기록. |
| **[두드리](https://github.com/kgr0831/KOSSCCHTHON_2026)** | AI 경험 정리·교류 플랫폼. 2026 KOSSCCHTHON 대상. 수상 후 생성·버전·게시를 분리하고, 화면에서 편집할 때 직접 작성한 코드를 보존하도록 개선. |

TypeScript · Next.js · Python · PixiJS · WebGPU · C · C# · Unity
`;
write('github-profile/README.md',profileEN);write('github-profile/README.ko.md',profileKO);
write('README.md',`# Garam Kim · Problem Solver

[한국어 사이트](https://kgr0831.github.io/) · [English website](https://kgr0831.github.io/en/) · [garam@moai.co](mailto:garam@moai.co)

Three selected projects: MOAI, EUM and Dudri. Korean and English editions include a 10-page portfolio and a one-page CV.

The published identity uses teal and cream motion typography. CV, portfolio PDF and Tech Blog are available in the first viewport; GitHub is in the footer.

## Local preview

Run \`node scripts/build.mjs\`, then \`node scripts/serve.mjs\`. Open http://127.0.0.1:4173.

The templates are in \`scripts/site-template.mjs\` and \`scripts/document-template.mjs\`; shared copy lives in \`scripts/content.mjs\`.

Playwright validation: \`node scripts/verify.cjs --playwright PATH_TO_PLAYWRIGHT --chrome PATH_TO_CHROMIUM\`.

Export the four published PDFs with \`node scripts/export-documents.cjs --playwright PATH_TO_PLAYWRIGHT --chrome PATH_TO_CHROMIUM\`.

The typeface is [IBM Plex Sans KR, selected on Noonnu](https://noonnu.cc/font_page/448), licensed under OFL.

See [DESIGN.md](DESIGN.md) for the selected visual system and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for release validation. The GitHub profile is maintained in [kgr0831/kgr0831](https://github.com/kgr0831/kgr0831).
`);
console.log('Built KO/EN website, 10-page portfolio, one-page CV and GitHub profile sources.');
