import { defineStore } from "pinia";
import { templates } from "@/globals";

// Use option API to take advantage of automatic persistence
// @ts-expect-error - TS does not handle option API syntax
export const useProfileStore = defineStore("profile", {
  state: () => ({
    // Content
    name: "",
    title: "",

    // Design
    isCustomizationForAllDocumentTypes: true,
    isThemeCustomized: false,
    template: templates[0],
  }),
  persist: true,
});
