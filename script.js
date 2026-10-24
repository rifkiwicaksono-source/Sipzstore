const productPriceMap = {
  'Business Card': 120000,
  'Flyer': 180000,
  'Poster': 260000,
  'Banner': 420000,
};

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const selectProduct = document.getElementById('productSelect');
const quantityInput = document.getElementById('quantityInput');
const totalPrice = document.getElementById('totalPrice');
const priceCards = document.querySelectorAll('.price-card');
const quoteForm = document.getElementById('quoteForm');

function formatCurrency(value) {
  return currencyFormatter.format(value).replace('Rp', 'Rp');
}

function calculateTotal() {
  const product = selectProduct.value;
  const basePrice = productPriceMap[product] ?? 120000;
  const quantity = Math.max(Number(quantityInput.value) || 1, 1);

  const total = basePrice * quantity;
  totalPrice.textContent = formatCurrency(total);
  return total;
}

priceCards.forEach((card) => {
  card.addEventListener('click', () => {
    priceCards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');

    const product = card.dataset.product;
    const price = Number(card.dataset.price);
    productPriceMap[product] = price;
    selectProduct.value = product;
    calculateTotal();
  });
});

selectProduct.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = quoteForm.elements.name.value.trim();
  const total = calculateTotal();

  const message = `Thank you, ${name || 'customer'}! Your request has been prepared. Estimated total: ${formatCurrency(total)}.`;
  window.alert(message);
  quoteForm.reset();
  totalPrice.textContent = formatCurrency(productPriceMap['Business Card'] * 100);
  selectProduct.value = 'Business Card';
  quantityInput.value = 100;
});

calculateTotal();
