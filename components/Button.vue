<script setup lang="ts">
defineEmits(["click"]);
</script>

<template>
  <button
    class="bg-white px-3 py-2 rounded text-blue-500"
    @click="$emit('click')"
  >
    <span
      class="bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text text-center font-black tracking-widest uppercase"
    >
      <slot />
    </span>
  </button>
</template>
