export function moveUp(array: Array<any>, index: number) {
    if (index === 0) return
    array.splice(index - 1, 0, array.splice(index, 1)[0])
}

export function moveDown(array: Array<any>, index: number) {
    if (index === array.length - 1) return
    array.splice(index + 1, 0, array.splice(index, 1)[0])
}

export function remove(array: Array<any>, index: number) {
    if (index < 0 || index >= array.length) return
    array.splice(index, 1)
}
