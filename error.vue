<script setup lang="ts">
import { useError } from "nuxt/app";
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";

const error = useError();
</script>

<template>
  <NuxtLayout name="landing">
    <section class="p-20">
      <Card>
        <p class="text-4xl font-bold">
          Hold on a minute,
          <br />
          seems like something went wrong
        </p>
        <p v-if="error">{{ error.message }}</p>
        <NuxtLink to="/">
          <Button class="block mx-auto mt-8">Go to home page</Button>
        </NuxtLink>
      </Card>
    </section>
  </NuxtLayout>
</template>
