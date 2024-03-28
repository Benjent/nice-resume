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
    class="bg-white h-full w-full flex flex-col p-12 font-body text-slate-900"
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
          {{ email }}
          <EnvelopeIcon class="w-4" />
        </div>
        <div v-if="phone" class="flex gap-1 items-center">
          {{ phone }}
          <PhoneIcon class="w-4" />
        </div>
        <div v-if="address" class="flex gap-1 items-center">
          {{ address }}
          <MapPinIcon class="w-4" />
        </div>
        <div v-if="drivingLicense" class="flex gap-1 items-center">
          {{ drivingLicense }}
          <IdentificationIcon class="w-4" />
        </div>
        <div v-if="website" class="flex gap-1 items-center">
          {{ website }}
          <LinkIcon class="w-4" />
        </div>
        <div v-if="linkedIn" class="flex gap-1 items-center">
          {{ linkedIn }}
          <LinkedInIcon />
        </div>
        <div v-if="gitHub" class="flex gap-1 items-center">
          {{ gitHub }}
          <GitHubIcon />
        </div>
      </div>
    </header>

    <div class="text-center my-12">
      <h2 v-if="title" class="text-cyan-500 text-4xl tracking-widest">
        {{ title }}
      </h2>
      <p v-if="about" class="mt-2 text-slate-400">
        {{ about }}
      </p>
    </div>

    <div class="flex gap-12">
      <aside
        v-if="categories.some((category) => category.layout === 'aside')"
        class="w-[20%] flex flex-col gap-8"
      >
        <div
          v-for="(category, index) in categories.filter(
            (category) => category.layout === 'aside',
          )"
          :key="index"
        >
          <h3 class="mb-2 text-lg uppercase font-bold tracking-widest">
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-2 text-sm">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <div class="text-cyan-500">
                {{ entry.title }}
              </div>
              <template v-if="entry.nature === 'experience'">
                <div>{{ entry.startDate }} - {{ entry.endDate }}</div>
                <div class="text-cyan-500">
                  {{ entry.organization }} {{ entry.location }}
                </div>
                <div>
                  <p class="text-xs text-slate-400">{{ entry.summary }}</p>
                  <ul class="list-disc list-inside ml-1 text-xs text-slate-600">
                    <li
                      v-for="(highlight, highlightIndex) in entry.highlights"
                      :key="highlightIndex"
                    >
                      {{ highlight }}
                    </li>
                  </ul>
                </div>
              </template>
              <ul class="list-disc list-inside ml-1 text-xs text-slate-600">
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
      <div class="grid grid-cols-2 gap-x-8 gap-y-12">
        <section
          v-for="(category, index) in categories.filter(
            (category) => category.layout !== 'aside',
          )"
          :key="index"
          :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
        >
          <h3 class="mb-2 text-lg uppercase font-bold tracking-widest">
            {{ category.name }}
          </h3>
          <ul v-if="category.nature === 'asset'" class="flex gap-8 text-sm">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
              class=""
            >
              <div class="text-cyan-500" v-if="entry.nature === 'asset'">
                {{ entry.title }}
              </div>
              <ul class="list-disc list-inside ml-1 text-xs text-slate-600">
                <li
                  v-for="(highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                >
                  {{ highlight }}
                </li>
              </ul>
            </li>
          </ul>
          <ul
            v-else
            class="flex flex-col gap-4 text-sm border-l-4 border-cyan-500 pl-4"
          >
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <template v-if="entry.nature === 'experience'">
                <div class="relative">
                  <span
                    class="text-cyan-500 relative before:content-[''] before:absolute before:inline-block before:size-4 before:-left-[1.625rem] before:top-2 before:bg-slate-400 before:rounded-full"
                  >
                    {{ entry.startDate }} - {{ entry.endDate }}
                  </span>
                  &nbsp;: {{ entry.title }}
                </div>
                <div class="text-cyan-500">
                  {{ entry.organization }} {{ entry.location }}
                </div>
                <div>
                  <p class="text-xs text-slate-400">{{ entry.summary }}</p>
                  <ul class="list-disc list-inside ml-1 text-xs text-slate-600">
                    <li
                      v-for="(highlight, highlightIndex) in entry.highlights"
                      :key="highlightIndex"
                    >
                      {{ highlight }}
                    </li>
                  </ul>
                </div>
              </template>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap");

.font-body {
  font-family: "Libre Franklin";
}
</style>
