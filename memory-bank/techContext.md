# Contexto Técnico: Prospect Flow - Tu Casa Ideal

Este documento describe el stack tecnológico, las herramientas y las convenciones utilizadas en el proyecto.

## 1. Frameworks y Librerías Principales

*   **Framework Frontend:** [React](https://react.dev/) `v18.3.1`
*   **Generador de Sitios Estáticos / Bundler:** [Vite](https://vitejs.dev/) `v5.4.1`
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) `v5.5.3`
*   **Enrutamiento:** [React Router DOM](https://reactrouter.com/) `v6.26.2`

## 2. UI y Estilos

*   **Framework de Estilos:** [Tailwind CSS](https://tailwindcss.com/) `v3.4.11`
*   **Componentes de UI:** [shadcn/ui](https://ui.shadcn.com/). Los componentes base de Radix UI están instalados y se utilizan a través de la CLI de shadcn.
*   **Iconos:** [Lucide React](https://lucide.dev/) `v0.462.0`
*   **Animaciones:** [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)

## 3. Gestión de Formularios y Datos

*   **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/) `v7.53.0`
*   **Validación de Esquemas:** [Zod](https://zod.dev/) `v3.23.8` (usado junto a `react-hook-form` a través de `@hookform/resolvers`).
*   **Gestión de Estado del Servidor (Fetching):** [TanStack Query (React Query)](https://tanstack.com/query/latest) `v5.56.2`

## 4. Scripts y Herramientas de Desarrollo

*   **Gestor de Paquetes:** `npm` (inferido por `package-lock.json`).
*   **Linter:** [ESLint](https://eslint.org/) `v9.9.0`
*   **Servidor de Desarrollo:** `npm run dev` (inicia Vite en modo desarrollo).
*   **Build de Producción:** `npm run build` (compila la aplicación para producción).

## 5. Dependencias Clave Adicionales

*   **Gráficos:** [Recharts](https://recharts.org/) `v2.12.7`
*   **Manejo de Fechas:** [date-fns](https://date-fns.org/) `v3.6.0`
*   **Notificaciones (Toasts):** [Sonner](https://sonner.emilkowal.ski/) `v1.5.0`
*   **Exportación a Excel:** [xlsx](https://sheetjs.com/) `v0.18.5`

Este documento sirve como referencia rápida para entender la arquitectura técnica del proyecto y las herramientas involucradas. 