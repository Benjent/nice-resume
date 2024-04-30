<script setup lang="ts">
import { ref } from "vue";
import Editor from "../components/Editor.vue";
import Preview from "../components/Preview.vue";
import TheHeader from "../components/TheHeader.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { useMediaQuery } from "@vueuse/core";

const title = ref("Nice resume");
const isSmallScreen = useMediaQuery("(max-width: 1024px)");
</script>
<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <TheHeader />
  <section class="bg-gradient-to-br from-blue-700 to-pink-500">
    <splitpanes
      class="default-theme flex flex-col lg:h-[calc(100svh-100px)] lg:flex-row"
      :min="0"
      :max="100"
      :horizontal="isSmallScreen"
    >
      <pane min-size="50">
        <Editor class="flex-1" />
      </pane>
      <pane>
        <Preview />
      </pane>
    </splitpanes>
  </section>
</template>
