import { ref } from "vue";
import { defineStore } from "pinia";
import type { Category, Detail, Link } from "@/types";

// @ts-expect-error - TS error with "state: () => {}" syntax
export const useResumeStore = defineStore("resume", {
  state: () => {
    const about = ref("");
    const contactDetails = ref<Detail[]>([]);
    const socialLinks = ref<Link[]>([]);
    const categories = ref<Category[]>([]);

    return {
      about,
      categories,
      contactDetails,
      socialLinks,
    };
  },
  persist: true,
});
