<script setup lang="ts">
import { type Component, computed } from "vue";
import { storeToRefs } from "pinia";
import { Template } from "../types";
import { useResumeStore } from "../stores/resume";
import Benjent2023 from "./templates/Benjent2023.vue";
import Benjent2023Light from "./templates/Benjent2023Light.vue";

const { template } = storeToRefs(useResumeStore());

type TemplateMapper = {
  [K in Template]: Component;
};

const templateMapper: TemplateMapper = {
  Benjent2023,
  Benjent2023Light,
};

const component: Component = computed(() => templateMapper[template.value]);
</script>

<template>
  <aside class="overflow-y-auto">
    <section class="w-[210mm] h-[297mm] bg-white shadow m-auto">
      <component :is="component" />
    </section>
  </aside>
</template>
