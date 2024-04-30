import { nextTick } from "vue";

export async function focusNextInput(selector: string) {
  await nextTick(); // Wait for the new input to be rendered before querying it
  const inputs = [...document.querySelectorAll(selector)];
  (inputs[inputs.length - 1] as HTMLInputElement).focus();
}
