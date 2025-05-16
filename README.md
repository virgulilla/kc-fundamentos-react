# Nodepop Dashboard (Práctica de Fundamentos de React)

## Descripción

Aplicación frontend desarrollada con React que actúa como panel de administración para gestionar anuncios en la API de Nodepop.

Esta práctica tiene como objetivo consolidar fundamentos clave de React, incluyendo enrutamiento, manejo de estado, peticiones HTTP, manejo de formularios, control de rutas protegidas y diseño responsive.

## Tecnologías utilizadas

- React
- React Router DOM
- Axios
- TailwindCSS (para el diseño responsivo y moderno)
- Vite (para la inicialización y bundling del proyecto)

## Backend utilizado

Se utiliza el backend de Nodepop disponible en:
https://github.com/davidjj76/nodepop-api

La API corre por defecto en el puerto `3001` y expone diferentes endpoints para gestión de usuarios y anuncios. Se puede consultar y probar la API vía Swagger en `http://localhost:3001/swagger`.

### Endpoints relevantes

- **Usuarios**
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- **Anuncios**
  - `GET /api/v1/adverts`
  - `GET /api/v1/adverts/tags`
  - `GET /api/v1/adverts/:id`
  - `POST /api/v1/adverts`
  - `DELETE /api/v1/adverts/:id`

> Nota: Todas las rutas `/adverts` requieren autenticación mediante token (`Authorization: Bearer <token>`).

---

## Estructura de la aplicación (Frontend)

### Rutas públicas

- `/login`: Formulario de login.

### Rutas protegidas (requieren login)

- `/`: Redirecciona a `/adverts`.
- `/adverts`: Página de listado de anuncios con filtros.
- `/adverts/:id`: Página de detalle de un anuncio. Permite eliminar el anuncio con confirmación.
- `/adverts/new`: Formulario de creación de anuncio.
- `*`: Cualquier ruta no válida redirecciona a `NotFoundPage`.

---

## Funcionalidades implementadas

### LoginPage

- Formulario de login con email y password.
- Opción "Recordar usuario" (persiste sesión en `localStorage`).

### AdvertsPage

- Listado de anuncios mostrando nombre, precio, tipo (compra/venta) y tags.
- Filtros aplicables (al menos 3 implementados):
  - Nombre.
  - Compra/Venta.
  - Rango de precio.
  - Tags.
- Opciones de filtrado enviando directamente la query al backend.
- Mensaje si no hay anuncios disponibles.
- Enlaces a detalles del anuncio (`/adverts/:id`).
- Enlace directo a crear un nuevo anuncio.

### AdvertPage

- Vista de detalle completa con foto, precio, tipo y tags.
- Redirección a 404 si no existe el anuncio.
- Botón de eliminación con confirmación personalizada (sin `window.confirm`).
- Redirección automática a `/adverts` tras borrar.

### NewAdvertPage

- Formulario completo con validación de:
  - Nombre.
  - Compra/Venta.
  - Tags.
  - Precio.
  - Foto (opcional).
- El botón de enviar solo se habilita si el formulario es válido.
- Redirección al detalle del anuncio tras crearlo.

### NotFoundPage

- Página elegante de 404 con botón contextual según si el usuario está logueado.

### Layout general

- Sidebar siempre visible (colapsable).
- Layout responsive y mobile-first.
- Header fijo con botón de logout y toggle de modo oscuro.
- Sidebar colapsable tanto en desktop como en mobile.
- Confirmación personalizada para logout y eliminar anuncio.

---

## Estilo y buenas prácticas aplicadas

- Estilado 100% con TailwindCSS siguiendo enfoque mobile-first.
- Se ha evitado el uso de librerías externas de formularios o UI complejas.
- Código limpio y organizado con separación clara por páginas y componentes.
- Uso de hooks propios para abstracción de lógica.
- Uso de `localStorage` controlado para mantener la sesión del usuario.
- Manejo de errores de API controlado con redirección a 404 en casos necesarios.
- Confirmaciones modales reutilizables sin usar `window.confirm`.

---

## Consideraciones adicionales

- Todas las rutas protegidas redireccionan a `/login` si no hay sesión activa.
- El `token` de sesión se almacena de forma segura y se envía en todas las peticiones autenticadas.
- Manejo de UI seguro para evitar renders duplicados o fugas de memoria con efectos protegidos.
- Responsive cuidado: Sidebar, botones y formularios optimizados para uso en dispositivos móviles.

---

## Instalación y puesta en marcha

### Clonar backend (Nodepop API)

```bash
git clone https://github.com/davidjj76/nodepop-api.git
cd nodepop-api
npm install
npm start
```

- Acceso API: http://localhost:3001
- Swagger: http://localhost:3001/swagger

### Clonar frontend (React Dashboard)

```bash
git clone https://github.com/virgulilla/kc-fundamentos-react.git
cd kc-nodepop-react
npm install
npm run dev
```
