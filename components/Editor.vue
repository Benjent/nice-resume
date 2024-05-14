<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { capitalize } from "@/utils/string";
import LetterBodyEditor from "@/fragments/LetterBodyEditor.vue";
import LetterCustomizationEditor from "@/fragments/LetterCustomizationEditor.vue";
import ResumeCategoriesEditor from "@/fragments/ResumeCategoriesEditor.vue";
import ResumeCustomizationEditor from "@/fragments/ResumeCustomizationEditor.vue";
import LetterHeaderEditor from "@/fragments/LetterHeaderEditor.vue";
import PersonalDetailsEditor from "@/fragments/PersonalDetailsEditor.vue";
import { discouragedLayoutTemplates, fixedLayoutTemplates } from "@/globals";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { categories } = storeToRefs(useResumeStore());

const isLayoutDisabled = computed(() =>
  fixedLayoutTemplates.includes(template.value),
);

const isLayoutDiscouraged = computed(() => {
  const discouragedLayouts = discouragedLayoutTemplates[template.value];
  return categories.value.some((category) =>
    discouragedLayouts.includes(category.layout),
  );
});

const discouragedLayoutText = computed(() => {
  const isPlural = discouragedLayoutTemplates[template.value].length > 1;
  const layouts = discouragedLayoutTemplates[template.value].join(" and ");
  return `${capitalize(layouts)} ${isPlural ? "layouts are" : "layout is"} discouraged for this template.`;
});
</script>

<template>
  <main class="flex flex-col lg:overflow-y-auto text-white">
    <header class="sticky z-10 top-[100px] lg:top-0">
      <nav class="bg-white px-10 py-2 text-blue-500 flex gap-x-5 flex-wrap">
        <span class="text-pink-500">Navigate to</span>
        <a href="#Details">Details</a>
        <template v-if="documentType === 'letter'">
          <a href="#Header">Header</a>
          <a href="#Body">Body</a>
        </template>
        <template v-else>
          <a
            v-for="category in categories"
            :key="category.name"
            :href="`#${category.name}`"
          >
            {{ category.name }}
          </a>
        </template>
        <a href="#Customization">Customization</a>
      </nav>
      <template v-if="documentType === 'resume'">
        <p v-if="isLayoutDisabled" class="text-center px-10 py-2 bg-amber-500">
          Category layouts are fixed for this template.
        </p>
        <p
          v-if="isLayoutDiscouraged"
          class="text-center px-10 py-2 bg-amber-500"
        >
          {{ discouragedLayoutText }}
        </p>
      </template>
    </header>
    <div class="flex flex-col gap-8 p-8 w-full max-w-[860px] mx-auto">
      <PersonalDetailsEditor />
      <template v-if="documentType === 'letter'">
        <LetterHeaderEditor />
        <LetterBodyEditor />
        <LetterCustomizationEditor />
      </template>
      <template v-else>
        <ResumeCategoriesEditor />
        <ResumeCustomizationEditor />
      </template>
    </div>
  </main>
</template>
