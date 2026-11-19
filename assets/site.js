document.documentElement.classList.add('js');
const concept = document.documentElement.dataset.concept || '';
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const activeAnimations = new Set();
function play(element,frames,options) {
  if(reduce.matches) return null;
  const animation=element.animate(frames,options);
  activeAnimations.add(animation);
  animation.finished.catch(()=>{}).finally(()=>activeAnimations.delete(animation));
  return animation;
}
reduce.addEventListener('change',()=>{
  if(reduce.matches) for(const animation of activeAnimations) animation.cancel();
  scheduleScroll();
});

// Native scroll drives a single large transition from the identity cover to the work index.
const intro=document.querySelector('.intro-shell');
const stage=document.querySelector('.intro-stage');
const names=[document.querySelector('.name-first'),document.querySelector('.name-last')];
let queued=false;
function scheduleScroll(){
  if(document.documentElement.dataset.concept)return;
  if(queued)return;queued=true;
  requestAnimationFrame(()=>{
    queued=false;
    const rect=intro.getBoundingClientRect();
    const travel=Math.max(1,intro.offsetHeight-stage.offsetHeight);
    const progress=reduce.matches?0:Math.max(0,Math.min(1,-rect.top/travel));
    if(progress>0) names.forEach(name=>name.style.animation='none');
    names[0].style.setProperty('--name-x',`${-progress*innerWidth*.66}px`);
    names[1].style.setProperty('--name-x',`${progress*innerWidth*.55}px`);
    stage.style.setProperty('--stage-scale',String(1-progress*.055));
    stage.style.setProperty('--stage-radius',`${progress*28}px`);
  });
}
names.forEach(name=>name.addEventListener('animationend',()=>{name.style.animation='none';scheduleScroll();},{once:true}));
addEventListener('scroll',scheduleScroll,{passive:true});
addEventListener('resize',()=>{scheduleScroll();document.querySelectorAll('dialog[open]').forEach(positionTab);},{passive:true});
scheduleScroll();
const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
stage.addEventListener('pointermove',event=>{
  if(reduce.matches||!finePointer.matches)return;
  const x=event.clientX/innerWidth-.5,y=event.clientY/innerHeight-.5;
  stage.style.setProperty('--surface-x',`${x*22}px`);
  stage.style.setProperty('--surface-y',`${y*14}px`);
  stage.style.setProperty('--light-x',`${x*180}px`);
},{passive:true});
stage.addEventListener('pointerleave',()=>{
  stage.style.setProperty('--surface-x','0px');stage.style.setProperty('--surface-y','0px');stage.style.setProperty('--light-x','0px');
});

