import { defineStore } from "pinia";
import { templateThemes, templates } from "@/globals";

// Use option API to take advantage of automatic persistence
// @ts-expect-error - TS does not handle option API syntax
export const useLetterStore = defineStore("letter", {
  state: () => ({
    // Content
    paragraphs: [] as string[],
    recipientDetails: [] as string[],
    reference: "",
    subject: "",

    // Design
    colors: templateThemes[templates[0]].letter.colors,
    margins: templateThemes[templates[0]].letter.margins,
  }),
  persist: true,
});
