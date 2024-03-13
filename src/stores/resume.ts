import { ref } from "vue";
import { defineStore } from "pinia";
import { Education, WorkExperience } from "../types";

export const useResumeStore = defineStore("resume", () => {
  const name = ref("");
  const title = ref("");

  const address = ref("");
  const email = ref("");
  const phone = ref("");
  const drivingLicense = ref("");

  const linkedIn = ref("");
  const gitHub = ref("");
  const website = ref("");

  const workExperience = ref<WorkExperience[]>([]);
  const education = ref<Education[]>([]);

  return {
    address,
    drivingLicense,
    education,
    email,
    gitHub,
    linkedIn,
    name,
    phone,
    title,
    website,
    workExperience,
  };
});
