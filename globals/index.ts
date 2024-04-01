import {
  type Asset,
  type Category,
  type Experience,
  type Link,
  type Template,
} from "@/types";

export const templates: Array<Template> = [
  "CottonCandy",
  "Macchiato",
  "OpenResume",
  "Paper",
  "Pharmacy",
  "Stone",
  "Toothpaste",
];

export const fixedLayoutTemplates: Array<Template> = ["Paper"];

export const discouragedLayoutTemplates: {
  [T in Template]: Array<Category["layout"]>;
} = {
  CottonCandy: ["aside"],
  Macchiato: [],
  OpenResume: [],
  Paper: [],
  Pharmacy: [],
  Stone: [],
  Toothpaste: ["aside"],
};

export const socialIcons: Array<Link["url"]> = [
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
