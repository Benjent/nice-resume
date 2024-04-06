import {
  type Asset,
  type Category,
  type Detail,
  type Experience,
  type Link,
  type Template,
} from "@/types";

export const templates: Array<Template> = [
  "Aster",
  "CottonCandy",
  "Macchiato",
  "OpenResume",
  "Paper",
  "Pharmacy",
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
  Macchiato: [],
  OpenResume: [],
  Paper: [],
  Pharmacy: [],
  Stone: [],
  Toothpaste: ["aside"],
  Wiki: [],
};

export const contactIcons: Array<Detail["value"]> = [
  // TODO wrong type
  "address",
  "drivingLicense",
  "email",
  "phone",
];

export const socialIcons: Array<Link["url"]> = [
  // TODO wrong type shouldn't it be Link["icon"]
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
  Wiki: [],
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
