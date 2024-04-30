<script setup></script>

<template>
  <TheHeader />
  <section
    class="flex flex-col bg-gradient-to-br from-blue-700 to-pink-500 backdrop-contrast-200 lg:h-[calc(100svh-100px)] lg:flex-row"
  >
    <slot />
    <!-- <div class="bg-white h:2 w-full lg:h-full lg:w-2" /> -->
    <slot name="preview" />
  </section>
</template>