let returnFocus=null;
let savedOverflow='',savedPadding='';
function positionTab(dialog){
  const tab=dialog.querySelector('[role=tab][aria-selected=true]');
  const bar=dialog.querySelector('.case-tabs');
  if(!tab||!dialog.open)return;
  const parent=bar.getBoundingClientRect(),box=tab.getBoundingClientRect();
  bar.style.setProperty('--tab-x',`${box.left-parent.left}px`);
  bar.style.setProperty('--tab-width',`${box.width}px`);
}
function activateTab(dialog,tab,keyboard=false){
  if(tab.getAttribute('aria-selected')==='true')return;
  for(const other of dialog.querySelectorAll('[role=tab]')){
    const selected=other===tab;
    other.setAttribute('aria-selected',String(selected));
    other.tabIndex=selected?0:-1;
    document.getElementById(other.getAttribute('aria-controls')).hidden=!selected;
  }
  const panel=document.getElementById(tab.getAttribute('aria-controls'));
  dialog.querySelector('.case-body').scrollTop=0;
  positionTab(dialog);
  if(!keyboard&&concept!=='metallic') play(panel,[{clipPath:'inset(0 36% 0 0)',transform:'translateX(22px)'},{clipPath:'inset(0)',transform:'translateX(0)'}],{duration:concept?220:420,easing:'cubic-bezier(.16,1,.3,1)'});
}
function openCase(dialog,trigger,keyboard){
  if(!dialog||dialog.open)return;
  const origin=trigger.getBoundingClientRect();returnFocus=trigger;
  savedOverflow=document.body.style.overflow;savedPadding=document.body.style.paddingRight;
  const scrollbar=innerWidth-document.documentElement.clientWidth;
  document.body.style.paddingRight=`${scrollbar}px`;
  document.body.style.overflow='hidden';
  dialog.showModal();dialog.dataset.closing='false';
  dialog.querySelector('.case-body').scrollTop=0;
  const first=dialog.querySelector('[role=tab]');activateTab(dialog,first,true);positionTab(dialog);
  for(const image of dialog.querySelectorAll('img')){image.loading='eager';image.decode().catch(()=>{});}
  const shell=dialog.querySelector('.dialog-shell'),box=shell.getBoundingClientRect();
  shell.style.setProperty('--origin-x',`${Math.max(0,Math.min(100,((origin.left+origin.width/2)-box.left)/box.width*100))}%`);
  shell.style.setProperty('--origin-y',`${Math.max(0,Math.min(100,((origin.top+origin.height/2)-box.top)/box.height*100))}%`);
  if(!keyboard){
    const frames=concept?[{clipPath:concept==='metallic'?'inset(0 100% 0 0)':'inset(0 0 0 100%)',transform:'translateX(0)'},{clipPath:'inset(0)',transform:'translateX(0)'}]:[{clipPath:'inset(38% 22% 38% 22% round 12px)',transform:'scale(.86)'},{clipPath:'inset(0 round 12px)',transform:'scale(1)'}];
    play(shell,frames,{duration:concept==='metallic'?360:concept==='motion'?400:580,easing:'cubic-bezier(.16,1,.3,1)'});
  }
  dialog.querySelector('[data-dialog-close]').focus({preventScroll:true});
}
function closeCase(dialog,immediate=false){
  if(!dialog.open||dialog.dataset.closing==='true')return;
  dialog.dataset.closing='true';
  const finish=()=>{
    dialog.close();dialog.dataset.closing='false';
    document.body.style.overflow=savedOverflow;document.body.style.paddingRight=savedPadding;
    returnFocus?.focus({preventScroll:true});
  };
  if(immediate||reduce.matches){finish();return;}
  const shell=dialog.querySelector('.dialog-shell');
  shell.getAnimations().forEach(animation=>animation.cancel());
  const frames=concept?[{clipPath:'inset(0)',transform:'translateX(0)'},{clipPath:concept==='metallic'?'inset(0 100% 0 0)':'inset(0 0 0 100%)',transform:'translateX(0)'}]:[{clipPath:'inset(0 round 12px)',transform:'scale(1)'},{clipPath:'inset(50% 50% 50% 50% round 12px)',transform:'scale(.93)'}];
  const animation=play(shell,frames,{duration:concept?200:240,easing:'cubic-bezier(.4,0,1,1)'});
  animation?animation.finished.catch(()=>{}).then(finish):finish();
}
document.querySelectorAll('[data-case-open]').forEach(trigger=>trigger.addEventListener('click',event=>{
  const dialog=document.getElementById(`case-${trigger.dataset.caseOpen}`);
  if(typeof dialog?.showModal!=='function')return;
  event.preventDefault();openCase(dialog,trigger,event.detail===0);
}));
document.querySelectorAll('.case-dialog').forEach(dialog=>{
  dialog.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const stops=[...dialog.querySelectorAll('a[href],button,[tabindex="0"]')].filter(el=>el.tabIndex>=0&&el.getClientRects().length&&!el.closest('[hidden]'));
    const first=stops[0],last=stops.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  });
  dialog.querySelector('[data-dialog-close]').addEventListener('click',event=>closeCase(dialog,event.detail===0));
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeCase(dialog,true);});
  dialog.addEventListener('click',event=>{
    const r=dialog.getBoundingClientRect();
    if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))closeCase(dialog);
  });
  const tabs=[...dialog.querySelectorAll('[role=tab]')];
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',event=>activateTab(dialog,tab,event.detail===0));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next===undefined)return;
      event.preventDefault();activateTab(dialog,tabs[next],true);tabs[next].focus();
    });
  });
});
document.querySelector('[data-copy-email]').addEventListener('click',async event=>{
  const button=event.currentTarget,status=document.querySelector('[data-copy-status]');
  try{
    if(!navigator.clipboard?.writeText)throw new Error('clipboard unavailable');
    await navigator.clipboard.writeText('garam@moai.co');status.textContent=button.dataset.success;
  }catch{status.textContent=button.dataset.failure;}
});
