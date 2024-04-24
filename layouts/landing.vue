<script setup></script>

<template>
  <div
    class="bg-gradient-to-br from-blue-700 to-pink-500 backdrop-contrast-200 text-white min-h-[100vh]"
  >
    <header
      class="sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 text-white border-white border-b-2 border-opacity-5"
    >
      <h1 class="text-center text-4xl font-black tracking-widest uppercase">
        Nice
        <br />
        Resume
      </h1>
    </header>
    <slot />
  </div>
</template>
