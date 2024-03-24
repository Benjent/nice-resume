<script setup lang="ts">
import { storeToRefs } from "pinia";
import { LinkIcon } from "@heroicons/vue/16/solid";
import { useResumeStore } from "@/stores/resume";
import GitHubIcon from "@/assets/images/icons/github.svg";
import LinkedInIcon from "@/assets/images/icons/linkedin.svg";

const {
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
  title,
  website,
  workExperience,
  workExperienceLabel,
} = storeToRefs(useResumeStore());
</script>

<template>
  <div class="bg-white h-full w-full flex flex-col justify-between font-body">
    <header
      v-if="name"
      class="flex items-start gap-12 px-10 py-6 text-[#1e1e1e] font-display"
    >
      <div
        class="flex flex-col place-items-center w-fit border-y-4 border-[#ed3660] py-2 px-4"
      >
        <h1 v-if="name" class="text-center uppercase text-4xl">
          {{ name }}
        </h1>
        <h2 v-if="title" class="text-center uppercase text-2xl">
          {{ title }}
        </h2>
      </div>
      <div class="flex flex-col gap-2">
        <div class="leading-none font-body text-xs italic">
          <div v-if="drivingLicense || address">
            <span v-if="drivingLicense">{{ drivingLicense }}</span>
            <span v-if="drivingLicense && address"> - </span>
            <span v-if="address">{{ address }}</span>
          </div>
          <div v-if="email">{{ email }}</div>
          <div v-if="phone">{{ phone }}</div>
        </div>
        <div class="leading-tight">
          <div v-if="website" class="flex gap-1">
            <LinkIcon class="w-4" />{{ website }}
          </div>
          <div v-if="linkedIn" class="flex gap-1 items-center">
            <LinkedInIcon />{{ linkedIn }}
          </div>
          <div v-if="gitHub" class="flex gap-1 items-center">
            <GitHubIcon />{{ gitHub }}
          </div>
        </div>
      </div>
    </header>

    <section
      v-if="workExperience.length"
      class="px-10 py-6 border-t-2 border-[#ed3660]"
    >
      <h3 class="font-display uppercase mb-2 text-2xl text-[#ed3660]">
        {{ workExperienceLabel }}
      </h3>
      <ul class="flex flex-col gap-2">
        <li v-for="(job, jobIndex) in workExperience" :key="jobIndex">
          <div class="flex items-baseline">
            <div class="text-[#ed3660] flex-1 font-display text-xl">
              {{ job.position }}
            </div>
            <div>{{ job.company }} · {{ job.period }} · {{ job.location }}</div>
          </div>
          <div>
            <p class="text-sm">{{ job.description }}</p>
            <ul class="italic text-xs">
              <li v-for="(task, taskIndex) in job.tasks" :key="taskIndex">
                {{ task }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>

    <section
      v-if="education.length"
      class="px-10 py-6 border-t-2 border-[#5662e8]"
    >
      <h3 class="font-display uppercase mb-2 text-2xl text-[#5662e8]">
        {{ educationLabel }}
      </h3>
      <ul class="flex flex-col gap-2">
        <li v-for="(training, trainingIndex) in education" :key="trainingIndex">
          <div class="flex items-baseline">
            <div class="text-[#5662e8] flex-1 font-display text-xl">
              {{ training.diploma }}
            </div>
            <div>
              {{ training.period }} · {{ training.institution }},
              {{ training.location }}
            </div>
          </div>
          <p class="italic text-xs">{{ training.description }}</p>
        </li>
      </ul>
    </section>

    <section
      v-if="skills.length"
      class="px-10 py-6 border-t-2 border-[#e8afcf]"
    >
      <h3 class="font-display uppercase mb-2 text-2xl text-[#e8afcf]">
        {{ skillsLabel }}
      </h3>
      <ul class="flex gap-2">
        <li v-for="(skill, skillIndex) in skills" :key="skillIndex">
          <span class="text-[#e8afcf] font-display bold text-xl">{{
            skill.name
          }}</span
          ><span v-if="skill.level" class="italic text-sm text-[#e8afcf]">
            ({{ skill.level }})</span
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=League+Gothic&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");
@import "@/assets/styles/index.css";

@layer components {
  .font-body {
    font-family: "Mulish";
  }
  .font-display {
    font-family: "League Gothic";
  }
}
</style>
