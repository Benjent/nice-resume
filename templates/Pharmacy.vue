<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { name, title } = storeToRefs(useProfileStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div
    class="bg-white h-full w-full flex flex-col p-12 font-body text-slate-900"
  >
    <header>
      <h1
        v-if="name"
        class="text-3xl mb-2 text-cyan-500 uppercase tracking-widest"
      >
        {{ name }}
      </h1>
      <ul
        class="flex flex-col gap-1 text-xs items-end border-r-2 border-cyan-500 pr-6"
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
      <h2 v-if="title" class="text-cyan-500 text-4xl tracking-widest">
        {{ title }}
      </h2>
      <p v-if="about" class="mt-2 text-slate-400">
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
              <div class="text-cyan-500">
                {{ entry.title }}
              </div>
              <template v-if="entry.nature === 'experience'">
                <div v-if="entry.startDate">
                  {{ entry.startDate }}
                  <template v-if="entry.endDate">
                    - {{ entry.endDate }}
                  </template>
                </div>
                <div class="text-cyan-500">
                  {{ entry.organization }} {{ entry.location }}
                </div>
                <div>
                  <p class="text-xs text-slate-400" v-if="entry.summary">
                    {{ entry.summary }}
                  </p>
                  <ul
                    class="list-disc list-inside ml-1 text-xs text-slate-600"
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
                class="list-disc list-inside ml-1 text-xs text-slate-600"
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
              <div class="text-cyan-500" v-if="entry.nature === 'asset'">
                {{ entry.title }}
              </div>
              <ul
                class="list-disc list-inside ml-1 text-xs text-slate-600"
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
            class="flex flex-col gap-4 text-sm border-l-4 border-cyan-500 pl-4"
          >
            <li
              v-for="(entry, entryIndex) in category.entries"
              :key="entryIndex"
            >
              <template v-if="entry.nature === 'experience'">
                <div class="relative">
                  <span
                    class="text-cyan-500 relative before:content-[''] before:absolute before:inline-block before:size-4 before:-left-[1.625rem] before:top-2 before:bg-slate-400 before:rounded-full"
                    v-if="entry.startDate"
                  >
                    {{ entry.startDate }}
                    <template v-if="entry.endDate">
                      - {{ entry.endDate }}
                    </template>
                  </span>
                  &nbsp;: {{ entry.title }}
                </div>
                <div class="text-cyan-500">
                  {{ entry.organization }} {{ entry.location }}
                </div>
                <div>
                  <p class="text-xs text-slate-400" v-if="entry.summary">
                    {{ entry.summary }}
                  </p>
                  <ul
                    class="list-disc list-inside ml-1 text-xs text-slate-600"
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
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap");

.font-body {
  font-family: "Libre Franklin";
}
</style>
