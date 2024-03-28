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
  categories,
  drivingLicense,
  email,
  gitHub,
  linkedIn,
  name,
  phone,
  title,
  website,
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
          <EnvelopeIcon class="w-4" />
          {{ email }}
        </div>
        <div v-if="phone" class="flex gap-1 items-center">
          <PhoneIcon class="w-4" />
          {{ phone }}
        </div>
        <div v-if="address" class="flex gap-1 items-center">
          <MapPinIcon class="w-4" />
          {{ address }}
        </div>
        <div v-if="drivingLicense" class="flex gap-1 items-center">
          <IdentificationIcon class="w-4" />
          {{ drivingLicense }}
        </div>
        <div v-if="website" class="flex gap-1 items-center">
          <LinkIcon class="w-4" />
          {{ website }}
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

      <p v-if="about" class="text-center mt-2 italic">
        {{ about }}
      </p>
    </header>

    <div class="flex gap-12">
      <aside
        v-if="categories.some((category) => category.layout === 'aside')"
        class="w-[20%] flex flex-col gap-8"
      >
        <div
          v-for="(category, categoryIndex) in categories.filter(
            (category) => category.layout === 'aside',
          )"
          :key="categoryIndex"
          class="mt-6"
        >
          <h3
            class="mb-2 font-bold before:content-[''] before:inline-block before:mr-3 before:relative before:bottom-1 before:w-12 before:h-1 before:bg-amber-500"
          >
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-4 text-sm">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <div class="font-semibold">{{ entry.title }}</div>
              <template v-if="entry.nature === 'experience'">
                <div class="flex justify-between">
                  <div>{{ entry.organization }}, {{ entry.location }}</div>
                  <div>{{ entry.startDate }} - {{ entry.endDate }}</div>
                </div>
                <p class="italic">{{ entry.summary }}</p>
              </template>
              <ul class="list-disc list-inside ml-1 text-xs">
                <li
                  v-for="(highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                >
                  {{ highlight }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <div class="grid grid-cols-2 gap-8">
        <section
          v-for="(category, categoryIndex) in categories.filter(
            (category) => category.layout !== 'aside',
          )"
          :key="categoryIndex"
          class="mt-6"
          :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
        >
          <h3
            class="mb-2 font-bold before:content-[''] before:inline-block before:mr-3 before:relative before:bottom-1 before:w-12 before:h-1 before:bg-amber-500"
          >
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-4 text-sm">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <div class="font-semibold">{{ entry.title }}</div>
              <template v-if="entry.nature === 'experience'">
                <div class="flex justify-between">
                  <div>{{ entry.organization }}, {{ entry.location }}</div>
                  <div>{{ entry.startDate }} - {{ entry.endDate }}</div>
                </div>
                <p class="italic">{{ entry.summary }}</p>
              </template>
              <ul class="list-disc list-inside ml-1 text-xs">
                <li
                  v-for="(highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                >
                  {{ highlight }}
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "@/assets/styles/index.css";

.font-body {
  font-family: "Roboto";
}
</style>
