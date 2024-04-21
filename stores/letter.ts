import { ref } from "vue";
import { defineStore } from "pinia";

// @ts-expect-error - TS error with "state: () => {}" syntax
export const useLetterStore = defineStore("letter", {
  state: () => {
    const recipientDetails = ref<string[]>([]);
    const subject = ref("");
    const reference = ref("");
    const paragraphs = ref<string[]>([]);

    return {
      paragraphs,
      recipientDetails,
      reference,
      subject,
    };
  },
  persist: true,
});
