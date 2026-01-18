
document.addEventListener('DOMContentLoaded', () => {
  // 1) Anno footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Evidenzia link corrente in navbar
  const navLinks = document.querySelectorAll('.nav__right a');
  const path = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href.endsWith('index.html'))) {
      a.classList.add('is-current');
    }
  });

  // 3) Banner promo: visibile SOLO il 2026-01-18 (in base alla data locale dell'utente)
  const promo = document.getElementById('promo-banner');
  if (promo) {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const today = `${yyyy}-${mm}-${dd}`;
    promo.hidden = (today !== '2026-01-18');
  }

  // 4) Filtri del menù (se presenti nella pagina)
  const filters = document.querySelector('.filters');
  const cards = document.querySelectorAll('.card[data-category]');
  if (filters && cards.length) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;

      filters.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const cat = btn.dataset.filter; // 'tutto' | 'pizze'
      cards.forEach(card => {
        const show = (cat === 'tutto') || (card.dataset.category === cat);
        card.hidden = !show;  // accessibile e semplice
      });
    });
  }
});
