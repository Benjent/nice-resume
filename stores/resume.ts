import { defineStore } from "pinia";
import type { Category, Detail, Link } from "@/types";
import { resumeSettings } from "@/globals";

// Use option API to take advantage of automatic persistence
// @ts-expect-error - TS does not handle option API syntax
export const useResumeStore = defineStore("resume", {
  state: () => ({
    // Content
    about: "",
    categories: [] as Category[],
    contactDetails: [] as Detail[],
    socialLinks: [] as Link[],

    // Design
    settings: structuredClone(resumeSettings),
  }),
  persist: true,
});
