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
      class="flex p-8"
    >
      <h1
        v-if="name"
        class="text-3xl font-normal w-[26%] relative before:content-[''] before:absolute before:size-10 before:bg-[color:var(--resume-color1)] before:rotate-45 before:right-[103%] before:top-5 after:content-[''] after:absolute after:size-10 after:bg-[color:var(--resume-color0)] after:rotate-45 after:right-[103%] after:top-3"
      >
        {{ name }}
      </h1>
      <div class="flex-1 text-center px-8">
        <div class="flex items-center" v-if="title">
          <div class="flex-1 bg-[color:var(--resume-color0)] h-1" />
          <h2 class="text-2xl font-normal px-8">
            {{ title }}
          </h2>
          <div class="flex-1 bg-[color:var(--resume-color0)] h-1" />
        </div>
        <p v-if="about">{{ about }}</p>
      </div>
      <ul class="flex flex-col items-end w-[26%]">
        <li
          v-for="detail in contactDetails"
          :key="`${detail.value}${detail.icon}`"
          class="flex gap-1 items-center"
        >
          <ContactIcon
            v-if="detail.icon"
            :icon="detail.icon"
            class="w-4 text-[color:var(--resume-color0)]"
          />
          {{ detail.value }}
        </li>
        <li
          v-for="link in socialLinks"
          :key="`${link.url}${link.icon}`"
          class="flex gap-1 items-center"
        >
          <LinkIcon
            v-if="link.icon"
            :icon="link.icon"
            class="w-4 text-[color:var(--resume-color0)]"
          />
          {{ link.url }}
        </li>
      </ul>
    </header>
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
      <div class="flex gap-4">
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
              class="uppercase font-bold text-sm bg-[color:var(--resume-color0)] text-[color:var(--resume-color2)] p-1 pl-8 w-[64%] relative z-20"
            >
              {{ category.name }}
            </h3>
            <div
              class="z-10 relative bottom-1 w-[65%] h-2 bg-[color:var(--resume-color1)]"
            />
            <ul class="flex flex-col gap-4 p-2 pl-8">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
                class="flex flex-col"
              >
                <div>
                  <span v-if="entry.nature === 'experience' && entry.period">
                    {{ entry.period }}

                    -{{ " " }}
                  </span>
                  <span class="font-semibold" v-if="entry.title">
                    {{ entry.title }}
                  </span>
                  <span
                    v-if="entry.nature === 'experience' && entry.organization"
                  >
                    {{ " " }}-{{ " " }}
                    <span class="italic">{{ entry.organization }}</span>
                    <template v-if="entry.location">
                      ,{{ entry.location }}
                    </template>
                  </span>
                </div>
                <p
                  v-if="entry.nature === 'experience' && entry.summary"
                  class="before:content-[''] before:inline-block before:mr-1 before:size-2 before:bg-[color:var(--resume-color0)]"
                >
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
              class="uppercase font-bold text-sm bg-[color:var(--resume-color0)] text-[color:var(--resume-color2)] p-1 pl-8 w-[64%] relative z-20"
            >
              {{ category.name }}
            </h3>
            <div
              class="z-10 relative bottom-1 w-[65%] h-2 bg-[color:var(--resume-color1)]"
            />
            <ul class="flex flex-col gap-4 p-2 px-8">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
                class="flex flex-col"
              >
                <div class="flex gap-4 items-center">
                  <span v-if="entry.nature === 'experience' && entry.period">
                    {{ entry.period }}

                    -{{ " " }}
                  </span>
                  <span class="font-semibold" v-if="entry.title">
                    {{ entry.title }}
                  </span>
                  <span
                    v-if="entry.nature === 'experience' && entry.organization"
                  >
                    {{ " " }}-{{ " " }}
                    <span class="italic">{{ entry.organization }}</span>
                    <template v-if="entry.location">
                      ,{{ entry.location }}
                    </template>
                  </span>
                  <div
                    v-if="entry.nature === 'experience'"
                    class="flex-1 bg-[color:var(--resume-color0)] h-1"
                  />
                </div>
                <div class="pl-4">
                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="before:content-[''] before:inline-block before:mr-1 before:size-2 before:bg-[color:var(--resume-color0)]"
                  >
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
                </div>
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
