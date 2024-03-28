<script setup lang="ts">
import { storeToRefs } from "pinia";
import { LinkIcon } from "@heroicons/vue/16/solid";
import { useResumeStore } from "@/stores/resume";
import GitHubIcon from "@/assets/images/icons/github.svg";
import LinkedInIcon from "@/assets/images/icons/linkedin.svg";
import { computed } from "vue";
import type { Category } from "~/types";

const {
  about,
  address,
  categories,
  drivingLicense,
  email,
  gitHub,
  linkedIn,
  name,
  phone,
  title,
  website,
} = storeToRefs(useResumeStore());

const mainCategories = computed(() => {
  return categories.value.filter((category) => category.layout !== "aside");
});

const firstSectionCategories = computed(() => {
  // if (mainCategories.value[0]) {
  //   if (mainCategories.value[0].layout === "full") {
  //     return [mainCategories.value[0]];
  //   }
  //   if (mainCategories.value[1] && mainCategories.value[1].layout !== "full") {
  //     return [mainCategories.value[0], mainCategories.value[1]];
  //   }
  //   return [mainCategories.value[0]];
  // }
  // return [];
  const array: Category[] = [];
  let isSectionComplete = false;
  let i = 0;
  while (!isSectionComplete || i < mainCategories.value.length) {
    if (array[i]?.layout !== "aside") {
      array.push(array[i]);
    }
  }
  return array;
});

const secondSectionCategories = computed(() => {
  // const array = mainCategories.value.slice(
  //   firstSectionCategories.value.length,
  //   firstSectionCategories.value.length + 2,
  // );
  // if (array[0]) {
  //   if (array[0].layout === "full") {
  //     return [array[0]];
  //   }
  //   if (array[1] && array[1].layout !== "full") {
  //     return [array[0], array[1]];
  //   }
  //   return [array[0]];
  // }
  // return [];
  const array: Category[] = [];
  let isSectionComplete = false;
  let i = firstSectionCategories.value.length;
  while (!isSectionComplete || i < mainCategories.value.length) {
    if (array[i]?.layout !== "aside") {
      array.push(array[i]);
    }
  }
  return array;
});

const thirdSectionCategories = computed(() => {
  return mainCategories.value.slice(
    firstSectionCategories.value.length + secondSectionCategories.value.length,
  );
});
</script>

<template>
  <div class="h-full w-full bg-[#e8afcf]">
    <template v-if="name">
      <header
        class="flex items-start gap-10 py-8 px-10 bg-white text-[#1e1e1e] font-display"
      >
        <div
          class="flex flex-col place-items-center w-fit border-y-4 border-[#ed3660] py-2 px-4"
        >
          <h1 v-if="name" class="text-center uppercase text-4xl">
            {{ name }}{{ firstSectionCategories.length
            }}{{ secondSectionCategories.length }}
          </h1>
          <h2 v-if="title" class="text-center uppercase text-2xl">
            {{ title }}
          </h2>
        </div>
        <div class="flex flex-col gap-2 text-[#ed3660]">
          <div class="leading-none">
            <div v-if="drivingLicense || address">
              <span v-if="drivingLicense">{{ drivingLicense }}</span>
              <span v-if="drivingLicense && address">-</span>
              <span v-if="address">{{ address }}</span>
            </div>
            <div v-if="email">{{ email }}</div>
            <div v-if="phone">{{ phone }}</div>
          </div>
          <div class="leading-tight">
            <div v-if="website" class="flex gap-1">
              <LinkIcon class="w-4" />
              {{ website }}
            </div>
            <div v-if="linkedIn" class="flex gap-1 items-center">
              <LinkedInIcon />
              {{ linkedIn }}
            </div>
            <div v-if="gitHub" class="flex gap-1 items-center">
              <GitHubIcon />
              {{ gitHub }}
            </div>
          </div>
        </div>
      </header>

      <p
        v-if="about"
        class="pb-6 px-10 bg-white text-[#1e1e1e] font-display text-lg"
      >
        {{ about }}
      </p>
    </template>

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
