import { ref } from "vue";
import { defineStore } from "pinia";

export const useEditorStore = defineStore("editor", () => {
  const zoomLevel = ref(75);

  return {
    zoomLevel,
  };
});
