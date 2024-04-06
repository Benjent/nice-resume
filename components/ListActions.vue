<script setup lang="ts">
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

const { index, listLength } = defineProps<{
  index: number;
  listLength: number;
}>();
defineEmits(["moveDown", "moveUp", "remove"]);
</script>

<template>
  <div class="flex justify-end gap-2">
    <button
      title="Move up"
      v-if="listLength > 1 && index > 0"
      class="bg-blue-500 size-7 text-white rounded-full"
      @click="$emit('moveUp')"
    >
      <ArrowUpCircleIcon class="size-full" />
    </button>
    <button
      title="Move down"
      v-if="listLength > 1 && index < listLength - 1"
      class="bg-blue-500 size-7 text-white rounded-full"
      @click="$emit('moveDown')"
    >
      <ArrowDownCircleIcon class="size-full" />
    </button>
    <button
      title="Remove"
      class="bg-red-500 size-7 text-white rounded-full"
      @click="$emit('remove')"
    >
      <XCircleIcon class="size-full" />
    </button>
  </div>
</template>
