<script setup lang="ts">
import { type Component, computed } from "vue";
import { storeToRefs } from "pinia";
import { type Template } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useResumeStore } from "@/stores/resume";
import CottonCandy from "@/templates/CottonCandy.vue";
import OpenResume from "@/templates/OpenResume.vue";
import Pharmacy from "@/templates/Pharmacy.vue";
import Toothpaste from "@/templates/Toothpaste.vue";
import Stone from "@/templates/Stone.vue";

const { zoomLevel } = storeToRefs(useEditorStore());
const { template } = storeToRefs(useResumeStore());

type TemplateMapper = {
  [K in Template]: Component;
};

const templateMapper: TemplateMapper = {
  CottonCandy,
  OpenResume,
  Pharmacy,
  Toothpaste,
  Stone,
};

const component: Component = computed(() => templateMapper[template.value]);
</script>

<template>
  <aside class="lg:overflow-y-auto">
    <section
      class="w-[210mm] h-[297mm] bg-white shadow origin-top-left m-auto after:content-[''] after:block after:left-0 after:right-0 after:border-b-2 after:border-black after:border-dotted"
      :style="`transform: scale(${zoomLevel / 100})`"
    >
      <component :is="component" />
    </section>
  </aside>
</template>
