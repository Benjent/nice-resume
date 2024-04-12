import { ref } from "vue";
import { defineStore } from "pinia";
import type { DocumentType } from "@/types";
import { documentTypes } from "@/globals";

export const useEditorStore = defineStore("editor", () => {
  const documentType = ref<DocumentType>(documentTypes[0]);
  const zoomLevel = ref(100);

  return {
    documentType,
    zoomLevel,
  };
});
