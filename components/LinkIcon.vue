<script setup lang="ts">
import { type Component, computed } from "vue";
import { LinkIcon } from "@heroicons/vue/16/solid";
import { GitHubIcon, LinkedInIcon } from "vue3-simple-icons";
import type { Link } from "@/types";

const { icon } = defineProps<{
  icon: Link["icon"];
}>();

type IconMapper = {
  [K in Link["icon"]]: Component;
};

const iconMapper: IconMapper = {
  default: LinkIcon,
  gitHub: GitHubIcon,
  linkedIn: LinkedInIcon,
};

const component: Component = computed(() => iconMapper[icon]);
</script>

<template>
  <component :is="component" style="fill: currentColor" />
</template>
