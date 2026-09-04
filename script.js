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
  ahrefs:'assets/ahrefs-logo.svg',
  sheets:'assets/google-sheets.svg',
  workspace:'assets/google-workspace.svg',
  google:'assets/google-search.svg'
};
Object.entries(localLogos).forEach(([name,path])=>{
  document.querySelectorAll(`.tool-icon.${name}`).forEach(icon=>{
    icon.style.setProperty('background-image','none','important');
    icon.style.setProperty('background-color','transparent','important');
    icon.style.setProperty('font-size','0','important');
    icon.style.setProperty('color','transparent','important');
    icon.style.setProperty('text-indent','-9999px','important');
    icon.textContent='';
    icon.querySelectorAll('img,svg').forEach(el=>el.remove());
    const img=document.createElement('img');
    img.src=path;
    img.alt=name==='ahrefs'?'Ahrefs':name;
    img.style.cssText='width:70%;height:70%;object-fit:contain;display:block;margin:auto;';
    icon.appendChild(img);
  });
});

/* Prevent any existing pseudo-element/icon fallback from covering the real Ahrefs SVG. */
const logoFixStyle=document.createElement('style');
logoFixStyle.textContent=`
.tool-icon.ahrefs::before,.tool-icon.ahrefs::after{content:none!important;display:none!important}
.tool-icon.ahrefs img{width:70%!important;height:70%!important;object-fit:contain!important;display:block!important;margin:auto!important}
`;
document.head.appendChild(logoFixStyle);

/* Animated SEO atom / network hero visual. */
const atomStyle=document.createElement('style');
atomStyle.textContent=`
.hero-visual{will-change:transform;transform:translate3d(0,0,0)}
.hero-visual .orbit{transform-origin:50% 50%;will-change:transform}
.hero-visual .orbit-a{animation:seoOrbitA 12s linear infinite}
.hero-visual .orbit-b{animation:seoOrbitB 16s linear infinite reverse}
.hero-visual .network{animation:seoNetwork 10s ease-in-out infinite}
.hero-visual .node{animation:seoNode 3.5s ease-in-out infinite}
.hero-visual .n1{animation-delay:-.8s}.hero-visual .n2{animation-delay:-1.6s}.hero-visual .n3{animation-delay:-2.4s}.hero-visual .n4{animation-delay:-3.2s}
.hero-visual .core{animation:seoCore 4s ease-in-out infinite}
@keyframes seoOrbitA{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes seoOrbitB{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
@keyframes seoNetwork{0%,100%{transform:scale(1) rotate(0deg);opacity:.72}50%{transform:scale(1.025) rotate(1deg);opacity:1}}
@keyframes seoNode{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(0,-7px,0) scale(1.04)}}
@keyframes seoCore{0%,100%{transform:scale(1);box-shadow:0 0 30px rgba(85,214,255,.08)}50%{transform:scale(1.035);box-shadow:0 0 55px rgba(85,214,255,.16)}}
@media (prefers-reduced-motion:reduce){.hero-visual .orbit,.hero-visual .network,.hero-visual .node,.hero-visual .core{animation:none!important}}
`;
document.head.appendChild(atomStyle);

/* Scroll parallax for the atom: the whole SEO visual drifts subtly as the hero scrolls. */
const heroVisual=document.querySelector('.hero-visual');
let ticking=false;
function updateParallax(){
  const y=window.scrollY;
  if(heroVisual){
    const drift=Math.min(y*.10,90);
    heroVisual.style.transform=`translate3d(0,${-drift}px,0)`;
  }
  ticking=false;
}
updateParallax();
window.addEventListener('scroll',()=>{
  if(!ticking){requestAnimationFrame(updateParallax);ticking=true;}
},{passive:true});