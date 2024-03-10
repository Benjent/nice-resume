<script setup lang="ts">
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
</script>

<template>
    <section class="app">
        <Editor class="app__section" />
        <Preview class="app__section" />
    </section>
</template>

<style scoped>
.app {
    height: 100%;
    display: flex;
}

.app__section {
    flex: 1;
    height: 100%;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
