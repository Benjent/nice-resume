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
    <template v-if="documentType === 'letter'">
      <header v-if="name">
        <h1 v-if="name" class="text-2xl font-display">
          {{ name }}
        </h1>
        <h2 v-if="title" class="text-base mb-2">
          {{ title }}
        </h2>
        <ul
          v-if="contactDetails.length"
          class="leading-tight text-xs flex gap-x-6 flex-wrap"
        >
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
            {{ detail.value }}
          </li>
        </ul>
        <ul
          v-if="socialLinks.length"
          class="leading-tight text-xs flex gap-x-6 flex-wrap mb-6"
        >
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
      <LetterBody />
    </template>
    <template v-else>
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
            :key="`${detail.value}${detail.icon}`"
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
            :key="`${link.url}${link.icon}`"
            class="flex gap-1 items-center"
          >
            <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
            {{ link.url }}
          </li>
        </ul>
      </header>

      <p
        v-if="about"
        class="py-6 border-t-[1px] border-[color:var(--resume-color2)] text-center font-display"
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
            <h3
              class="font-display uppercase mb-5 text-xl text-[color:var(--resume-color0)] font-bold"
            >
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <div
                  class="uppercase text-[color:var(--resume-color0)] leading-none"
                >
                  {{ entry.title }}
                </div>
                <template v-if="entry.nature === 'experience'">
                  <div
                    class="text-[color:var(--resume-color1)] leading-tight"
                    v-if="entry.organization"
                  >
                    {{ entry.organization }}
                  </div>
                  <div
                    class="text-[color:var(--resume-color1)] leading-tight"
                    v-if="entry.location"
                  >
                    {{ entry.location }}
                  </div>
                  <div
                    class="text-[color:var(--resume-color1)] leading-tight"
                    v-if="entry.period"
                  >
                    {{ entry.period }}
                  </div>
                  <p class="text-sm" v-if="entry.summary">
                    {{ entry.summary }}
                  </p>
                </template>
                <ul
                  class="list-disc list-inside ml-3 text-sm"
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
            v-for="(category, index) in categories.filter(
              (category) => category.layout !== 'aside',
            )"
            :key="index"
            class="py-6 border-t-[1px] border-[color:var(--resume-color2)]"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3
              class="font-display uppercase mb-5 text-xl text-[color:var(--resume-color0)] font-bold"
            >
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-4">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <div
                  class="uppercase text-[color:var(--resume-color0)] leading-none"
                >
                  {{ entry.title }}
                </div>
                <template v-if="entry.nature === 'experience'">
                  <div class="text-[color:var(--resume-color1)] mb-1">
                    {{ entry.organization }} | {{ entry.location }}
                    <template v-if="entry.period">
                      |
                      {{ entry.period }}
                    </template>
                  </div>
                  <p class="text-sm" v-if="entry.summary">
                    {{ entry.summary }}
                  </p>
                </template>
                <ul
                  class="list-disc list-inside ml-3 text-sm"
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
@import url("https://fonts.googleapis.com/css2?family=Kaisei+Tokumin&display=swap");

.font-display {
  font-family: "Kaisei Tokumin";
}
</style>
