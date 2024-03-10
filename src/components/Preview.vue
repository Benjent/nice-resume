<script setup lang="ts">
// import { ref } from 'vue'
import { storeToRefs } from "pinia"
import { useResumeStore } from "../stores/resume"

// defineProps<{ msg: string }>()

// const count = ref(0)
const { address, drivingLicense, email, gitHub, linkedIn, name, phone, title, website } = storeToRefs(useResumeStore())
</script>

<template>
    <aside class="preview">
        <div>
            <h1 v-if="name">{{ name }}</h1>
            <h2 v-if="title">{{ title }}</h2>
        </div>
        <div v-if="drivingLicense">{{ drivingLicense }}</div>
        <div v-if="address">{{ address }}</div>
        <div v-if="email">{{ email }}</div>
        <div v-if="phone">{{ phone }}</div>

        <div>
            <div v-if="website">{{ website }}</div>
            <div v-if="linkedIn">{{ linkedIn }}</div>
            <div v-if="gitHub">{{ gitHub }}</div>
        </div>
    </aside>
</template>

<style scoped>
.preview {
    background: white;
    color: black;
}
</style>
