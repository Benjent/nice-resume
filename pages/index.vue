<script setup lang="ts">
import { ref } from "vue";
import { ArrowLongRightIcon } from "@heroicons/vue/24/outline";
import Button from "@/components/Button.vue";

const title = ref("Nice resume");
</script>

<template>
  <div
    class="bg-gradient-to-br from-blue-700 to-pink-500 backdrop-contrast-200 text-white"
  >
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
    </Head>
    <NuxtLayout>
      <header
        class="sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 text-white border-white border-b-2 border-opacity-5"
      >
        <h1 class="text-center text-4xl font-black tracking-widest uppercase">
          Nice
          <br />
          Resume
        </h1>
      </header>
      <section class="lg:h-[calc(100svh-100px)]">
        <div
          class="max-w-[800px] mx-auto my-20 p-20 bg-white bg-opacity-5 rounded-lg border-white border-2 border-opacity-20"
        >
          <p class="text-4xl font-bold">
            Pick a design
            <br />
            Build your resume
            <br />
            Write your cover letter
          </p>
          <p class="text-2xl font-semibold mt-8">
            It's
            <i class="font-serif">that</i>
            simple
          </p>
          <NuxtLink to="/editor">
            <Button class="block mx-auto mt-8">Get started</Button>
          </NuxtLink>
        </div>
        <div class="max-w-[800px] mx-auto my-20">
          <p class="text-4xl font-bold font-serif italic">
            Not your first time?
          </p>
          <NuxtLink to="/editor">
            <Button class="mx-auto mt-8">
              Continue where I left off
              <ArrowLongRightIcon class="h-6 text-pink-500 float-right" />
            </Button>
          </NuxtLink>
        </div>
      </section>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
