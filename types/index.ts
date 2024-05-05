export type Template =
  | "Aster"
  | "CottonCandy"
  | "Cupcake"
  | "Macaron"
  | "Macchiato"
  | "OpenResume"
  | "Oilcloth"
  | "Paper"
  | "Pharmacy"
  | "Red"
  | "Stone"
  | "Toothpaste"
  | "Wiki";

export type DocumentType = "letter" | "resume";

export type SideSetting = number[];

export type Settings = {
  font?: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: number; // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
  isItalic: boolean;
  isUppercase?: boolean;
  isCentered?: boolean;
  color: string;
  backgroundColor: string;
  borderColor: string;
  margin: SideSetting;
  border: SideSetting;
  padding: SideSetting;
  gap?: number;
};

export type BaseSettings = {
  isLetterMarginless: boolean;
  colors: string[];
  bodyFont: string;
  displayFont?: string;
};

export type TemplateBaseSettings = {
  [T in Template]: BaseSettings;
};

export type DocumentSettings = {
  bodyFont: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  margin: SideSetting;
  border: SideSetting;
};

export type ResumeSettings = {
  document: DocumentSettings;
};

export type LetterSettings = {
  document: DocumentSettings;
  recipientDetails: Settings;
  header: {
    isCentered: boolean;
    backgroundColor: string;
    borderColor: string;
    margin: SideSetting;
    border: SideSetting;
    padding: SideSetting;
  };
  subject: Settings;
  reference: Settings;
  body: {
    fontSize: number;
    lineHeight: number;
    fontWeight: number; // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    color: string;
    indentation: number;
    isJustified: boolean;
    margin: SideSetting;
    gap: number;
    isSignatureRightAligned: boolean;
  };
};

export type TemplateSettings = {
  [T in Template]: {
    base: BaseSettings;
    resume: ResumeSettings;
    letter: LetterSettings;
  };
};

export interface Detail {
  icon: null | "default" | "address" | "drivingLicense" | "email" | "phone";
  value: string;
}

export interface Link {
  icon:
    | null
    | "default"
    | "bandcamp"
    | "behance"
    | "facebook"
    | "gitHub"
    | "instagram"
    | "linkedIn"
    | "mastodon"
    | "soundCloud"
    | "stackOverflow"
    | "viadeo"
    | "x";
  url: string;
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
  period: string; // No strict format to allow custom values
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

export interface Profile {
  isNiceResumeExport: boolean;
  template: Template;
  name: string;
  title: string;
  contactDetails: Array<Detail>;
  socialLinks: Array<Link>;
}

export interface Resume extends Profile {
  about: string;
  categories: Array<Category>;
}

export interface Letter extends Profile {
  recipientDetails: string[];
  subject: string;
  reference: string;
  paragraphs: string[];
}

export interface Export extends Resume, Letter {
  isNiceResumeExport: boolean;
}
