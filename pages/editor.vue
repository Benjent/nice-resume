<script setup lang="ts">
import { ref } from "vue";
import Editor from "@/components/Editor.vue";
import Preview from "@/components/Preview.vue";
import TheHeader from "@/components/TheHeader.vue";

const title = ref("Nice resume");
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <TheHeader />
  <section
    class="flex flex-col bg-gradient-to-br from-blue-700 to-pink-500 backdrop-contrast-200 lg:h-[calc(100svh-100px)] lg:flex-row"
  >
    <Editor class="print:hidden flex-1" />
    <!-- <div class="bg-white h:2 w-full lg:h-full lg:w-2" /> -->
    <Preview />
  </section>
</template>
