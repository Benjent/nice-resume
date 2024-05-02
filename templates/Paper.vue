<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import LinkIcon from "@/components/LinkIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { isCustomizationForAllDocumentTypes, name, title } =
  storeToRefs(useProfileStore());

const { paragraphs, recipientDetails, reference, subject } =
  storeToRefs(useLetterStore());

const { about, categories, contactDetails, socialLinks } =
  storeToRefs(useResumeStore());
</script>

<template>
  <div
    class="bg-white h-full w-full flex flex-col font-serif text-xs"
    :class="
      documentType === 'letter' && !isCustomizationForAllDocumentTypes
        ? 'text-[color:var(--letter-color1)] px-[var(--letter-margin0)] py-[var(--letter-margin1)]'
        : 'text-[color:var(--resume-color1)] px-[var(--resume-margin0)] py-[var(--resume-margin1)]'
    "
  >
    <template v-if="documentType === 'letter'">
      <header v-if="name" class="pb-4">
        <h1 v-if="name" class="text-xl">{{ name }}, {{ title }}</h1>
        <ul class="flex gap-2">
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
            {{ detail.value }}, {{ " " }}
          </li>
        </ul>
        <ul class="flex gap-2">
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
        class="text-right border-t-2 border-dotted pt-4"
        :class="
          !isCustomizationForAllDocumentTypes
            ? 'border-[color:var(--letter-color0)]'
            : 'border-[color:var(--resume-color0)]'
        "
        v-if="recipientDetails.length"
      >
        <li v-for="detail in recipientDetails" :key="detail">
          {{ detail }}
        </li>
      </ul>
      <div class="mt-4">
        <header class="mb-4">
          <h3 v-if="subject">
            {{ subject }}
          </h3>
          <h4 v-if="reference" class="italic">
            Reference TODO translate {{ reference }}
          </h4>
        </header>
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-4">
          {{ paragraph }}
        </p>
        <div>{{ name }}</div>
      </div>
    </template>
    <template v-else>
      <header v-if="name" class="pb-4">
        <h1 v-if="name" class="text-xl">{{ name }}, {{ title }}</h1>
        <ul class="flex gap-2">
          <li
            v-for="detail in contactDetails"
            :key="`${detail.value}${detail.icon}`"
            class="flex gap-1 items-center"
          >
            <ContactIcon v-if="detail.icon" :icon="detail.icon" class="w-4" />
            {{ detail.value }}, {{ " " }}
          </li>
        </ul>
        <ul class="flex gap-2">
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
      <p
        v-if="about"
        class="border-t-2 border-dotted p-4 pl-0"
        :class="
          !isCustomizationForAllDocumentTypes
            ? 'border-[color:var(--letter-color0)]'
            : 'border-[color:var(--resume-color0)]'
        "
      >
        {{ about }}
      </p>

      <section
        v-for="(category, index) in categories"
        :key="index"
        class="border-t-2 border-dotted flex gap-4 p-4 pl-0"
        :class="
          !isCustomizationForAllDocumentTypes
            ? 'border-[color:var(--letter-color0)]'
            : 'border-[color:var(--resume-color0)]'
        "
      >
        <h3 class="uppercase w-[20%]">
          {{ category.name }}
        </h3>
        <ul class="flex flex-col gap-4 flex-1">
          <li v-for="(entry, entryIndex) in category.entries" :key="entryIndex">
            <div class="flex justify-between">
              <div>
                <span class="font-bold">{{ entry.title }}</span>
                <span
                  v-if="entry.nature === 'experience' && entry.organization"
                >
                  | {{ entry.organization }}
                  <span v-if="entry.location">, {{ entry.location }}</span>
                </span>
              </div>
              <div v-if="entry.nature === 'experience' && entry.startDate">
                {{ entry.startDate }}
                <template v-if="entry.endDate">- {{ entry.endDate }}</template>
              </div>
            </div>
            <p
              v-if="entry.nature === 'experience' && entry.summary"
              class="text-xs"
            >
              {{ entry.summary }}
            </p>
            <ul
              class="list-disc list-inside ml-1 text-xs"
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
      </section>
    </template>
  </div>
</template>
