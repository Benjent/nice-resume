<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useLetterStore } from "@/stores/letter";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { paragraphs } = storeToRefs(useLetterStore());

function addParagraph() {
  paragraphs.value.push("");

  focusNextInput("#paragraphList textarea");
}
</script>

<template>
  <EditorCategory id="Body" class="w-full">
    <template v-slot:header>Body</template>
    <div class="flex flex-col gap-5">
      <label class="flex flex-col" for="paragraphList">
        <div class="flex gap-2">
          <span class="opacity-60">Paragraphs</span>
          <button
            title="Add paragraph"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addParagraph"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul v-if="paragraphs.length" id="paragraphList" class="inputList">
          <li
            v-for="(_paragraph, index) in paragraphs"
            :key="index"
            class="inputListItem"
          >
            <textarea
              class="input w-[70%]"
              v-model="paragraphs[index]"
              @keydown.enter.prevent="addParagraph"
            />
            <ListActions
              class="mb-2"
              :index="index"
              :list-length="paragraphs.length"
              @moveUp="moveUp(paragraphs, index)"
              @moveDown="moveDown(paragraphs, index)"
              @remove="remove(paragraphs, index)"
            />
          </li>
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>
