import { ref } from "vue";
import { defineStore } from "pinia";
import {
  type Education,
  type Skill,
  type Template,
  type WorkExperience,
} from "../types";
import { templates } from "../globals";

export const useResumeStore = defineStore("resume", () => {
  const template = ref<Template>(templates[0]);

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
  const workExperienceLabel = ref("Work experience");
  const education = ref<Education[]>([]);
  const educationLabel = ref("Education");
  const skills = ref<Skill[]>([]);
  const skillsLabel = ref("Skills");

  return {
    address,
    drivingLicense,
    education,
    educationLabel,
    email,
    gitHub,
    linkedIn,
    name,
    phone,
    skills,
    skillsLabel,
    template,
    title,
    website,
    workExperience,
    workExperienceLabel,
  };
});
