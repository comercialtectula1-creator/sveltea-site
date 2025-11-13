
Sveltea - Sitio estático para GitHub Pages
-----------------------------------------

Contenido del paquete:
- index.html
- product.html
- checkout.html
- css/styles.css
- js/app.js
- assets/logo.jpg
- products.json

Instrucciones de despliegue en GitHub Pages:
1. Crea un repositorio nuevo en GitHub (por ejemplo: sveltea-site).
2. Sube todos los archivos del ZIP al branch `main` (o `gh-pages` si prefieres).
3. En Settings -> Pages, selecciona el branch `main` y la carpeta `/ (root)` y guarda.
4. GitHub Pages servirá tu sitio en https://<tu-usuario>.github.io/<repo>/

Nota sobre pagos:
Este sitio es estático. Para aceptar pagos reales necesitarás integrar un proveedor (Stripe, PayPal, Conekta, etc.).
Las llamadas de pago en este ejemplo son simuladas: el flujo de "pago" borra el carrito y muestra un mensaje.
Para producción, sigue la documentación oficial del proveedor de pago y asegura TLS/HTTPS y manejo seguro de datos.

Personalización:
- Reemplaza assets/logo.jpg por el logo final en alta resolución.
- Actualiza la lista de productos en js/app.js o conecta un CMS/archivo JSON.
- Añade etiquetas meta y SEO según necesites.
