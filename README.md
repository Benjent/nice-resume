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
pnpm run build
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Development

### Resources

- [Nuxt](https://nuxt.com/)
- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Simple Icons](https://simpleicons.org/) (for brand icons)

### Add a template

1. Create the Vue component in `/templates`
2. Add the name in the template union type in `/types`
3. Add the name in the templates array in `/globals`
4. Add the name in the templateMapper in `/components/Preview.vue`

Make sure the above steps rely on the same template name.
