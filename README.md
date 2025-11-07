# E-commerce Tienda de Ropa

E-commerce completo desarrollado con TypeScript, React y Node.js con enfoque en seguridad y mejores prácticas.

## Características Destacadas

- ✅ **Autenticación JWT** con bcrypt y rate limiting
- ✅ **Sistema de pedidos** completo con QR de pago
- ✅ **Checkout flexible** (usuarios registrados e invitados)
- ✅ **Seguridad avanzada**: CSP, CORS, Helmet, Rate Limiting
- ✅ **TypeScript strict** en todo el proyecto
- ✅ **Responsive design** con Tailwind CSS v4
- ✅ **SSL A+** y **Security Headers A+**

## Stack Tecnológico

### Backend

- **Runtime:** Node.js 22.x
- **Framework:** Express 5.x
- **Lenguaje:** TypeScript 5.x
- **Base de datos:** MongoDB Atlas
- **Autenticación:** JWT + bcrypt
- **Seguridad:** Helmet, express-rate-limit, express-validator
- **Deploy:** Render.com

### Frontend

- **Framework:** React 19.x
- **Build tool:** Vite 7.x
- **Lenguaje:** TypeScript 5.x
- **Routing:** React Router v7
- **Estilos:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Deploy:** Vercel

## Seguridad Implementada

### Headers de Seguridad

- `Content-Security-Policy`: Previene XSS
- `X-Frame-Options`: Previene Clickjacking
- `X-Content-Type-Options`: Previene MIME sniffing
- `Referrer-Policy`: Control de información de referencia
- `Permissions-Policy`: Control de APIs del navegador

### Protecciones Backend

- Rate limiting: 100 req/15min (API general)
- Rate limiting: 5 intentos/15min (autenticación)
- Rate limiting: 10 pedidos/hora
- Validación de inputs con express-validator
- Sanitización de datos
- CORS configurado estrictamente
- Passwords hasheados con bcrypt (salt rounds: 10)

## 📦 Estructura del Proyecto

```
ecommerce-tienda-ropa/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── interfaces/
    │   ├── config/
    │   └── App.tsx
    └── package.json
```

## 🌐 URLs de Producción

- **Frontend:** https://ecommerce-tienda-ropa.vercel.app
- **Backend API:** https://ecommerce-tienda-ropa-backend.onrender.com
- **Repositorio:** https://github.com/HernanAndresZaracho/ecommerce-tienda-ropa

## 🧪 Testing

### Endpoints Principales

- `GET /api/productos` - Listar productos
- `POST /api/auth/registro` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos/usuario/mis-pedidos` - Historial (requiere auth)

### Flujo de Compra

1. Agregar productos al carrito
2. Checkout (con o sin registro)
3. Pago con QR (simulado)
4. Confirmación de pedido
5. Historial (solo usuarios registrados)

## Métricas de Seguridad

- **SSL Labs:** A+
- **Security Headers:** A+
- **Mozilla Observatory:** A+

## Equipo

- **Planckton** - Project Manager
- **Backary** - Backend Developer
- **Héctor** - Frontend Developer
- **Tessio** - QA Tester
- **Dess** - UI/UX Designer

## Licencia

Proyecto educativo - 2025
