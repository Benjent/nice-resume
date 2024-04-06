<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useResumeStore } from "@/stores/resume";
import type { Category } from "@/types";
import ContactIcon from "../components/ContactIcon.vue";
import LinkIcon from "../components/LinkIcon.vue";

const { about, categories, contactDetails, name, socialLinks, title } =
  storeToRefs(useResumeStore());

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
  <div class="h-full w-full flex flex-col">
    <template v-if="name">
      <header
        class="flex items-start gap-10 py-8 px-10 bg-white text-[#1e1e1e] font-display"
      >
        <div
          class="flex flex-col place-items-center w-fit border-y-4 border-[#ed3660] py-2 px-4"
        >
          <h1 v-if="name" class="text-center uppercase text-4xl">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-center uppercase text-2xl">
            {{ title }}
          </h2>
        </div>
        <div class="flex flex-col gap-2 text-[#ed3660]">
          <ul class="leading-none">
            <li
              v-for="detail in contactDetails"
              :key="detail.value"
              class="flex gap-1 items-center"
            >
              <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
              {{ detail.value }}
            </li>
          </ul>
          <ul class="leading-tight">
            <li
              v-for="link in socialLinks"
              :key="link.url"
              class="flex gap-1 items-center"
            >
              <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
              {{ link.url }}
            </li>
          </ul>
        </div>
      </header>

      <p
        v-if="about"
        class="pb-6 px-10 bg-white text-[#1e1e1e] font-display text-lg"
      >
        {{ about }}
      </p>
    </template>

    <div class="flex flex-1 bg-[#e8afcf]">
      <aside
        v-if="categories.some((category) => category.layout === 'aside')"
        class="w-[20%] bg-white"
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
                  <div v-if="entry.startDate" class="text-sm font-semibold">
                    {{ entry.startDate }}
                    <template v-if="entry.endDate">
                      - {{ entry.endDate }}
                    </template>
                  </div>
                  <div v-if="entry.organization" class="text-sm font-semibold">
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
                  {{ entry.startDate }}
                  <template v-if="entry.endDate">
                    - {{ entry.endDate }}
                  </template>
                  , {{ entry.organization }}, {{ entry.location }}
                </div>
              </div>
              <div>
                <p
                  class="text-sm font-semibold"
                  v-if="entry.nature === 'experience'"
                >
                  {{ entry.summary }}
                </p>
                <ul class="italic text-xs">
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
        <div class="drop-shadow-lg">
          <div
            class="w-full absolute left-0 right-0 -top-[2px] m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-white h-5"
          />
        </div>

        <div class="grid grid-cols-2" v-if="firstSectionCategories.length">
          <section
            v-for="(category, categoryIndex) in firstSectionCategories"
            :key="categoryIndex"
            class="py-6 px-10 bg-[#ed3660] text-white"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3 class="font-display uppercase mb-2 text-2xl">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <template v-if="entry.nature === 'asset'">
                  <div class="font-display text-xl">
                    {{ entry.title }}
                  </div>
                </template>
                <template v-else>
                  <div
                    v-if="category.layout === 'full'"
                    class="grid grid-cols-[40%_30%_30%] items-baseline grid-gap-4"
                  >
                    <div class="font-display text-xl">
                      {{ entry.title }}
                    </div>
                    <div v-if="entry.startDate" class="text-sm font-semibold">
                      {{ entry.startDate }}
                      <template v-if="entry.endDate">
                        - {{ entry.endDate }}
                      </template>
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
                  </div>
                  <div v-else>
                    <div class="font-display text-xl">
                      {{ entry.title }}
                    </div>
                    <div class="text-sm font-semibold">
                      {{ entry.startDate }}
                      <template v-if="entry.endDate">
                        - {{ entry.endDate }}
                      </template>
                      , {{ entry.organization }}, {{ entry.location }}
                    </div>
                  </div>
                </template>
                <div>
                  <p
                    class="text-sm font-semibold"
                    v-if="entry.nature === 'experience'"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul class="italic text-xs">
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

          <div class="drop-shadow-lg col-span-full">
            <div
              class="w-full absolute left-0 right-0 -top-[2px] m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-[#ed3660] h-5"
            />
          </div>
        </div>

        <div class="grid grid-cols-2" v-if="secondSectionCategories.length">
          <section
            v-for="(category, categoryIndex) in secondSectionCategories"
            :key="categoryIndex"
            class="py-6 px-10 bg-[#5662e8] text-[#e8afcf]"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3 class="font-display uppercase mb-2 text-2xl">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <template v-if="entry.nature === 'asset'">
                  <div class="font-display text-xl">
                    {{ entry.title }}
                  </div>
                </template>
                <template v-else>
                  <div
                    v-if="category.layout === 'full'"
                    class="grid grid-cols-[40%_30%_30%] items-baseline grid-gap-4"
                  >
                    <div class="font-display text-xl">
                      {{ entry.title }}
                    </div>
                    <div class="text-sm font-semibold">
                      {{ entry.startDate }} - {{ entry.endDate }}
                    </div>
                    <div class="text-sm font-semibold">
                      {{ entry.organization }}, {{ entry.location }}
                    </div>
                  </div>
                  <div v-else>
                    <div class="font-display text-xl">
                      {{ entry.title }}
                    </div>
                    <div class="text-sm font-semibold">
                      {{ entry.startDate }} - {{ entry.endDate }},
                      {{ entry.organization }}, {{ entry.location }}
                    </div>
                  </div>
                </template>
                <div>
                  <p
                    class="text-sm font-semibold"
                    v-if="entry.nature === 'experience'"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul class="italic text-xs">
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

          <div class="drop-shadow-lg col-span-full">
            <div
              class="w-full absolute left-0 right-0 -top-[2px] m-auto [clip-path:polygon(20%_0,_100%_0,_77%_100%)] bg-[#5662e8] h-5"
            />
          </div>
        </div>

        <div class="grid grid-cols-2" v-if="thirdSectionCategories.length">
          <section
            v-for="(category, categoryIndex) in thirdSectionCategories"
            :key="categoryIndex"
            class="py-6 px-10 bg-[#e8afcf] text-[#5662e8]"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3 class="font-display uppercase mb-2 text-2xl">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <template v-if="entry.nature === 'asset'">
                  <div class="font-display text-xl">
                    {{ entry.title }}
                  </div>
                </template>
                <template v-else>
                  <div
                    v-if="category.layout === 'full'"
                    class="grid grid-cols-[40%_30%_30%] items-baseline grid-gap-4"
                  >
                    <div class="font-display text-xl">
                      {{ entry.title }}
                    </div>
                    <div class="text-sm font-semibold">
                      {{ entry.startDate }} - {{ entry.endDate }}
                    </div>
                    <div class="text-sm font-semibold">
                      {{ entry.organization }}, {{ entry.location }}
                    </div>
                  </div>
                  <div v-else>
                    <div class="font-display text-xl">
                      {{ entry.title }}
                    </div>
                    <div class="text-sm font-semibold">
                      {{ entry.startDate }} - {{ entry.endDate }},
                      {{ entry.organization }}, {{ entry.location }}
                    </div>
                  </div>
                </template>
                <div>
                  <p
                    class="text-sm font-semibold"
                    v-if="entry.nature === 'experience'"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul class="italic text-xs">
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
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=League+Gothic&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");

.font-body {
  font-family: "Mulish";
}
.font-display {
  font-family: "League Gothic";
}
</style>
