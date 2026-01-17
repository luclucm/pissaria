
// Inizializzazione dopo il caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
  // Aggiorna anno nel footer se presente
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Filtri del menù: funzionano solo se la pagina li contiene
  const filters = document.querySelector('.filters');
  const cards = document.querySelectorAll('.card');

  if (filters && cards.length) {
    // Delegazione eventi sui bottoni filtro
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;

      // Aggiorna stato attivo
      filters.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Applica filtro
      const cat = btn.dataset.filter; // 'tutto' | 'pizze' | 'bevande' | 'dessert'
      cards.forEach(card => {
        const show = (cat === 'tutto') || (card.dataset.category === cat);
        // Usiamo hidden per accessibilità (display: none semantico)
        card.hidden = !show;
      });
    });
  }
});
