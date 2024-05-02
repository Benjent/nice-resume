import { defineStore } from "pinia";

// Use option API to take advantage of automatic persistence
export const useLetterStore = defineStore("letter", {
  state: () => ({
    paragraphs: [] as string[],
    recipientDetails: [] as string[],
    reference: "",
    subject: "",
  }),
  persist: true,
});
