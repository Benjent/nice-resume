<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { capitalize } from "@/utils/string";
import LetterBodyEditor from "@/fragments/LetterBodyEditor.vue";
import ResumeCategoriesEditor from "@/fragments/ResumeCategoriesEditor.vue";
import LetterHeaderEditor from "@/fragments/LetterHeaderEditor.vue";
import PersonalDetailsEditor from "@/fragments/PersonalDetailsEditor.vue";

import EditorCategory from "./EditorCategory.vue";
import {
  discouragedLayoutTemplates,
  fixedLayoutTemplates,
  templateColors,
} from "@/globals";

const { documentType } = storeToRefs(useEditorStore());

const { colors, isThemeCustomized, template } = storeToRefs(useProfileStore());

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

function setCssVariable(name: string, value: string) {
  const root = document.querySelector(":root");
  // Rely on CSS variables to allow pseudo-element styling in templates
  (root as HTMLElement).style.setProperty(`--${name}`, value);
}

function setThemeColors(isThemeCustomized: boolean) {
  if (isThemeCustomized) {
    colors.value.forEach((color, index) => {
      setCssVariable(`color${index}`, color);
    });
  } else {
    templateColors[template.value].forEach((color, index) => {
      setCssVariable(`color${index}`, color);
    });
  }
}

onMounted(() => {
  setThemeColors(isThemeCustomized.value);
});

watch(template, () => {
  setThemeColors(isThemeCustomized.value);
});

watch(isThemeCustomized, (newValue) => {
  setThemeColors(newValue);
});

watch(
  colors,
  (newValue) => {
    newValue.forEach((color, index) => {
      setCssVariable(`color${index}`, color);
    });
  },
  { deep: true },
);
</script>

<template>
  <main class="flex flex-col lg:overflow-y-auto text-white">
    <header class="sticky z-10 top-[100px] lg:top-0">
      <nav class="bg-white px-10 py-2 text-blue-500 flex gap-x-5 flex-wrap">
        <span class="text-pink-500">Navigate to</span>
        <a href="#Details">Details</a>
        <template v-if="documentType === 'Letter'">
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
      <template v-if="documentType === 'Resume'">
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
      <template v-if="documentType === 'Letter'">
        <LetterHeaderEditor />
        <LetterBodyEditor />
      </template>
      <template v-else>
        <ResumeCategoriesEditor />
      </template>

      <EditorCategory id="Customization" class="w-full">
        <template v-slot:header>Customization</template>
        <div class="flex flex-col gap-5">
          <!-- TODO use nice toggle component -->
          <label class="cursor-pointer" for="isThemeCustomized">
            <input
              id="isThemeCustomized"
              class="input"
              type="checkbox"
              v-model="isThemeCustomized"
            />
            <span class="opacity-60">Use custom theme</span>
          </label>
          <div class="flex gap-5 flex-wrap">
            <label
              class="flex flex-col"
              v-for="(color, index) in templateColors[template]"
              :key="index"
              :for="`color${index}`"
            >
              <input
                v-if="isThemeCustomized"
                :id="`color${index}`"
                class="input cursor-pointer"
                type="color"
                :disabled="!isThemeCustomized"
                v-model="colors[index]"
              />
              <input
                v-else
                :id="`color${index}`"
                class="input cursor-pointer"
                type="color"
                disabled
                :value="color"
              />
            </label>
          </div>
        </div>
      </EditorCategory>
    </div>
  </main>
</template>
