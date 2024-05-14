<script setup lang="ts">
import { type Component, computed } from "vue";
import { storeToRefs } from "pinia";
import { type Template } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import Aster from "@/templates/Aster.vue";
import CottonCandy from "@/templates/CottonCandy.vue";
import Cupcake from "@/templates/Cupcake.vue";
import Macaron from "@/templates/Macaron.vue";
import Macchiato from "@/templates/Macchiato.vue";
import Oilcloth from "@/templates/Oilcloth.vue";
import OpenResume from "@/templates/OpenResume.vue";
import Paper from "@/templates/Paper.vue";
import Pharmacy from "@/templates/Pharmacy.vue";
import Red from "@/templates/Red.vue";
import Stone from "@/templates/Stone.vue";
import Toothpaste from "@/templates/Toothpaste.vue";
import Wiki from "@/templates/Wiki.vue";

const { zoomLevel } = storeToRefs(useEditorStore());
const { template } = storeToRefs(useProfileStore());

type TemplateMapper = {
  [K in Template]: Component;
};

const templateMapper: TemplateMapper = {
  Aster,
  CottonCandy,
  Cupcake,
  Macaron,
  Macchiato,
  Oilcloth,
  OpenResume,
  Paper,
  Pharmacy,
  Red,
  Stone,
  Toothpaste,
  Wiki,
};

const component: Component = computed(() => templateMapper[template.value]);
</script>

<template>
  <aside class="lg:overflow-y-auto print:hidden">
    <section
      class="flex w-[210mm] h-[297mm] bg-white shadow origin-top-center m-auto overflow-hidden"
      :style="`transform: scale(${zoomLevel / 100})`"
    >
      <component :is="component" />
    </section>
  </aside>
  <component class="hidden print:block" :is="component" />
</template>
