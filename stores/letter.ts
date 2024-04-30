import { defineStore } from "pinia";

// Use option API to take advantage of automatic persistence
// @ts-expect-error - TS does not handle option API syntax
export const useLetterStore = defineStore("letter", {
  state: () => ({
    paragraphs: [] as string[],
    recipientDetails: [] as string[],
    reference: "",
    subject: "",
  }),
  persist: true,
});
