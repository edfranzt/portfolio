const filters=document.querySelectorAll('.filter');
const cards=[...document.querySelectorAll('.placement')];
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;cards.forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.type!==filter));}));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting||entry.target.dataset.done)return;entry.target.dataset.done='1';const target=Number(entry.target.dataset.count);const start=performance.now();const duration=1000;const tick=now=>{const progress=Math.min((now-start)/duration,1);entry.target.textContent=Math.floor(progress*target);if(progress<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);});},{threshold:.5});
counters.forEach(c=>counterObserver.observe(c));

const revealItems=document.querySelectorAll('.section,.stats,.placement');
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});},{threshold:.08});
revealItems.forEach(el=>{el.classList.add('reveal');revealObserver.observe(el)});

/* Keep only the real Ahrefs logo; other toolkit items use their text labels. */
document.querySelectorAll('.tool-icon.sheets,.tool-icon.workspace,.tool-icon.google').forEach(icon=>{
  icon.style.backgroundImage='none';
  icon.style.fontSize='11px';
});

/* Reliable parallax: move the grid background itself instead of transforming the fixed layer. */
const parallaxStyle=document.createElement('style');
parallaxStyle.textContent='.grid-bg{z-index:0!important;pointer-events:none;background-position:0 0!important}.grid-bg:after{pointer-events:none}body>header,body>main,body>.footer{position:relative;z-index:1}';
document.head.appendChild(parallaxStyle);

const grid=document.querySelector('.grid-bg');
let ticking=false;
function updateParallax(){
  const y=window.scrollY;
  grid.style.backgroundPosition=`0 ${y*0.035}px`;
  grid.style.setProperty('--glow-y',`${y*0.07}px`);
  grid.style.setProperty('--glow-x',`${Math.sin(y*0.002)*18}px`);
  ticking=false;
}
updateParallax();
window.addEventListener('scroll',()=>{
  if(!ticking){requestAnimationFrame(updateParallax);ticking=true;}
},{passive:true});
