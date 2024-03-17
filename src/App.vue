<script setup lang="ts">
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";
</script>

<template>
  <section class="flex h-full bg-gradient-to-br from-blue-700 to-pink-500">
    <Editor class="flex-1" />
    <Preview class="flex-1" />
  </section>
</template>
