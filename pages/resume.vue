<script setup lang="ts">
import { ref } from "vue";
import Editor from "@/components/Editor.vue";
import Preview from "@/components/Preview.vue";

const title = ref("Nice resume");
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <NuxtLayout name="editor">
    <Editor class="print:hidden flex-1" document-type="resume" />
    <template v-slot:preview>
      <Preview />
    </template>
  </NuxtLayout>
</template>
