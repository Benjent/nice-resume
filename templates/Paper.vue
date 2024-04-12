<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { name, title } = storeToRefs(useProfileStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div class="bg-white h-full w-full flex flex-col p-20 font-serif text-xs">
    <header v-if="name" class="pb-4">
      <h1 v-if="name" class="text-xl">{{ name }}, {{ title }}</h1>
      <ul class="flex gap-2">
        <li
          v-for="detail in contactDetails"
          :key="`${detail.value}${detail.icon}`"
          class="flex gap-1 items-center"
        >
          <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
          {{ detail.value }}, {{ " " }}
        </li>
      </ul>
      <ul class="flex gap-2">
        <li
          v-for="link in socialLinks"
          :key="`${link.url}${link.icon}`"
          class="flex gap-1 items-center"
        >
          <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
          {{ link.url }}
        </li>
      </ul>
    </header>
    <p class="border-t-2 border-dotted border-zinc-300 p-4 pl-0">
      {{ about }}
    </p>

    <section
      v-for="(category, index) in categories"
      :key="index"
      class="border-t-2 border-dotted border-zinc-300 flex gap-4 p-4 pl-0"
    >
      <h3 class="uppercase w-[20%]">
        {{ category.name }}
      </h3>
      <ul class="flex flex-col gap-4 flex-1">
        <li v-for="(entry, entryIndex) in category.entries" :key="entryIndex">
          <div class="flex justify-between">
            <div>
              <span class="font-bold">{{ entry.title }}</span>
              <span v-if="entry.nature === 'experience' && entry.organization">
                | {{ entry.organization }}
                <span v-if="entry.location">, {{ entry.location }}</span>
              </span>
            </div>
            <div v-if="entry.nature === 'experience' && entry.startDate">
              {{ entry.startDate }}
              <template v-if="entry.endDate">- {{ entry.endDate }}</template>
            </div>
          </div>
          <p
            v-if="entry.nature === 'experience' && entry.summary"
            class="text-xs"
          >
            {{ entry.summary }}
          </p>
          <ul
            class="list-disc list-inside ml-1 text-xs"
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
</template>
