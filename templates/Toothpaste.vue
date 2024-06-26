<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import type { Category } from "@/types";
import ContactIcon from "@/components/ContactIcon.vue";
import Document from "@/components/Document.vue";
import LetterBody from "@/components/LetterBody.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { name, title } = storeToRefs(useProfileStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());

const { isHeaderSimple } = storeToRefs(useLetterStore());

const mainCategories = computed(() => {
  return categories.value.filter((category) => category.layout !== "aside");
});

const firstSectionCategories = computed(() => {
  return getSectionCategory(0);
});

const secondSectionCategories = computed(() => {
  return getSectionCategory(firstSectionCategories.value.length);
});

const thirdSectionCategories = computed(() => {
  return mainCategories.value.slice(
    firstSectionCategories.value.length + secondSectionCategories.value.length,
  );
});

// Make sure one section consists in either one full category or two halves
function getSectionCategory(indexToGetFrom: number) {
  const array: Category[] = [];
  let isSectionComplete = false;
  let i = indexToGetFrom;
  while (!isSectionComplete && i < mainCategories.value.length) {
    if (mainCategories.value[i] && mainCategories.value[i].layout !== "aside") {
      array.push(mainCategories.value[i]);
    }
    i++;
    isSectionComplete =
      (array.some((category) => category.layout === "full") &&
        array.length === 1) ||
      (array.some((category) => category.layout === "half") &&
        array.length === 2);
  }
  return array;
}
</script>

<template>
  <Document>
    <header
      v-if="documentType === 'resume' || !isHeaderSimple"
      class="flex items-start gap-12 px-10 py-6 font-display"
    >
      <div
        class="flex flex-col place-items-center w-fit border-y-4 border-[color:var(--resume-color0)] py-2 px-4 flex-1"
      >
        <h1 v-if="name" class="text-center uppercase text-4xl">
          {{ name }}
        </h1>
        <h2 v-if="title" class="text-center text-2xl">
          {{ title }}
        </h2>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <ul class="leading-none font-body text-xs italic">
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
            {{ detail.value }}
          </li>
        </ul>
        <ul class="leading-tight">
          <li
            v-for="link in socialLinks"
            :key="`${link.url}${link.icon}`"
            class="flex gap-1 items-center"
          >
            <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
            {{ link.url }}
          </li>
        </ul>
      </div>
      <p v-if="about" class="flex-1">
        <span class="text-3xl text-[color:var(--resume-color1)] leading-4">
          “
        </span>
        {{ about }}
      </p>
    </header>
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
      <div class="flex bg-white">
        <aside
          v-if="categories.some((category) => category.layout === 'aside')"
          class="w-[20%]"
        >
          <div
            v-for="(category, index) in categories.filter(
              (category) => category.layout === 'aside',
            )"
            :key="index"
            class="py-6 px-10"
          >
            <h3 class="font-display uppercase mb-2 text-2xl">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <div
                  v-if="category.layout === 'full'"
                  class="flex items-baseline flex-wrap"
                >
                  <div v-if="entry.title" class="font-display text-xl">
                    {{ entry.title }}
                  </div>
                  <template v-if="entry.nature === 'experience'">
                    <div v-if="entry.period" class="text-sm font-semibold">
                      {{ entry.period }}
                    </div>
                    <div
                      v-if="entry.organization"
                      class="text-sm font-semibold"
                    >
                      {{ entry.organization }}
                      <template v-if="entry.organization && entry.location">
                        ,
                      </template>

                      <template v-if="entry.location">
                        {{ entry.location }}
                      </template>
                    </div>
                  </template>
                </div>
                <div v-else>
                  <div class="font-display text-xl">
                    {{ entry.title }}
                  </div>
                  <div
                    v-if="entry.nature === 'experience'"
                    class="text-sm font-semibold"
                  >
                    {{ entry.period }}

                    , {{ entry.organization }}, {{ entry.location }}
                  </div>
                </div>
                <div>
                  <p
                    class="text-sm font-semibold"
                    v-if="entry.nature === 'experience' && entry.summary"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul class="italic text-xs" v-if="entry.highlights.length">
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
          </div>
        </aside>

        <div class="flex flex-col flex-1">
          <div v-if="firstSectionCategories.length" class="grid grid-cols-2">
            <section
              v-for="(category, categoryIndex) in firstSectionCategories"
              :key="categoryIndex"
              class="px-10 py-6 border-t-2 border-[color:var(--resume-color0)]"
              :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
            >
              <h3
                class="font-display uppercase mb-2 text-2xl text-[color:var(--resume-color0)]"
              >
                {{ category.name }}
              </h3>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(entry, entryIndex) in category.entries"
                  :key="entryIndex"
                >
                  <div class="flex items-baseline">
                    <div
                      class="text-[color:var(--resume-color0)] flex-1 font-display text-xl"
                    >
                      {{ entry.title }}
                    </div>
                    <template v-if="entry.nature === 'experience'">
                      <div>
                        {{ entry.organization }}
                        <template v-if="entry.period">
                          · {{ entry.period }}
                        </template>
                        <template v-if="entry.location">
                          · {{ entry.location }}
                        </template>
                      </div>
                    </template>
                  </div>
                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="text-sm"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul class="italic text-xs" v-if="entry.highlights.length">
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

          <div v-if="secondSectionCategories.length" class="grid grid-cols-2">
            <section
              v-for="(category, categoryIndex) in secondSectionCategories"
              :key="categoryIndex"
              class="px-10 py-6 border-t-2 border-[color:var(--resume-color1)]"
              :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
            >
              <h3
                class="font-display uppercase mb-2 text-2xl text-[color:var(--resume-color1)]"
              >
                {{ category.name }}
              </h3>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(entry, entryIndex) in category.entries"
                  :key="entryIndex"
                >
                  <div class="flex items-baseline">
                    <div
                      class="text-[color:var(--resume-color1)] flex-1 font-display text-xl"
                    >
                      {{ entry.title }}
                    </div>
                    <template v-if="entry.nature === 'experience'">
                      <div>
                        {{ entry.organization }} · {{ entry.period }}

                        ·
                        {{ entry.location }}
                      </div>
                    </template>
                  </div>
                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="text-sm"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul class="italic text-xs" v-if="entry.highlights.length">
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

          <div v-if="thirdSectionCategories.length" class="grid grid-cols-2">
            <section
              v-for="(category, categoryIndex) in thirdSectionCategories"
              :key="categoryIndex"
              class="px-10 py-6 border-t-2 border-[color:var(--resume-color2)]"
              :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
            >
              <h3
                class="font-display uppercase mb-2 text-2xl text-[color:var(--resume-color2)]"
              >
                {{ category.name }}
              </h3>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(entry, entryIndex) in category.entries"
                  :key="entryIndex"
                >
                  <div class="flex items-baseline">
                    <div
                      class="text-[color:var(--resume-color2)] flex-1 font-display text-xl"
                    >
                      {{ entry.title }}
                    </div>
                    <template v-if="entry.nature === 'experience'">
                      <div>
                        {{ entry.organization }} · {{ entry.period }} ·
                        {{ entry.location }}
                      </div>
                    </template>
                  </div>
                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="text-sm"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul class="italic text-xs" v-if="entry.highlights.length">
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
      </div>
    </template>
  </Document>
</template>

<style scoped>
.font-body {
  font-family: "Mulish";
}
.font-display {
  font-family: "League Gothic";
}
</style>
