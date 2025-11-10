# 📚 Guía Interactiva de Desarrollo Web

Una guía interactiva y completa de **CSS y JavaScript** en español, diseñada para principiantes y desarrolladores que quieren reforzar sus conocimientos de forma práctica y visual.

## ✨ Características

- **Playgrounds Interactivos**: Experimenta con código en tiempo real
- **Explicaciones Detalladas**: Conceptos explicados paso a paso con ejemplos
- **Ejercicios Prácticos**: Aprende haciendo con múltiples ejercicios
- **Framework Moderno**: Construido con Astro para máximo rendimiento
- **Dark Mode**: Soporte automático con tema oscuro
- **Responsive Design**: Funciona perfectamente en cualquier dispositivo
- **Navegación Dinámica**: Contenido organizado y fácil de navegar
- **100% en Español**: Toda la documentación en español

## 📖 Contenido Actual

### CSS
- ✅ **Conceptos Fundamentales**: Introducción a CSS, sintaxis básica
- ✅ **Modelo de Caja**: Box model, padding, margin, border
- ✅ **Selectores**: Tipos de selectores y especificidad
- ✅ **Flexbox**: Layout flexible con playgrounds interactivos
- ✅ **Grid**: Sistema de cuadrícula CSS con ejemplos prácticos

### JavaScript
- ✅ **Conceptos Básicos**: Variables, tipos de datos, operadores
- ✅ **Condicionales**: if/else, switch, operadores lógicos
- ✅ **Bucles**: for, while, do-while con ejemplos detallados
- ✅ **Funciones**: Funciones tradicionales y arrow functions
- ✅ **Ejercicios Prácticos**: 7+ ejercicios con soluciones

### Próximamente 🔜
- Arrays y Métodos de Array
- Objetos y Manipulación de Datos
- DOM Manipulation
- Eventos y Event Listeners
- Fetch API y Asincronía
- ES6+ Features
- Y mucho más...

## 🏗️ Arquitectura del Proyecto

```
/src
├── components/
│   ├── Layout.astro              # Layout principal
│   ├── Navigation.astro          # Navegación dinámica
│   ├── CodePlayground.astro      # Playground interactivo de código
│   ├── FlexPlayground.astro      # Playground específico para Flexbox
│   └── GridPlayground.astro      # Playground específico para Grid
├── content/                      # Contenido en MDX
│   ├── css/
│   │   ├── conceptos-fundamentales.mdx
│   │   ├── modelo-de-caja.mdx
│   │   ├── selectores.mdx
│   │   ├── flexbox.mdx
│   │   └── grid.mdx
│   └── javascript/
│       └── conceptos-basicos.mdx
├── pages/
│   ├── index.astro               # Página de inicio
│   ├── [slug].astro              # Rutas dinámicas
│   └── api/
│       └── navigation.ts         # API para navegación
└── styles/
    └── global.css                # Estilos globales

/public
└── favicon.svg
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+ 
- npm, yarn o pnpm

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/guia-desarrollo-web-interactiva.git
   cd guia-desarrollo-web-interactiva
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   El sitio estará disponible en `http://localhost:4321`

4. **Construir para producción**
   ```bash
   npm run build
   ```

5. **Vista previa de producción**
   ```bash
   npm run preview
   ```

## 🎯 Tecnologías Utilizadas

- **[Astro](https://astro.build/)** - Framework web moderno y ultra-rápido
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[MDX](https://mdxjs.com/)** - Markdown con componentes React
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Vite](https://vitejs.dev/)** - Build tool de nueva generación

## 📝 Agregar Nuevo Contenido

### Crear una nueva guía

Para agregar una nueva sección de contenido:

1. **Crea un archivo `.mdx`** en la carpeta correspondiente:
   - CSS: `src/content/css/`
   - JavaScript: `src/content/javascript/`

2. **Estructura del archivo**:
   ```markdown
   ---
   title: "Título de la Guía"
   slug: "url-amigable"
   description: "Descripción breve"
   ---

   import CodePlayground from '../../components/CodePlayground.astro';

   # Tu Contenido Aquí

   <CodePlayground
     title="Ejemplo Interactivo"
     jsOnly={true}
     js={`console.log("Hola mundo");`}
   />
   ```

3. **El contenido se agregará automáticamente** a la navegación

### Usar CodePlayground

El componente `CodePlayground` tiene múltiples modos:

**Modo JavaScript:**
```jsx
<CodePlayground
  title="Ejemplo JS"
  jsOnly={true}
  js={`console.log("Hello!");`}
/>
```

**Modo HTML/CSS/JS:**
```jsx
<CodePlayground
  title="Ejemplo completo"
  html={`<div>Contenido</div>`}
  css={`.demo { color: blue; }`}
  js={`console.log("JS");`}
/>
```

## 🎨 Características de Diseño

### Dark Mode
- Detección automática del tema del sistema
- Toggle manual disponible
- Persistencia de la preferencia en localStorage

### Responsive Design
- **Desktop**: Sidebar fijo con navegación completa
- **Tablet**: Sidebar adaptable
- **Mobile**: Menú hamburguesa colapsable

### Componentes de UI

- **Cards**: Contenedores con sombra y bordes redondeados
- **Buttons**: Estilos primarios y secundarios
- **Typography**: Integración con `@tailwindcss/typography`
- **Code Blocks**: Syntax highlighting automático

## 🛠️ Configuración Técnica

### Tailwind CSS
```javascript
// tailwind.config.js
{
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    }
  }
}
```

### Astro Configuración
```javascript
// astro.config.mjs
{
  integrations: [tailwind()],
  vite: {
    server: { port: 3000, open: true }
  }
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo en http://localhost:3000
- `npm run build` - Construye versión de producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run astro` - Comando directo de Astro

## 📱 Rutas Disponibles

- `/` - Página de inicio con overview de todas las secciones
- `/selectores` - Guía de Selectores CSS
- `/flexbox` - Guía de Flexbox Layout
- `/grid` - Guía de CSS Grid Layout

## 🚀 Deployment

### Netlify
1. Conectar repositorio de GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Importar proyecto desde GitHub
2. Framework preset: Astro
3. Deploy automático

### GitHub Pages
Configurar workflow de Actions para build y deploy automático

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto seguirá creciendo con más contenido.

1. Fork el proyecto
2. Crea tu rama: `git checkout -b feature/nueva-guia`
3. Commit cambios: `git commit -m 'Agregar guía de arrays'`
4. Push: `git push origin feature/nueva-guia`
5. Abre un Pull Request

## 📄 Licencia

MIT License - Uso libre para aprender y enseñar.

## 🙏 Créditos

- Construido con [Astro](https://astro.build/)
- Estilos con [Tailwind CSS](https://tailwindcss.com/)
- Iconos y fuentes de Google Fonts

---

**Hecho con ❤️ para la comunidad hispana de desarrollo web**

¿Encontraste útil esta guía? Dale una ⭐ en GitHub!