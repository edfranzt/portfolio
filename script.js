const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.placement');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  cards.forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.type !== filter));
}));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = '1';
    const target = Number(entry.target.dataset.count);
    const start = performance.now();
    const duration = 1000;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      entry.target.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, {threshold:.5});
counters.forEach(c => counterObserver.observe(c));

const revealItems = document.querySelectorAll('.section, .stats, .placement');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:.08});
revealItems.forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });
