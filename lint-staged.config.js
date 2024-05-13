export default {
  "*.{md,html,css,json,js,vue,yaml,yml}": ["npm run format:check --"],
  "*.{vue,ts}": [
    "npm run lint:check --",
    () => "npm run typescript -- --noEmit",
  ],
};
