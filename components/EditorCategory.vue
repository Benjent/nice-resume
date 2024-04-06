<template>
  <details class="flex flex-col bg-white bg-opacity-10 rounded">
    <summary
      class="cursor-pointer p-6 flex justify-between items-center rounded bg-white text-pink-500 shadow-lg"
    >
      <slot name="header" />
    </summary>
    <div class="p-6">
      <slot />
    </div>
  </details>
</template>
