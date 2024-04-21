<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { name, title } = storeToRefs(useProfileStore());

const { paragraphs, recipientDetails, reference, subject } =
  storeToRefs(useLetterStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div
    class="bg-white text-[color:var(--color3)] h-full w-full flex flex-col font-body"
  >
    <template v-if="documentType === 'Letter'">
      <header
        class="flex items-start gap-4 py-8 px-10 bg-[color:var(--color0)] text-[color:var(--color2)]"
      >
        <div class="flex flex-col font-bold">
          <h1 v-if="name" class="text-4xl">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-2xl">
            {{ title }}
          </h2>
        </div>
        <ul class="leading-tight text-sm text-right ml-auto">
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            <ContactIcon
              v-if="detail.icon"
              :icon="detail.icon"
              class="w-4 text-[color:var(--color1)]"
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
              class="w-4 text-[color:var(--color1)]"
            />
            {{ link.url }}
          </li>
        </ul>
      </header>

      <ul
        class="text-right pt-8 px-10 leading-tight text-sm"
        v-if="recipientDetails.length"
      >
        <li v-for="detail in recipientDetails" :key="detail">
          {{ detail }}
        </li>
      </ul>
      <div class="py-8 px-10 text-justify text-sm">
        <header class="text-center mb-2">
          <h3 v-if="subject" class="text-lg font-bold">
            {{ subject }}
          </h3>
          <h4 v-if="reference" class="text-sm text-[color:var(--color0)]">
            <span class="">Ref. TODO translate:</span>
            {{ reference }}
          </h4>
        </header>
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-4">
          <span class="inline-block w-12" />
          {{ paragraph }}
        </p>
        <div class="text-right">{{ name }}</div>
      </div>
    </template>
    <template v-else>
      <template v-if="name">
        <header
          class="flex items-start gap-4 py-8 px-10 bg-[color:var(--color0)] text-[color:var(--color2)]"
        >
          <div class="flex flex-col font-bold">
            <h1 v-if="name" class="text-4xl">
              {{ name }}
            </h1>
            <h2 v-if="title" class="text-2xl">
              {{ title }}
            </h2>
          </div>
          <ul class="leading-tight text-sm text-right ml-auto">
            <li
              v-for="detail in contactDetails"
              :key="`${detail.value}${detail.icon}`"
              class="flex gap-1 items-center"
            >
              <ContactIcon
                v-if="detail.icon"
                :icon="detail.icon"
                class="w-4 text-[color:var(--color1)]"
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
                class="w-4 text-[color:var(--color1)]"
              />
              {{ link.url }}
            </li>
          </ul>
        </header>

        <p
          v-if="about"
          class="py-4 px-10 bg-[color:var(--color1)] text-center font-display font-bold text-2xl"
        >
          {{ about }}
        </p>
      </template>

      <div class="flex flex-1 items-start">
        <aside
          v-if="categories.some((category) => category.layout === 'aside')"
          class="w-[25%] h-full bg-[color:var(--color0)] text-[color:var(--color2)]"
        >
          <div
            v-for="(category, index) in categories.filter(
              (category) => category.layout === 'aside',
            )"
            :key="index"
            class="p-10"
          >
            <h3 class="font-bold text-[color:var(--color1)] text-2xl mb-4">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <template v-if="entry.nature === 'experience'">
                  <div v-if="entry.startDate && entry.title" class="font-bold">
                    <span
                      v-if="entry.startDate"
                      class="text-[color:var(--color0)]"
                    >
                      {{ entry.startDate }}
                      <template v-if="entry.endDate">
                        - {{ entry.endDate }}
                      </template>
                    </span>
                    <span class="ml-2" v-if="entry.title">
                      {{ entry.title }}
                    </span>
                  </div>
                  <div
                    v-if="entry.organization || entry.location"
                    class="flex gap-2 font-light text-sm"
                  >
                    <div v-if="entry.organization">
                      {{ entry.organization }}
                    </div>
                    <div v-if="entry.location">{{ entry.location }}</div>
                  </div>
                  <p v-if="entry.summary" class="mt-4">
                    {{ entry.summary }}
                  </p>
                </template>
                <template v-else>
                  <div v-if="entry.title" class="font-bold">
                    {{ entry.title }}
                  </div>
                </template>
                <ul
                  class="list-inside italic text-sm"
                  v-if="entry.highlights.length"
                >
                  <li
                    v-for="(highlight, highlightIndex) in entry.highlights"
                    :key="highlightIndex"
                    class="leading-loose"
                  >
                    {{ highlight }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
        <div class="grid grid-cols-2 gap-x-4 gap-y-10 flex-1 p-10">
          <section
            v-for="(category, categoryIndex) in categories.filter(
              (category) => category.layout !== 'aside',
            )"
            :key="categoryIndex"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3 class="font-bold text-[color:var(--color0)] text-2xl mb-4">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <template v-if="entry.nature === 'experience'">
                  <div v-if="entry.startDate && entry.title" class="font-bold">
                    <span
                      v-if="entry.startDate"
                      class="text-[color:var(--color0)]"
                    >
                      {{ entry.startDate }}
                      <template v-if="entry.endDate">
                        - {{ entry.endDate }}
                      </template>
                    </span>
                    <span class="ml-2" v-if="entry.title">
                      {{ entry.title }}
                    </span>
                  </div>
                  <div
                    v-if="entry.organization || entry.location"
                    class="flex gap-2 font-light text-sm"
                  >
                    <div v-if="entry.organization">
                      {{ entry.organization }}
                    </div>
                    <div v-if="entry.location">{{ entry.location }}</div>
                  </div>
                  <p v-if="entry.summary" class="mt-4">
                    {{ entry.summary }}
                  </p>
                </template>
                <template v-else>
                  <div v-if="entry.title" class="font-bold">
                    {{ entry.title }}
                  </div>
                </template>
                <ul
                  class="list-inside italic ml-5 text-sm"
                  v-if="entry.highlights.length"
                >
                  <li
                    v-for="(highlight, highlightIndex) in entry.highlights"
                    :key="highlightIndex"
                    class="leading-loose"
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
@import url("https://fonts.googleapis.com/css2?family=Caveat&family=Karla:ital,wght@0,200..800;1,200..800&display=swap");
.font-body {
  font-family: "Karla";
}
.font-display {
  font-family: "Caveat";
}
</style>
