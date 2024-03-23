<script setup lang="ts">
import { ref } from "vue";
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";

const title = ref("Nice resume");
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <section class="flex h-full bg-gradient-to-br from-blue-700 to-pink-500">
    <Editor class="flex-1" />
    <Preview id="preview" class="flex-1" />
  </section>
</template>
