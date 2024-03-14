<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResumeStore } from "../stores/resume";

const {
  address,
  drivingLicense,
  education,
  email,
  gitHub,
  linkedIn,
  name,
  phone,
  title,
  website,
  workExperience,
} = storeToRefs(useResumeStore());
</script>

<template>
  <aside class="preview">
    <div>
      <h1 v-if="name">
        {{ name }}
      </h1>
      <h2 v-if="title">
        {{ title }}
      </h2>
    </div>
    <div v-if="drivingLicense">
      {{ drivingLicense }}
    </div>
    <div v-if="address">
      {{ address }}
    </div>
    <div v-if="email">
      {{ email }}
    </div>
    <div v-if="phone">
      {{ phone }}
    </div>

    <div>
      <div v-if="website">
        {{ website }}
      </div>
      <div v-if="linkedIn">
        {{ linkedIn }}
      </div>
      <div v-if="gitHub">
        {{ gitHub }}
      </div>
    </div>

    <div>
      <ul>
        <li v-for="(job, jobIndex) in workExperience" :key="`job${jobIndex}`">
          <div>{{ job.position }}</div>
          <div>{{ job.company }}</div>
          <div>{{ job.period }}</div>
          <div>{{ job.location }}</div>
          <div>{{ job.description }}</div>
          <ul>
            <li
              v-for="(task, taskIndex) in job.tasks"
              :key="`task${taskIndex}`"
            >
              {{ task }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div>
      <ul>
        <li
          v-for="(training, trainingIndex) in education"
          :key="`training${trainingIndex}`"
        >
          <div>{{ training.diploma }}</div>
          <div>{{ training.institution }}</div>
          <div>{{ training.period }}</div>
          <div>{{ training.location }}</div>
          <div>{{ training.description }}</div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.preview {
  background: white;
  color: black;
}
</style>
