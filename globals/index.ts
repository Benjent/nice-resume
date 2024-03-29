import {
  type Asset,
  type Category,
  type Experience,
  type Template,
} from "@/types";

export const templates: Array<Template> = [
  "CottonCandy",
  "OpenResume",
  "Pharmacy",
  "Toothpaste",
  "Stone",
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
