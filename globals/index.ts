import type {
  Asset,
  BaseSettings,
  Category,
  Detail,
  DocumentType,
  Experience,
  LetterSettings,
  Link,
  ResumeSettings,
  Template,
  TemplateBaseSettings,
  TemplateSettings,
} from "@/types";

export const documentTypes: Array<DocumentType> = ["resume", "letter"];

export const fonts: string[] = [
  "Caveat",
  "Fira Sans",
  "Josefin Sans",
  "Kaisei Tokumin",
  "Karla",
  "Lato",
  "League Gothic",
  "Libre Franklin",
  "Mulish",
  "Open Sans",
  "Open Sans Condensed",
  "Roboto",
  "Yanone Kaffeesatz",
];

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

// export const fontWeights: {
//   "Open Sans": [200, 300, 500, 600, 900];
// }; // TODO one entry per font-family

export const resumeSettings: ResumeSettings = {
  document: {
    bodyFont: "serif",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    margin: [40, 40, 40, 40], // TODO [80, 80, 80, 80]; feel VERY nice
    border: [0, 0, 0, 0],
  },
};

// TODO allow bullet point edition (circle, hyphen, square, none, ...)
// TODO for ANY element that is text, have below properties+letterSPacing
export const letterSettings: LetterSettings = {
  document: {
    bodyFont: "serif",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    margin: [40, 40, 40, 40],
    border: [0, 0, 0, 0],
  },
  recipientDetails: {
    fontSize: 14,
    // TODO fontfamily
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    color: "currentColor",
    backgroundColor: "#ffffff",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [40, 0, 40, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    gap: 12,
  },
  header: {
    isCentered: true,
    backgroundColor: "#ffffff",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 40, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  subject: {
    fontSize: 14,
    // TODO fontfamily
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isUppercase: false,
    isCentered: true,
    color: "currentColor",
    backgroundColor: "#ffffff",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  reference: {
    fontSize: 12,
    // TODO fontfamily
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    isItalic: false,
    isCentered: true,
    color: "currentColor",
    backgroundColor: "#ffffff",
    borderColor: "currentColor",
    borderRadius: 0,
    margin: [0, 0, 0, 0],
    border: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  body: {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400, // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping
    color: "currentColor",
    indentation: 48,
    isJustified: true,
    margin: [0, 0, 0, 0],
    gap: 12,
    isSignatureRightAligned: true,
  },
};

export const templateBaseSettings: TemplateBaseSettings = {
  Aster: {
    isLetterMarginless: true,
    colors: ["#713c97", "#f6881f", "#ffffff", "#000000"],
    bodyFont: "Fira Sans",
  },
  CottonCandy: {
    isLetterMarginless: true,
    colors: ["#ed3660", "#5662e8", "#e8afcf", "#ffffff", "#1e1e1e"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Cupcake: {
    isLetterMarginless: true,
    colors: ["#f2b150", "#e593aa", "#a9d7e2", "#231f20"],
    bodyFont: "Open Sans Condensed",
    displayFont: "Yanone Kaffeesatz",
  },
  Macaron: {
    isLetterMarginless: true,
    colors: ["#d88277", "#f8aaa6", "#ffffff", "#414e66"],
    bodyFont: "Karla",
    displayFont: "Caveat",
  },
  Macchiato: {
    isLetterMarginless: true,
    colors: ["#56817a", "#f8f8ff", "#39424b"],
    bodyFont: "Lato",
    displayFont: "Josefin Sans",
  },
  Oilcloth: {
    isLetterMarginless: true,
    colors: ["#0076c0", "#f6ba62", "#43a385", "#ffffff", "#231f20"],
    bodyFont: "Open Sans",
    displayFont: "Yanone Kaffeesatz",
  },
  OpenResume: {
    isLetterMarginless: true,
    colors: ["#38bdf8", "#000000"],
    bodyFont: "Roboto",
  },
  Paper: {
    isLetterMarginless: false,
    colors: ["#cfcfcf", "#000000"],
    bodyFont: "Times New Roman",
  },
  Pharmacy: {
    isLetterMarginless: false,
    colors: ["#06b6d4", "#475569", "#94a3b8", "#0f172a"],
    bodyFont: "Libre Franklin",
  },
  Red: {
    isLetterMarginless: true,
    colors: ["#ab3134", "#231f20"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Stone: {
    isLetterMarginless: false,
    colors: ["#000000", "#a1a1aa", "#e4e4e7", "#52525b"],
    bodyFont: "sans-serif",
    displayFont: "Kaisei Tokumin",
  },
  Toothpaste: {
    isLetterMarginless: true,
    colors: ["#ed3660", "#5662e8", "#e8afcf", "#1e1e1e"],
    bodyFont: "Mulish",
    displayFont: "League Gothic",
  },
  Wiki: {
    isLetterMarginless: false,
    colors: ["#1e3a8a", "#000000"],
    bodyFont: "Fira Sans",
  },
};

// TODO allow any "Setting" to have its own font family (CF Cupcake theme which as several ones)
// TODO allow letter spacing

export const templateSettings: TemplateSettings = {
  Aster: {
    base: templateBaseSettings.Aster,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  CottonCandy: {
    base: templateBaseSettings.CottonCandy,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Cupcake: {
    base: templateBaseSettings.Cupcake,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Macaron: {
    base: templateBaseSettings.Macaron,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Macchiato: {
    base: templateBaseSettings.Macchiato,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Oilcloth: {
    base: templateBaseSettings.Oilcloth,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  OpenResume: {
    base: templateBaseSettings.OpenResume,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Paper: {
    base: templateBaseSettings.Paper,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Pharmacy: {
    base: templateBaseSettings.Pharmacy,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Red: {
    base: templateBaseSettings.Red,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Stone: {
    base: templateBaseSettings.Stone,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Toothpaste: {
    base: templateBaseSettings.Toothpaste,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
  Wiki: {
    base: templateBaseSettings.Wiki,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  },
};

function scaffoldTemplateSettings(
  template: Template,
  baseSettings: BaseSettings,
  isLetterMarginless: boolean,
) {
  const settings = {
    base: baseSettings,
    resume: structuredClone(resumeSettings),
    letter: structuredClone(letterSettings),
  };
  settings.resume.document.bodyFont = baseSettings.bodyFont;
  settings.letter.document.bodyFont = baseSettings.bodyFont;
  settings.resume.document.color =
    baseSettings.colors[baseSettings.colors.length - 1];
  settings.letter.document.color =
    baseSettings.colors[baseSettings.colors.length - 1];

  if (isLetterMarginless) {
    settings.letter.recipientDetails.margin[1] = 64;
    settings.letter.recipientDetails.margin[3] = 64;
    settings.letter.header.margin[1] = 64;
    settings.letter.header.margin[3] = 64;
    settings.letter.body.margin[1] = 64;
    settings.letter.body.margin[3] = 64;
  }
  templateSettings[template] = settings;
}

// TODO reprendre ici : vérifier que le assign marche bien, full custommiser la vue letter, et une fois que c'est fait, full customiser la vue CV
// Remplacer chaque --var ou classe tailwind par son style défini below
// pour rappel, les templatezs sont en fait dsormais à la fois des presets (colors = blabla)
// réfléchir au concept de layout de section, où on peut dire par ex que les company et title sont sur la même ligne ou pas
Object.entries(templateBaseSettings).forEach(([key, value]) => {
  scaffoldTemplateSettings(key as Template, value, value.isLetterMarginless);
});

if (templateSettings.Aster.resume && templateSettings.Aster.letter) {
  templateSettings.Aster.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Aster.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Aster.letter.recipientDetails.fontWeight = 300;
  templateSettings.Aster.letter.header.isCentered;
  templateSettings.Aster.letter.subject.fontSize = 18;
  templateSettings.Aster.letter.subject.fontWeight = 300;
  templateSettings.Aster.letter.reference.fontSize = 15;
  templateSettings.Aster.letter.reference.fontWeight = 300;
  templateSettings.Aster.letter.reference.color =
    templateBaseSettings.Aster.colors[0];
  templateSettings.Aster.letter.body.fontWeight = 300;
  templateSettings.Aster.letter.body.lineHeight = 1.6;
}

if (
  templateSettings.CottonCandy.resume &&
  templateSettings.CottonCandy.letter
) {
  templateSettings.CottonCandy.resume.document.margin = [0, 0, 0, 0];
  templateSettings.CottonCandy.letter.document.margin = [0, 0, 0, 0];
  templateSettings.CottonCandy.letter.recipientDetails.color =
    templateBaseSettings.CottonCandy.colors[0];
  templateSettings.CottonCandy.letter.recipientDetails.margin[0] = 0;
  templateSettings.CottonCandy.letter.recipientDetails.margin[1] = 40;
  templateSettings.CottonCandy.letter.recipientDetails.margin[3] = 40;
  templateSettings.CottonCandy.letter.recipientDetails.isItalic = true;
  templateSettings.CottonCandy.letter.header.margin[1] = 40;
  templateSettings.CottonCandy.letter.header.margin[3] = 40;
  templateSettings.CottonCandy.letter.subject.fontWeight = 700;
  templateSettings.CottonCandy.letter.reference.fontSize = 11;
  templateSettings.CottonCandy.letter.body.margin[1] = 40;
  templateSettings.CottonCandy.letter.body.margin[3] = 40;
}

if (templateSettings.Cupcake.resume && templateSettings.Cupcake.letter) {
  templateSettings.Cupcake.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Cupcake.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Cupcake.letter.recipientDetails.margin[0] = 24;
  templateSettings.Cupcake.letter.recipientDetails.margin[1] = 32;
  templateSettings.Cupcake.letter.recipientDetails.margin[3] = 32;
  templateSettings.Cupcake.letter.recipientDetails.fontSize = 16;
  templateSettings.Cupcake.letter.recipientDetails.lineHeight = 1;
  templateSettings.Cupcake.letter.header.margin[1] = 32;
  templateSettings.Cupcake.letter.header.margin[3] = 32;
  templateSettings.Cupcake.letter.subject.fontWeight = 600;
  templateSettings.Cupcake.letter.subject.fontSize = 20;
  templateSettings.Cupcake.letter.reference.fontSize = 15;
  templateSettings.Cupcake.letter.body.margin[1] = 32;
  templateSettings.Cupcake.letter.body.margin[3] = 32;
  templateSettings.Cupcake.letter.body.fontSize = 16;
}

if (templateSettings.Macaron.resume && templateSettings.Macaron.letter) {
  templateSettings.Macaron.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Macaron.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Macaron.letter.recipientDetails.margin[1] = 40;
  templateSettings.Macaron.letter.subject.fontWeight = 600;
  templateSettings.Macaron.letter.subject.fontSize = 19;
  templateSettings.Macaron.letter.reference.color =
    templateBaseSettings.Macaron.colors[0];
  templateSettings.Macaron.letter.reference.fontSize = 16;
}

if (templateSettings.Macchiato.resume && templateSettings.Macchiato.letter) {
  templateSettings.Macchiato.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Macchiato.letter.document.margin = [0, 0, 0, 0];
  // templateSettings.Macchiato.letter.document.margin = [48, 48, 48, 48];
  templateSettings.Macchiato.resume.document.border = [10, 0, 0, 0];
  templateSettings.Macchiato.letter.document.border = [10, 0, 0, 0];
  templateSettings.Macchiato.resume.document.borderColor =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.letter.document.borderColor =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.letter.recipientDetails.margin = [0, 48, 48, 48];
  templateSettings.Macchiato.letter.recipientDetails.fontSize = 12;
  templateSettings.Macchiato.letter.header.margin[1] = 48;
  templateSettings.Macchiato.letter.header.margin[3] = 48;
  templateSettings.Macchiato.letter.subject.font =
    templateBaseSettings.Macchiato.displayFont;
  templateSettings.Macchiato.letter.subject.fontSize = 17;
  templateSettings.Macchiato.letter.reference.color =
    templateBaseSettings.Macchiato.colors[0];
  templateSettings.Macchiato.letter.body.margin = [0, 48, 48, 48];
}

if (templateSettings.Oilcloth.resume && templateSettings.Oilcloth.letter) {
  templateSettings.Oilcloth.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Oilcloth.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Oilcloth.letter.recipientDetails.color =
    templateBaseSettings.Oilcloth.colors[0];
}

if (templateSettings.OpenResume.resume && templateSettings.OpenResume.letter) {
  templateSettings.OpenResume.resume.document.margin = [0, 0, 0, 0];
  templateSettings.OpenResume.letter.document.margin = [0, 0, 0, 0];
  // templateSettings.OpenResume.letter.document.margin = [48, 26, 48, 26];
  templateSettings.OpenResume.resume.document.border = [8, 0, 0, 0];
  templateSettings.OpenResume.resume.document.borderColor =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.document.border = [8, 0, 0, 0];
  templateSettings.OpenResume.letter.document.borderColor =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.recipientDetails.isItalic = true;
  templateSettings.OpenResume.letter.recipientDetails.margin[0] = 24;
  templateSettings.OpenResume.letter.recipientDetails.margin[1] = 48;
  templateSettings.OpenResume.letter.header.isCentered = false;
  templateSettings.OpenResume.letter.header.margin[3] = 48 * 2;
  templateSettings.OpenResume.letter.subject.fontWeight = 800;
  templateSettings.OpenResume.letter.subject.isCentered = false;
  templateSettings.OpenResume.letter.reference.fontWeight = 800;
  templateSettings.OpenResume.letter.reference.isCentered = false;
  templateSettings.OpenResume.letter.reference.color =
    templateBaseSettings.OpenResume.colors[0];
  templateSettings.OpenResume.letter.body.margin = [0, 48, 0, 48];
}

if (templateSettings.Paper.resume && templateSettings.Paper.letter) {
  templateSettings.Paper.resume.document.margin = [80, 80, 80, 80];
  templateSettings.Paper.letter.document.margin = [80, 80, 80, 80];
  templateSettings.Paper.letter.header.isCentered = false;
  templateSettings.Paper.letter.subject.isCentered = false;
  templateSettings.Paper.letter.reference.isItalic = true;
  templateSettings.Paper.letter.reference.isCentered = false;
  templateSettings.Paper.letter.body.indentation = 0;
  templateSettings.Paper.letter.body.isSignatureRightAligned = false;
}

if (templateSettings.Pharmacy.resume && templateSettings.Pharmacy.letter) {
  templateSettings.Pharmacy.resume.document.margin = [48, 48, 48, 48];
  templateSettings.Pharmacy.letter.document.margin = [48, 48, 48, 48];
  templateSettings.Pharmacy.letter.recipientDetails.borderColor =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.recipientDetails.border[1] = 2;
  templateSettings.Pharmacy.letter.recipientDetails.padding[1] = 20;
  templateSettings.Pharmacy.letter.subject.fontSize = 18;
  templateSettings.Pharmacy.letter.subject.color =
    templateBaseSettings.Pharmacy.colors[0];
  templateSettings.Pharmacy.letter.reference.fontSize = 15;
  templateSettings.Pharmacy.letter.reference.color =
    templateBaseSettings.Pharmacy.colors[2];
}

if (templateSettings.Red.resume && templateSettings.Red.letter) {
  // templateSettings.Red.resume.document.margin = [48, 26, 48, 26];
  // templateSettings.Red.letter.document.margin = [48, 26, 48, 26];
  templateSettings.Red.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Red.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Red.letter.recipientDetails.margin[0] = 0;
  templateSettings.Red.letter.recipientDetails.isItalic = true;
  templateSettings.Red.letter.recipientDetails.fontSize = 12;
  templateSettings.Red.letter.recipientDetails.color =
    templateBaseSettings.Red.colors[0];
  templateSettings.Red.letter.subject.fontWeight = 600;
  templateSettings.Red.letter.reference.color =
    templateBaseSettings.Red.colors[0];
}

if (templateSettings.Stone.resume && templateSettings.Stone.letter) {
  templateSettings.Stone.letter.document.margin = [48, 48, 48, 48];
  templateSettings.Stone.letter.recipientDetails.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.recipientDetails.borderColor =
    templateBaseSettings.Stone.colors[2];
  templateSettings.Stone.letter.recipientDetails.border = [1, 1, 1, 1];
  templateSettings.Stone.letter.recipientDetails.padding = [6, 10, 6, 10];
  templateSettings.Stone.letter.header.isCentered = false;
  templateSettings.Stone.letter.subject.isCentered = false;
  templateSettings.Stone.letter.subject.isUppercase = true;
  templateSettings.Stone.letter.subject.fontSize = 20;
  templateSettings.Stone.letter.subject.fontWeight = 600;
  templateSettings.Stone.letter.subject.font =
    templateBaseSettings.Stone.displayFont;
  templateSettings.Stone.letter.reference.margin[0] = 10;
  templateSettings.Stone.letter.reference.isCentered = false;
  templateSettings.Stone.letter.reference.color =
    templateBaseSettings.Stone.colors[1];
  templateSettings.Stone.letter.body.indentation = 0;
  templateSettings.Stone.letter.body.isSignatureRightAligned = false;
}

if (templateSettings.Toothpaste.resume && templateSettings.Toothpaste.letter) {
  templateSettings.Toothpaste.resume.document.margin = [0, 0, 0, 0];
  templateSettings.Toothpaste.letter.document.margin = [0, 0, 0, 0];
  templateSettings.Toothpaste.letter.recipientDetails.fontSize = 12;
  templateSettings.Toothpaste.letter.recipientDetails.isItalic = true;
  templateSettings.Toothpaste.letter.recipientDetails.color =
    templateBaseSettings.Toothpaste.colors[0];
  templateSettings.Toothpaste.letter.subject.fontWeight = 600;
  templateSettings.Toothpaste.letter.reference.color =
    templateBaseSettings.Toothpaste.colors[0];
}

if (templateSettings.Wiki.resume && templateSettings.Wiki.letter) {
  templateSettings.Wiki.resume.document.margin = [24, 20, 24, 20];
  templateSettings.Wiki.letter.document.margin = [24, 20, 24, 20];
  templateSettings.Wiki.letter.recipientDetails.fontSize = 12;
  templateSettings.Wiki.letter.recipientDetails.lineHeight = 1.2;
  templateSettings.Wiki.letter.header.margin[1] = 20;
  templateSettings.Wiki.letter.header.margin[3] = 20;
  templateSettings.Wiki.letter.subject.isItalic = true;
  templateSettings.Wiki.letter.subject.fontSize = 16;
  templateSettings.Wiki.letter.body.margin[1] = 20;
  templateSettings.Wiki.letter.body.margin[3] = 20;
  templateSettings.Wiki.letter.body.fontSize = 12;
}

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
