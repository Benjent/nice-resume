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
    class="bg-white h-full w-full flex flex-col p-12 text-zinc-600 font-sans"
  >
    <header v-if="name" class="mb-6">
      <h1 v-if="name" class="text-center text-4xl mb-2 font-display">
        {{ name }}
      </h1>
      <h2 v-if="title" class="text-center text-xl mb-2">
        {{ title }}
      </h2>
      <ul
        v-if="contactDetails.length"
        class="text-center leading-tight flex justify-center gap-x-6 flex-wrap mb-2"
      >
        <li
          v-for="detail in contactDetails"
          :key="detail.value"
          class="flex gap-1 items-center"
        >
          <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
          {{ detail.value }}
        </li>
      </ul>
      <ul
        v-if="socialLinks.length"
        class="text-center leading-tight flex justify-center gap-x-6 flex-wrap"
      >
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

    <p
      v-if="about"
      class="py-6 border-t-[1px] border-zinc-200 text-center font-display"
    >
      {{ about }}
    </p>

    <div class="flex bg-white">
      <aside
        v-if="categories.some((category) => category.layout === 'aside')"
        class="w-[25%] pr-4"
      >
        <div
          v-for="(category, index) in categories.filter(
            (category) => category.layout === 'aside',
          )"
          :key="index"
          class="mb-6"
        >
          <h3 class="font-display uppercase mb-5 text-xl text-black font-bold">
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <div class="uppercase text-black leading-none">
                {{ entry.title }}
              </div>
              <template v-if="entry.nature === 'experience'">
                <div class="text-zinc-400 leading-tight">
                  {{ entry.organization }}
                </div>
                <div class="text-zinc-400 leading-tight">
                  {{ entry.location }}
                </div>
                <div class="text-zinc-400 leading-tight">
                  {{ entry.startDate }} - {{ entry.endDate }}
                </div>
                <p class="text-sm">{{ entry.summary }}</p>
              </template>
              <ul class="list-disc list-inside ml-3 text-sm">
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
          v-for="(category, index) in categories.filter(
            (category) => category.layout !== 'aside',
          )"
          :key="index"
          class="py-6 border-t-[1px] border-zinc-200"
          :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
        >
          <h3 class="font-display uppercase mb-5 text-xl text-black font-bold">
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-4">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <div class="uppercase text-black leading-none">
                {{ entry.title }}
              </div>
              <template v-if="entry.nature === 'experience'">
                <div class="text-zinc-400 mb-1">
                  {{ entry.organization }} | {{ entry.location }} |
                  {{ entry.startDate }} - {{ entry.endDate }}
                </div>
                <p class="text-sm">{{ entry.summary }}</p>
              </template>
              <ul class="list-disc list-inside ml-3 text-sm">
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
@import url("https://fonts.googleapis.com/css2?family=Kaisei+Tokumin&display=swap");

.font-display {
  font-family: "Kaisei Tokumin";
}
</style>
