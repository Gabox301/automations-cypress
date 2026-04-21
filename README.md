# GaboTech Automations 🚀

Directorio de Automatizaciones para proyectos personales de **GaboTech**. Este repositorio contiene pruebas de extremo a extremo (E2E) desarrolladas con Cypress para diversos proyectos y servicios.

## 📁 Estructura del Proyecto

El proyecto sigue la estructura estándar de Cypress:

- **`cypress/e2e/`**: Contiene las especificaciones de las pruebas organizadas por proyecto:
  - `Avro Transformer` --> [![Avro Transformer Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/avro-transformer-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/avro-transformer-smoke-test.yml)
  - `Cala Hogar` --> [![Cala Hogar Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/cala-hogar-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/cala-hogar-smoke-test.yml)
  - `Chef Mata` --> [![Chef Mata Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/chef-mata-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/chef-mata-smoke-test.yml)
  - `CyberMap` --> [![CyberMap Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/cybermap-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/cybermap-smoke-test.yml)
  - `Dieselpunk Countries` --> [![Dieselpunk Countries Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/dieselpunk-countries-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/dieselpunk-countries-smoke-test.yml)
  - `Go-WPA` --> [![Go WPA Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/go-wpa-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/go-wpa-smoke-test.yml)
  - `Hono URLs` --> [![Hono URLs Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/hono-urls-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/hono-urls-smoke-test.yml)
  - `Nitro Chat` --> [![Nitro Chat Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/nitro-chat-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/nitro-chat-smoke-test.yml)
  - `Orux` --> [![Orux Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/orux-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/orux-smoke-test.yml)
  - `PDF Atelier` --> [![PDF Atelier Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/pdf-atelier-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/pdf-atelier-smoke-test.yml)
  - `Ruby Scraper` --> [![Ruby Scraper Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/ruby-scraper-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/ruby-scraper-smoke-test.yml)
  - `WAV Decoder` --> [![WAV Decoder Smoke Test](https://github.com/Gabox301/automations-cypress/actions/workflows/wav-decoder-smoke-test.yml/badge.svg)](https://github.com/Gabox301/automations-cypress/actions/workflows/wav-decoder-smoke-test.yml)
- **`cypress/fixtures/`**: Archivos de datos estáticos utilizados en las pruebas.
- **`cypress/support/`**: Archivos de configuración y comandos personalizados de Cypress.
- **`package.json`**: Configuración de dependencias y scripts de ejecución.
- **`cypress.config.js`**: Archivo de configuración principal de Cypress.

## 🛠️ Requisitos Previos

Para ejecutar estas automatizaciones, necesitarás tener instalado:

- [Node.js](https://nodejs.org/) (Versión recomendada: 24 o superior)

## 🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd Automations
   ```

2. Instala las dependencias:

   ```bash
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
- **dotenv**: Gestión de variables de entorno.

---

Desarrollado con ❤️ por [Gabriel Ortega](https://www.linkedin.com/in/gabo301/)
