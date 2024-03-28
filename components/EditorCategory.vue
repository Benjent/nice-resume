<template>
  <details class="flex flex-col p-8">
    <summary class="cursor-pointer border-b-2 pb-2 mb-2 flex justify-between">
      <slot name="header" />
    </summary>
    <div class="p-2">
      <slot />
    </div>
  </details>
</template>
