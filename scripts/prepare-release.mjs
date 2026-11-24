// Prepare the approved production files. Publishing is a separate explicit action.
import {copyFileSync,existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const siteDir=path.join(root,'.runtime/deploy-site'),profileDir=path.join(root,'.runtime/deploy-profile');
const git=(dir,...args)=>execFileSync('git',['-C',dir,...args],{encoding:'utf8'}).trim();
for(const [dir,expected]of [[siteDir,'https://github.com/kgr0831/kgr0831.github.io.git'],[profileDir,'https://github.com/kgr0831/kgr0831.git']]){
 if(git(dir,'remote','get-url','origin')!==expected||git(dir,'branch','--show-current')!=='main')throw Error('Unexpected deployment checkout: '+dir);
}
const copy=(src,dst)=>{mkdirSync(path.dirname(dst),{recursive:true});copyFileSync(src,dst)};
const files=['.nojekyll','.gitignore','index.html','en/index.html','README.md','DESIGN.md','PRODUCT.md','docs/DEPLOYMENT.md','Garam_Kim_CV.pdf','Garam_Kim_CV_EN.pdf','portfolio/index.html','portfolio/en/index.html','portfolio/Garam_Kim_Portfolio.pdf','portfolio/Garam_Kim_Portfolio_EN.pdf','cv/index.html','cv/en/index.html','assets/site.css','assets/site.js','assets/documents.css','assets/documents.js','assets/concepts.css','assets/concepts.js','assets/concept-documents.css','assets/fonts/IBMPlexSansKR-Regular.woff2','assets/fonts/IBMPlexSansKR-Medium.woff2','assets/fonts/IBMPlexSansKR-SemiBold.woff2','assets/fonts/IBM-Plex-LICENSE.txt','assets/brand/mark.svg','assets/brand/profile-banner.png','assets/brand/social.png','assets/brand/banner.html','assets/work/eum-whiteboard.png','assets/work/dudri-studio.png','assets/work/dudri-award.jpg','scripts/build.mjs','scripts/content.mjs','scripts/site-template.mjs','scripts/concept-template.mjs','scripts/document-template.mjs','scripts/serve.mjs','scripts/verify.cjs','scripts/check-pdfs.py','scripts/export-documents.cjs','scripts/prepare-release.mjs'];
files.push('portfolio/VFriend_D2SF_IR.pdf');
for (const file of [
 'index.html',
 'portfolio.pdf',
 'portfolio.pptx',
 'portfolio.zip',
 'details.pdf',
 'design-study/index.html',
 'design-study/comparison.pdf',
 'design-study/mint.pdf',
 'design-study/lemon.pdf',
 'design-study/mocha.pdf',
 'design-study/mint.pptx',
 'design-study/lemon.pptx',
 'design-study/mocha.pptx',
 'design-study/preview.jpg',
 'sources/dudri-award.jpg',
 'sources/dudri-studio.png',
 'sources/eum-whiteboard.png',
 'sources/jam-ai.pdf',
 'sources/jam-project.pdf',
 'sources/OnYourMark-Gameplay.mp4',
 'sources/oym-award.png',
 'sources/oym-exhibit.jpg',
 'sources/oym-gameplay.png',
]) {
 files.push('portfolio/projects/'+file);
}
for (const file of [
 'index.html',
 'portfolio.pdf',
 'portfolio.pptx',
 'portfolio.zip',
 'sources/jam-project.pdf',
 'sources/jam-ai.pdf',
 'sources/OnYourMark-Gameplay.mp4',
 'sources/oym-award.png',
 'sources/oym-exhibit.jpg',
]) {
 files.push('portfolio/pearlabyss/'+file);
}
const mappings=files.map(f=>[f,f]);
mappings.push(['Garam_Kim_CV.pdf','CV.pdf'],['Garam_Kim_CV_EN.pdf','CV.en.pdf'],['portfolio/Garam_Kim_Portfolio.pdf','portfolio.pdf'],['portfolio/Garam_Kim_Portfolio_EN.pdf','portfolio.en.pdf']);
for(const [src]of mappings)if(!existsSync(path.join(root,src)))throw Error('Missing release file '+src);
const profileFiles=['README.md','README.ko.md','assets/profile-banner.png','portfolio/Garam_Kim_Portfolio.pdf','portfolio/Garam_Kim_Portfolio_EN.pdf'];
copy(path.join(root,'assets/brand/profile-banner.png'),path.join(root,'github-profile/assets/profile-banner.png'));
for(const name of ['Garam_Kim_Portfolio.pdf','Garam_Kim_Portfolio_EN.pdf'])copy(path.join(root,'portfolio',name),path.join(root,'github-profile/portfolio',name));
for(const [src,dst]of mappings){copy(path.join(root,src),path.join(siteDir,dst));copy(path.join(root,src),path.join(root,'.runtime/release-final/website',dst))}
for(const file of profileFiles){copy(path.join(root,'github-profile',file),path.join(profileDir,file));copy(path.join(root,'github-profile',file),path.join(root,'.runtime/release-final/github-profile',file))}
const manifest={version:6,selectedDesign:'motion-teal-cream',websiteRepository:'kgr0831/kgr0831.github.io',profileRepository:'kgr0831/kgr0831',branch:'main',websiteBase:git(siteDir,'rev-parse','HEAD'),profileBase:git(profileDir,'rev-parse','HEAD'),websiteFiles:mappings.map(([,dst])=>dst),profileFiles,accountFields:JSON.parse(readFileSync(path.join(root,'github-profile/profile.json'),'utf8')),published:false};
writeFileSync(path.join(root,'.runtime/release-manifest.json'),JSON.stringify(manifest,null,2));writeFileSync(path.join(root,'.runtime/release-final/manifest.json'),JSON.stringify(manifest,null,2));
console.log(JSON.stringify({websiteFiles:mappings.length,profileFiles:profileFiles.length,published:false}));
