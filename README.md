# 🟡 Yellow Maxikiosco — Landing Page

Landing page estática para **Yellow Maxikiosco**, Córdoba, Argentina.  
Diseño oscuro, mobile-first, con animaciones y SEO completo.

---

## 📁 Estructura del proyecto

```
yellow-maxikiosco/
│
├── index.html              # HTML principal
├── css/
│   └── styles.css          # Estilos (mobile-first, responsive)
├── js/
│   └── main.js             # JavaScript modular
├── assets/
│   ├── images/             # Fotos del local, og-image.jpg
│   ├── icons/              # favicon.svg, favicon.ico, apple-touch-icon.png
│   └── fonts/              # Fuentes locales (opcional)
└── README.md
```

---

## 🚀 Inicio rápido

Este proyecto es 100% estático. No necesita bundlers ni dependencias.

### Opción 1 — Abrir directo
Abrí `index.html` en tu navegador.

### Opción 2 — Live server (recomendado para desarrollo)
```bash
# Con VS Code: instalar extensión "Live Server" y hacer click en "Go Live"

# Con Node.js:
npx serve .

# Con Python:
python -m http.server 8000
```

---

## ✏️ Personalización

### Cambiar número de WhatsApp
Buscá en `index.html` todas las apariciones de:
```
5493584365589
```
Y reemplazalas con tu número en formato internacional (sin `+`).

### Cambiar coordenadas del mapa
En `index.html`, buscá el iframe del mapa:
```html
src="https://maps.google.com/maps?q=-32.455161,-64.385389&z=16&output=embed"
```
Reemplazá `-32.455161,-64.385389` con tus coordenadas.  
También actualizá el Schema.org en el `<head>`.

### Cambiar precios de promos
Las promos están en la sección `#promos` del `index.html`.  
Cada `.promo-price` tiene el valor que podés editar directamente.

### Cambiar colores
En `css/styles.css`, al inicio del archivo:
```css
:root {
  --color-yellow: #F5C842;   /* Color principal */
  --color-black:  #080808;   /* Fondo */
  ...
}
```

### Agregar imágenes del local
Guardá las fotos en `assets/images/` y referencialas en `index.html`:
```html
<img src="assets/images/foto-local.jpg" alt="Interior de Yellow Maxikiosco" />
```

---

## 📱 Breakpoints

| Breakpoint | Dispositivo          |
|------------|----------------------|
| < 480px    | Mobile pequeño       |
| < 768px    | Mobile / Tablet      |
| < 900px    | Tablet               |
| < 1024px   | Tablet grande        |
| ≥ 1200px   | Desktop              |

---

## 🔍 SEO incluido

- Meta tags completos (title, description, keywords, robots)
- Open Graph para redes sociales
- Twitter Card
- Schema.org `ConvenienceStore` con JSON-LD
- Datos geográficos (geo.region, geo.position)
- Link canónico

**Para activar el SEO correctamente:**
1. Cambiá la URL canónica en el `<head>`: `https://tu-dominio.com.ar/`
2. Agregá una imagen para compartir en `assets/images/og-image.jpg` (1200×630px)

---

## ♿ Accesibilidad

- Skip link para lectores de pantalla
- ARIA labels en todos los elementos interactivos
- Roles semánticos (`role="list"`, `role="status"`, etc.)
- Soporte para `prefers-reduced-motion`
- Contraste verificado

---

## 🧩 Tecnologías

| Tecnología | Uso |
|------------|-----|
| HTML5 semántico | Estructura |
| CSS3 Variables + Grid + Flexbox | Estilos |
| Vanilla JavaScript (ES6+) | Interactividad |
| Google Fonts | Tipografías |
| Google Maps Embed | Mapa |

**Sin frameworks. Sin dependencias. Sin build step.**

---

## 🌐 Deploy

### Netlify (recomendado)
1. Creá cuenta en [netlify.com](https://netlify.com)
2. Arrastrá la carpeta del proyecto al dashboard
3. ¡Listo! URL automática en segundos

### GitHub Pages
1. Subí el repo a GitHub
2. Ir a Settings → Pages → Source: `main` / `root`
3. Accedé en `https://tu-usuario.github.io/yellow-maxikiosco`

### Vercel
```bash
npx vercel
```

---

## 📋 Checklist antes de publicar

- [ ] Actualizar número de WhatsApp
- [ ] Actualizar URL canónica
- [ ] Agregar `assets/images/og-image.jpg` (1200×630px)
- [ ] Agregar `assets/icons/favicon.svg` y `favicon.ico`
- [ ] Verificar coordenadas del mapa
- [ ] Actualizar precios de promos
- [ ] Probar en mobile real
- [ ] Correr Lighthouse para verificar performance

---

## 👤 Autor

**Yellow Maxikiosco**  
📍 Córdoba, Argentina  
📱 +549 358 436-5589  
🔗 [wa.me/5493584365589](https://wa.me/5493584365589)

---

*Landing page desarrollada con HTML, CSS y JS puro. Sin frameworks.*
