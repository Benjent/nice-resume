<script setup lang="ts">
import { type Component, computed } from "vue";
import { storeToRefs } from "pinia";
import { type Template } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useResumeStore } from "@/stores/resume";
import Benjent2023 from "@/templates/Benjent2023.vue";
import Benjent2023Light from "@/templates/Benjent2023Light.vue";
import Caillou2023Light from "@/templates/Caillou2023Light.vue";
import Helgrim2023Light from "@/templates/Helgrim2023Light.vue";

const { zoomLevel } = storeToRefs(useEditorStore());
const { template } = storeToRefs(useResumeStore());

type TemplateMapper = {
  [K in Template]: Component;
};

const templateMapper: TemplateMapper = {
  Benjent2023,
  Benjent2023Light,
  Caillou2023Light,
  Helgrim2023Light,
};

const component: Component = computed(() => templateMapper[template.value]);
</script>

<template>
  <aside class="overflow-y-auto">
    <section
      class="w-[210mm] h-[297mm] bg-white shadow m-auto after:content-[''] after:block after:left-0 after:right-0 after:border-b-2 after:border-black after:border-dotted"
      :style="`transform: scale(${zoomLevel / 100})`"
    >
      <component :is="component" />
    </section>
  </aside>
</template>
