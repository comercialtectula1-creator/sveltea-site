function $(sel){return document.querySelector(sel)}
function $all(sel){return document.querySelectorAll(sel)}

function formatMoney(n){return n.toFixed(2)}

function renderProducts(){
  const grid = $('#productsGrid')
  if(!grid) return;
  grid.innerHTML = ''
  for(const p of PRODUCTS){
    const card = document.createElement('div'); card.className='card'
    card.innerHTML = `
      <div>
        <div class="product-img"><img src="${p.image}" alt="${p.name}" style="max-width:100%;max-height:100%"></div>
        <h3 class="product-title">${p.name}</h3>
        <div class="muted">${p.short}</div>
      </div>
      <div style="margin-top:12px">
        <div class="product-price">${formatMoney(p.price)} MXN</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn add" data-id="${p.id}">Agregar</button>
          <a class="btn ghost" href="${p.link}">Ver</a>
        </div>
      </div>
    `
    grid.appendChild(card)
  }
  $all('.add').forEach(b=>b.addEventListener('click',e=>{
    addToCart(e.currentTarget.dataset.id)
  }))
}

function getCart(){return JSON.parse(localStorage.getItem('sveltea_cart')||'{}')}
function saveCart(c){localStorage.setItem('sveltea_cart', JSON.stringify(c)); updateCartCount();}
function addToCart(id){const cart = getCart(); cart[id] = (cart[id]||0)+1; saveCart(cart); alert('Añadido al carrito')}
function updateCartCount(){const cart = getCart(); const count = Object.values(cart).reduce((a,b)=>a+b,0); const el = $('#cart-count'); if(el) el.textContent = count}

function renderCartModal(){
  const modal = $('#cartModal'); if(!modal) return;
  const itemsDiv = $('#cartItems');
  const cart = getCart();
  itemsDiv.innerHTML = ''
  let total=0;
  for(const id in cart){
    const qty = cart[id];
    const product = PRODUCTS.find(p=>p.id===id) || {name:id,price:0,image:'logo.jpeg'}
    const row = document.createElement('div'); row.className='cart-item'
    row.innerHTML = `<img src="${product.image}"><div style="flex:1"><strong>${product.name}</strong><div class="muted">x${qty}</div></div><div style="text-align:right"><div>${formatMoney(product.price*qty)}</div><button class="btn ghost remove" data-id="${id}">Eliminar</button></div>`
    itemsDiv.appendChild(row)
    total += product.price*qty
  }
  $('#cartTotal').textContent = formatMoney(total)
  $all('.remove').forEach(b=>b.addEventListener('click',e=>{
    const id=e.currentTarget.dataset.id; const cart=getCart(); delete cart[id]; saveCart(cart); renderCartModal()
  }))
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  updateCartCount();

  const cartBtn = $('#cartBtn');
  if(cartBtn) cartBtn.addEventListener('click',()=>{
    $('#cartModal').classList.toggle('hidden');
    renderCartModal();
  });

  const closeCart = $('#closeCart');
  if(closeCart) closeCart.addEventListener('click',()=>$('#cartModal').classList.add('hidden'));

  const contactForm = $('#contactForm');
  if(contactForm) contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Gracias! Hemos recibido tu mensaje.');
    contactForm.reset();
  });
});

