import { ref } from "vue";
import { defineStore } from "pinia";
import type { Template } from "@/types";
import { templateColors, templates } from "@/globals";

// @ts-expect-error - TS error with "state: () => {}" syntax
export const useProfileStore = defineStore("profile", {
  state: () => {
    const template = ref<Template>(templates[0]);

    const name = ref("");
    const title = ref("");

    const isThemeCustomized = ref(false);
    const colors = ref(templateColors[template.value]);

    return {
      colors,
      isThemeCustomized,
      name,
      template,
      title,
    };
  },
  persist: true,
});
