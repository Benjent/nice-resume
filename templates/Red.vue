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
    <div class="-rotate-[9deg] w-full absolute -top-16 -left-16">
      <div class="bg-[color:var(--resume-color0)] h-10" />
      <div
        class="bg-[color:var(--resume-color0)] h-1 mt-2"
        v-for="i in 3"
        :key="i"
      />
    </div>
    <template v-if="documentType === 'resume' || !isHeaderSimple">
      <header class="flex mx-auto mt-8 p-8">
        <div
          class="flex flex-col place-items-center w-fit border-y-4 border-[color:var(--resume-color0)] p-2 font-display text-center tracking-wider"
        >
          <h1 v-if="name" class="text-4xl uppercase">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-2xl">{{ title }}</h2>
        </div>
        <ul
          class="flex flex-col self-center border-l-2 border-[color:var(--resume-color0)] ml-8 pl-2 py-1 text-[color:var(--resume-color0)] text-xs italic"
          v-if="contactDetails.length || socialLinks.length"
        >
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
      <p v-if="about" class="text-center p-8">{{ about }}</p>
    </template>
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
      <div class="flex gap-6 p-8">
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
            <h3 class="uppercase font-display text-3xl mb-1 text-center">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3 text-sm">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
                class="flex items-baseline before:content-[''] before:inline-block before:mr-2 before:size-2 before:bg-[color:var(--resume-color0)]"
              >
                <div class="flex flex-col">
                  <div>
                    {{ entry.title }}
                    <template
                      v-if="entry.nature === 'experience' && entry.organization"
                    >
                      -
                      <span class="text-[color:var(--resume-color0)]">
                        {{ entry.organization }}
                      </span>
                    </template>
                  </div>
                  <div v-if="entry.nature === 'experience'">
                    <span v-if="entry.period">
                      {{ entry.period }}
                    </span>
                    <template v-if="entry.location">
                      , {{ entry.location }}
                    </template>
                  </div>
                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="text-xs"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul
                    class="list-inside leading-none ml-5 text-xs italic"
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
              </li>
            </ul>
          </div>
        </aside>
        <div class="grid grid-cols-2 gap-x-6 flex-1">
          <section
            v-for="(category, categoryIndex) in categories.filter(
              (category) => category.layout !== 'aside',
            )"
            :key="categoryIndex"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3 class="uppercase font-display text-3xl mb-1 text-center">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-3 text-sm">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
                class="flex items-baseline before:content-[''] before:inline-block before:mr-2 before:size-2 before:bg-[color:var(--resume-color0)]"
              >
                <div class="flex flex-col">
                  <div>
                    {{ entry.title }}
                    <template
                      v-if="entry.nature === 'experience' && entry.organization"
                    >
                      -
                      <span class="text-[color:var(--resume-color0)]">
                        {{ entry.organization }}
                      </span>
                    </template>
                  </div>
                  <div v-if="entry.nature === 'experience'">
                    <span v-if="entry.period">
                      {{ entry.period }}
                    </span>
                    <template v-if="entry.location">
                      , {{ entry.location }}
                    </template>
                  </div>
                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="text-xs"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul
                    class="list-inside leading-none ml-5 text-xs italic"
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
              </li>
            </ul>
            <div
              class="bg-[color:var(--resume-color0)] h-1 w-full -rotate-[9deg] my-10"
              v-if="
                (category.layout === 'half' &&
                  categoryIndex <
                    categories.filter((category) => category.layout !== 'aside')
                      .length -
                      2) ||
                (category.layout === 'full' &&
                  categoryIndex <
                    categories.filter((category) => category.layout !== 'aside')
                      .length -
                      1)
              "
            />
          </section>
        </div>
      </div>
    </template>
    <div class="-rotate-[9deg] w-full absolute -bottom-16 -right-16">
      <div
        class="bg-[color:var(--resume-color0)] h-1 mb-2"
        v-for="i in 3"
        :key="i"
      />
      <div class="bg-[color:var(--resume-color0)] h-10" />
    </div>
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
