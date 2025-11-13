
const PRODUCTS = [
  {
    id: "p01",
    name: "Sveltea Esencia",
    price: 399,
    short: "Refresca y revitaliza la piel con extractos naturales.",
    image: "Escencia.jpeg",
    link: "product.html?id=p01"
  },
  {
    id: "p02",
    name: "Sveltea Renova 30 cápsulas",
    price: 699,
    short: "Regenera desde adentro. Colágeno, antioxidantes y vitaminas.",
    image: "Renova.jpeg",
    link: "product.html?id=p02"
  },
  {
    id: "p03",
    name: "Sveltea Silueta",
    price: 549,
    short: "Apoya el metabolismo y la definición corporal de forma natural.",
    image: "Silueta.jpeg",
    link: "product.html?id=p03"
  },
  {
    id: "p04",
    name: "Sveltea Define",
    price: 599,
    short: "Moldea, tonifica y resalta tu figura con ingredientes selectos.",
    image: "Define.jpeg",
    link: "product.html?id=p04"
  }
];
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
          <a class="btn ghost" href="product.html?id=${p.id}">Ver</a>
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

function addToCart(id){
  const cart = getCart();
  cart[id] = (cart[id]||0)+1;
  saveCart(cart);
  alert('Añadido al carrito')
}

function updateCartCount(){
  const cart = getCart();
  const count = Object.values(cart).reduce((a,b)=>a+b,0)
  const el = $('#cart-count'); if(el) el.textContent = count
}

function renderCartModal(){
  const modal = $('#cartModal'); if(!modal) return;
  const itemsDiv = $('#cartItems');
  const cart = getCart();
  itemsDiv.innerHTML = ''
  let total=0;
  for(const id in cart){
    const qty = cart[id];
    const product = PRODUCTS.find(p=>p.id===id) || {name:id,price:0,image:'assets/logo.jpg'}
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
  renderProducts(); updateCartCount();
  const cartBtn = $('#cartBtn'); if(cartBtn) cartBtn.addEventListener('click',()=>{ $('#cartModal').classList.toggle('hidden'); renderCartModal() })
  const closeCart = $('#closeCart'); if(closeCart) closeCart.addEventListener('click',()=>$('#cartModal').classList.add('hidden'))

  // contact form - simple local simulation
  const contactForm = $('#contactForm')
  if(contactForm) contactForm.addEventListener('submit', e=>{
    e.preventDefault(); alert('Gracias! Hemos recibido tu mensaje.')
    contactForm.reset()
  })

  // Checkout page handling
  const checkoutForm = $('#paymentForm')
  if(checkoutForm){
    // show summary
    const cart = getCart(); let total=0; for(const id in cart){ const p = PRODUCTS.find(x=>x.id===id); if(p) total+=p.price*cart[id] }
    $('#checkoutSummary').textContent = `Productos en carrito: ${Object.keys(cart).length} | Total: ${formatMoney(total)} MXN`
    checkoutForm.addEventListener('submit', e=>{
      e.preventDefault();
      const form = new FormData(checkoutForm);
      const payment = form.get('payment');
      // simulate different flow
      if(payment==='paypal'){
        // simulate redirection
        $('#paymentResult').classList.remove('hidden'); $('#paymentResult').textContent = 'Redirigiendo a PayPal (simulado)...'
        setTimeout(()=>{ window.location.href = 'https://www.paypal.com'; }, 1200)
      } else if(payment==='oxxo'){
        $('#paymentResult').classList.remove('hidden'); $('#paymentResult').textContent = 'Se generó un código de pago para OXXO (simulado). Por favor imprime o guarda el código.'
        // clear cart
        localStorage.removeItem('sveltea_cart'); updateCartCount();
      } else {
        $('#paymentResult').classList.remove('hidden'); $('#paymentResult').textContent = 'Pago con tarjeta procesado (simulado). Gracias por tu compra!'
        localStorage.removeItem('sveltea_cart'); updateCartCount();
      }
    })
  }
})
