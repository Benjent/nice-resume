export function moveUp(array: Array<unknown>, index: number) {
  if (index === 0) return;
  array.splice(index - 1, 0, array.splice(index, 1)[0]);
}

export function moveDown(array: Array<unknown>, index: number) {
  if (index === array.length - 1) return;
  array.splice(index + 1, 0, array.splice(index, 1)[0]);
}

export function remove(array: Array<unknown>, index: number) {
  if (index < 0 || index >= array.length) return;
  array.splice(index, 1);
}
