<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { isCustomizationForAllDocumentTypes, name, title } =
  storeToRefs(useProfileStore());

const { paragraphs, recipientDetails, reference, subject } =
  storeToRefs(useLetterStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div
    class="bg-white h-full w-full flex flex-col text-xs font-body"
    :class="
      documentType === 'letter' && !isCustomizationForAllDocumentTypes
        ? 'text-[color:var(--letter-color1)] px-[var(--letter-margin0)] py-[var(--letter-margin1)]'
        : 'text-[color:var(--resume-color1)] px-[var(--resume-margin0)] py-[var(--resume-margin1)]'
    "
  >
    <template v-if="documentType === 'letter'">
      <header class="flex mb-4">
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

      <ul class="text-right text-xs mb-6" v-if="recipientDetails.length">
        <li v-for="detail in recipientDetails" :key="detail">
          {{ detail }}
        </li>
      </ul>
      <div class="text-justify text-xs px-4">
        <header class="text-center text-sm mb-6">
          <h3 v-if="subject" class="">
            <span
              class="uppercase"
              :class="
                !isCustomizationForAllDocumentTypes
                  ? 'text-[color:var(--letter-color0)]'
                  : 'text-[color:var(--resume-color0)]'
              "
            >
              Objet TODO translate:{{ " " }}
            </span>
            <span class="italic">
              {{ subject }}
            </span>
          </h3>
          <h4 v-if="reference" class="text-xs">
            <span
              class="uppercase"
              :class="
                !isCustomizationForAllDocumentTypes
                  ? 'text-[color:var(--letter-color0)]'
                  : 'text-[color:var(--resume-color0)]'
              "
            >
              Ref. TODO translate:{{ " " }}
            </span>
            <span class="italic">{{ reference }}</span>
          </h4>
        </header>
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-2">
          <span class="inline-block w-12" />
          {{ paragraph }}
        </p>
        <div class="text-right">{{ name }}</div>
      </div>
    </template>
    <template v-else>
      <header class="flex mb-4">
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
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import "@/assets/styles/index.css";

.font-body {
  font-family: "Fira Sans";
}
</style>
