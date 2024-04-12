<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/vue/24/outline";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { documentTypes, templates } from "@/globals";
import type { Export } from "@/types";
import { download } from "@/utils/file";
import packageJson from "../package.json";

console.log("Version: ", packageJson.version);

const { documentType, zoomLevel } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const profile = storeToRefs(useProfileStore());
const letter = storeToRefs(useLetterStore());
const resume = storeToRefs(useResumeStore());

const isImportError = ref(false);

function exportToJson() {
  const toExport = {
    ...letter,
    ...profile,
    ...resume,
  };
  Object.entries(toExport).forEach(([key, value]) => {
    // @ts-expect-error Build object on the fly
    toExport[key] = value.value;
  });

  // @ts-expect-error Build object on the fly
  toExport.isNiceResumeExport = true;
  download(toExport, "nice-resume");
}

function importFromJson(event: Event) {
  isImportError.value = false;
  try {
    // @ts-expect-error It seems there is no default <input type=file /> native TS type...
    const file = event.currentTarget?.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const toImport: Export = JSON.parse(
        fileReaderEvent.target.result.toString(),
      );
      if (!toImport.isNiceResumeExport) {
        isImportError.value = true;
        return;
      }

      Object.entries(toImport).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (profile[key]) {
          // @ts-expect-error Build object on the fly
          profile[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (resume[key]) {
          // @ts-expect-error Build object on the fly
          resume[key].value = value;
        }
      });
    };
    fileReader.onerror = function () {
      isImportError.value = true;
    };
  } catch {
    isImportError.value = true;
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 bg-white text-pink-500 shadow-lg"
  >
    <NuxtLink to="/">
      <h1
        class="bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text text-center text-4xl font-black tracking-widest uppercase"
        :data-version="packageJson.version"
      >
        Nice
        <br />
        Resume
      </h1>
    </NuxtLink>
    <div class="flex items-end gap-8 h-[60%]">
      <div>
        <label
          for="editorFileReader"
          class="text-blue-500 flex items-center gap-1 cursor-pointer"
        >
          <ArrowUpOnSquareIcon class="h-6" />
          Import
          <input
            id="editorFileReader"
            class="hidden"
            type="file"
            accept=".json"
            @change="importFromJson"
          />
        </label>
        <p v-if="isImportError" class="text-red-500">
          Error while importing data from local file.
        </p>
      </div>
      <button
        class="text-blue-500 flex items-center gap-1"
        @click="exportToJson"
      >
        <ArrowDownOnSquareIcon class="h-6" />
        Export
      </button>

      <label for="template">
        Template
        <select id="template" v-model="template" class="select block">
          <option v-for="template in templates" :key="template" class="option">
            {{ template }}
          </option>
        </select>
      </label>
      <label for="editorZoomLevel">
        Zoom
        <div class="flex gap-2 items-center">
          <input
            id="editorZoomLevel"
            type="range"
            min="50"
            max="150"
            v-model="zoomLevel"
          />
          <output class="w-[3rem] text-blue-500">{{ zoomLevel }}%</output>
        </div>
      </label>
      <label for="documentType">
        Document
        <select id="documentType" v-model="documentType" class="select block">
          <option
            v-for="documentType in documentTypes"
            :key="documentType"
            class="option"
          >
            {{ documentType }}
          </option>
        </select>
      </label>
    </div>
  </header>
</template>
