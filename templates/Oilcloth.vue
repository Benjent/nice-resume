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
    <header
      class="border-[color:var(--resume-color1)] flex gap-8 px-8 py-6"
      :class="
        documentType === 'letter'
          ? ['border-b-4', 'text-[color:var(--resume-color0)]']
          : [
              'bg-[color:var(--resume-color0)]',
              'border-b-[1rem]',
              'text-[color:var(--resume-color3)]',
            ]
      "
    >
      <div class="">
        <h1 v-if="name" class="text-4xl tracking-[0.5rem] font-bold">
          {{ name }}
        </h1>
        <h2 v-if="title" class="text-2xl tracking-widest">{{ title }}</h2>
      </div>
      <ul
        class="flex flex-col self-center font-display font-extralight text-sm tracking-wider"
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
    <p v-if="about" class="text-center mt-5 font-light text-xl">
      {{ about }}
    </p>
    <LetterBody v-if="documentType === 'letter'" />
    <template v-else>
      <div class="flex gap-6 px-10 py-8">
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
            <h3 class="uppercase text-3xl mb-1 font-light tracking-widest">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-4">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <div class="flex flex-col">
                  <div v-if="entry.nature === 'experience'">
                    <span
                      v-if="entry.period"
                      class="text-[color:var(--resume-color1)] text-lg leading-none"
                    >
                      {{ entry.period }}
                    </span>
                  </div>
                  <div
                    class="font-bold text-lg leading-none"
                    :class="
                      category.type === 'education'
                        ? 'text-[color:var(--resume-color2)]'
                        : 'text-[color:var(--resume-color4)]'
                    "
                  >
                    {{ entry.title }}
                  </div>
                  <div
                    v-if="entry.nature === 'experience' && entry.organization"
                    class="font-light leading-none"
                  >
                    {{ entry.organization }} - {{ entry.location }}
                  </div>

                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="text-[color:var(--resume-color0)] font-bold leading-none mb-2"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul
                    class="list-inside text-sm font-light leading-tight"
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
        <div class="grid grid-cols-2 gap-6 flex-1">
          <section
            v-for="(category, categoryIndex) in categories.filter(
              (category) => category.layout !== 'aside',
            )"
            :key="categoryIndex"
            :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
          >
            <h3 class="uppercase text-3xl mb-1 font-light tracking-widest">
              {{ category.name }}
            </h3>
            <ul class="flex flex-col gap-4">
              <li
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
              >
                <div class="flex flex-col">
                  <div class="flex gap-2 items-baseline mb-2">
                    <div v-if="entry.nature === 'experience'">
                      <span
                        v-if="entry.period"
                        class="text-[color:var(--resume-color1)] text-lg leading-none"
                      >
                        {{ entry.period }}
                      </span>
                    </div>
                    <div class="flex flex-col flex-1">
                      <div
                        class="font-bold text-lg leading-none"
                        :class="
                          category.type === 'education'
                            ? 'text-[color:var(--resume-color2)]'
                            : 'text-[color:var(--resume-color4)]'
                        "
                      >
                        {{ entry.title }}
                      </div>
                      <div
                        v-if="
                          entry.nature === 'experience' && entry.organization
                        "
                        class="font-light leading-none"
                      >
                        {{ entry.organization }} - {{ entry.location }}
                      </div>
                    </div>
                  </div>

                  <p
                    v-if="entry.nature === 'experience' && entry.summary"
                    class="text-[color:var(--resume-color0)] font-bold leading-none mb-2"
                  >
                    {{ entry.summary }}
                  </p>
                  <ul
                    class="list-inside text-sm font-light leading-tight"
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
          </section>
        </div>
      </div>
    </template>
    <div
      v-if="documentType === 'resume'"
      class="-rotate-[10deg] w-full absolute -bottom-16 -right-16 h-20 bg-[color:var(--resume-color2)] border-t-[1rem] border-[color:var(--resume-color1)]"
    />
  </Document>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Yanone+Kaffeesatz:wght@200..700&display=swap");

.font-body {
  font-family: "Yanone Kaffeesatz";
}
.font-display {
  font-family: "Open Sans";
}
</style>
