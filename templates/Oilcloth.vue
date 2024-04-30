<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { paragraphs, recipientDetails, reference, subject } =
  storeToRefs(useLetterStore());

const { name, title } = storeToRefs(useProfileStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div
    class="bg-white text-[color:var(--color4)] h-full w-full flex flex-col font-body relative"
  >
    <template v-if="documentType === 'letter'">
      <header
        class="text-[color:var(--color0)] border-b-4 border-[color:var(--color1)] flex gap-8 px-8 py-6"
      >
        <div class="">
          <h1 v-if="name" class="text-4xl tracking-[0.5rem] font-bold">
            {{ name }}
          </h1>
          <h2 v-if="title" class="text-2xl tracking-widest">{{ title }}</h2>
        </div>
        <ul
          class="flex flex-col self-center font-display font-extralight text-xs tracking-wider"
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
      <ul
        class="px-8 mt-4 text-[color:var(--color0)] text-right text-xm leading-none font-light"
        v-if="recipientDetails.length"
      >
        <li v-for="detail in recipientDetails" :key="detail">
          {{ detail }}
        </li>
      </ul>
      <div class="p-8 text-justify">
        <header class="text-center mb-6">
          <h3 v-if="subject" class="font-bold text-lg tracking-wider">
            <span class="text-[color:var(--color1)]">
              Objet TODO translate:
            </span>
            {{ subject }}
          </h3>
          <h4 v-if="reference" class="tracking-wide">
            <span class="text-[color:var(--color0)] font-bold">
              Ref. TODO translate:
            </span>
            {{ reference }}
          </h4>
        </header>
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          class="mb-4 font-light leading-tight"
        >
          <span class="inline-block w-12" />
          {{ paragraph }}
        </p>
        <div class="text-right font-light leading-tight">{{ name }}</div>
      </div>
    </template>
    <template v-else>
      <header
        class="bg-[color:var(--color0)] border-b-[1rem] border-[color:var(--color1)] text-[color:var(--color3)] flex gap-8 px-8 py-6"
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
                      v-if="entry.startDate"
                      class="text-[color:var(--color1)] text-lg leading-none"
                    >
                      {{ entry.startDate }}
                      <template v-if="entry.endDate">
                        - {{ entry.endDate }}
                      </template>
                    </span>
                  </div>
                  <div
                    class="font-bold text-lg leading-none"
                    :class="
                      category.type === 'education'
                        ? 'text-[color:var(--color2)]'
                        : 'text-[color:var(--color4)]'
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
                    class="text-[color:var(--color0)] font-bold leading-none mb-2"
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
                        v-if="entry.startDate"
                        class="text-[color:var(--color1)] text-lg leading-none"
                      >
                        {{ entry.startDate }}
                        <template v-if="entry.endDate">
                          - {{ entry.endDate }}
                        </template>
                      </span>
                    </div>
                    <div class="flex flex-col flex-1">
                      <div
                        class="font-bold text-lg leading-none"
                        :class="
                          category.type === 'education'
                            ? 'text-[color:var(--color2)]'
                            : 'text-[color:var(--color4)]'
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
                    class="text-[color:var(--color0)] font-bold leading-none mb-2"
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
      class="-rotate-[10deg] w-full absolute -bottom-16 -right-16 h-20 bg-[color:var(--color2)] border-t-[1rem] border-[color:var(--color1)]"
    />
  </div>
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
