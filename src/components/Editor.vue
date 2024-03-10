<script setup lang="ts">
// import { ref } from 'vue'
import { storeToRefs } from "pinia"
import { useResumeStore } from "../stores/resume"
import Category from './Category.vue'

// defineProps<{ msg: string }>()

const { address, drivingLicense, email, gitHub, linkedIn, name, phone, title, website } = storeToRefs(useResumeStore())

// const count = ref(0)
</script>

<template>
    <main class="editor">
        <Category>
            <label>
                Name
                <input v-model="name" />
            </label>
            <label>
                Email
                <input v-model="email" />
            </label>
            <label>
                Phone
                <input v-model="phone" />
            </label>
            <label>
                Address
                <input v-model="address" />
            </label>
            <label>
                LinkedIn
                <input v-model="linkedIn" />
            </label>
            <label>
                GitHub
                <input v-model="gitHub" />
            </label>
            <label>
                Website
                <input v-model="website" />
            </label>
            <label>
                Driving license
                <input v-model="drivingLicense" />
            </label>
            <label>
                Title
                <input v-model="title" />
            </label>
        </Category>
    </main>
</template>

<style scoped>
.editor {
}
</style>
