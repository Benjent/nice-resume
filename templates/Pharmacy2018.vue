<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  EnvelopeIcon,
  IdentificationIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/vue/16/solid";
import GitHubIcon from "@/assets/images/icons/github.svg";
import LinkedInIcon from "@/assets/images/icons/linkedin.svg";
import { useResumeStore } from "@/stores/resume";

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
  <div
    class="bg-white h-full w-full flex flex-col justify-between p-12 font-body text-slate-900"
  >
    <header>
      <h1
        v-if="name"
        class="text-3xl mb-2 text-cyan-500 uppercase tracking-widest"
      >
        {{ name }}
      </h1>
      <div
        class="flex flex-col gap-1 text-xs items-end border-r-2 border-cyan-500 pr-6"
      >
        <div v-if="email" class="flex gap-1 items-center">
          {{ email }}<EnvelopeIcon class="w-4" />
        </div>
        <div v-if="phone" class="flex gap-1 items-center">
          {{ phone }}<PhoneIcon class="w-4" />
        </div>
        <div v-if="address" class="flex gap-1 items-center">
          {{ address }}<MapPinIcon class="w-4" />
        </div>
        <div v-if="drivingLicense" class="flex gap-1 items-center">
          {{ drivingLicense }}<IdentificationIcon class="w-4" />
        </div>
        <div v-if="website" class="flex gap-1 items-center">
          {{ website }}<LinkIcon class="w-4" />
        </div>
        <div v-if="linkedIn" class="flex gap-1 items-center">
          {{ linkedIn }}<LinkedInIcon />
        </div>
        <div v-if="gitHub" class="flex gap-1 items-center">
          {{ gitHub }}<GitHubIcon />
        </div>
      </div>
    </header>

    <h2
      v-if="title"
      class="text-center my-8 text-cyan-500 text-4xl tracking-widest"
    >
      {{ title }}
    </h2>

    <div class="grid grid-cols-2 gap-8">
      <section v-if="workExperience.length">
        <h3 class="mb-2 text-lg uppercase font-bold tracking-widest">
          {{ workExperienceLabel }}
        </h3>
        <ul class="flex flex-col gap-4 text-sm border-l-4 border-cyan-500 pl-4">
          <li v-for="(job, jobIndex) in workExperience" :key="`job${jobIndex}`">
            <div class="relative">
              <span
                class="text-cyan-500 relative before:content-[''] before:absolute before:inline-block before:size-4 before:-left-[1.625rem] before:top-2 before:bg-slate-400 before:rounded-full"
                >{{ job.period }}</span
              >&nbsp;: {{ job.position }}
            </div>
            <div class="text-cyan-500">
              {{ job.company }} {{ job.location }}
            </div>
            <div>
              <p class="text-xs text-slate-400">{{ job.description }}</p>
              <ul class="list-disc list-inside ml-1 text-xs text-slate-600">
                <li
                  v-for="(task, taskIndex) in job.tasks"
                  :key="`task${taskIndex}`"
                >
                  {{ task }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
      <section v-if="education.length">
        <h3 class="mb-2 text-lg uppercase font-bold tracking-widest">
          {{ educationLabel }}
        </h3>
        <ul class="flex flex-col gap-4 text-sm border-l-4 border-cyan-500 pl-4">
          <li
            v-for="(training, trainingIndex) in education"
            :key="`training${trainingIndex}`"
          >
            <div class="relative">
              <span
                class="text-cyan-500 before:content-[''] before:absolute before:inline-block before:size-4 before:-left-[1.625rem] before:top-2 before:bg-slate-400 before:rounded-full"
                >{{ training.period }}</span
              >&nbsp;: {{ training.diploma }}
            </div>
            <div class="text-cyan-500">
              {{ training.institution }} {{ training.location }}
            </div>
            <p class="text-xs text-slate-400">{{ training.description }}</p>
          </li>
        </ul>
      </section>
    </div>

    <section v-if="skills.length">
      <h3 class="mb-2 text-lg uppercase font-bold tracking-widest">
        {{ skillsLabel }}
      </h3>
      <ul class="flex flex-col text-sm">
        <li
          v-for="(skill, skillIndex) in skills"
          :key="`skill${skillIndex}`"
          class="flex gap-2 items-baseline"
        >
          <span class="text-cyan-500">{{ skill.name }}</span
          ><span v-if="skill.level">{{ skill.level }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap");
@import "@/assets/styles/index.css";

@layer components {
  .font-body {
    font-family: "Libre Franklin";
  }
}
</style>
