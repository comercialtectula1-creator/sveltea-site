function $(s){return document.querySelector(s)}
function $all(s){return document.querySelectorAll(s)}

function formatMoney(n){return n.toFixed(2)}

function renderProducts(){
  const grid = $('#productsGrid'); if(!grid) return;
  grid.innerHTML = '';
  for(const p of PRODUCTS){
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-media"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-short">${p.short}</p>
        <div class="card-bottom">
          <div class="price">$${formatMoney(p.price)} MXN</div>
          <div class="actions">
            <button class="btn add" data-id="${p.id}">Agregar</button>
            <a class="btn ghost" href="${p.link}">Ver</a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  }
  $all('.add').forEach(b=>b.addEventListener('click',e=>{ addToCart(e.currentTarget.dataset.id) }))
}

function getCart(){return JSON.parse(localStorage.getItem('sveltea_cart')||'{}')}
function saveCart(c){localStorage.setItem('sveltea_cart', JSON.stringify(c)); updateCartCount();}
function addToCart(id){
  const cart = getCart();
  cart[id] = (cart[id]||0)+1;
  saveCart(cart);
  const name = (PRODUCTS.find(p=>p.id===id)||{}).name||id;
  alert(name + ' agregado al carrito');
}
function updateCartCount(){
  const cart = getCart();
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  const el = $('#cart-count'); if(el) el.textContent = count;
}

function renderCartModal(){
  const modal = $('#cartModal'); if(!modal) return;
  const itemsDiv = $('#cartItems'); itemsDiv.innerHTML = '';
  const cart = getCart(); let total=0;
  for(const id in cart){
    const qty = cart[id];
    const product = PRODUCTS.find(p=>p.id===id) || {name:id,price:0,image:'logo.jpg'};
    const row = document.createElement('div'); row.className='cart-row';
    row.innerHTML = `<div class="row-left"><img src="${product.image}" alt="" /></div><div class="row-mid"><strong>${product.name}</strong><div class="muted">x${qty}</div></div><div class="row-right"><div>$${formatMoney(product.price*qty)}</div><button class="btn ghost remove" data-id="${id}">Eliminar</button></div>`;
    itemsDiv.appendChild(row);
    total += product.price*qty;
  }
  $('#cartTotal').textContent = formatMoney(total);
  $all('.remove').forEach(b=>b.addEventListener('click',e=>{ const id=e.currentTarget.dataset.id; const c=getCart(); delete c[id]; saveCart(c); renderCartModal(); }));
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts(); updateCartCount();
  const cartBtn = $('#cartBtn'); if(cartBtn) cartBtn.addEventListener('click',()=>{ $('#cartModal').classList.toggle('hidden'); renderCartModal(); });
  const closeCart = $('#closeCart'); if(closeCart) closeCart.addEventListener('click',()=>$('#cartModal').classList.add('hidden'));
  const contactForm = $('#contactForm'); if(contactForm) contactForm.addEventListener('submit', e=>{ e.preventDefault(); alert('Gracias — recibimos tu mensaje'); contactForm.reset(); });
});
