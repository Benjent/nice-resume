<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useLetterStore } from "@/stores/letter";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { recipientDetails, reference, subject } = storeToRefs(useLetterStore());

function addRecipientDetail() {
  recipientDetails.value.push("");

  focusNextInput("#recipientDetailList input");
}
</script>

<template>
  <EditorCategory id="Header" class="w-full">
    <template v-slot:header>Header</template>
    <div class="flex flex-col gap-5">
      <label class="flex flex-col" for="contactDetails">
        <div class="flex gap-2">
          <span class="opacity-60">Recipient details</span>
          <button
            title="Add detail"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addRecipientDetail"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul
          v-if="recipientDetails.length"
          id="recipientDetailList"
          class="inputList"
        >
          <li
            v-for="(_detail, index) in recipientDetails"
            :key="index"
            class="inputListItem"
          >
            <input
              class="input w-[70%]"
              v-model="recipientDetails[index]"
              @keydown.enter.prevent="addRecipientDetail"
            />
            <ListActions
              class="mb-2"
              :index="index"
              :list-length="recipientDetails.length"
              @moveUp="moveUp(recipientDetails, index)"
              @moveDown="moveDown(recipientDetails, index)"
              @remove="remove(recipientDetails, index)"
            />
          </li>
        </ul>
      </label>
      <label class="flex flex-col" for="letterSubject">
        <span class="opacity-60">Subject</span>
        <textarea id="letterSubject" class="input" v-model="subject" />
      </label>
      <label class="flex flex-col" for="letterReference">
        <span class="opacity-60">Reference</span>
        <input id="letterReference" class="input" v-model="reference" />
      </label>
    </div>
  </EditorCategory>
</template>
