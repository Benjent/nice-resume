import type {
  Asset,
  Category,
  Detail,
  DocumentType,
  Experience,
  Link,
  Template,
  TemplateTheme,
} from "@/types";

export const documentTypes: Array<DocumentType> = ["resume", "letter"];

export const templates: Array<Template> = [
  "Aster",
  "CottonCandy",
  "Cupcake",
  "Macaron",
  "Macchiato",
  "Oilcloth",
  "OpenResume",
  "Paper",
  "Pharmacy",
  "Red",
  "Stone",
  "Toothpaste",
  "Wiki",
];

export const fixedLayoutTemplates: Array<Template> = ["Cupcake", "Paper"];

export const discouragedLayoutTemplates: {
  [T in Template]: Array<Category["layout"]>;
} = {
  Aster: ["aside", "half"],
  CottonCandy: ["aside"],
  Cupcake: [],
  Macaron: [],
  Macchiato: [],
  Oilcloth: [],
  OpenResume: [],
  Paper: [],
  Pharmacy: [],
  Red: ["full"],
  Stone: [],
  Toothpaste: ["aside"],
  Wiki: [],
};

export const templateThemes: TemplateTheme = {
  Aster: {
    resume: {
      colors: ["#713c97", "#f6881f", "#ffffff", "#000000"],
      margins: [0, 0],
    },
    letter: {
      colors: ["#713c97", "#f6881f", "#ffffff", "#000000"],
      margins: [0, 0],
    },
  },
  CottonCandy: {
    resume: {
      colors: ["#ed3660", "#5662e8", "#e8afcf", "#ffffff", "#1e1e1e"],
      margins: [0, 0],
    },
    letter: {
      colors: ["#ed3660", "#5662e8", "#e8afcf", "#ffffff", "#1e1e1e"],
      margins: [0, 0],
    },
  },
  Cupcake: {
    resume: {
      colors: ["#f2b150", "#e593aa", "#a9d7e2", "#231f20"],
      margins: [0, 0],
    },
    letter: {
      colors: ["#f2b150", "#e593aa", "#a9d7e2", "#231f20"],
      margins: [0, 0],
    },
  },
  Macaron: {
    resume: {
      colors: ["#d88277", "#f8aaa6", "#ffffff", "#414e66"],
      margins: [0, 0],
    },
    letter: {
      colors: ["#d88277", "#f8aaa6", "#ffffff", "#414e66"],
      margins: [0, 0],
    },
  },
  Macchiato: {
    resume: {
      colors: ["#56817a", "#f8f8ff", "#39424b"],
      margins: [48, 48],
    },
    letter: {
      colors: ["#56817a", "#f8f8ff", "#39424b"],
      margins: [48, 48],
    },
  },
  Oilcloth: {
    resume: {
      colors: ["#0076c0", "#f6ba62", "#43a385", "#ffffff", "#231f20"],
      margins: [0, 0],
    },
    letter: {
      colors: ["#0076c0", "#f6ba62", "#43a385", "#ffffff", "#231f20"],
      margins: [0, 0],
    },
  },
  OpenResume: {
    resume: {
      colors: ["#38bdf8", "#000000"],
      margins: [48, 26],
    },
    letter: {
      colors: ["#38bdf8", "#000000"],
      margins: [48, 26],
    },
  },
  Paper: {
    resume: {
      colors: ["#cfcfcf", "#000000"],
      margins: [80, 80],
    },
    letter: {
      colors: ["#cfcfcf", "#000000"],
      margins: [80, 80],
    },
  },
  Pharmacy: {
    resume: {
      colors: ["#06b6d4", "#475569", "#94a3b8", "#0f172a"],
      margins: [48, 26],
    },
    letter: {
      colors: ["#06b6d4", "#475569", "#94a3b8", "#0f172a"],
      margins: [48, 26],
    },
  },
  Red: {
    resume: {
      colors: ["#ab3134", "#231f20"],
      margins: [48, 26],
    },
    letter: {
      colors: ["#ab3134", "#231f20"],
      margins: [48, 26],
    },
  },
  Stone: {
    resume: {
      colors: ["#000000", "#a1a1aa", "#e4e4e7", "#52525b"],
      margins: [48, 48],
    },
    letter: {
      colors: ["#000000", "#a1a1aa", "#e4e4e7", "#52525b"],
      margins: [48, 48],
    },
  },
  Toothpaste: {
    resume: {
      colors: ["#ed3660", "#5662e8", "#e8afcf", "#1e1e1e"],
      margins: [0, 0],
    },
    letter: {
      colors: ["#ed3660", "#5662e8", "#e8afcf", "#1e1e1e"],
      margins: [0, 0],
    },
  },
  Wiki: {
    resume: {
      colors: ["#1e3a8a", "#000000"],
      margins: [24, 20],
    },
    letter: {
      colors: ["#1e3a8a", "#000000"],
      margins: [24, 20],
    },
  },
};

export const contactIcons: Array<Detail["icon"]> = [
  "address",
  "drivingLicense",
  "email",
  "phone",
];

export const socialIcons: Array<Link["icon"]> = [
  "bandcamp",
  "behance",
  "mastodon",
  "facebook",
  "gitHub",
  "instagram",
  "linkedIn",
  "soundCloud",
  "stackOverflow",
  "viadeo",
  "x",
];

export const categoryTypes: Array<Category["type"]> = [
  "education",
  "project",
  "voluntary",
  "work",
  "hobby",
  "language",
  "skill",
];

export const categoryLayouts: Array<Category["layout"]> = [
  "aside",
  "full",
  "half",
];

export const assetTypes: Array<Asset["type"]> = ["hobby", "language", "skill"];

export const experienceTypes: Array<Experience["type"]> = [
  "education",
  "project",
  "voluntary",
  "work",
];
