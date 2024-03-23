<template>
  <details class="flex flex-col p-8">
    <summary class="cursor-pointer border-b-2 pb-2 mb-2">
      <slot name="header" />
    </summary>
    <slot />
  </details>
</template>
