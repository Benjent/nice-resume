# Nice Resume

## Setup

```bash
corepack enable pnpm
pnpm install
```

## Development Server

```bash
pnpm run dev
```

## Production

```bash
# Preview production build
pnpm run preview

pnpm run build
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Development

### Resources

- [Nuxt](https://nuxt.com/) (for brand icons)
- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Simple Icons](https://simpleicons.org/) (for brand icons)

### Add a template

1. Create the Vue component in `/components/templates`
2. Create the Tailwind configuration file in root
3. Add the name in the template union type in `/types`
4. Add the name in the templates array in `/globals`
5. Add the name in the templateMapper in `/components/Preview.vue`

Make sure the above steps rely on the same template name.
