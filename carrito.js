// =====================================================
// CARRITO GLOBAL SVELTEA
// =====================================================

// Si ya existe carrito guardado, lo cargamos
let cart = JSON.parse(localStorage.getItem("cart_sveltea")) || [];

// Abrir panel carrito
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartPanel = document.getElementById("cart-panel");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      cartPanel.classList.toggle("open");
      renderCart();
    });
  }

  renderCart();
});

// Agregar producto
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart_sveltea", JSON.stringify(cart));
  renderCart();
}

// Mostrar carrito
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    container.innerHTML += `<p>${item.name} — $${item.price}</p>`;
    total += item.price;
  });

  if (totalSpan) totalSpan.textContent = total;
}
