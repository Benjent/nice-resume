import {
  type Asset,
  type Category,
  type Experience,
  type Link,
  type Template,
} from "@/types";

export const templates: Array<Template> = [
  "CottonCandy",
  "OpenResume",
  "Paper",
  "Pharmacy",
  "Stone",
  "Toothpaste",
];

export const fixedLayoutTemplates: Array<Template> = ["Paper"];

// TODO islayout disabled -> lister les templates qui interdisent les layouts (forcent les catégories à être "full") comme les templates pour Paprer
// TODO déconseiller certains layouts
// On pourrait dire "full" - advised et "full" - mandatory pour avoir deux niveaux. Le but est aussi de conseiller les gens

export const socialIcons: Array<Link["url"]> = ["gitHub", "linkedIn"];

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
