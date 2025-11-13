const PRODUCTS = [
  {
    id: "p01",
    name: "🌿 SVELTEA ESENCIA",
    price: 1000,
    short: "El inicio de la perfección natural.",
    image: "Escencia.jpeg"
  },
  {
    id: "p02",
    name: "🌸 SVELTEA RENOVA",
    price: 1200,
    short: "Renueva, Fluye, Evoluciona.",
    image: "Renova.jpeg"
  },
  {
    id: "p03",
    name: "🌺 SVELTEA SILUETA",
    price: 1400,
    short: "La proporción de tu belleza revelada.",
    image: "Silueta.jpeg"
  },
  {
    id: "p04",
    name: "💎 SVELTEA DEFINE",
    price: 1000,
    short: "Tu poder, definido con precisión dorada.",
    image: "Define.jpeg"
  }
];

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const p of PRODUCTS) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="muted">${p.short}</div>
      <div><strong>${p.price} MXN</strong></div>
      <div class="btn-container">
        <button class="btn add" data-id="${p.id}">Agregar al carrito</button>
        <a href="product.html?id=${p.id}" class="btn ghost">Ver</a>
      </div>
    `;
    grid.appendChild(card);
  }

  // evento del carrito
  document.querySelectorAll(".add").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      const prod = PRODUCTS.find(x => x.id === id);
      alert(`${prod.name} añadido al carrito 🛍️`);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderProducts);
