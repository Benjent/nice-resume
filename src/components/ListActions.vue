<script setup lang="ts">
import { defineProps } from "vue";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline"

defineProps<{ index: number; listLength: number }>();
</script>

<template>
  <div class="flex justify-end gap-2">
    <button
      title="Move up"
      v-if="listLength > 1 && index > 0"
      class="text-white size-8"
      @click="$emit('moveUp')"
    >
      <ArrowUpCircleIcon class="size-full" />
    </button>
    <button
      title="Move down"
      v-if="listLength > 1 && index < listLength - 1"
      class="text-white size-8"
      @click="$emit('moveDown')"
    >
      <ArrowDownCircleIcon class="size-full" />
    </button>
    <button
      title="Remove"
      class="text-white size-8"
      @click="$emit('remove')"
    >
        <XCircleIcon class="size-full" />
    </button>
  </div>
</template>
