export default {
  legacy: false,
  locale: "en",
  locales: [
    {
      code: "en",
      name: "English",
    },
    {
      code: "es",
      name: "Español",
    },
    {
      code: "fr",
      name: "Français",
    },
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root", // recommended
  },
  messages: {
    en: {
      welcome: "Welcome",
      nice: "Nice",
      resume: "Resume",
    },
    fr: {
      welcome: "Bienvenue",
      nice: "Joli",
      resume: "CV",
    },
    br: {
      welcome: "Degemer mat",
      nice: "Koant",
      resume: "CV",
    },
  },
};
