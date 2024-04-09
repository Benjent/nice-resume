export default {
  "*": [() => "npm run format:all --"],
  "*.{vue,ts}": [
    "npm run lint:check --",
    () => "npm run typescript -- --noEmit",
  ],
};
