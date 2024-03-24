export type Template =
  | "Benjent2023"
  | "Benjent2023Light"
  | "Caillou2023Light"
  | "Helgrim2023Light";

export interface WorkExperience {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  tasks: Array<string>;
}

export interface Education {
  diploma: string;
  institution: string;
  period: string;
  location: string;
  description: string;
}

export interface Skill {
  name: string;
  level: string;
}
