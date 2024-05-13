<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
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

const { isHeaderSimple } = storeToRefs(useLetterStore());
</script>

<template>
  <Document>
    <header
      v-if="documentType === 'resume' || !isHeaderSimple"
      class="flex mb-4"
    >
      <ul class="flex flex-col">
        <li
          v-for="detail in contactDetails"
          :key="`${detail.value}${detail.icon}`"
          class="flex gap-1 items-center"
        >
          <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
          {{ detail.value }}
        </li>
      </ul>
      <div class="flex-1 text-center mb-1 mx-1">
        <h1 class="text-3xl font-bold">{{ name }}</h1>
        <h2 class="text-xl">{{ title }}</h2>
        <p>{{ about }}</p>
      </div>
      <ul class="flex flex-col items-end">
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
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
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
            <h3
              class="uppercase text-[color:var(--resume-color0)] border-b-[1px] border-[color:var(--resume-color1)] mb-1"
            >
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
                    <div
                      v-if="entry.nature === 'experience' && entry.organization"
                      class="italic"
                    >
                      {{ entry.organization }}
                    </div>
                  </div>
                  <div
                    v-if="entry.nature === 'experience'"
                    class="flex flex-col text-right"
                  >
                    <div v-if="entry.period">
                      {{ entry.period }}
                    </div>
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
            <h3
              class="uppercase text-[color:var(--resume-color0)] border-b-[1px] border-[color:var(--resume-color1)] mb-1"
            >
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
                    <div
                      v-if="entry.nature === 'experience' && entry.organization"
                      class="italic"
                    >
                      {{ entry.organization }}
                    </div>
                  </div>
                  <div
                    v-if="entry.nature === 'experience'"
                    class="flex flex-col text-right"
                  >
                    <div v-if="entry.period">
                      {{ entry.period }}
                    </div>
                    <div class="italic">{{ entry.location }}</div>
                  </div>
                </div>
                <p v-if="entry.nature === 'experience' && entry.summary">
                  {{ entry.summary }}
                </p>
                <ul
                  class="list-disc list-inside"
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
.font-body {
  font-family: "Fira Sans";
}
</style>
