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
  "Macaron",
  "Macchiato",
  "OpenResume",
  "Paper",
  "Pharmacy",
  "Red",
  "Stone",
  "Toothpaste",
  "Wiki",
];

export const fixedLayoutTemplates: Array<Template> = ["Paper"];

export const discouragedLayoutTemplates: {
  [T in Template]: Array<Category["layout"]>;
} = {
  Aster: ["aside", "half"],
  CottonCandy: ["aside"],
  Macaron: [],
  Macchiato: [],
  OpenResume: [],
  Paper: [],
  Pharmacy: [],
  Red: ["full"],
  Stone: [],
  Toothpaste: ["aside"],
  Wiki: [],
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
