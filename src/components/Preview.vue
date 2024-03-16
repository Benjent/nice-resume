<script setup lang="ts">
import { defineProps } from "vue";
import Benjent2023 from "./templates/Benjent2023.vue";

const { template } = defineProps<{ template: string }>();

type Templates = "Benjent2023";

type TemplateMapper = {
  [K in Templates]: any;
};

const templateMapper: TemplateMapper = {
  Benjent2023,
};
const component = templateMapper[template]; // TODO define type
</script>

<template>
  <aside class="overflow-y-auto">
    <section class="w-[210mm] h-[297mm] bg-white shadow m-auto">
      <component :is="component" />
    </section>
  </aside>
</template>
