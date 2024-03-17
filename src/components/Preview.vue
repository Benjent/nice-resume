<script setup lang="ts">
import { defineProps, type Component } from "vue";
import { Template } from "../types";
import Benjent2023 from "./templates/Benjent2023.vue";

const { template } = defineProps<{ template: Template }>();

type TemplateMapper = {
  [K in Template]: Component;
};

const templateMapper: TemplateMapper = {
  Benjent2023,
};

const component: Component = templateMapper[template];
</script>

<template>
  <aside class="overflow-y-auto">
    <section class="w-[210mm] h-[297mm] bg-white shadow m-auto">
      <component :is="component" />
    </section>
  </aside>
</template>
