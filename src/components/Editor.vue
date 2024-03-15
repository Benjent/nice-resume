<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline"
import { useResumeStore } from "../stores/resume";
import { moveDown, moveUp, remove } from "../utils/array";
import { type Education, type WorkExperience } from "../types";
import Category from "./Category.vue";
import ListActions from "./ListActions.vue";

const {
  address,
  drivingLicense,
  education,
  educationLabel,
  email,
  gitHub,
  linkedIn,
  name,
  phone,
  title,
  website,
  workExperience,
  workExperienceLabel,
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
</script>

<template>
  <main class="flex flex-col overflow-y-scroll">
    <Category class="w-full">
      <template v-slot:header> Personal details </template>
      <div class="flex flex-col gap-5">
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-1">
            Name
            <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="name" />
          </label>
          <label class="flex flex-col flex-1">
            Title
            <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="title" />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-[60%]">
            Email
            <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="email" />
          </label>
          <label class="flex flex-col flex-[40%]">
            Phone
            <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="phone" />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-[80%]">
            Address
            <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="address" />
          </label>
          <label class="flex flex-col flex-[20%]">
            Driving license
            <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="drivingLicense" />
          </label>
        </div>
        <label class="flex flex-col">
          LinkedIn
          <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="linkedIn" />
        </label>
        <label class="flex flex-col">
          GitHub
          <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="gitHub" />
        </label>
        <label class="flex flex-col">
          Website
          <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="website" />
        </label>
      </div>
    </Category>
    <Category class="w-full">
      <template v-slot:header>
        <input
          class="bg-white bg-opacity-10 rounded px-2 py-1"
          v-model="workExperienceLabel"
        />
      </template>
      <ul class="flex flex-col gap-10">
        <li
          v-for="(job, jobIndex) in workExperience"
          :key="`job${jobIndex}`"
        >
          <ListActions
            class="mb-2"
            :index="jobIndex"
            :list-length="workExperience.length"
            @moveUp="moveUp(workExperience, jobIndex)"
            @moveDown="moveDown(workExperience, jobIndex)"
            @remove="remove(workExperience, jobIndex)"
          />
          <div class="flex flex-col gap-5">
            <div class="flex justify-center gap-10">
              <label class="flex flex-col flex-1">
                Position
                <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="job.position" />
              </label>
              <label class="flex flex-col flex-1">
                Company
                <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="job.company" />
              </label>
            </div>
            <div class="flex justify-center gap-10">
              <label class="flex flex-col flex-[30%]">
                Period
                <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="job.period" />
              </label>
              <label class="flex flex-col flex-[70%]">
                Location
                <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="job.location" />
              </label>
            </div>
            <label class="flex flex-col">
              Description
              <textarea class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="job.description" />
            </label>
            <label class="flex flex-col">
              <div class="flex gap-2">
                Tasks
                <button title="Add task" class="text-white size-6" @click="() => addTask(jobIndex)">
                  <PlusCircleIcon class="size-full" />
                </button>
              </div>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(_task, taskIndex) in job.tasks"
                  :key="`task${taskIndex}`"
                  class="flex items-center gap-2"
                >
                  <input class="bg-white bg-opacity-10 rounded px-2 py-1 flex-1" v-model="job.tasks[taskIndex]" />
                  <button title="Remove" class="text-white size-6" @click="() => deleteTask(jobIndex, taskIndex)">
                    <XCircleIcon class="size-full" />
                  </button>
                </li>
              </ul>
            </label>
          </div>
        </li>
      </ul>
      <footer class="flex justify-center mt-10">
        <button class="bg-pink-600 px-3 py-2 rounded" @click="addJob">Add experience</button>
      </footer>
    </Category>
    <Category class="w-full">
      <template v-slot:header>
        <input
          class="bg-white bg-opacity-10 rounded px-2 py-1"
          v-model="educationLabel"
        />
      </template>
      <ul class="flex flex-col gap-10">
        <li
          v-for="(training, trainingIndex) in education"
          :key="`training${trainingIndex}`"
        >
          <ListActions
            class="mb-2"
            :index="trainingIndex"
            :list-length="education.length"
            @moveUp="moveUp(education, trainingIndex)"
            @moveDown="moveDown(education, trainingIndex)"
            @remove="() => remove(education, trainingIndex)"
          />
          <div class="flex flex-col gap-5">
            <label class="flex flex-col">
              Diploma
              <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="training.diploma" />
            </label>
            <label class="flex flex-col">
              Institution
              <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="training.institution" />
            </label>
            <div class="flex justify-center gap-10">
              <label class="flex flex-col flex-[30%]">
                Period
                <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="training.period" />
              </label>
              <label class="flex flex-col flex-[70%]">
                Location
                <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="training.location" />
              </label>
            </div>
            <label class="flex flex-col">
              Description
              <input class="bg-white bg-opacity-10 rounded px-2 py-1" v-model="training.description" />
            </label>
          </div>
        </li>
      </ul>
      <footer class="flex justify-center mt-10">
        <button class="bg-pink-600 px-3 py-2 rounded" @click="addTraining">Add education</button>
      </footer>
    </Category>
  </main>
</template>
