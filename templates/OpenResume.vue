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
  about,
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
    class="bg-white h-full w-full flex flex-col py-6 px-12 border-t-8 border-amber-500 font-body"
  >
    <header>
      <h1 v-if="name" class="text-3xl mb-2 text-amber-500 font-bold">
        {{ name }}
      </h1>
      <h2 v-if="title" class="text-xl mb-2 font-bold">
        {{ title }}
      </h2>
      <div class="flex justify-between gap-2 flex-wrap text-sm">
        <div v-if="email" class="flex gap-1 items-center">
          <EnvelopeIcon class="w-4" />{{ email }}
        </div>
        <div v-if="phone" class="flex gap-1 items-center">
          <PhoneIcon class="w-4" />{{ phone }}
        </div>
        <div v-if="address" class="flex gap-1 items-center">
          <MapPinIcon class="w-4" />{{ address }}
        </div>
        <div v-if="drivingLicense" class="flex gap-1 items-center">
          <IdentificationIcon class="w-4" />{{ drivingLicense }}
        </div>
        <div v-if="website" class="flex gap-1 items-center">
          <LinkIcon class="w-4" />{{ website }}
        </div>
        <div v-if="linkedIn" class="flex gap-1 items-center">
          <LinkedInIcon />{{ linkedIn }}
        </div>
        <div v-if="gitHub" class="flex gap-1 items-center">
          <GitHubIcon />{{ gitHub }}
        </div>
      </div>

      <p v-if="about" class="text-center mt-2 italic">
        {{ about }}
      </p>
    </header>

    <section v-if="workExperience.length" class="mt-6">
      <h3
        class="mb-2 font-bold before:content-[''] before:inline-block before:mr-3 before:relative before:bottom-1 before:w-12 before:h-1 before:bg-amber-500"
      >
        {{ workExperienceLabel }}
      </h3>
      <ul class="flex flex-col gap-4 text-sm">
        <li v-for="(job, jobIndex) in workExperience" :key="jobIndex">
          <div class="font-semibold">{{ job.position }}</div>
          <div class="flex justify-between">
            <div>{{ job.company }}, {{ job.location }}</div>
            <div>{{ job.period }}</div>
          </div>
          <div>
            <p class="italic">{{ job.description }}</p>
            <ul class="list-disc list-inside ml-1 text-xs">
              <li v-for="(task, taskIndex) in job.tasks" :key="taskIndex">
                {{ task }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>

    <section v-if="education.length" class="mt-6">
      <h3
        class="mb-2 font-bold before:content-[''] before:inline-block before:mr-3 before:relative before:bottom-1 before:w-12 before:h-1 before:bg-amber-500"
      >
        {{ educationLabel }}
      </h3>
      <ul class="flex flex-col gap-4 text-sm">
        <li v-for="(training, trainingIndex) in education" :key="trainingIndex">
          <div class="font-semibold">{{ training.diploma }}</div>
          <div class="flex justify-between">
            <div>{{ training.institution }}, {{ training.location }}</div>
            <div>{{ training.period }}</div>
          </div>
          <p class="italic text-xs">{{ training.description }}</p>
        </li>
      </ul>
    </section>

    <section v-if="skills.length" class="mt-6">
      <h3
        class="mb-2 font-bold before:content-[''] before:inline-block before:mr-3 before:relative before:bottom-1 before:w-12 before:h-1 before:bg-amber-500"
      >
        {{ skillsLabel }}
      </h3>
      <ul class="flex flex-col text-sm">
        <li
          v-for="(skill, skillIndex) in skills"
          :key="skillIndex"
          class="flex gap-2 items-baseline"
        >
          <span>{{ skill.name }}</span
          ><span v-if="skill.level">{{ skill.level }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "@/assets/styles/index.css";

.font-body {
  font-family: "Roboto";
}
</style>
