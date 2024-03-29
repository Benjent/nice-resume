import { ref } from "vue";
import { defineStore } from "pinia";
import { type Category, type Template } from "@/types";
import { templates } from "@/globals";

export const useResumeStore = defineStore("resume", () => {
  const template = ref<Template>(templates[0]);

  const name = ref("");
  const title = ref("");
  const about = ref("");

  const address = ref("");
  const email = ref("");
  const phone = ref("");
  const drivingLicense = ref("");

  const linkedIn = ref("");
  const gitHub = ref("");
  const website = ref("");

  const categories = ref<Category[]>([]);

  return {
    about,
    address,
    categories,
    drivingLicense,
    email,
    gitHub,
    linkedIn,
    name,
    phone,
    template,
    title,
    website,
  };
});
