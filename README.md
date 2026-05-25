# Portafolio Profesional & Brief Lead Capture · Antonio Fernandez (Antonn)

Este proyecto es un portafolio personal premium y capturador de prospectos de alta conversión diseñado para **Antonio Fernandez (Antonn)**, Senior AI Engineer & Full-Stack Developer. 

El sitio está estructurado bajo una sofisticada estética **Editorial / Periódico Retrógrado Minimalista** con acentos modernos de "Playful Harmony" (paleta ultra oscura con acento Cyan y animaciones fluidas).

---

## 🌟 Características Destacadas

### 1. Portafolio Editorial (Página Principal `/`)
- **Cabecera de Periódico Estilizada:** Con fecha del día automática, números de edición lúdicos y eslogan profesional.
- **Hero con Canvas de Partículas:** Una simulación interactiva y fluida de red neuronal en 60fps, totalmente ligera y responsiva.
- **Sección de Servicios:** Presentación en rejilla editorial de 3 columnas (Desarrollo Web, Integración de IA, Consultoría de Sistemas) con micro-animaciones en los bordes y hovers dinámicos.
- **Sección de Proyectos:** Tarjetas enriquecidas con representaciones visuales interactivas (mockups CSS/SVG animados), tech badges y métricas clave (TicketScan.AI, VoiceNotes.AI, ImageGen.AI, Ritmia, NoHate-LATAM).
- **Sobre Mí & Footer:** Biografía de estilo editorial, credenciales certificadas (Azure AI Engineer AI-102) y enlaces directos de contacto (GitHub, Blog deconstruir.me, Email).

### 2. Formulario de Captura Multi-pasos Inteligente (`/cotizar`)
- **Navegación Fluida en 8 Pasos:**
  1. *Negocio:* Nombre, giro, descripción, dominio y logotipo.
  2. *Objetivo:* Propósitos comerciales, cliente ideal y acción principal.
  3. *Páginas y Contenido:* Mapa del sitio estructurado, estado del copy y de las fotografías.
  4. *Funcionalidades:* Suite de utilidades adicionales requeridas (e-commerce, reservas, chat, multiidioma, panel de administración).
  5. *Diseño:* Definición de estilo visual, colores corporativos y tipografías deseadas.
  6. *Técnico:* Tráfico esperado, idiomas, hosting/desarrollo y responsividad.
  7. *Timeline y Presupuesto:* Tiempos de entrega y rangos de inversión aproximados.
  8. *Contacto:* Nombre completo, email, WhatsApp y canal de contacto preferido.
- **Persistencia y Progreso:** Barra de progreso minimalista que indica el porcentaje completado. La navegación entre pasos no causa recargas de página ni pérdida de datos.
- **Generación de `CLAUDE.md`:** Al completar el formulario, los datos se compilan dinámicamente en una especificación técnica Markdown perfecta, lista para ser cargada en **Claude Code** para el desarrollo autónomo del sitio web sin fricciones ni preguntas adicionales.
- **Integración con EmailJS:** Los datos del formulario se envían automáticamente al correo `antuansabe@gmail.com`.
- **Manejo de Errores Inteligente (Fallback):** Si falla el envío de EmailJS (o si las variables de entorno locales no se han cargado), el sitio entra en un modo fallback impecable que renderiza el `CLAUDE.md` para que el usuario pueda copiarlo con un clic y provee un botón premium que abre su cliente de correo predeterminado con los datos listos.

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Runtime & Render:** React 19 (Server/Client Components)
- **Tipado:** TypeScript
- **Estilos:** Tailwind CSS v4 (con variables de tema personalizadas)
- **Animaciones:** Framer Motion (transiciones fluidas de slide en el formulario y hover interactivos)
- **Envío de Datos:** `@emailjs/browser`
- **Efectos Visuales:** `canvas-confetti` para la pantalla de éxito

---

## 🚀 Instalación y Desarrollo Local

1. **Clonar el proyecto e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar las variables de entorno:**
   Copia el archivo de ejemplo para crear tu entorno local:
   ```bash
   cp .env.example .env.local
   ```
   *Nota:* Rellena las credenciales de EmailJS siguiendo la guía en [INSTRUCCIONES_EMAILJS.md](file:///Users/Antonn/Desktop/portafolio/INSTRUCCIONES_EMAILJS.md).

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para visualizar el sitio.

---

## 📦 Compilación y Despliegue

### Compilar para producción localmente:
```bash
npm run build
```

### Despliegue en Vercel:
Este proyecto está optimizado para desplegarse con cero fricción en **Vercel**:
1. Conecta tu repositorio de GitHub a tu cuenta de Vercel.
2. Añade las variables de entorno del archivo `.env.local` en la sección **Environment Variables** en la consola de Vercel.
3. ¡Vercel se encargará del build y del despliegue automático en cada push a la rama principal!
