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

/* True layer parallax: move the entire grid independently from the page content. */
const parallaxLayerStyle=document.createElement('style');
parallaxLayerStyle.textContent='.grid-bg{z-index:0!important;pointer-events:none!important;will-change:transform;background-position:0 0!important}.grid-bg:after{pointer-events:none!important;will-change:transform}body>header,body>main,body>.footer{position:relative;z-index:1}';
document.head.appendChild(parallaxLayerStyle);

const grid=document.querySelector('.grid-bg');
let ticking=false;
function updateParallax(){
  const y=window.scrollY;
  if(grid){
    grid.style.transform=`translate3d(0,${Math.round(y*0.14)}px,0)`;
    grid.style.setProperty('--glow-y',`${Math.round(y*0.22)}px`);
    grid.style.setProperty('--glow-x',`${Math.sin(y*0.002)*28}px`);
  }
  ticking=false;
}
updateParallax();
window.addEventListener('scroll',()=>{
  if(!ticking){requestAnimationFrame(updateParallax);ticking=true;}
},{passive:true});