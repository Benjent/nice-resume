<script setup lang="ts">
import { type Component, computed } from "vue";
import {
  EnvelopeIcon,
  IdentificationIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/vue/16/solid";
import type { Detail } from "@/types";

const { icon } = defineProps<{
  icon: Detail["icon"];
}>();

type IconMapper = {
  [K in Detail["icon"] as string]: Component;
};

const iconMapper: IconMapper = {
  default: UserCircleIcon,
  address: MapPinIcon,
  drivingLicense: IdentificationIcon,
  email: EnvelopeIcon,
  phone: PhoneIcon,
};

const component: Component = computed(() => (icon ? iconMapper[icon] : null));
</script>

<template>
  <component :is="component" style="fill: currentColor" />
</template>
