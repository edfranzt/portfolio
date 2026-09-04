const filters=document.querySelectorAll('.filter');
const cards=[...document.querySelectorAll('.placement')];
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;cards.forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.type!==filter));}));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting||entry.target.dataset.done)return;entry.target.dataset.done='1';const target=Number(entry.target.dataset.count);const start=performance.now();const duration=1000;const tick=now=>{const progress=Math.min((now-start)/duration,1);entry.target.textContent=Math.floor(progress*target);if(progress<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);});},{threshold:.5});
counters.forEach(c=>counterObserver.observe(c));

const revealItems=document.querySelectorAll('.section,.stats,.placement');
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});},{threshold:.08});
revealItems.forEach(el=>{el.classList.add('reveal');revealObserver.observe(el)});

/* Force local logo assets. */
const localLogos={
  ahrefs:'assets/ahrefs.svg',
  sheets:'assets/google-sheets.svg',
  workspace:'assets/google-workspace.svg',
  google:'assets/google-search.svg'
};
Object.entries(localLogos).forEach(([name,path])=>{
  document.querySelectorAll(`.tool-icon.${name}`).forEach(icon=>{
    icon.style.setProperty('background-image',`url('${path}')`,'important');
    icon.style.setProperty('background-color','transparent','important');
    icon.style.setProperty('font-size','0','important');
  });
});

/* Noticeable but still smooth background parallax. The grid is fixed and repeats,
   so moving its background position creates depth without exposing empty space. */
const grid=document.querySelector('.grid-bg');
let ticking=false;
function updateParallax(){
  const y=window.scrollY;
  if(grid){
    const gridOffset=Math.round(y*0.16);
    grid.style.setProperty('background-position',`0 ${gridOffset}px`,'important');
    grid.style.setProperty('--glow-y',`${Math.round(y*0.09)}px`);
    grid.style.setProperty('--glow-x',`${Math.sin(y*0.002)*24}px`);
  }
  ticking=false;
}
updateParallax();
window.addEventListener('scroll',()=>{
  if(!ticking){requestAnimationFrame(updateParallax);ticking=true;}
},{passive:true});