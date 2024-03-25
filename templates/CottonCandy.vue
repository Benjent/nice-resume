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
  <div class="h-full w-full bg-[#e8afcf]">
    <template v-if="name">
      <header
        class="flex items-start gap-10 py-8 px-10 bg-white text-[#1e1e1e] font-display"
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
        <div class="flex flex-col gap-2 text-[#ed3660]">
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
              <LinkIcon class="w-4" />{{ website }}
            </div>
            <div v-if="linkedIn" class="flex gap-1 items-center">
              <LinkedInIcon />
              {{ linkedIn }}
            </div>
            <div v-if="gitHub" class="flex gap-1 items-center">
              <GitHubIcon />
              {{ gitHub }}
            </div>
          </div>
        </div>
      </header>

      <div class="drop-shadow-lg">
        <div
          class="w-full absolute left-0 right-0 -top-[2px] m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-white h-5"
        />
      </div>
    </template>

    <template v-if="workExperience.length">
      <section class="py-6 px-10 bg-[#ed3660] text-white">
        <h3 class="font-display uppercase mb-2 text-2xl">
          {{ workExperienceLabel }}
        </h3>
        <ul class="flex flex-col gap-3">
          <li v-for="(job, jobIndex) in workExperience" :key="jobIndex">
            <div class="grid grid-cols-[40%_30%_30%] items-baseline grid-gap-4">
              <div class="font-display text-xl">
                {{ job.position }}
              </div>
              <div class="text-sm font-semibold">{{ job.period }}</div>
              <div class="text-sm font-semibold">
                {{ job.company }}, {{ job.location }}
              </div>
            </div>
            <div>
              <p class="text-sm font-semibold">{{ job.description }}</p>
              <ul class="italic text-xs">
                <li v-for="(task, taskIndex) in job.tasks" :key="taskIndex">
                  {{ task }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <div class="drop-shadow-lg">
        <div
          class="w-full absolute left-0 right-0 -top-[2px] m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-[#ed3660] h-5"
        />
      </div>
    </template>

    <template v-if="education.length">
      <section class="py-6 px-10 bg-[#5662e8] text-[#e8afcf]">
        <h3 class="font-display uppercase mb-2 text-2xl">
          {{ educationLabel }}
        </h3>
        <ul class="flex flex-col gap-3">
          <li
            v-for="(training, trainingIndex) in education"
            :key="trainingIndex"
          >
            <div class="flex gap-2 items-baseline -mb-1">
              <div class="font-display text-xl">
                {{ training.diploma }}
              </div>
              <div>{{ training.period }}</div>
              <div>{{ training.institution }}, {{ training.location }}</div>
            </div>
            <p class="italic text-xs">{{ training.description }}</p>
          </li>
        </ul>
      </section>

      <div class="drop-shadow-lg">
        <div
          class="w-full absolute left-0 right-0 -top-[2px] m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-[#5662e8] h-5"
        />
      </div>
    </template>

    <section
      v-if="skills.length"
      class="py-6 px-10 bg-[#e8afcf] text-[#5662e8]"
    >
      <h3 class="font-display uppercase mb-2 text-2xl">{{ skillsLabel }}</h3>
      <ul class="flex gap-3">
        <li v-for="(skill, skillIndex) in skills" :key="skillIndex">
          <span class="font-display text-xl">{{ skill.name }}</span
          ><span v-if="skill.level" class="italic text-sm">
            ({{ skill.level }})</span
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=League+Gothic&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");

.font-body {
  font-family: "Mulish";
}
.font-display {
  font-family: "League Gothic";
}
</style>
