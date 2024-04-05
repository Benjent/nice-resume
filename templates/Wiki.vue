<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResumeStore } from "@/stores/resume";
import LinkIcon from "../components/LinkIcon.vue";

const {
  about,
  address,
  categories,
  drivingLicense,
  email,
  name,
  phone,
  socialLinks,
  title,
} = storeToRefs(useResumeStore());
</script>

<template>
  <div class="bg-white h-full w-full flex flex-col py-2 px-6 text-xs font-body">
    <header class="flex mb-4">
      <ul class="flex flex-col">
        <li>{{ phone }}</li>
        <li>{{ address }}</li>
        <li>{{ drivingLicense }}</li>
        <li>{{ email }}</li>
      </ul>
      <div class="flex-1 text-center mb-1">
        <h1 class="text-3xl font-bold">{{ name }}</h1>
        <h2 class="text-xl">{{ title }}</h2>
        <p>{{ about }}</p>
      </div>
      <ul class="flex flex-col items-end">
        <li
          v-for="link in socialLinks"
          :key="link.url"
          class="flex gap-1 items-center"
        >
          <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
          {{ link.url }}
        </li>
      </ul>
    </header>

    <div class="flex gap-6">
      <aside
        v-if="categories.some((category) => category.layout === 'aside')"
        class="w-[20%] flex flex-col gap-6"
      >
        <div
          v-for="(category, categoryIndex) in categories.filter(
            (category) => category.layout === 'aside',
          )"
          :key="categoryIndex"
        >
          <h3 class="uppercase text-blue-900 border-b-[1px] border-black mb-1">
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-4">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
              class="flex flex-col gap-2"
            >
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <div class="font-semibold">{{ entry.title }}</div>
                  <div v-if="entry.nature === 'experience'" class="italic">
                    {{ entry.organization }}
                  </div>
                </div>
                <div
                  v-if="entry.nature === 'experience'"
                  class="flex flex-col text-right"
                >
                  <div>{{ entry.startDate }} - {{ entry.endDate }}</div>
                  <div class="italic">{{ entry.location }}</div>
                </div>
              </div>
              <p v-if="entry.nature === 'experience' && entry.summary">
                {{ entry.summary }}
              </p>
              <ul v-if="entry.highlights.length">
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
      <div class="grid grid-cols-2 gap-6 flex-1">
        <section
          v-for="(category, categoryIndex) in categories.filter(
            (category) => category.layout !== 'aside',
          )"
          :key="categoryIndex"
          :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
        >
          <h3 class="uppercase text-blue-900 border-b-[1px] border-black mb-1">
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
              class="flex flex-col gap-2"
            >
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <div class="font-semibold">{{ entry.title }}</div>
                  <div v-if="entry.nature === 'experience'" class="italic">
                    {{ entry.organization }}
                  </div>
                </div>
                <div
                  v-if="entry.nature === 'experience'"
                  class="flex flex-col text-right"
                >
                  <div>{{ entry.startDate }} - {{ entry.endDate }}</div>
                  <div class="italic">{{ entry.location }}</div>
                </div>
              </div>
              <p v-if="entry.nature === 'experience' && entry.summary">
                {{ entry.summary }}
              </p>
              <ul class="list-disc list-inside" v-if="entry.highlights.length">
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
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import "@/assets/styles/index.css";

.font-body {
  font-family: "Fira Sans";
}
.font-display {
  /* font-family: "Josefin Sans"; */
}
</style>
