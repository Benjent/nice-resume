import { defineStore } from "pinia";
import { letterSettings } from "@/globals";

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
    settings: structuredClone(letterSettings),
  }),
  persist: true,
});
