<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResumeStore } from "../stores/resume";
import { moveDown, moveUp, remove } from "../utils/array";
import { type Education, type WorkExperience } from "../types";
import Category from "./Category.vue";
import ListActions from "./ListActions.vue";

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

function addJob() {
  const experience: WorkExperience = {
    position: "",
    company: "",
    period: "",
    location: "",
    description: "",
    tasks: [],
  };

  workExperience.value.push(experience);
}

function addTask(experienceIndex: number) {
  const experience = workExperience.value[experienceIndex];
  experience.tasks.push("");
}

function deleteTask(experienceIndex: number, taskIndex: number) {
  const experience = workExperience.value[experienceIndex];
  experience.tasks.splice(taskIndex, 1);
}

function addTraining() {
  const training: Education = {
    diploma: "",
    institution: "",
    period: "",
    location: "",
    description: "",
  };

  education.value.push(training);
}

function deleteTraining(educationIndex: number) {
  education.value.splice(educationIndex, 1);
}
</script>

<template>
  <main class="editor">
    <Category heading="Personal details" class="w-full">
      <div class="flex flex-col gap-5">
        <div class="flex justify-center gap-10">
          <label class="flex-1">
            Name
            <input v-model="name" />
          </label>
          <label class="flex-1">
            Title
            <input v-model="title" />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex-[60%]">
            Email
            <input v-model="email" />
          </label>
          <label class="flex-[40%]">
            Phone
            <input v-model="phone" />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex-[80%]">
            Address
            <input v-model="address" />
          </label>
          <label class="flex-[20%]">
            Driving license
            <input v-model="drivingLicense" />
          </label>
        </div>
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
      </div>
    </Category>
    <Category heading="Work experience" class="editor__section">
      <ul class="editor__section__list">
        <li
          v-for="(job, jobIndex) in workExperience"
          :key="`job${jobIndex}`"
          class="editor__experience"
        >
          <ListActions
            :index="jobIndex"
            :list-length="workExperience.length"
            @moveUp="moveUp(workExperience, jobIndex)"
            @moveDown="moveDown(workExperience, jobIndex)"
            @remove="remove(workExperience, jobIndex)"
          />
          <label>
            Position
            <input class="editor__input" v-model="job.position" />
          </label>
          <label>
            Company
            <input class="editor__input" v-model="job.company" />
          </label>
          <label>
            Period
            <input class="editor__input" v-model="job.period" />
          </label>
          <label>
            Location
            <input class="editor__input" v-model="job.location" />
          </label>
          <label>
            Description
            <input class="editor__input" v-model="job.description" />
          </label>
          <label>
            Tasks
            <ul class="editor__section__list">
              <li
                v-for="(_task, taskIndex) in job.tasks"
                :key="`task${taskIndex}`"
              >
                <input class="editor__input" v-model="job.tasks[taskIndex]" />
                <button @click="() => deleteTask(jobIndex, taskIndex)">
                  Remove
                </button>
              </li>
            </ul>
            <button @click="() => addTask(jobIndex)">Add task</button>
          </label>
        </li>
      </ul>
      <button @click="addJob">Add experience</button>
    </Category>
    <Category heading="Education" class="editor__section">
      <ul class="editor__section__list">
        <li
          v-for="(training, trainingIndex) in education"
          :key="`training${trainingIndex}`"
          class="editor__experience"
        >
          <ListActions
            :index="trainingIndex"
            :list-length="education.length"
            @moveUp="moveUp(education, trainingIndex)"
            @moveDown="moveDown(education, trainingIndex)"
            @delete="() => deleteTraining(trainingIndex)"
          />
          <label>
            Diploma
            <input class="editor__input" v-model="training.diploma" />
          </label>
          <label>
            Institution
            <input class="editor__input" v-model="training.institution" />
          </label>
          <label>
            Period
            <input class="editor__input" v-model="training.period" />
          </label>
          <label>
            Location
            <input class="editor__input" v-model="training.location" />
          </label>
          <label>
            Description
            <input class="editor__input" v-model="training.description" />
          </label>
        </li>
      </ul>
      <button @click="addTraining">Add education</button>
    </Category>
  </main>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  place-items: center;
  overflow-y: scroll;
  height: 100%;
}

.editor__section {
  width: 100%;
}

.editor__section__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.editor__input {
  width: 100%;
}

.editor__experience {
  display: flex;
  flex-direction: column;
}

label {
    display: flex;
    flex-direction: column;
}
</style>
