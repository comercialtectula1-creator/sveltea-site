function $(s){return document.querySelector(s)}
function $all(s){return document.querySelectorAll(s)}

function formatMoney(n){return n.toFixed(2)}

function renderProducts(){
  const grid = $('#productsGrid'); if(!grid) return;
  grid.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.short}</p>
      <p class="price">${p.price} MXN</p>
      <div class="buttons">
        <button class="btn add" data-id="${p.id}">Agregar</button>
        <a href="${p.link}" class="btn ghost">Ver</a>
      </div>
    `;
    grid.appendChild(div);
  });
  $all('.add').forEach(btn=>btn.addEventListener('click', e=>addToCart(e.target.dataset.id)));
}

function getCart(){return JSON.parse(localStorage.getItem('sveltea_cart')||'{}')}
function saveCart(c){localStorage.setItem('sveltea_cart',JSON.stringify(c));updateCartCount()}
function addToCart(id){const c=getCart();c[id]=(c[id]||0)+1;saveCart(c);alert("Producto añadido")}
function updateCartCount(){const c=getCart();const n=Object.values(c).reduce((a,b)=>a+b,0);$('#cart-count').textContent=n}

function renderCartModal(){
  const itemsDiv=$('#cartItems'); const c=getCart(); itemsDiv.innerHTML=''; let total=0;
  for(const id in c){const p=PRODUCTS.find(p=>p.id===id)||{};const q=c[id];total+=p.price*q;
    itemsDiv.innerHTML+=`<div class="cart-item"><strong>${p.name}</strong> x${q} — ${p.price*q} MXN</div>`;
  }
  $('#cartTotal').textContent=total.toFixed(2);
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  updateCartCount();

  $('#cartBtn').addEventListener('click',()=>{
    $('#cartModal').classList.toggle('hidden');
    renderCartModal();
  });

  $('#closeCart').addEventListener('click',()=>$('#cartModal').classList.add('hidden'));

  $('#contactForm')?.addEventListener('submit',e=>{
    e.preventDefault(); alert("Gracias por tu mensaje 💌");
    e.target.reset();
  });
});
