<script setup lang="ts">
const { disabled, label, id, step, type } = defineProps<{
  disabled?: boolean;
  id?: string;
  label: string;
  step?: string;
  type?: string;
}>();

const model = defineModel();
</script>

<template>
  <label class="flex flex-col" :for="id">
    <span class="opacity-60">{{ label }}</span>
    <input
      :id="id"
      class="input"
      :class="{
        'cursor-pointer': type === 'color' && !disabled,
        'w-20': type === 'number',
      }"
      :type="type || 'text'"
      :step="step"
      :disabled="disabled"
      v-model="model"
    />
  </label>
</template>
