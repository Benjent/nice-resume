import { ref } from "vue";
import { defineStore } from "pinia";
import type { Category, Detail, Link, Template } from "@/types";
import { templates } from "@/globals";

export const useResumeStore = defineStore("resume", () => {
  const template = ref<Template>(templates[0]);

  const name = ref("");
  const title = ref("");
  const about = ref("");
  const contactDetails = ref<Detail[]>([]);
  const socialLinks = ref<Link[]>([]);
  const categories = ref<Category[]>([]);

  return {
    about,
    categories,
    contactDetails,
    name,
    socialLinks,
    template,
    title,
  };
});
