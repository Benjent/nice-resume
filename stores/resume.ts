import { defineStore } from "pinia";
import type { Category, Detail, Link } from "@/types";

// Use option API to take advantage of automatic persistence
// @ts-expect-error - TS does not handle option API syntax
export const useResumeStore = defineStore("resume", {
  state: () => ({
    about: "",
    categories: [] as Category[],
    contactDetails: [] as Detail[],
    socialLinks: [] as Link[],
  }),
  persist: true,
});
