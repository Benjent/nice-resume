<script setup lang="ts">
import { storeToRefs } from "pinia";
import { LinkIcon } from "@heroicons/vue/16/solid";
import { useResumeStore } from "../../stores/resume";

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
  <div class="bg-tertiary h-full w-full">
    <template v-if="name">
      <header
        class="flex items-start gap-12 p-12 bg-white text-dark font-display"
      >
        <div
          class="flex flex-col place-items-center w-fit border-y-4 border-primary p-4"
        >
          <h1 v-if="name" class="text-center uppercase text-4xl">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-center uppercase text-2xl">
            {{ title }}
          </h2>
        </div>
        <div class="flex flex-col gap-2 text-primary">
          <div class="leading-none">
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
              <LinkIcon class="w-4 text-dark" />{{ website }}
            </div>
            <div v-if="linkedIn" class="flex gap-1 items-center">
              <img
                src="../../assets/images/icons/linkedin.svg"
                alt="LinkedIn icon"
                class="h-4"
              />{{ linkedIn }}
            </div>
            <div v-if="gitHub" class="flex gap-1 items-center">
              <img
                src="../../assets/images/icons/github.svg"
                alt="GitHub icon"
                class="h-4"
              />{{ gitHub }}
            </div>
          </div>
        </div>
      </header>

      <div class="drop-shadow-lg">
        <div
          class="w-full absolute left-0 right-0 m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-white h-5"
        />
      </div>
    </template>

    <template v-if="workExperience.length">
      <section class="p-12 bg-primary text-white">
        <h3 class="font-display uppercase mb-5 text-2xl">
          {{ workExperienceLabel }}
        </h3>
        <ul class="flex flex-col gap-2">
          <li v-for="(job, jobIndex) in workExperience" :key="`job${jobIndex}`">
            <div class="grid grid-cols-5">
              <div class="font-display bold text-xl col-span-2">
                {{ job.position }}
              </div>
              <div>{{ job.company }}</div>
              <div>{{ job.period }}</div>
              <div>{{ job.location }}</div>
            </div>
            <div>
              <p class="bold">{{ job.description }}</p>
              <ul class="italic text-sm">
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

      <div class="drop-shadow-lg">
        <div
          class="w-full absolute left-0 right-0 m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-primary h-5"
        />
      </div>
    </template>

    <template v-if="education.length">
      <section class="p-12 bg-secondary text-tertiary">
        <h3 class="font-display uppercase mb-5 text-2xl">
          {{ educationLabel }}
        </h3>
        <ul class="flex flex-col gap-2">
          <li
            v-for="(training, trainingIndex) in education"
            :key="`training${trainingIndex}`"
          >
            <div class="grid grid-cols-5">
              <div class="font-display bold text-xl col-span-3">
                {{ training.diploma }}
              </div>
              <div>{{ training.period }}</div>
              <div>{{ training.institution }}, {{ training.location }}</div>
            </div>
            <p class="italic text-sm">{{ training.description }}</p>
          </li>
        </ul>
      </section>

      <div class="drop-shadow-lg">
        <div
          class="w-full absolute left-0 right-0 m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-secondary h-5"
        />
      </div>
    </template>

    <section v-if="skills.length" class="p-12 bg-tertiary text-secondary">
      <h3 class="font-display uppercase mb-5 text-2xl">{{ skillsLabel }}</h3>
      <ul class="flex flex-col">
        <li v-for="(skill, skillIndex) in skills" :key="`skill${skillIndex}`">
          <span class="font-display bold text-xl">{{ skill.name }}</span
          ><span v-if="skill.level" class="italic font-sm">
            ({{ skill.level }})</span
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=League+Gothic&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");

@config "../../../tailwind.Benjent2023.config.js";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  #preview {
    font-family: "Mulish";
  }
}
</style>
