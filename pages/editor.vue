<script setup lang="ts">
import { ref } from "vue";
import Editor from "../components/Editor.vue";
import Preview from "../components/Preview.vue";
import TheHeader from "../components/TheHeader.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const title = ref("Nice resume");
const todoSize = ref(40);

/* eslint-disable  @typescript-eslint/no-explicit-any */
// @ts-disable-next-line no-explicit-any
function foo(event: any) {
  console.log(event[0].size);
  todoSize.value =
    (event as Array<any>)[0].size < 40 ? 0 : (event as Array<any>)[0].size;
  console.log(event[0].size);
}
</script>
<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <TheHeader />
  <section
    class="flex flex-col bg-gradient-to-br from-blue-700 to-pink-500 lg:h-[calc(100svh-100px)] lg:flex-row"
  >
    <splitpanes class="default-theme" @resize="foo">
      {{ todoSize }}
      <pane :size="todoSize">
        <Editor class="flex-1" />
      </pane>
      <pane :size="100 - todoSize">
        <Preview />
      </pane>
    </splitpanes>
  </section>
</template>
