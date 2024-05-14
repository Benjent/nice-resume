import { defineStore } from "pinia";
import { templateBaseSettings, templates } from "@/globals";

// Use option API to take advantage of automatic persistence
// @ts-expect-error - TS does not handle option API syntax
export const useProfileStore = defineStore("profile", {
  state: () => ({
    // Content
    name: "",
    title: "",

    // Design
    isThemeCustomized: false,
    template: templates[0],
    customColors: structuredClone(templateBaseSettings[templates[0]].colors),
  }),
  persist: true,
});
