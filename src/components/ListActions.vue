<script setup lang="ts">
import { defineProps } from "vue"

defineProps<{ index: number, listLength: number }>()
</script>

<template>
    <div class="listActions">
        <button v-if="listLength > 1 && index > 0" class="listActions__remove" @click="$emit('moveUp')">Move up</button>
        <button v-if="listLength > 1 && index < listLength - 1" class="listActions__remove" @click="$emit('moveDown')">Move down</button>
        <button class="listActions__remove" @click="$emit('remove')">Remove</button>
    </div>
</template>

<style scoped>
.listActions {
    display: flex;
    gap: 1.2rem;
    justify-content: end;
}

.listActions__remove {
    width: fit-content;
    align-self: end;
}
</style>
