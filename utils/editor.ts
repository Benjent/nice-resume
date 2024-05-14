import { nextTick } from "vue";

export async function focusNextInput(selector: string) {
  await nextTick(); // Wait for the new input to be rendered before querying it
  const inputs = [...document.querySelectorAll(selector)];
  (inputs[inputs.length - 1] as HTMLInputElement).focus();
}

export function getSideIndexLabel(index: number) {
  if (index < 1 || index > 4) return "";
  return ["top", "right", "bottom", "left"][index - 1];
}
