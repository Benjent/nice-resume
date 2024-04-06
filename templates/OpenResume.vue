<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "../components/ContactIcon.vue";
import LinkIcon from "../components/LinkIcon.vue";

const { about, categories, contactDetails, name, socialLinks, title } =
  storeToRefs(useResumeStore());
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
      <ul class="flex justify-between gap-2 flex-wrap text-sm">
        <li
          v-for="detail in contactDetails"
          :key="detail.value"
          class="flex gap-1 items-center"
        >
          <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
          {{ detail.value }}
        </li>
        <li
          v-for="link in socialLinks"
          :key="link.url"
          class="flex gap-1 items-center"
        >
          <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
          {{ link.url }}
        </li>
      </ul>

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
      <div class="grid grid-cols-2 gap-8 flex-1">
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
