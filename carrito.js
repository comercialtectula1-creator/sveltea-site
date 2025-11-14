// CARGAR CARRITO O CREAR UNO NUEVO
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ACTUALIZAR CONTADOR EN EL HEADER
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

updateCartCount(); // Cargar al iniciar

// BOTONES DE AGREGAR AL CARRITO
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        name,
        price,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
  });
});
