<script setup lang="ts">
import { defineProps } from "vue"

defineProps<{ heading: string }>()
</script>

<template>
    <main class="category">
        <h3 class="category__heading">{{ heading }}</h3>
        <slot />
    </main>
</template>

<style scoped>
.category {
    display: flex;
    flex-direction: column;
    padding: 2rem;
	box-shadow: 0 0 16px 1px #000;
    border: solid 2px #283049;
}

.category__heading {
    margin-bottom: 1.2rem;
    border-bottom: solid 2px #5879df;
}
</style>
