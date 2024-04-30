import type {
  Asset,
  Category,
  Detail,
  DocumentType,
  Experience,
  Link,
  Template,
} from "@/types";

export const documentTypes: Array<DocumentType> = ["Resume", "Letter"];

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

export const templateColors: {
  [T in Template]: string[];
} = {
  Aster: ["#713c97", "#f6881f", "#ffffff", "#000000"],
  CottonCandy: ["#ed3660", "#5662e8", "#e8afcf", "#ffffff", "#1e1e1e"],
  Cupcake: ["#f2b150", "#e593aa", "#a9d7e2", "#231f20"],
  Macaron: ["#d88277", "#f8aaa6", "#ffffff", "#414e66"],
  Macchiato: ["#56817a", "#f8f8ff", "#39424b"],
  Oilcloth: ["#0076c0", "#f6ba62", "#43a385", "#ffffff", "#231f20"],
  OpenResume: ["#38bdf8", "#000000"],
  Paper: ["#cfcfcf", "#000000"],
  Pharmacy: ["#06b6d4", "#475569", "#94a3b8", "#0f172a"],
  Red: ["#ab3134", "#231f20"],
  Stone: ["#000000", "#a1a1aa", "#e4e4e7", "#52525b"],
  Toothpaste: ["#ed3660", "#5662e8", "#e8afcf", "#1e1e1e"],
  Wiki: ["#1e3a8a", "#000000"],
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
