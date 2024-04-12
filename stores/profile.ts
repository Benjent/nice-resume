import { ref } from "vue";
import { defineStore } from "pinia";
import type { Template } from "@/types";
import { templates } from "@/globals";

// @ts-expect-error - TS error with "state: () => {}" syntax
export const useProfileStore = defineStore("profile", {
  state: () => {
    const template = ref<Template>(templates[0]);

    const name = ref("");
    const title = ref("");

    return {
      name,
      template,
      title,
    };
  },
  persist: true,
});
