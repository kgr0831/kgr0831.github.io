// Builds the Korean site from content.mjs and deck.json (slide titles and leads exported from the Figma portfolio).
// Output: index.html, projects/<slug>/index.html, cv/index.html. No dependencies: `node scripts/v5/build.mjs`.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const deck = JSON.parse(readFileSync(join(ROOT, 'scripts/v5/deck.json'), 'utf8'));
const sizes = JSON.parse(readFileSync(join(ROOT, 'assets/v5/slides/sizes.json'), 'utf8'));
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rich = segs => segs.map(s => (s.a ? `<em>${esc(s.t)}</em>` : esc(s.t))).join('').replace(/\n/g, '<br>');
const plain = segs => segs.map(s => s.t).join('').replace(/\n/g, ' ');
const write = (rel, html) => { const p = join(ROOT, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, html); };
const P = C.docs.portfolio;

function shell({ rel, title, desc, body, cls = '' }) {
  const up = '../'.repeat(rel.split('/').length - 1);
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="https://kgr0831.github.io/assets/v5/og.png">
<link rel="icon" href="${up}favicon.svg">
<link rel="preload" href="${up}assets/fonts/IBMPlexSansKR-SemiBold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/v5/site.css">
</head>
<body class="${cls}">
<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="top"><div class="wrap">
<a class="brand" href="${up}./">김가람</a>
<nav aria-label="주요 메뉴"><a href="${up}./#projects">프로젝트</a><a href="${up}./#career">경력</a><a href="${up}cv/">CV</a><a href="${up}${P}">포트폴리오 PDF</a></nav>
</div></header>
<main id="main">
${body}
</main>
<footer class="foot"><div class="wrap">
<p class="foot-name">${esc(C.person.name)} · ${esc(C.person.role)}</p>
<ul class="foot-links"><li><a href="mailto:${C.person.email}">${C.person.email}</a></li>${C.person.links.map(([k, u]) => `<li><a href="${u}">${esc(k)}</a></li>`).join('')}</ul>
</div></footer>
</body>
</html>
`;
}

// ---------- home
const card = p => `<article class="proj">
<div class="proj-text">
<p class="proj-when">${esc(p.when)}</p>
<h3><a href="projects/${p.slug}/">${esc(p.name)}</a></h3>
<p class="proj-sub">${esc(p.sub)}</p>
<dl class="proj-dl"><dt>발견한 문제</dt><dd>${esc(p.problem)}</dd><dt>해결과 결과</dt><dd>${esc(p.result)}</dd></dl>
<p class="proj-more"><a href="projects/${p.slug}/">자세히 보기</a><a href="${P}#page=${+p.opener}">포트폴리오 ${p.opener}쪽</a></p>
</div>
<figure class="proj-fig"><a href="projects/${p.slug}/" tabindex="-1"><img src="assets/v5/img/${p.image.src}" alt="${esc(p.image.alt)}" loading="lazy"></a><figcaption>${esc(p.image.caption)}</figcaption></figure>
</article>`;

const home = `<section class="hero"><div class="wrap">
<h1>${esc(C.person.name)}</h1>
<p class="hero-role">${esc(C.person.role)}</p>
<p class="hero-field">${esc(C.person.field)}</p>
<p class="hero-tag">${esc(C.person.tagline)}</p>
<p class="hero-intro">${esc(C.person.intro)} ${esc(C.person.now)}</p>
<ul class="hero-links">
<li><a href="${P}">포트폴리오 PDF</a><span>${C.docs.portfolioPages}쪽</span></li>
<li><a href="cv/">CV</a><span>한 쪽</span></li>
<li><a href="mailto:${C.person.email}">${C.person.email}</a></li>
<li><a href="${C.person.links[0][1]}">${C.person.links[0][2]}</a></li>
</ul>
</div></section>

<section class="flow" aria-labelledby="flow-h"><div class="wrap">
<h2 id="flow-h">일하는 방식</h2>
<ol class="flow-list">${C.workflow.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ol>
</div></section>

<section id="projects" class="projects" aria-labelledby="proj-h"><div class="wrap">
<h2 id="proj-h">여섯 프로젝트</h2>
${C.projects.map(card).join('\n')}
</div></section>

<section id="career" class="career" aria-labelledby="career-h"><div class="wrap">
<div class="career-col">
<h2 id="career-h">경력과 학력</h2>
<table class="rows"><tbody>${C.career.map(([w, o, n]) => `<tr><td class="w">${esc(w)}</td><th scope="row">${esc(o)}</th><td>${esc(n)}</td></tr>`).join('')}</tbody></table>
</div>
<div class="career-col">
<h2>수상</h2>
<table class="rows"><tbody>${C.awards.map(([w, o, n]) => `<tr><td class="w">${esc(w)}</td><th scope="row">${esc(o)}</th><td>${esc(n)}</td></tr>`).join('')}</tbody></table>
<h2 class="mt">기술</h2>
<table class="rows"><tbody>${C.skills.map(([k, v]) => `<tr><td class="w">${esc(k)}</td><td colspan="2">${esc(v)}</td></tr>`).join('')}</tbody></table>
</div>
</div></section>

<section class="other" aria-labelledby="other-h"><div class="wrap">
<h2 id="other-h">그 밖의 작업</h2>
<table class="grid"><thead><tr><th scope="col">프로젝트</th><th scope="col">기간</th><th scope="col">만든 것</th><th scope="col">맡은 일</th></tr></thead>
<tbody>${C.otherWork.map(r => `<tr><th scope="row">${esc(r[0])}</th><td class="w">${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join('')}</tbody></table>
<h3>다른 프로젝트 기여</h3>
<ul class="contrib">${C.contributions.map(([k, v, u]) => `<li><a href="${u}">${esc(k)}</a><p>${esc(v)}</p></li>`).join('')}</ul>
</div></section>`;

write('index.html', shell({ rel: 'index.html', title: `${C.person.name} · ${C.person.role}`, desc: `${C.person.tagline}. ${C.person.field}. ${C.person.now}`, body: home, cls: 'home' }));

// ---------- project pages
const bySec = {};
for (const s of deck) (bySec[s.section] ||= []).push(s);
const projSlides = C.projects.map(p => { const sec = Object.values(bySec).find(list => list.some(s => s.no === p.opener)); return { p, opener: sec.find(s => s.no === p.opener), slides: sec.filter(s => s.no !== p.opener) }; });

projSlides.forEach(({ p, opener: o, slides }, i) => {
  const rel = `projects/${p.slug}/index.html`;
  const prev = projSlides[i - 1], next = projSlides[i + 1];
  const meta = (o.meta || []).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const links = (o.links || []).map(([k, u, shown]) => `<li><span>${esc(k)}</span><a href="${u}">${esc(shown)}</a></li>`).join('');
  const sections = slides.map(s => { const z = sizes[s.no]; const label = s.name.split(' · ').slice(1).join(' · ');
    return `<section class="slide" id="p${s.no}"><div class="wrap">
<h2>${rich(s.title)}</h2>
${s.lead ? `<p class="slide-lead">${esc(s.lead)}</p>` : ''}
<figure class="slide-fig"><a class="slide-img" href="../../assets/v5/slides/${s.no}.webp"><img src="../../assets/v5/slides/${s.no}.webp" width="${z.w}" height="${z.h}" alt="${esc(plain(s.title))}" loading="lazy"></a>
<figcaption><span class="swipe">옆으로 밀어 보기 · </span><a href="../../${P}#page=${+s.no}">포트폴리오 ${s.no}쪽</a> · ${esc(label)}</figcaption></figure>
</div></section>`; }).join('\n');
  const body = `<section class="phero"><div class="wrap phero-grid">
<div class="phero-text">
<p class="crumb"><a href="../../#projects">프로젝트</a></p>
<h1>${esc(o.display)}</h1>
<p class="phero-sub">${esc(o.sub)}</p>
<p class="phero-lead">${esc(o.lead)}</p>
<dl class="meta">${meta}</dl>
${links ? `<ul class="plinks">${links}</ul>` : ''}
</div>
<figure class="phero-fig${p.slug === 'moai' ? ' bare' : ''}"><img src="../../assets/v5/img/${p.image.src}" alt="${esc(p.image.alt)}"><figcaption>${esc(p.image.caption)}</figcaption></figure>
</div></section>
${sections}
<nav class="pnav" aria-label="다른 프로젝트"><div class="wrap">
${prev ? `<a class="prev" href="../${prev.p.slug}/"><span>이전 프로젝트</span>${esc(prev.p.name)}</a>` : '<span></span>'}
${next ? `<a class="next" href="../${next.p.slug}/"><span>다음 프로젝트</span>${esc(next.p.name)}</a>` : `<a class="next" href="../../#career"><span>다음</span>경력과 학력</a>`}
</div></nav>`;
  write(rel, shell({ rel, title: `${o.display} · ${C.person.name}`, desc: `${o.sub}. ${o.lead}`, body, cls: 'project' }));
});

// ---------- CV (one A4 page; the same file is printed to Garam_Kim_CV.pdf)
const cvRow = (when, head, sub, items, desc = '') => `<div class="cv-row"><p class="cv-when">${esc(when)}</p><div><p class="cv-head">${head}</p>${sub ? `<p class="cv-sub">${esc(sub)}</p>` : ''}${items.length ? `<ul>${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}${desc ? `<p class="cv-desc">${esc(desc)}</p>` : ''}</div></div>`;
const cvBody = `<article class="cv">
<header class="cv-top">
<div><h1>${esc(C.person.name)}</h1><p class="cv-role">${esc(C.person.role)} · ${esc(C.person.field)}</p></div>
<ul class="cv-contact"><li><a href="mailto:${C.person.email}">${C.person.email}</a></li><li><a href="https://kgr0831.github.io/">kgr0831.github.io</a></li>${C.person.links.map(([, u, shown]) => `<li><a href="${u}">${esc(shown)}</a></li>`).join('')}<li><a href="https://kgr0831.github.io/${P}">포트폴리오 kgr0831.github.io/${P}</a></li></ul>
</header>
<p class="cv-summary"><strong>${esc(C.person.tagline)}.</strong> ${esc(C.cv.summary)}</p>
<section><h2>경력</h2>${C.cv.work.map(w => cvRow(w.when, `<strong>${esc(w.org)}</strong> · ${esc(w.role)}`, w.head, w.items)).join('')}</section>
<section><h2>프로젝트</h2>${C.cv.projects.map(w => cvRow(w.when, `<strong>${esc(w.name)}</strong> · ${esc(w.role)}`, '', [], w.desc)).join('')}</section>
<section><h2>학력</h2>${C.career.filter(r => /학교|정글/.test(r[1])).map(([w, o, n]) => `<p class="cv-line"><span class="cv-when">${esc(w)}</span><span><strong>${esc(o)}</strong> · ${esc(n)}</span></p>`).join('')}</section>
<div class="cv-cols">
<section><h2>수상</h2>${C.awards.map(([w, o, n]) => `<p class="cv-line"><span class="cv-when">${esc(w)}</span><span><strong>${esc(o)}</strong> · ${esc(n)}</span></p>`).join('')}</section>
<section><h2>기술</h2>${C.skills.map(([k, v]) => `<p class="cv-line"><span class="cv-when">${esc(k)}</span><span>${esc(v)}</span></p>`).join('')}</section>
</div>
</article>`;
write('cv/index.html', `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(C.person.name)} · CV</title>
<meta name="description" content="${esc(C.person.name)} ${esc(C.person.role)} CV">
<link rel="icon" href="../favicon.svg">
<link rel="stylesheet" href="../assets/v5/cv.css">
</head>
<body>
<p class="cv-bar"><a href="../">사이트로 돌아가기</a><a href="../${C.docs.cvPdf}">PDF로 받기</a></p>
${cvBody}
</body>
</html>
`);
console.log('built: index.html, cv/index.html,', projSlides.map(x => `projects/${x.p.slug}/`).join(', '), existsSync(join(ROOT, P)) ? '' : `(missing ${P})`);
