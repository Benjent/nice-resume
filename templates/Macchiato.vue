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
    class="bg-white h-full w-full flex flex-col p-12 border-t-[10px] border-teal-700 text-[#39424B] font-body text-xs"
  >
    <header>
      <h1 v-if="name" class="text-4xl font-display font-bold tracking-wide">
        {{ name }}
      </h1>
      <h2
        v-if="title"
        class="text-xl mb-2 font-display font-light tracking-wider"
      >
        {{ title }}
      </h2>
    </header>

    <div class="flex gap-12">
      <aside class="w-[20%] flex flex-col gap-4">
        <div>
          <h3
            class="font-light tracking-wider after:content-[''] after:block after:border-b-[1px] after:border-teal-700 after:w-12 after:mt-2 after:mb-3"
          >
            About
          </h3>
          <p v-if="about" class="mb-2">{{ about }}</p>
          <ul>
            <li
              v-for="detail in contactDetails"
              :key="`${detail.value}${detail.icon}`"
              class="flex gap-1 items-center"
            >
              <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
              {{ detail.value }}
            </li>
            <li
              v-for="link in socialLinks"
              :key="`${link.url}${link.icon}`"
              class="flex gap-2 items-center"
            >
              <LinkIcon v-if="link.icon" :icon="link.icon" class="w-3" />
              {{ link.url }}
            </li>
          </ul>
        </div>
        <div
          v-for="(category, categoryIndex) in categories.filter(
            (category) => category.layout === 'aside',
          )"
          :key="categoryIndex"
        >
          <h3
            class="font-light tracking-wider after:content-[''] after:block after:border-b-[1px] after:border-teal-700 after:w-12 after:mt-2 after:mb-3"
          >
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-2">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <div
                class="italic font-light"
                v-if="entry.nature === 'experience' && entry.startDate"
              >
                {{ entry.startDate }}
                <template v-if="entry.endDate">- {{ entry.endDate }}</template>
              </div>
              <div class="font-bold">{{ entry.title }}</div>
              <template v-if="entry.nature === 'experience'">
                <div v-if="entry.organization">{{ entry.organization }}</div>
                <div v-if="entry.location">{{ entry.location }}</div>
                <p v-if="entry.summary">{{ entry.summary }}</p>
              </template>
              <ul class="flex gap-1 flew-wrap" v-if="entry.highlights.length">
                <li
                  v-for="(highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                  class="bg-slate-100 p-[0.1rem] rounded"
                >
                  {{ highlight }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <div class="grid grid-cols-2 gap-4 flex-1">
        <section
          v-for="(category, categoryIndex) in categories.filter(
            (category) => category.layout !== 'aside',
          )"
          :key="categoryIndex"
          :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
        >
          <h3
            class="font-light tracking-wider after:content-[''] after:block after:border-b-[1px] after:border-teal-700 after:w-12 after:mt-2 after:mb-3"
          >
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <div
                class="italic text-right font-light"
                v-if="entry.nature === 'experience' && entry.startDate"
              >
                {{ entry.startDate }}
                <template v-if="entry.endDate">- {{ entry.endDate }}</template>
              </div>
              <div class="font-light">{{ entry.title }}</div>
              <template v-if="entry.nature === 'experience'">
                <div v-if="entry.organization">{{ entry.organization }}</div>
                <div v-if="entry.location">{{ entry.location }}</div>
                <p v-if="entry.summary">{{ entry.summary }}</p>
              </template>
              <ul
                class="list-disc list-inside ml-7"
                v-if="entry.highlights.length"
              >
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
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");
@import "@/assets/styles/index.css";

.font-body {
  font-family: "Lato";
}
.font-display {
  font-family: "Josefin Sans";
}
</style>
