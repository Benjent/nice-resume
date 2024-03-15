<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ index: number; listLength: number }>();
</script>

<template>
  <div class="flex justify-end gap-2">
    <button
      v-if="listLength > 1 && index > 0"
      class="bg-blue-700 px-3 py-2 rounded"
      @click="$emit('moveUp')"
    >
      Move up
    </button>
    <button
      v-if="listLength > 1 && index < listLength - 1"
      class="bg-blue-700 px-3 py-2 rounded"
      @click="$emit('moveDown')"
    >
      Move down
    </button>
    <button class="bg-red-700 px-3 py-2 rounded" @click="$emit('remove')">Remove</button>
  </div>
</template>
