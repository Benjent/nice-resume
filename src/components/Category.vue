<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ heading: string }>();
</script>

<template>
    <details class="flex flex-col p-8">
        <summary class="cursor-pointer border-b-2 pb-2 mb-2">{{ heading }}</summary>
        <slot />
    </details>
</template>
