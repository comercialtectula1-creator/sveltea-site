// ============================
// CARGAR CARRITO DE LOCALSTORAGE
// ============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ============================
// ACTUALIZAR CONTADOR HEADER
// ============================
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = totalItems;
}

// ============================
// GUARDAR EN LOCALSTORAGE
// ============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartPanel();
}

// ============================
// AGREGAR PRODUCTO
// ============================
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
}

// ============================
// RENDER PANEL DEL CARRITO
// ============================
function renderCartPanel() {
  const container = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");

  if (!container || !totalSpan) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    container.innerHTML += `
      <p>
        ${item.name} — $${item.price} x ${item.quantity}
      </p>
    `;
    total += item.price * item.quantity;
  });

  totalSpan.textContent = total;
}

// ============================
// VACÍAR CARRITO
// ============================
function vaciarCarrito() {
  cart = [];
  saveCart();
  alert("🛒 Carrito reiniciado");
}

// ============================
// INICIALIZACIÓN
// ============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPanel();

  // Botón abrir/cerrar panel
  const btn = document.getElementById("cart-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      document.getElementById("cart-panel").classList.toggle("open");
    });
  }
});
