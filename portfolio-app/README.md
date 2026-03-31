# Portfolio App

A personal portfolio built with Next.js (App Router), React, and TypeScript.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## How It Works

This project uses Next.js with the App Router in `src/app`:

- `src/app/layout.tsx` defines the shared root layout.
- `src/app/page.tsx` is the home page.
- `src/app/globals.css` contains global styles.

### Commands

- `npm run dev`: Starts the local development server with hot reload.
- `npm run build`: Creates an optimized production build in `.next`.
- `npm run start`: Runs the production server from the build output.
  This is non-obvious: it does not build the app first, so run `npm run build` before this command.
- `npm run lint`: Runs ESLint checks for code quality and common issues.

## Production Flow

Use this order for production-like testing:

```bash
npm run build
npm run start
```
