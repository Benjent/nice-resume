<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
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

const location = computed(() =>
  [drivingLicense.value, address.value].filter(Boolean).join(" | "),
);

const contact = computed(() =>
  [phone.value, email.value, website.value].filter(Boolean).join(" | "),
);

const social = computed(() =>
  [gitHub.value, linkedIn.value].filter(Boolean).join(" | "),
);
</script>

<template>
  <div
    class="bg-white h-full w-full flex flex-col justify-between p-12 text-zinc-600"
  >
    <header v-if="name" class="mb-6">
      <h1 v-if="name" class="text-center text-4xl mb-2 font-display">
        {{ name }}
      </h1>
      <h2 v-if="title" class="text-center text-xl mb-2">
        {{ title }}
      </h2>
      <div class="text-center leading-tight">{{ location }}</div>
      <div class="text-center leading-tight">{{ contact }}</div>
      <div class="text-center leading-tight">{{ social }}</div>
    </header>

    <section
      v-if="workExperience.length"
      class="py-6 border-t-[1px] border-zinc-200"
    >
      <h3 class="font-display uppercase mb-5 text-xl text-black font-bold">
        {{ workExperienceLabel }}
      </h3>
      <ul class="flex flex-col gap-4">
        <li v-for="(job, jobIndex) in workExperience" :key="`job${jobIndex}`">
          <div class="uppercase text-black leading-none">
            {{ job.position }}
          </div>
          <div class="text-zinc-400 mb-1">
            {{ job.company }} | {{ job.location }} | {{ job.period }}
          </div>
          <div>
            <p class="text-sm">{{ job.description }}</p>
            <ul class="list-disc list-inside ml-3 text-sm">
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

    <section
      v-if="education.length"
      class="py-6 border-t-[1px] border-zinc-200"
    >
      <h3 class="font-display uppercase mb-5 text-xl text-black font-bold">
        {{ educationLabel }}
      </h3>
      <ul class="flex flex-col gap-4">
        <li
          v-for="(training, trainingIndex) in education"
          :key="`training${trainingIndex}`"
        >
          <div class="uppercase text-black leading-none">
            {{ training.diploma }}
          </div>
          <div class="text-zinc-400">
            {{ training.institution }} | {{ training.location }} |
            {{ training.period }}
          </div>
          <p class="text-sm">{{ training.description }}</p>
        </li>
      </ul>
    </section>

    <section v-if="skills.length" class="py-6 border-t-[1px] border-zinc-200">
      <h3 class="font-display uppercase mb-5 text-2xl text-black font-bold">
        {{ skillsLabel }}
      </h3>
      <ul class="flex flex-col">
        <li
          v-for="(skill, skillIndex) in skills"
          :key="`skill${skillIndex}`"
          class="flex gap-2 items-baseline"
        >
          <span class="uppercase text-black">{{ skill.name }}</span
          ><span v-if="skill.level" class=""> {{ skill.level }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
