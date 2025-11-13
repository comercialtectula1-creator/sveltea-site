const PRODUCTS = {
  p01: {
    name: "🌿 SVELTEA ESENCIA",
    desc: `✨ El inicio de la perfección natural.<br>
    Despierta la energía femenina que habita en ti.<br>
    Purifica, equilibra y prepara tu cuerpo para renacer.<br>
    Como la proporción áurea, cada célula encuentra su armonía.<br>
    Tu transformación comienza desde el interior.`,
    price: 1000,
    image: "Escencia1.jpeg"
  },
  p02: {
    name: "🌸 SVELTEA RENOVA",
    desc: `👑 Renueva, Fluye, Evoluciona.<br>
    Tu cuerpo se alinea con la belleza universal.<br>
    Libérate de lo que no necesitas y deja surgir tu poder.`,
    price: 1200,
    image: "Renova1.jpeg"
  },
  p03: {
    name: "🌺 SVELTEA SILUETA",
    desc: `💫 La proporción de tu belleza revelada.<br>
    Moldea, define y celebra tu esencia.`,
    price: 1400,
    image: "Silueta1.jpeg"
  },
  p04: {
    name: "💎 SVELTEA DEFINE",
    desc: `🌙 Tu poder, definido con precisión dorada.<br>
    La culminación de tu transformación.`,
    price: 1000,
    image: "Define1.jpeg"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = PRODUCTS[id];
  const container = document.getElementById("productDetail");

  if (!product) {
    container.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  container.innerHTML = `
    <div class="product-box">
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.desc}</p>
        <div class="price">${product.price} MXN</div>
        <button class="btn">Agregar al carrito</button>
      </div>
    </div>
  `;
});

