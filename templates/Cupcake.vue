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
    <header
      class="text-[color:var(--resume-color0)] flex justify-between gap-8 px-8 py-6"
    >
      <div class="font-display">
        <h1 v-if="name" class="text-4xl tracking-[0.5rem] font-bold">
          {{ name }}
        </h1>
        <h2 v-if="title" class="text-2xl tracking-widest">
          {{ title }}
        </h2>
        <p v-if="about" class="mt-5 text-xl text-[color:var(--resume-color2)]">
          {{ about }}
        </p>
      </div>
      <ul
        class="flex flex-col self-center text-[color:var(--resume-color1)] font-display font-bold text-sm tracking-wider"
        v-if="contactDetails.length || socialLinks.length"
      >
        <li
          v-for="detail in contactDetails"
          :key="`${detail.value}${detail.icon}`"
          class="flex gap-1 items-center justify-end"
        >
          <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
          {{ detail.value }}
        </li>
        <li
          v-for="link in socialLinks"
          :key="`${link.url}${link.icon}`"
          class="flex gap-1 items-center justify-end"
        >
          <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
          {{ link.url }}
        </li>
      </ul>
    </header>
    <div class="border-t-8 border-[color:var(--resume-color1)]" />
    <div class="border-t-8 border-[color:var(--resume-color2)]" />
    <div class="border-t-4 border-[color:var(--resume-color0)]" />
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
      <div class="p-8 flex flex-col gap-8">
        <section
          v-for="(category, categoryIndex) in categories"
          :key="categoryIndex"
        >
          <h3
            class="uppercase font-bold text-3xl mb-4 ml-20 font-display tracking-widest underline underline-offset-8 decoration-[color:var(--resume-color2)]"
          >
            {{ category.name }}
          </h3>
          <ul class="flex flex-col gap-4">
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
              class="flex gap-x-5"
            >
              <div class="w-[40%]">
                <div class="flex gap-2 items-baseline">
                  <div class="text-base">
                    <span
                      v-if="entry.nature === 'experience' && entry.period"
                      class="text-[color:var(--resume-color1)] leading-none mr-2"
                    >
                      {{ entry.period }}
                    </span>
                    <span class="italic leading-none">{{ entry.title }}</span>
                  </div>
                </div>
                <div
                  v-if="entry.nature === 'experience' && entry.organization"
                  class="font-light leading-none text-sm"
                >
                  {{ entry.organization }}, {{ entry.location }}
                </div>
              </div>

              <div class="w-[60%]">
                <p
                  v-if="entry.nature === 'experience' && entry.summary"
                  class="text-[color:var(--resume-color1)] leading-tight"
                >
                  {{ entry.summary }}
                </p>
                <ul
                  class="list-inside list-disc list text-sm font-light leading-tight"
                  v-if="entry.highlights.length"
                >
                  <li
                    v-for="(highlight, highlightIndex) in entry.highlights"
                    :key="highlightIndex"
                    class="text-[color:var(--resume-color0)]"
                  >
                    <span class="text-[color:var(--resume-color3)]">
                      {{ highlight }}
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </template>
  </Document>
</template>

<style scoped>
.font-body {
  font-family: "Open Sans Condensed";
}
.font-display {
  font-family: "Yanone Kaffeesatz";
}
</style>
