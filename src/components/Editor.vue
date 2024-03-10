<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useResumeStore } from "../stores/resume"
import { type Education, type WorkExperience } from "../types"
import Category from './Category.vue'

const { address, drivingLicense, education, email, gitHub, linkedIn, name, phone, title, website, workExperience } = storeToRefs(useResumeStore())

function addJob() {
    const experience: WorkExperience = {
        position: "",
        company: "",
        period: "",
        location: "",
        description: "",
        tasks: [],
    }

    workExperience.value.push(experience)
}

function deleteJob(experienceIndex: number) {
    workExperience.value.splice(experienceIndex, 1)
}

function addTask(experienceIndex: number) {
    const experience = workExperience.value[experienceIndex]
    experience.tasks.push("")
}

function deleteTask(experienceIndex: number, taskIndex: number) {
    const experience = workExperience.value[experienceIndex]
    experience.tasks.splice(taskIndex, 1)
}

function addTraining() {
    const training: Education = {
        diploma: "",
        institution: "",
        period: "",
        location: "",
        description: "",
    }

    education.value.push(training)
}

function deleteTraining(educationIndex: number) {
    education.value.splice(educationIndex, 1)
}
</script>

<template>
    <main class="editor">
        <Category heading="Personal details">
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
        <Category heading="Work experience">
            <ul>
                <li v-for="job, jobIndex in workExperience" class="editor__experience">
                    <button @click="() => deleteJob(jobIndex)">Remove</button>
                    <label>
                        Position
                        <input v-model="job.position" />
                    </label>
                    <label>
                        Company
                        <input v-model="job.company" />
                    </label>
                    <label>
                        Period
                        <input v-model="job.period" />
                    </label>
                    <label>
                        Location
                        <input v-model="job.location" />
                    </label>
                    <label>
                        Description
                        <input v-model="job.description" />
                    </label>
                    <label>
                        Tasks
                        <ul>
                            <li v-for="task, taskIndex in job.tasks">
                                <input v-model="job.tasks[taskIndex]" />
                                <button @click="() => deleteTask(jobIndex, taskIndex)">Remove</button>
                            </li>
                        </ul>
                        <button @click="() => addTask(jobIndex)">Add task</button>
                    </label>
                </li>
            </ul>
            <button @click="addJob">Add experience</button>
        </Category>
        <Category heading="Education">
            <ul>
                <li v-for="training, trainingIndex in education" class="editor__experience">
                    <button @click="() => deleteTraining(trainingIndex)">Remove</button>
                    <label>
                        Diploma
                        <input v-model="training.diploma" />
                    </label>
                    <label>
                        Institution
                        <input v-model="training.institution" />
                    </label>
                    <label>
                        Period
                        <input v-model="training.period" />
                    </label>
                    <label>
                        Location
                        <input v-model="training.location" />
                    </label>
                    <label>
                        Description
                        <input v-model="training.description" />
                    </label>
                </li>
            </ul>
            <button @click="addTraining">Add education</button>
        </Category>
    </main>
</template>

<style scoped>
.editor {
}

.editor__experience {
    display: flex;
    flex-direction: column;
}
</style>
