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
            <h1>{{ name }}</h1>
            <h2>{{ title }}</h2>
        </div>
        <div>{{ drivingLicense }}</div>
        <div>{{ address }}</div>
        <div>{{ email }}</div>
        <div>{{ phone }}</div>

        <div>
            <div>{{ website }}</div>
            <div>{{ linkedIn }}</div>
            <div>{{ gitHub }}</div>
        </div>
    </aside>
</template>

<style scoped>
.preview {
    background: white;
    color: black;
}
</style>
