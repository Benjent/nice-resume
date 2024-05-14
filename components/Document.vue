<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { documentType } = storeToRefs(useEditorStore());
const { isThemeCustomized, template } = storeToRefs(useProfileStore());
const { settings: resumeStoreSettings } = storeToRefs(useResumeStore());
const { settings: letterStoreSettings } = storeToRefs(useLetterStore());

const settings = computed(() => {
  if (isThemeCustomized.value) {
    return documentType.value === "letter"
      ? letterStoreSettings.value
      : resumeStoreSettings.value;
  }
  return templateSettings[template.value][documentType.value];
});
</script>

<template>
  <!-- TODO remove that text-xs -->
  <div
    class="relative h-full w-full flex flex-col text-xs"
    :style="{
      color: settings.document.color,
      fontFamily: settings.document.bodyFont,
      backgroundColor: settings.document.backgroundColor,
      marginTop: `${settings.document.margin[0]}px`,
      marginRight: `${settings.document.margin[1]}px`,
      marginBottom: `${settings.document.margin[2]}px`,
      marginLeft: `${settings.document.margin[3]}px`,
      borderTop: `solid ${settings.document.borderColor} ${settings.document.border[0]}px`,
      borderRight: `solid ${settings.document.borderColor} ${settings.document.border[1]}px`,
      borderBottom: `solid ${settings.document.borderColor} ${settings.document.border[2]}px`,
      borderLeft: `solid ${settings.document.borderColor} ${settings.document.border[3]}px`,
    }"
  >
    <slot />
  </div>
</template>
