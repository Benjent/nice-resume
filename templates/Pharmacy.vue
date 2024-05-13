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
    <header v-if="documentType === 'resume' || !isHeaderSimple">
      <h1
        v-if="name"
        class="text-3xl mb-2 text-[color:var(--resume-color0)] uppercase tracking-widest"
      >
        {{ name }}
      </h1>
      <ul
        class="flex flex-col gap-1 text-xs border-[color:var(--resume-color0)]"
        :class="
          documentType === 'letter'
            ? ['items-start', 'border-l-2', 'pl-6']
            : ['items-end', 'border-r-2', 'pr-6']
        "
      >
        <li
          v-for="detail in contactDetails"
          :key="`${detail.value}${detail.icon}`"
          class="flex gap-1 items-center"
          :class="documentType === 'letter' && 'flex-row-reverse'"
        >
          {{ detail.value }}
          <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
        </li>
        <li
          v-for="link in socialLinks"
          :key="`${link.url}${link.icon}`"
          class="flex gap-1 items-center"
          :class="documentType === 'letter' && 'flex-row-reverse'"
        >
          {{ link.url }}
          <LinkIcon v-if="link.icon" :icon="link.icon" class="w-4" />
        </li>
      </ul>
    </header>
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
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
                  <div v-if="entry.period">
                    {{ entry.period }}
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
                      v-if="entry.period"
                      class="text-[color:var(--resume-color0)] relative before:content-[''] before:absolute before:inline-block before:size-4 before:-left-[1.625rem] before:top-2 before:bg-[color:var(--resume-color2)] before:rounded-full"
                    >
                      {{ entry.period }}
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
  </Document>
</template>

<style scoped>
.font-body {
  font-family: "Libre Franklin";
}
</style>
