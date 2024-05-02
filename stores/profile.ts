import { defineStore } from "pinia";
import type { Template } from "@/types";
import { templateColors, templates } from "@/globals";

// Use option API to take advantage of automatic persistence
export const useProfileStore = defineStore("profile", {
  state: () => ({
    colors: templateColors[templates[0]],
    isThemeCustomized: false,
    name: "",
    template: templates[0] as Template,
    title: "",
  }),
  persist: true,
});
