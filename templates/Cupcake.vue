<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { paragraphs, recipientDetails, reference, subject } =
  storeToRefs(useLetterStore());

const { name, title } = storeToRefs(useProfileStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div
    class="bg-white text-[color:var(--color4)] h-full w-full flex flex-col font-body relative"
  >
    <template v-if="documentType === 'letter'">
      <header
        class="text-[color:var(--color0)] flex justify-between gap-8 px-8 py-6"
      >
        <div class="font-display">
          <h1 v-if="name" class="text-4xl tracking-[0.5rem] font-bold">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-2xl tracking-widest">
            {{ title }}
          </h2>
        </div>
        <ul
          class="flex flex-col self-center text-[color:var(--color1)] font-display font-bold text-sm tracking-wider"
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
      <div class="border-t-8 border-[color:var(--color1)]" />
      <div class="border-t-8 border-[color:var(--color2)]" />
      <div class="border-t-4 border-[color:var(--color0)]" />
      <ul
        class="px-8 mt-4 text-[color:var(--color0)] text-right text-xm leading-none font-light"
        v-if="recipientDetails.length"
      >
        <li v-for="detail in recipientDetails" :key="detail">
          {{ detail }}
        </li>
      </ul>
      <div class="p-8 text-justify">
        <header class="text-center mb-6">
          <h3 v-if="subject" class="font-bold text-lg tracking-wider">
            <span class="text-[color:var(--color1)]">
              Objet TODO translate:
            </span>
            {{ subject }}
          </h3>
          <h4 v-if="reference" class="tracking-wide">
            <span class="text-[color:var(--color0)] font-bold">
              Ref. TODO translate:
            </span>
            {{ reference }}
          </h4>
        </header>
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          class="mb-4 font-light leading-tight"
        >
          <span class="inline-block w-12" />
          {{ paragraph }}
        </p>
        <div class="text-right font-light leading-tight">{{ name }}</div>
      </div>
    </template>
    <template v-else>
      <header
        class="text-[color:var(--color0)] flex justify-between gap-8 px-8 py-6"
      >
        <div class="font-display">
          <h1 v-if="name" class="text-4xl tracking-[0.5rem] font-bold">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-2xl tracking-widest">
            {{ title }}
          </h2>
          <p v-if="about" class="mt-5 text-xl text-[color:var(--color2)]">
            {{ about }}
          </p>
        </div>
        <ul
          class="flex flex-col self-center text-[color:var(--color1)] font-display font-bold text-sm tracking-wider"
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
      <div class="border-t-8 border-[color:var(--color1)]" />
      <div class="border-t-8 border-[color:var(--color2)]" />
      <div class="border-t-4 border-[color:var(--color0)]" />

      <div class="p-8 flex flex-col gap-8">
        <section
          v-for="(category, categoryIndex) in categories"
          :key="categoryIndex"
        >
          <h3
            class="uppercase font-bold text-3xl mb-4 ml-20 font-display tracking-widest underline underline-offset-8 decoration-[color:var(--color2)]"
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
                      v-if="entry.nature === 'experience' && entry.startDate"
                      class="text-[color:var(--color1)] leading-none mr-2"
                    >
                      {{ entry.startDate }}
                      <template v-if="entry.endDate">
                        - {{ entry.endDate }}
                      </template>
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
                  class="text-[color:var(--color1)] leading-tight"
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
                    class="text-[color:var(--color0)]"
                  >
                    <span class="text-[color:var(--color3)]">
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
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans+COndensed:ital,wght@0,300..800;1,300..800&family=Yanone+Kaffeesatz:wght@200..700&display=swap");

.font-body {
  font-family: "Open Sans Condensed";
}
.font-display {
  font-family: "Yanone Kaffeesatz";
}
</style>
