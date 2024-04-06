<script setup lang="ts">
import { type Component, computed } from "vue";
import { LinkIcon } from "@heroicons/vue/16/solid";
import {
  BandcampIcon,
  BehanceIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MastodonIcon,
  SoundCloudIcon,
  StackOverflowIcon,
  ViadeoIcon,
  XIcon,
} from "vue3-simple-icons";
import type { Link } from "@/types";

const { icon } = defineProps<{
  icon: Link["icon"];
}>();

type IconMapper = {
  [K in Link["icon"] as string]: Component;
};

const iconMapper: IconMapper = {
  default: LinkIcon,
  bandcamp: BandcampIcon,
  behance: BehanceIcon,
  facebook: FacebookIcon,
  gitHub: GitHubIcon,
  instagram: InstagramIcon,
  linkedIn: LinkedInIcon,
  mastodon: MastodonIcon,
  soundCloud: SoundCloudIcon,
  stackOverflow: StackOverflowIcon,
  viadeo: ViadeoIcon,
  x: XIcon,
};

const component: Component = computed(() => (icon ? iconMapper[icon] : null));
</script>

<template>
  <component :is="component" style="fill: currentColor" />
</template>
