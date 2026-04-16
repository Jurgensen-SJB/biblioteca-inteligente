# 📚 Biblioteca Inteligente — Recomendador Interactivo de Libros

> **Documento Técnico v2.0 — Abril 2025**  
> Incluye: Perfil Lector Cero — Para quien empieza desde el principio

## 🎯 ¿Qué es?

Biblioteca Inteligente es una página web interactiva que actúa como tu asesor personal de lectura. A través de un cuestionario rápido y amigable, el sistema descubre tus gustos y te recomienda exactamente **tres libros ideales** para ti.

### Características principales

- 🧠 **Quiz adaptativo**: Detecta automáticamente si eres lector principiante o experimentado
- 📖 **Perfil Lector Cero**: Ruta especial para quienes nunca han leído un libro completo
- 🎨 **Diseño premium 2025-2026**: Paleta verde bosque/salvia con fondo crema
- 📱 **Mobile-first**: Diseñado primero para móvil, responsivo en todas las pantallas
- 🔒 **API Key segura**: Nunca se expone en el frontend
- 💾 **Favoritos sin registro**: Guarda tus libros preferidos en el navegador

## 🏗️ Arquitectura Limpia (Clean Architecture)

```
src/
├── domain/          # Entidades, Value Objects, Servicios de Dominio
├── application/     # Casos de Uso (Use Cases) y Puertos
├── infrastructure/  # Repositorios (Google Books, Lista Curada, Caché)
└── presentation/    # Componentes React, Hooks, Context
```

Cada capa solo depende de las de abajo. El código es mantenible, testeable y escalable.

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Frontend | Next.js 14+ (App Router) | Renderizado rápido, SEO, API Routes |
| Estilos | Tailwind CSS | Clases utilitarias, desarrollo ágil |
| Animaciones | Framer Motion | Transiciones elegantes del quiz |
| API de libros | Google Books API | Gratuita, en español, con portadas |
| Despliegue | Vercel | Gratuito, integrado con Next.js |

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18 o superior
- Cuenta de Google para la API Key (opcional)

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd biblioteca-inteligente

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local y agregar tu GOOGLE_BOOKS_API_KEY

# 4. Iniciar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

> **Nota**: Sin API Key, el sistema funciona con la lista curada de libros como fallback.

## 📦 Despliegue en Vercel (Paso a Paso)

1. Subir el proyecto a GitHub
2. Crear cuenta gratuita en [vercel.com](https://vercel.com)
3. Hacer clic en **"New Project"** y conectar GitHub
4. Seleccionar el repositorio del proyecto
5. Agregar la variable de entorno:
   - `GOOGLE_BOOKS_API_KEY` = [tu clave de Google Books]
6. Hacer clic en **"Deploy"**. Vercel detecta Next.js automáticamente
7. En 2-3 minutos, el proyecto estará en: `mi-biblioteca.vercel.app`
8. (Opcional) Conectar un dominio personalizado desde Settings → Domains

### Plan gratuito de Vercel incluye:

- ✅ Deployments ilimitados
- ✅ Dominio gratuito `.vercel.app`
- ✅ HTTPS automático
- ✅ CDN global
- ✅ 100 GB de ancho de banda al mes

## 🎨 Paleta de Colores

| Rol | Color | Hex |
|-----|-------|-----|
| Principal | Verde bosque | `#2D6A4F` |
| Secundario | Verde salvia | `#52B788` |
| Fondo | Crema / Blanco roto | `#FFF8F0` |
| Acento | Dorado suave | `#C9A84C` |
| Lector Cero | Ámbar cálido | `#FFF3CD` |

## 📋 Variables de Entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `GOOGLE_BOOKS_API_KEY` | No* | Clave de la API de Google Books |

*Sin esta variable, el sistema usa la lista curada como fallback.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

> *"No existe un lector malo. Solo existe el libro equivocado en el momento equivocado."*
