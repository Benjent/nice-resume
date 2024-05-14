<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";

const title = ref("Nice resume");
const description = ref(
  "Pick a design, build your resume, write your cover letter, adapt the design to your need with Nice Resume.",
);
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="og:title" :content="title" />
    <Meta name="og:description" :content="description" />
    <!-- TODO og:url -->
    <!-- TODO og:image -->
  </Head>
  <NuxtLayout name="landing">
    <section class="p-20">
      <Card>
        <p class="text-4xl font-bold">
          Pick a design
          <br />
          Build your resume
          <br />
          Write your cover letter
          <br />
          Adapt the design to your need
        </p>
        <p class="text-2xl font-semibold mt-8">
          It's
          <i class="font-serif">that</i>
          simple
        </p>
        <NuxtLink to="/resume">
          <Button class="block mx-auto mt-8">Get started</Button>
        </NuxtLink>
      </Card>
    </section>
    <NuxtPage />
  </NuxtLayout>
</template>
