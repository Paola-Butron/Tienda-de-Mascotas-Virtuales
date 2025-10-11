
Tienda Mascotas - Versión completa (frontend)

Instrucciones:
1. Descomprime el ZIP.
2. Ejecuta:
   npm install
   npm run dev
3. Abre http://localhost:5173

Características incluidas:
- Landing con búsqueda, 3 categorías destacadas, top12 más vendidos, 3 categorías nuevas, 6 productos nuevos, banner publicitario.
- Footer con enlaces.
- Búsqueda con filtros por categoría, ordenar por nombre/precio.
- Detalle de producto con "Agregar al carrito".
- Carrito con cambiar cantidad, total, "guardar para después" persistente.
- Checkout con QR o tarjeta (simulado), validaciones, creación de orden (guardada in STORAGE).
- Registro/Login simple con localStorage, recuperación simulada de contraseña.
- Perfil de usuario con listado de órdenes (desde storage).
- Admin: Dashboard, gestión de productos (activar/desactivar), gestión de usuarios, categorías (CRUD simple).
- Persistencia en localStorage para productos, carrito, guardados, usuarios y órdenes.
- ~50 productos de ejemplo and mínimo 6 categorías.
- Paginación básica en listado de productos (12 por página).
- Animaciones sencillas con Framer Motion.

Limitaciones:
- No hay backend ni envío real de correos ni pasarela de pago (todo simulado para el entregable académico).
- Seguridad básica: contraseñas guardadas en claro en localStorage (ok para demo, no para producción).
