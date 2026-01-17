
// Utilità formattazione prezzi
const fmt = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

// Aggiorna anno nel footer
document.getElementById('year').textContent = new Date().getFullYear();

// FILTRI CATEGORIE
const filterBtns = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const cat = btn.dataset.filter; // tutto | pizze | bevande | dessert
    cards.forEach(c => {
      const show = (cat === 'tutto') || c.dataset.category === cat;
      c.style.display = show ? '' : 'none';
    });
  });
});

// MINICARRELLO (solo locale)
const cart = new Map(); // key: name, value: {price, qty}
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

function updateCartUI(){
  // badge quantità totale
  const totalQty = Array.from(cart.values()).reduce((s, it) => s + it.qty, 0);
  cartCountEl.textContent = totalQty;

  // lista elementi
  if (cart.size === 0){
    cartItemsEl.classList.add('empty');
    cartItemsEl.innerHTML = `<p>Nessun elemento. Aggiungi qualcosa dal menù 😋</p>`;
    cartTotalEl.textContent = fmt.format(0);
    return;
  }
  cartItemsEl.classList.remove('empty');
  cartItemsEl.innerHTML = '';

  let total = 0;
  for (const [name, {price, qty}] of cart.entries()){
    total += price * qty;

    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div><strong>${name}</strong><br><small>${fmt.format(price)} cad.</small></div>
      <div class="qty">
        <button aria-label="Diminuisci" data-act="dec" data-name="${name}">−</button>
        <strong>${qty}</strong>
        <button aria-label="Aumenta" data-act="inc" data-name="${name}">+</button>
      </div>
      <div>${fmt.format(price * qty)}</div>
      <div><button class="btn btn--ghost" data-act="rm" data-name="${name}">Rimuovi</button></div>
    `;
    cartItemsEl.appendChild(row);
  }
  cartTotalEl.textContent = fmt.format(total);
}

document.querySelectorAll('.add').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const current = cart.get(name) || { price, qty: 0 };
    current.qty += 1;
    cart.set(name, current);
    updateCartUI();

    // micro feedback
    btn.textContent = 'Aggiunta ✓';
    setTimeout(() => btn.textContent = 'Aggiungi', 900);
  });
});

document.querySelector('.fab').addEventListener('click', () => {
  cartModal.showModal();
});
cartModal.addEventListener('click', (e) => {
