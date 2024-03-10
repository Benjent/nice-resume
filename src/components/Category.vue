<script setup lang="ts">
import { defineProps } from "vue"

defineProps<{ heading: string }>()
</script>

<template>
    <main class="category">
        <h3>{{ heading }}</h3>
        <slot />
    </main>
</template>

<style scoped>
.category {
    display: flex;
    flex-direction: column;
}
</style>
