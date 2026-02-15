# GaboTech Automations 🚀

Directorio de Automatizaciones para proyectos personales de **GaboTech**. Este repositorio contiene pruebas de extremo a extremo (E2E) desarrolladas con Cypress para diversos proyectos y servicios.

## 📁 Estructura del Proyecto

El proyecto sigue la estructura estándar de Cypress:

- **`cypress/e2e/`**: Contiene las especificaciones de las pruebas organizadas por proyecto:
  - `Cala_Hogar`
  - `Chef_Mata`
  - `Chispas_Historias`
  - `CyberMap`
  - `Liss_and_Rosse`
  - `Orux`
  - `Trade_Vision`
- **`cypress/fixtures/`**: Archivos de datos estáticos utilizados en las pruebas.
- **`cypress/support/`**: Archivos de configuración y comandos personalizados de Cypress.
- **`package.json`**: Configuración de dependencias y scripts de ejecución.
- **`cypress.config.js`**: Archivo de configuración principal de Cypress.

## 🛠️ Requisitos Previos

Para ejecutar estas automatizaciones, necesitarás tener instalado:

- [Node.js](https://nodejs.org/) (Versión recomendada: 18 o superior)
- [pnpm](https://pnpm.io/) (Opcional, pero recomendado como gestor de paquetes)

## 🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd Automations
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   # o si usas npm
   npm install
   ```

## ⚙️ Configuración del Entorno

El proyecto utiliza variables de entorno cargadas a través de un archivo `.env` en la raíz del proyecto. Asegúrate de tener este archivo configurado con las claves necesarias para los diversos proyectos.

## 🧪 Ejecución de Pruebas

Existen dos formas principales de ejecutar las pruebas de Cypress:

### Modo Interactivo (Interface Gráfica)

Ideal para desarrollo y depuración de pruebas.

```bash
npm run front
```

### Modo Headless (Línea de Comandos)

Ideal para ejecuciones rápidas o integración continua (CI).

```bash
npm run back
```

## 📦 Dependencias Principales

- **Cypress**: Framework de pruebas E2E.
- **cypress-file-upload**: Plugin para simular la carga de archivos.
- **cypress-plugin-api**: Plugin para pruebas de API con visualización mejorada.
- **dotenv**: Gestión de variables de entorno.

---

Desarrollado con ❤️ por [Gabriel Ortega](https://github.com/Gabox301)
