# Nice Resume

![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat) ![GitHub CI](https://github.com/Benjent/nice-resume/actions/workflows/deploy.yaml/badge.svg)

![GitHub Pages badge](https://img.shields.io/badge/GitHub_Pages-222222?logo=github&logoColor=white) ![Nuxt badge](https://img.shields.io/badge/Nuxt-00DC82?logo=nuxtdotjs&logoColor=white) ![Tailwind CSS badge](https://img.shields.io/badge/Tailwind_CSS_-0ea5e9?logo=tailwindcss&logoColor=white) ![Conventional commits badge](https://img.shields.io/badge/Conventional_commits-fa6673?logo=conventionalcommits&logoColor=white) ![ESLint badge](https://img.shields.io/badge/ESLint-4b32c3?logo=eslint&logoColor=white)

Edit your resume and your cover letter, choose a nice template and save your work for the next time.

This is a [Nuxt](https://nuxt.com/) project bootstrapped with Nuxi.

[See it live](https://benjent.github.io/nice-resume/).

## Resources

- [Nuxt](https://nuxt.com/)
- [Vue](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Simple Icons](https://simpleicons.org/) (for brand icons) through [Vue3 Simple Icons](https://vue3-simple-icons.wyatt-herkamp.dev/)

## Prerequisites

- [Node](https://nodejs.org/en/)

## Project setup

```bash
corepack enable pnpm
pnpm install
```

## Compile and Hot-Reload for Development

```bash
pnpm run dev
```

Compile and Minify for Production

```bash
# Preview production build
pnpm run build
pnpm run preview
```

## Add a template

1. Create the Vue component in `/templates`
2. Add the name in the template union type in `/types`
3. Add the name in the templates array in `/globals`
4. Add the name in the templateMapper in `/components/Preview.vue`

Make sure the above steps rely on the same template name.

## Use a template

Templates offer an aside section on the left and a main section on the right that can be split into two columns. Select _Aside_, _Full_ or _Half_ to place content accordingly.
