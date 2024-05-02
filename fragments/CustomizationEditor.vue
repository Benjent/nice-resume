<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateThemes } from "@/globals";
import EditorCategory from "@/components/EditorCategory.vue";

const { documentType } = storeToRefs(useEditorStore());

const { isCustomizationForAllDocumentTypes, isThemeCustomized, template } =
  storeToRefs(useProfileStore());

const { colors: resumeColors, margins: resumeMargins } =
  storeToRefs(useResumeStore());
const { colors: letterColors, margins: letterMargins } =
  storeToRefs(useLetterStore());

const colors = computed(() => {
  if (isThemeCustomized.value) {
    if (
      documentType.value === "letter" &&
      !isCustomizationForAllDocumentTypes.value
    ) {
      return letterColors.value;
    }
    return resumeColors.value;
  }
  return templateThemes[template.value][documentType.value].colors;
});

const margins = computed(() => {
  if (isThemeCustomized.value) {
    if (
      documentType.value === "letter" &&
      !isCustomizationForAllDocumentTypes.value
    ) {
      return letterMargins.value;
    }
    return resumeMargins.value;
  }
  return templateThemes[template.value][documentType.value].margins;
});

function setCssVariable(name: string, value: string) {
  const root = document.querySelector(":root");
  // Rely on CSS variables to allow pseudo-element styling in templates
  (root as HTMLElement).style.setProperty(`--${name}`, value);
}

function setThemeColors() {
  colors.value.forEach((color, index) => {
    setCssVariable(`${documentType.value}-color${index}`, color);
  });
}

function setThemeMargins() {
  margins.value.forEach((margin, index) => {
    setCssVariable(`${documentType.value}-margin${index}`, `${margin}px`);
  });
}

onMounted(() => {
  setThemeColors();
  setThemeMargins();
});

watch([template, isThemeCustomized, isCustomizationForAllDocumentTypes], () => {
  setThemeColors();
  setThemeMargins();
});

watch(
  resumeColors,
  (newValue) => {
    console.log();
    newValue.forEach((color, index) => {
      setCssVariable(`resume-color${index}`, color);
    });
  },
  { deep: true },
);

watch(
  resumeMargins,
  (newValue) => {
    newValue.forEach((margin, index) => {
      setCssVariable(`resume-margin${index}`, `${margin}px`);
    });
  },
  { deep: true },
);

watch(
  letterColors,
  (newValue) => {
    newValue.forEach((color, index) => {
      setCssVariable(`letter-color${index}`, color);
    });
  },
  { deep: true },
);

watch(
  letterMargins,
  (newValue) => {
    newValue.forEach((margin, index) => {
      setCssVariable(`letter-margin${index}`, `${margin}px`);
    });
  },
  { deep: true },
);
</script>

<template>
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
      <label
        class="cursor-pointer"
        for="isCustomizationForAllDocumentTypes"
        v-if="documentType === 'letter'"
      >
        <input
          id="isCustomizationForAllDocumentTypes"
          class="input"
          type="checkbox"
          :disabled="!isThemeCustomized"
          v-model="isCustomizationForAllDocumentTypes"
        />
        <span class="opacity-60">Synchronize customization with resume</span>
      </label>
    </div>
    <ul class="flex flex-col gap-10 mb-4">
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <header>
          <div class="uppercase font-bold text-lg mb-5">Colors</div>
        </header>

        <div class="flex gap-5 flex-wrap">
          <template v-if="isThemeCustomized">
            <template
              v-if="
                documentType === 'letter' && !isCustomizationForAllDocumentTypes
              "
            >
              <label
                class="flex flex-col"
                v-for="(_color, index) in letterColors"
                :key="index"
                :for="`color${index}`"
              >
                <input
                  :id="`color${index}`"
                  class="input cursor-pointer"
                  type="color"
                  v-model="letterColors[index]"
                />
              </label>
            </template>
            <template v-else>
              <label
                class="flex flex-col"
                v-for="(_color, index) in resumeColors"
                :key="index"
                :for="`color${index}`"
              >
                <input
                  :id="`color${index}`"
                  class="input cursor-pointer"
                  type="color"
                  v-model="resumeColors[index]"
                />
              </label>
            </template>
          </template>
          <template v-else>
            <label
              class="flex flex-col"
              v-for="(color, index) in templateThemes[template][documentType]
                .colors"
              :key="index"
              :for="`color${index}`"
            >
              <input
                :id="`color${index}`"
                class="input cursor-pointer"
                type="color"
                disabled
                :value="color"
              />
            </label>
          </template>
        </div>
      </li>
      <li>
        <header>
          <div class="uppercase font-bold text-lg mb-5">Document margins</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col flex-1" for="marginX">
              <span class="opacity-60">Horizontal</span>
              <template v-if="isThemeCustomized">
                <input
                  v-if="
                    documentType === 'letter' &&
                    !isCustomizationForAllDocumentTypes
                  "
                  id="marginX"
                  class="input"
                  type="number"
                  v-model="letterMargins[0]"
                />
                <input
                  v-else
                  id="marginX"
                  class="input"
                  type="number"
                  v-model="resumeMargins[0]"
                />
              </template>
              <input
                v-else
                id="marginX"
                class="input"
                type="number"
                disabled
                :value="templateThemes[template][documentType].margins[0]"
              />
            </label>
            <label class="flex flex-col flex-1" for="marginY">
              <span class="opacity-60">Vertical</span>
              <template v-if="isThemeCustomized">
                <input
                  v-if="
                    documentType === 'letter' &&
                    !isCustomizationForAllDocumentTypes
                  "
                  id="marginY"
                  class="input"
                  type="number"
                  v-model="letterMargins[1]"
                />
                <input
                  v-else
                  id="marginY"
                  class="input"
                  type="number"
                  v-model="resumeMargins[1]"
                />
              </template>
              <input
                v-else
                id="marginY"
                class="input"
                type="number"
                disabled
                :value="templateThemes[template][documentType].margins[1]"
              />
            </label>
          </div>
        </div>
      </li>
    </ul>
  </EditorCategory>
</template>
