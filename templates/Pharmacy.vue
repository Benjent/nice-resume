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
    class="bg-white h-full w-full flex flex-col p-12 font-body"
    :class="
      documentType === 'letter' && !isCustomizationForAllDocumentTypes
        ? 'text-[color:var(--letter-color3)] px-[var(--letter-margin0)] py-[var(--letter-margin1)]'
        : 'text-[color:var(--resume-color3)] px-[var(--resume-margin0)] py-[var(--resume-margin1)]'
    "
  >
    <template v-if="documentType === 'letter'">
      <header>
        <h1
          v-if="name"
          class="text-3xl mb-2 uppercase tracking-widest"
          :class="
            !isCustomizationForAllDocumentTypes
              ? 'text-[color:var(--letter-color0)]'
              : 'text-[color:var(--resume-color0)]'
          "
        >
          {{ name }}
        </h1>
        <h2
          v-if="title"
          class="tracking-widest"
          :class="
            !isCustomizationForAllDocumentTypes
              ? 'text-[color:var(--letter-color0)]'
              : 'text-[color:var(--resume-color0)]'
          "
        >
          {{ title }}
        </h2>
        <ul
          class="flex flex-col gap-1 text-xs items-start border-l-2 mt-6 pl-6"
          :class="
            !isCustomizationForAllDocumentTypes
              ? 'border-[color:var(--letter-color0)]'
              : 'border-[color:var(--resume-color0)]'
          "
        >
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            {{ detail.value }}
            <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
          </li>
          <li
            v-for="link in socialLinks"
            :key="`${link.url}${link.icon}`"
            class="flex gap-1 items-center"
          >
            {{ link.url }}
            <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
          </li>
        </ul>
      </header>

      <ul
        class="text-right text-xs border-r-2 mt-6 pr-6"
        :class="
          !isCustomizationForAllDocumentTypes
            ? 'border-[color:var(--letter-color0)]'
            : 'border-[color:var(--resume-color0)]'
        "
        v-if="recipientDetails.length"
      >
        <li v-for="detail in recipientDetails" :key="detail">
          {{ detail }}
        </li>
      </ul>
      <div class="mt-10 text-justify text-sm">
        <header class="text-center mb-10">
          <h3
            v-if="subject"
            class="text-lg font-display"
            :class="
              !isCustomizationForAllDocumentTypes
                ? 'text-[color:var(--letter-color0)]'
                : 'text-[color:var(--resume-color0)]'
            "
          >
            {{ subject }}
          </h3>
          <h4
            v-if="reference"
            class="text-sm"
            :class="
              !isCustomizationForAllDocumentTypes
                ? 'text-[color:var(--letter-color2)]'
                : 'text-[color:var(--resume-color2)]'
            "
          >
            Ref. TODO translate: {{ reference }}
          </h4>
        </header>
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-5">
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
          class="text-3xl mb-2 text-[color:var(--resume-color0)] uppercase tracking-widest"
        >
          {{ name }}
        </h1>
        <ul
          class="flex flex-col gap-1 text-xs items-end border-r-2 border-[color:var(--resume-color0)] pr-6"
        >
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            {{ detail.value }}
            <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
          </li>
          <li
            v-for="link in socialLinks"
            :key="`${link.url}${link.icon}`"
            class="flex gap-1 items-center"
          >
            {{ link.url }}
            <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
          </li>
        </ul>
      </header>

      <div class="text-center my-12">
        <h2
          v-if="title"
          class="text-[color:var(--resume-color0)] text-4xl tracking-widest"
        >
          {{ title }}
        </h2>
        <p v-if="about" class="mt-2 text-[color:var(--resume-color2)]">
          {{ about }}
        </p>
      </div>

      <div class="flex gap-12">
        <aside
          v-if="categories.some((category) => category.layout === 'aside')"
          class="w-[20%] flex flex-col gap-8"
        >
          <div
            v-for="(category, index) in categories.filter(
              (category) => category.layout === 'aside',
            )"
            :key="index"
          >
            <h3 class="mb-2 text-lg uppercase font-bold tracking-widest">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-2 text-sm">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <div class="text-[color:var(--resume-color0)]">
                  {{ entry.title }}
                </div>
                <template v-if="entry.nature === 'experience'">
                  <div v-if="entry.startDate">
                    {{ entry.startDate }}
                    <template v-if="entry.endDate">
                      - {{ entry.endDate }}
                    </template>
                  </div>
                  <div class="text-[color:var(--resume-color0)]">
                    {{ entry.organization }} {{ entry.location }}
                  </div>
                  <div>
                    <p
                      class="text-xs text-[color:var(--resume-color2)]"
                      v-if="entry.summary"
                    >
                      {{ entry.summary }}
                    </p>
                    <ul
                      class="list-disc list-inside ml-1 text-xs text-[color:var(--resume-color1)]"
                      v-if="entry.highlights.length"
                    >
                      <li
                        v-for="(highlight, highlightIndex) in entry.highlights"
                        :key="highlightIndex"
                      >
                        {{ highlight }}
                      </li>
                    </ul>
                  </div>
                </template>
                <ul
                  class="list-disc list-inside ml-1 text-xs text-[color:var(--resume-color1)]"
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
        <div class="grid grid-cols-2 gap-x-8 gap-y-12 flex-1">
          <section
            v-for="(category, index) in categories.filter(
              (category) => category.layout !== 'aside',
            )"
            :key="index"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3 class="mb-2 text-lg uppercase font-bold tracking-widest">
              {{ category.name }}
            </h3>
            <ul v-if="category.nature === 'asset'" class="flex gap-8 text-sm">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
                class=""
              >
                <div
                  class="text-[color:var(--resume-color0)]"
                  v-if="entry.nature === 'asset'"
                >
                  {{ entry.title }}
                </div>
                <ul
                  class="list-disc list-inside ml-1 text-xs text-[color:var(--resume-color1)]"
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
            <ul
              v-else
              class="flex flex-col gap-4 text-sm border-l-4 border-[color:var(--resume-color0)] pl-4"
            >
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <template v-if="entry.nature === 'experience'">
                  <div class="relative">
                    <span
                      v-if="entry.startDate"
                      class="text-[color:var(--resume-color0)] relative before:content-[''] before:absolute before:inline-block before:size-4 before:-left-[1.625rem] before:top-2 before:bg-[color:var(--resume-color2)] before:rounded-full"
                    >
                      {{ entry.startDate }}
                      <template v-if="entry.endDate">
                        - {{ entry.endDate }}
                      </template>
                    </span>
                    &nbsp;: {{ entry.title }}
                  </div>
                  <div class="text-[color:var(--resume-color0)]">
                    {{ entry.organization }} {{ entry.location }}
                  </div>
                  <div>
                    <p
                      v-if="entry.summary"
                      class="text-xs text-[color:var(--resume-color2)]"
                    >
                      {{ entry.summary }}
                    </p>
                    <ul
                      class="list-disc list-inside ml-1 text-xs text-[color:var(--resume-color1)]"
                      v-if="entry.highlights.length"
                    >
                      <li
                        v-for="(highlight, highlightIndex) in entry.highlights"
                        :key="highlightIndex"
                      >
                        {{ highlight }}
                      </li>
                    </ul>
                  </div>
                </template>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap");

.font-body {
  font-family: "Libre Franklin";
}
</style>
