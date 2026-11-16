(() => {
 const kind=document.documentElement.dataset.concept;
 if(!kind)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),live=new Set();
 function animate(el,frames,options){if(!el||reduced.matches)return;const a=el.animate(frames,options);live.add(a);a.finished.catch(()=>{}).finally(()=>live.delete(a));return a}
 function enter(){
  if(reduced.matches)return;
  if(kind==='metallic')animate(document.querySelector('.satin-reflection'),[{transform:'translateX(-140%) skewX(-18deg)'},{transform:'translateX(340%) skewX(-18deg)'}],{duration:1800,easing:'cubic-bezier(.22,.7,.18,1)'});
  // Motion typography is animated in the render-blocking stylesheet. Starting it
  // after fonts.ready would paint a completed heading before hiding it again.
 }
 document.fonts.ready.then(enter);
 let frame=false;
 function scroll(){if(frame)return;frame=true;requestAnimationFrame(()=>{frame=false;const p=reduced.matches?0:Math.max(0,Math.min(1,scrollY/innerHeight));document.documentElement.style.setProperty('--cover-progress',p.toFixed(3))})}
 if(kind==='motion')addEventListener('scroll',scroll,{passive:true});
 reduced.addEventListener('change',()=>{if(reduced.matches)for(const a of live)a.cancel();scroll()});
})();
