// Export final PDFs from the same document sources used in the local preview.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const args=process.argv.slice(2),arg=(k,d)=>args.includes(k)?args[args.indexOf(k)+1]:d;
const {chromium}=require(arg('--playwright','playwright-core'));
const root=path.resolve(__dirname,'..'),base=arg('--base','http://127.0.0.1:4173'),out=path.join(root,arg('--out','.runtime/v4'));
const documents=[
 ['/portfolio/','portfolio/Garam_Kim_Portfolio.pdf',16],
 ['/portfolio/en/','portfolio/Garam_Kim_Portfolio_EN.pdf',10],
 ['/cv/','Garam_Kim_CV.pdf',1],['/cv/en/','Garam_Kim_CV_EN.pdf',1],
 ...['metallic','motion'].flatMap(theme=>['ko','en'].map(lang=>[
  `/concepts/${theme}/${lang==='en'?'en/':''}portfolio.html`,
  `concepts/${theme}/Garam_Kim_Portfolio${lang==='en'?'_EN':''}.pdf`,10
 ]))
];
(async()=>{
 fs.mkdirSync(out,{recursive:true});const report=[];
 const browser=await chromium.launch({headless:true,...(arg('--chrome')?{executablePath:arg('--chrome')}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const selected=arg('--concept')?documents.filter(([route])=>route.startsWith(`/concepts/${arg('--concept')}/`)):documents.filter(([route])=>!route.startsWith('/concepts/'));
  for(const [route,file,count] of selected){
   if(route==='/portfolio/'){
    fs.copyFileSync(path.join(root,'portfolio/projects/portfolio.pdf'),path.join(root,file));
    report.push({route,file,count,bytes:fs.statSync(path.join(root,file)).size});
    continue;
   }
   await page.goto(base+route,{waitUntil:'networkidle'});
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
   await page.emulateMedia({media:'print'});const selector=count===1?'.cv-page':'.sheet';
   assert.equal(await page.locator(selector).count(),count);
   const boxes=await page.locator(selector).evaluateAll(els=>els.map((s,i)=>{
    const b=s.getBoundingClientRect(),f=s.querySelector('footer').getBoundingClientRect(),content=s.querySelector('.sheet-body')||s;
    const violations=[...content.querySelectorAll('h1,h2,h3,p,li,dl,img,.doc-link')].filter(e=>{
     const r=e.getBoundingClientRect();return r.width&&r.height&&(r.bottom>f.top+1||r.right>b.right+1||r.left<b.left-1)
    }).map(e=>({tag:e.tagName,text:e.textContent.slice(0,70)}));
    return{page:i+1,width:b.width,height:b.height,violations}
   }));
   assert.ok(boxes.every(b=>!b.violations.length),`Print overflow ${route}: ${JSON.stringify(boxes)}`);
   await page.evaluate(()=>{
    for(const a of document.querySelectorAll('a[href]')){
     const u=new URL(a.href);
     // Same-document TOC links must stay internal in the PDF.
     if(u.origin===location.origin&&u.pathname===location.pathname&&u.hash.startsWith('#page-'))a.setAttribute('href',u.hash);
     else if(u.origin===location.origin)a.href='https://kgr0831.github.io'+u.pathname+u.search+u.hash;
    }
   });
   await page.pdf({path:path.join(root,file),preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false,tagged:true,outline:true});
   report.push({route,file,count,boxes,bytes:fs.statSync(path.join(root,file)).size});
   await page.emulateMedia({media:'screen'});console.log(file);
  }
  fs.writeFileSync(path.join(out,'document-export.json'),JSON.stringify(report,null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
