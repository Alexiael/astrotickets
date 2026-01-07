# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# AstroTickets – Galactic Force Fest

Proyecto web desarrollado con **Astro** que simula una plataforma de gestión y promoción de un evento temático inspirado en el universo de Star Wars: **Galactic Force Fest**.

La aplicación combina contenido estático y componentes interactivos para mostrar información del evento, experiencias destacadas, comunidad, merchandising y un panel de control simulado.

---

## 🧠 Descripción del proyecto

AstroTickets es una plataforma ficticia creada con fines formativos para demostrar el uso de tecnologías web modernas. El proyecto pone el foco en:

- Arquitectura basada en **Astro (MPA)**
- Uso de **componentes interactivos** mediante islas
- Diseño visual temático (Imperio / Rebelión)
- Consumo de **APIs públicas** (SWAPI)
- Animaciones y experiencia de usuario cuidada

Incluye un **selector de facción** (Imperio / Rebelión) que permite cambiar el tema visual de la aplicación.

---

## 🛠️ Tecnologías utilizadas

- **Astro**
- **Tailwind CSS**
- **JavaScript**
- **React (islas interactivas)**
- **GSAP + ScrollTrigger**
- **SWAPI (Star Wars API – mirror)**

---

## 📦 Instalación y ejecución del proyecto

### Requisitos previos
Es necesario tener instalado:
- **Node.js** (versión 18 o superior)
- **npm**

### Pasos de instalación

1. Clonar el repositorio:
git clone https://github.com/Alexiael/astrotickets.git

2.Acceder a la carpeta del proyecto:
cd astrotickets-galactic-force-fest

3. Instalar dependencias:
npm install

4. Ejecutar el servidor de desarrollo:
npm run dev

5. Abrir el proyecto en el navegador:
http://localhost:4321

## 📁 Estructura del proyecto

src/layouts → Layout principal de la aplicación
src/pages → Páginas del sitio
src/components → Componentes reutilizables
src/styles → Estilos globales
public → Recursos estáticos

## 📌 Notas adicionales

Los datos mostrados en el dashboard son simulados
El proyecto está orientado a uso educativo
No incluye autenticación ni persistencia en base de datos
