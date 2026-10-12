# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Contact form

The contact form sends submissions to Formspree. Create a Formspree form for
`vijisujisri2909@gmail.com`, copy its endpoint from the Formspree dashboard into
`.env.local` as `VITE_FORMSPREE_ENDPOINT`, then restart the Vite server. The
`.env.example` file shows the required variable.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
