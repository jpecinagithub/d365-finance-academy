# D365 Finance Academy

Portal gamificado de curso — primera toma de contacto con **Microsoft Dynamics 365 Finance**, centrado en el módulo de **Gestión Financiera**. Contenido íntegramente en español para principiantes hispanohablantes.

## Qué incluye

- **6 temas**: navegación, arquitectura, Libro Mayor, AP/AR, tesorería/bancos/activos fijos, presupuestos/cierre/reporting.
- Cada tema: **teoría** (4 bloques con conceptos clave e idea clave), **práctica guiada paso a paso** con **pantalla simulada de D365** recreada en CSS/JSX (sin capturas reales de Microsoft), y **test final de exactamente 10 preguntas** (60 en total).
- **Corrección instantánea**: nota, aciertos/fallos, respuesta correcta y explicación en cada pregunta. Aprobado con 7/10, reintentable.
- **Gamificación**: XP (+50 teoría+práctica, +100 aprobado, +50 extra por 10/10), 6 niveles (Explorador → Experto D365 Finance), 6 insignias, racha de días, progreso global. Todo persistido en **localStorage** (sin backend), con botón de reinicio.
- Diseño elegante y profesional: azul Microsoft `#0078D4`, navy `#0B1F3A`, dorado suave para gamificación. Responsive.

## Stack

Vite 5 + React 18 (JavaScript) · vite-plugin-pwa (manifest + service worker + iconos) · @vercel/analytics · CSS propio, sin backend.

## Arranque local

```bash
npm install
npm run dev       # desarrollo
npm run build     # producción -> dist/
npm run preview   # previsualizar el build
```

## Despliegue en Vercel (lo hace Jon)

1. Importar el repositorio/carpeta en Vercel (New Project).
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Sin variables de entorno necesarias.
4. Deploy. Activar Web Analytics en el dashboard si se desea (el código ya incluye `@vercel/analytics`).

## Autor

Jon Peciña · jpecina@gmail.com
