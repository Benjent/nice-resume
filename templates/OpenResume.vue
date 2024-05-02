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
    class="bg-white h-full w-full flex flex-col border-t-8 font-body"
    :class="
      documentType === 'letter' && !isCustomizationForAllDocumentTypes
        ? 'text-[color:var(--letter-color1)] border-[color:var(--letter-color0)] px-[var(--letter-margin0)] py-[var(--letter-margin1)]'
        : 'text-[color:var(--resume-color1)] border-[color:var(--resume-color0)] px-[var(--resume-margin0)] py-[var(--resume-margin1)]'
    "
  >
    <template v-if="documentType === 'letter'">
      <header>
        <h1
          v-if="name"
          class="text-3xl mb-2 font-bold"
          :class="
            !isCustomizationForAllDocumentTypes
              ? 'text-[color:var(--letter-color0)] '
              : 'text-[color:var(--resume-color0)]'
          "
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
      </header>

      <ul
        class="text-right italic text-sm mt-10"
        v-if="recipientDetails.length"
      >
        <li v-for="detail in recipientDetails" :key="detail">
          {{ detail }}
        </li>
      </ul>
      <div class="mt-2 text-justify text-sm">
        <header class="mb-6 ml-12 font-bold">
          <h4
            v-if="reference"
            :class="
              !isCustomizationForAllDocumentTypes
                ? 'text-[color:var(--letter-color0)]'
                : 'text-[color:var(--resume-color0)]'
            "
          >
            <span class="">Ref. TODO translate:</span>
            {{ reference }}
          </h4>
          <h3 v-if="subject" class="text-justify font-display">
            {{ subject }}
          </h3>
        </header>
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-4">
          <span class="inline-block w-12" />
          {{ paragraph }}
        </p>
        <div class="text-right">{{ name }}</div>
      </div>
    </template>
    <template v-else>
      <header>
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
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "@/assets/styles/index.css";

.font-body {
  font-family: "Roboto";
}
</style>
