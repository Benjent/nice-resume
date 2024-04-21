<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { about, categories, contactDetails, name, socialLinks, title } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div class="h-full w-full flex flex-col font-body bg-white text-[#414e66]">
    <template v-if="name">
      <header class="flex items-start gap-4 py-8 px-10 bg-[#d88277] text-white">
        <div class="flex flex-col font-bold">
          <h1 v-if="name" class="text-4xl">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-2xl">
            {{ title }}
          </h2>
        </div>
        <ul class="leading-tight text-sm text-right ml-auto">
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            <ContactIcon
              v-if="detail.icon"
              :icon="detail.icon"
              class="w-4 text-[#f8aaa6]"
            />
            {{ detail.value }}
          </li>
          <li
            v-for="link in socialLinks"
            :key="`${link.url}${link.icon}`"
            class="flex gap-1 items-center"
          >
            <LinkIcon
              v-if="link.icon"
              :icon="link.icon"
              class="w-4 text-[#f8aaa6]"
            />
            {{ link.url }}
          </li>
        </ul>
      </header>

      <p
        v-if="about"
        class="py-4 px-10 bg-[#f8aaa6] text-center font-display font-bold text-2xl"
      >
        {{ about }}
      </p>
    </template>

    <div class="flex flex-1 items-start">
      <aside
        v-if="categories.some((category) => category.layout === 'aside')"
        class="w-[25%] h-full bg-[#414e66] text-white"
      >
        <div
          v-for="(category, index) in categories.filter(
            (category) => category.layout === 'aside',
          )"
          :key="index"
          class="p-10"
        >
          <h3 class="font-bold text-[#f8aaa6] text-2xl mb-4">
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <template v-if="entry.nature === 'experience'">
                <div v-if="entry.startDate && entry.title" class="font-bold">
                  <span v-if="entry.startDate" class="text-[#d88277]">
                    {{ entry.startDate }}
                    <template v-if="entry.endDate">
                      - {{ entry.endDate }}
                    </template>
                  </span>
                  <span class="ml-2" v-if="entry.title">{{ entry.title }}</span>
                </div>
                <div
                  v-if="entry.organization || entry.location"
                  class="flex gap-2 font-light text-sm"
                >
                  <div v-if="entry.organization">{{ entry.organization }}</div>
                  <div v-if="entry.location">{{ entry.location }}</div>
                </div>
                <p v-if="entry.summary" class="mt-4">
                  {{ entry.summary }}
                </p>
              </template>
              <template v-else>
                <div v-if="entry.title" class="font-bold">
                  {{ entry.title }}
                </div>
              </template>
              <ul
                class="list-inside italic text-sm"
                v-if="entry.highlights.length"
              >
                <li
                  v-for="(highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                  class="leading-loose"
                >
                  {{ highlight }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <div class="grid grid-cols-2 gap-x-4 gap-y-10 flex-1 p-10">
        <section
          v-for="(category, categoryIndex) in categories.filter(
            (category) => category.layout !== 'aside',
          )"
          :key="categoryIndex"
          :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
        >
          <h3 class="font-bold text-[#d88277] text-2xl mb-4">
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <template v-if="entry.nature === 'experience'">
                <div v-if="entry.startDate && entry.title" class="font-bold">
                  <span v-if="entry.startDate" class="text-[#d88277]">
                    {{ entry.startDate }}
                    <template v-if="entry.endDate">
                      - {{ entry.endDate }}
                    </template>
                  </span>
                  <span class="ml-2" v-if="entry.title">{{ entry.title }}</span>
                </div>
                <div
                  v-if="entry.organization || entry.location"
                  class="flex gap-2 font-light text-sm"
                >
                  <div v-if="entry.organization">{{ entry.organization }}</div>
                  <div v-if="entry.location">{{ entry.location }}</div>
                </div>
                <p v-if="entry.summary" class="mt-4">
                  {{ entry.summary }}
                </p>
              </template>
              <template v-else>
                <div v-if="entry.title" class="font-bold">
                  {{ entry.title }}
                </div>
              </template>
              <ul
                class="list-inside italic ml-5 text-sm"
                v-if="entry.highlights.length"
              >
                <li
                  v-for="(highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                  class="leading-loose"
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
@import url("https://fonts.googleapis.com/css2?family=Caveat&family=Karla:ital,wght@0,200..800;1,200..800&display=swap");

.font-body {
  font-family: "Karla";
}

.font-display {
  font-family: "Caveat";
}
</style>
