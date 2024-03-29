export type Template =
  | "CottonCandy"
  | "OpenResume"
  | "Pharmacy"
  | "Stone"
  | "Toothpaste";

export interface Link {
  type: string; // TODO Union type of string and LinkedIn | GitHub | etc ?
  value: string;
}

export interface Details {
  name: string;
  title: string;
  about: string;
  address: string;
  email: string;
  phone: string;
  drivingLicense: string;
  links: Array<Link>;
}

export interface Entry {
  nature: "asset" | "experience";
  type: string;
  title: string; // Position, Diploma, ...
  highlights: Array<string>;
}

export interface Experience extends Entry {
  nature: "experience";
  type: "education" | "project" | "voluntary" | "work";
  organization: string; // Institution, Company, ...
  location: string;
  startDate: string; // No strict format to allow custom values
  endDate: string;
  summary: string;
}

export interface Asset extends Entry {
  nature: "asset";
  type: "hobby" | "language" | "skill";
}
export interface Category {
  nature: Entry["nature"];
  type: Asset["type"] | Experience["type"];
  name: string;
  entries: Array<Experience | Asset>;
  layout: "aside" | "full" | "half";
}

export interface Resume {
  categories: Array<Category>;
}
