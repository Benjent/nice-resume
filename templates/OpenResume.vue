<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import Document from "@/components/Document.vue";
import LetterBody from "@/components/LetterBody.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { name, title } = storeToRefs(useProfileStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <Document>
    <header class="px-12 py-6">
      <h1
        v-if="name"
        class="text-3xl mb-2 font-bold"
        :class="'text-[color:var(--resume-color0)]'"
      >
        {{ name }}
      </h1>
      <h2 v-if="title" class="text-xl mb-2 font-bold">
        {{ title }}
      </h2>
      <ul class="flex justify-between gap-2 flex-wrap text-sm">
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
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
      <div class="flex gap-12 px-12">
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
              class="mb-2 font-bold before:content-[''] before:inline-block before:mr-3 before:relative before:bottom-1 before:w-12 before:h-1 before:bg-[color:var(--resume-color0)]"
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
                    <div v-if="entry.organization">
                      {{ entry.organization }}
                      <template v-if="entry.location">
                        , {{ entry.location }}
                      </template>
                    </div>
                    <div v-if="entry.period">
                      {{ entry.period }}
                    </div>
                  </div>
                  <p class="italic" v-if="entry.summary">{{ entry.summary }}</p>
                </template>
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
              class="mb-2 font-bold before:content-[''] before:inline-block before:mr-3 before:relative before:bottom-1 before:w-12 before:h-1 before:bg-[color:var(--resume-color0)]"
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
                    <div v-if="entry.organization">
                      {{ entry.organization }}
                      <template v-if="entry.location">
                        , {{ entry.location }}
                      </template>
                    </div>
                    <div v-if="entry.period">
                      {{ entry.period }}
                    </div>
                  </div>
                  <p class="italic" v-if="entry.summary">{{ entry.summary }}</p>
                </template>
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
      </div>
    </template>
  </Document>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "@/assets/styles/index.css";

.font-body {
  font-family: "Roboto";
}
</style>
