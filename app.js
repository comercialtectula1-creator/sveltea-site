const PRODUCTS = [
  {
    id: "p01",
    name: "🌿 SVELTEA ESENCIA",
    price: 1000,
    short: "El inicio de la perfección natural.",
    image: "Escencia.jpeg",
    link: "product.html?id=p01"
  },
  {
    id: "p02",
    name: "🌸 SVELTEA RENOVA",
    price: 1200,
    short: "Renueva, Fluye, Evoluciona.",
    image: "Renova.jpeg",
    link: "product.html?id=p02"
  },
  {
    id: "p03",
    name: "🌺 SVELTEA SILUETA",
    price: 1400,
    short: "La proporción de tu belleza revelada.",
    image: "Silueta.jpeg",
    link: "product.html?id=p03"
  },
  {
    id: "p04",
    name: "💎 SVELTEA DEFINE",
    price: 1000,
    short: "Tu poder, definido con precisión dorada.",
    image: "Define.jpeg",
    link: "product.html?id=p04"
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
      <div>${p.price} MXN</div>
      <a href="${p.link}" class="btn">Ver</a>
    `;
    grid.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", renderProducts);
