const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const args=process.argv.slice(2),arg=(k,d)=>args.includes(k)?args[args.indexOf(k)+1]:d;
const {chromium}=require(arg('--playwright','playwright-core'));
const root=path.resolve(__dirname,'..'),out=path.join(root,arg('--out','.runtime/v4'));fs.mkdirSync(out,{recursive:true});
const base=arg('--base','http://127.0.0.1:4173');
const report={viewports:[],interactions:[],documents:[],links:[],errors:[]};
(async()=>{
 const browser=await chromium.launch({headless:true,...(arg('--chrome')?{executablePath:arg('--chrome')}:{})});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:900},permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push(`${r.status()} ${r.url()}`)});
 const ready=async()=>page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))});
 for(const lang of ['ko','en']){
  const route=lang==='ko'?'/':'/en/';
  for(const size of [{width:1440,height:900},{width:1024,height:768},{width:820,height:1180},{width:768,height:1024},{width:390,height:844},{width:320,height:740}]){
   await page.setViewportSize(size);await page.goto(base+route,{waitUntil:'networkidle'});await ready();await page.waitForTimeout(1250);
   const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,font:document.fonts.check('500 16px Plex','김가람'),projectTop:document.querySelector('.works').getBoundingClientRect().top,images:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),heading:document.querySelector('h1').innerText,heroText:document.querySelector('.intro-shell').innerText,language:document.documentElement.lang}));
   assert.equal(metrics.language,lang);assert.ok(metrics.scrollWidth<=size.width+1,`Page overflow ${lang} ${size.width}`);assert.ok(metrics.projectTop>=size.height,`Projects in first viewport ${size.width}`);assert.equal(metrics.font,true);assert.deepEqual(metrics.images,[]);assert.doesNotMatch(metrics.heroText,/MOAI|EUM|Dudri|두드리/);
   assert.equal(await page.locator('[data-case-open]').count(),3);assert.equal(await page.locator('[data-motion-toggle],svg').count(),0);
   assert.equal(await page.locator('meta[name=robots][content*=noindex],.concept-switch').count(),0,'Published route must not expose draft controls or noindex');
   const resources=await page.locator('.hero-resources a').evaluateAll(els=>els.map(a=>{const r=a.getBoundingClientRect();return{href:a.href,top:r.top,bottom:r.bottom,left:r.left,right:r.right}}));
   assert.equal(resources.length,3);assert.ok(resources.every(a=>a.top>=0&&a.bottom<=size.height+1&&a.left>=0&&a.right<=size.width+1));
   assert.ok(resources[0].href.endsWith(lang==='en'?'Garam_Kim_CV_EN.pdf':'Garam_Kim_CV.pdf'));
   assert.ok(resources[1].href.endsWith(lang==='en'?'portfolio/Garam_Kim_Portfolio_EN.pdf':'portfolio/projects/'));
   assert.equal(resources[2].href,'https://kgr0831.tistory.com/');
   assert.ok(await page.locator('a[href="https://github.com/kgr0831"]').evaluateAll(els=>els.length===1&&els.every(a=>!!a.closest('footer'))));
   report.viewports.push({lang,...size,...metrics,resources});
   await page.screenshot({path:path.join(out,`hero-${lang}-${size.width}.png`),animations:'disabled'});
   if([1440,390,320].includes(size.width))await page.screenshot({path:path.join(out,`site-${lang}-${size.width}.png`),fullPage:true,animations:'disabled'});
  }
  // Each dialog and each tab must work at both the smallest and desktop viewport.
  for(const width of [1440,320]){
   await page.setViewportSize({width,height:width===320?740:900});
   for(const id of ['moai','eum','dudri']){
    const trigger=page.locator(`[data-case-open=${id}]`),dialog=page.locator(`#case-${id}`);
    await trigger.click();await page.waitForTimeout(650);
    assert.ok(await dialog.isVisible());assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
    assert.ok(await dialog.locator('[data-dialog-close]').evaluate(e=>document.activeElement===e));
    for(let i=0;i<3;i++){
     const tab=dialog.locator('[role=tab]').nth(i);await tab.click();await page.waitForTimeout(450);
     assert.equal(await tab.getAttribute('aria-selected'),'true');assert.equal(await dialog.locator('[role=tabpanel]:visible').count(),1);
     const fit=await dialog.evaluate(d=>{const b=d.getBoundingClientRect(),body=d.querySelector('.case-body');return{left:b.left,right:b.right,width:innerWidth,body:body.clientWidth,content:body.scrollWidth}});
     assert.ok(fit.left>=0&&fit.right<=fit.width+1&&fit.content<=fit.body+1,`Dialog overflow ${lang} ${id} ${i} ${width}: ${JSON.stringify(fit)}`);
     if(width===1440||id==='dudri')await page.screenshot({path:path.join(out,`case-${lang}-${id}-${i}-${width}.png`)});
    }
    await page.keyboard.press('Escape');assert.equal(await dialog.isVisible(),false);assert.equal(await page.evaluate(()=>document.body.style.overflow),'');assert.ok(await trigger.evaluate(e=>document.activeElement===e));
    await trigger.focus();await page.keyboard.press('Enter');assert.equal(await dialog.locator('[role=tab]').first().getAttribute('aria-selected'),'true');
    await dialog.locator('[role=tab]').first().focus();await page.keyboard.press('ArrowRight');assert.equal(await dialog.locator('[role=tab]').nth(1).getAttribute('aria-selected'),'true');await page.keyboard.press('End');assert.equal(await dialog.locator('[role=tab]').nth(2).getAttribute('aria-selected'),'true');await page.keyboard.press('Home');assert.equal(await dialog.locator('[role=tab]').first().getAttribute('aria-selected'),'true');
    for(let i=0;i<8;i++){await page.keyboard.press('Tab');assert.ok(await dialog.evaluate(d=>d.contains(document.activeElement)),`Focus escaped ${id}`)}
    await page.keyboard.press('Escape');
   }
   report.interactions.push(`${lang}: dialog tabs, layout, Escape, focus trap/return and keyboard activation at ${width}`);
  }
  await page.locator('[data-copy-email]').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'garam@moai.co');assert.ok((await page.locator('[data-copy-status]').innerText()).length>0);report.interactions.push(`${lang}: copy email`);
  await page.goto(base+route);await page.keyboard.press('Tab');assert.ok(await page.locator('.skip').evaluate(e=>document.activeElement===e));report.interactions.push(`${lang}: skip link`);
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+route);await page.locator('[data-case-open=eum]').click();await page.locator('#eum-tab-1').click();assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0);await page.keyboard.press('Escape');report.interactions.push(`${lang}: reduced motion`);await page.emulateMedia({reducedMotion:'no-preference'});
 }
 // Mouse close, backdrop close and quick cancellation must release scroll lock.
 await page.setViewportSize({width:1440,height:900});await page.goto(base);await page.locator('[data-case-open=moai]').click();await page.locator('#case-moai [data-dialog-close]').click();await page.waitForTimeout(300);assert.equal(await page.locator('dialog[open]').count(),0);
 await page.locator('[data-case-open=moai]').click();await page.waitForTimeout(650);await page.mouse.click(10,10);await page.waitForTimeout(300);assert.equal(await page.locator('dialog[open]').count(),0);assert.equal(await page.evaluate(()=>document.body.style.overflow),'');report.interactions.push('Mouse close, backdrop and opening cancellation');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:undefined,configurable:true}));await page.locator('[data-copy-email]').click();assert.match(await page.locator('[data-copy-status]').innerText(),/직접 선택/);report.interactions.push('Clipboard fallback');
 await page.goto(base+'/portfolio/',{waitUntil:'networkidle'});
 assert.equal(new URL(page.url()).pathname,'/portfolio/projects/');
 assert.equal(await page.locator('section.leaf').count(),16);
 assert.deepEqual(fs.readFileSync(path.join(root,'portfolio/Garam_Kim_Portfolio.pdf')),fs.readFileSync(path.join(root,'portfolio/projects/portfolio.pdf')));
 report.documents.push({route:'/portfolio/',count:16});
 // Print media is validated before exporting the actual PDFs.
 for(const [route,selector,count,file,prefix] of [['/portfolio/en/','.sheet',10,'portfolio/Garam_Kim_Portfolio_EN.pdf','portfolio-en'],['/cv/','.cv-page',1,'Garam_Kim_CV.pdf','cv-ko'],['/cv/en/','.cv-page',1,'Garam_Kim_CV_EN.pdf','cv-en']]){
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+route,{waitUntil:'networkidle'});await ready();assert.equal(await page.locator(selector).count(),count);await page.emulateMedia({media:'print'});
  const boxes=await page.locator(selector).evaluateAll(els=>els.map((s,i)=>{const b=s.getBoundingClientRect(),f=s.querySelector('footer').getBoundingClientRect();const content=s.querySelector('.sheet-body')||s;const violations=[...content.querySelectorAll('h1,h2,h3,p,li,dl,img,.doc-link')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.bottom>f.top+1||r.right>b.right+1||r.left<b.left-1)}).map(e=>({tag:e.tagName,text:e.textContent.slice(0,70),bottom:Math.round(e.getBoundingClientRect().bottom-b.top)}));return{page:i+1,width:b.width,height:b.height,violations}}));
  report.documents.push({route,count,boxes});assert.ok(boxes.every(b=>!b.violations.length),`Print overflow ${route}: ${JSON.stringify(boxes.filter(b=>b.violations.length))}`);
  // Make relative PDF hyperlinks resolve to the public site, never the preview host.
  await page.evaluate(()=>{for(const a of document.querySelectorAll('a[href]')){const u=new URL(a.href);if(u.origin===location.origin&&u.pathname===location.pathname&&u.hash.startsWith('#page-'))a.setAttribute('href',u.hash);else if(u.origin===location.origin)a.href='https://kgr0831.github.io'+u.pathname+u.search+u.hash}});
  await page.pdf({path:path.join(root,file),preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false,tagged:true,outline:true});
  for(let i=0;i<count;i++)await page.locator(selector).nth(i).screenshot({path:path.join(out,`${prefix}-${String(i+1).padStart(2,'0')}.png`)});
  await page.emulateMedia({media:'screen'});
  for(const width of [390,320]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} mobile overflow ${width}`)}
 }
 const urls=new Map();for(const route of ['/','/en/','/portfolio/','/portfolio/en/','/cv/','/cv/en/']){await page.goto(base+route);for(const href of await page.locator('a[href]').evaluateAll(els=>els.map(e=>e.href))){const u=new URL(href);if(u.origin===new URL(base).origin)urls.set(href,u)}}
 for(const [href,u]of urls){const response=await context.request.get(u.origin+u.pathname);assert.equal(response.status(),200,href);if(u.hash&&!u.pathname.endsWith('.pdf')){
    const anchor=decodeURIComponent(u.hash.slice(1)),source=await response.text();
    const exists=source.includes(`id="${anchor}"`)||source.includes(`"id":"${anchor}"`);
    assert.ok(exists,`Missing anchor ${href}`);
   }report.links.push(u.pathname+u.hash)}
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),plain=await nojs.newPage();await plain.goto(base);const pdfHref=await plain.locator('[data-case-open=eum]').getAttribute('href');assert.equal(pdfHref,'portfolio/projects/portfolio.pdf#page=15');const pdfResponse=await nojs.request.get(new URL(pdfHref,base).href);assert.equal(pdfResponse.status(),200);assert.match(pdfResponse.headers()['content-type'],/application\/pdf/);await nojs.close();report.interactions.push('No-JS project fallback');
 await page.setViewportSize({width:1280,height:480});await page.goto(base+'/assets/brand/banner.html');await ready();await page.screenshot({path:path.join(root,'assets/brand/profile-banner.png')});await page.setViewportSize({width:1280,height:640});await page.addStyleTag({content:'body{height:640px}.banner{padding-block:60px}.banner-title{font-size:166px}'});await page.screenshot({path:path.join(root,'assets/brand/social.png')});
 assert.deepEqual(report.errors,[]);fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({viewports:report.viewports.length,interactionGroups:report.interactions.length,documents:report.documents.map(d=>({route:d.route,pages:d.count})),localLinks:report.links.length,errors:report.errors}));
 }finally{await browser.close()}
})().catch(e=>{fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({...report,failure:e.message},null,2));console.error(e);process.exitCode=1});
