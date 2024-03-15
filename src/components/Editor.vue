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
</script>

<template>
  <main class="flex flex-col overflow-y-scroll">
    <Category heading="Personal details" class="w-full">
      <div class="flex flex-col gap-5">
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-1">
            Name
            <input v-model="name" />
          </label>
          <label class="flex flex-col flex-1">
            Title
            <input v-model="title" />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-[60%]">
            Email
            <input v-model="email" />
          </label>
          <label class="flex flex-col flex-[40%]">
            Phone
            <input v-model="phone" />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-[80%]">
            Address
            <input v-model="address" />
          </label>
          <label class="flex flex-col flex-[20%]">
            Driving license
            <input v-model="drivingLicense" />
          </label>
        </div>
        <label class="flex flex-col">
          LinkedIn
          <input v-model="linkedIn" />
        </label>
        <label class="flex flex-col">
          GitHub
          <input v-model="gitHub" />
        </label>
        <label class="flex flex-col">
          Website
          <input v-model="website" />
        </label>
      </div>
    </Category>
    <Category heading="Work experience" class="w-full">
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
                <input v-model="job.position" />
              </label>
              <label class="flex flex-col flex-1">
                Company
                <input v-model="job.company" />
              </label>
            </div>
            <div class="flex justify-center gap-10">
              <label class="flex flex-col flex-[30%]">
                Period
                <input v-model="job.period" />
              </label>
              <label class="flex flex-col flex-[70%]">
                Location
                <input v-model="job.location" />
              </label>
            </div>
            <label class="flex flex-col">
              Description
              <textarea v-model="job.description" />
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
                  <input class="flex-1" v-model="job.tasks[taskIndex]" />
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
    <Category heading="Education" class="w-full">
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
              <input v-model="training.diploma" />
            </label>
            <label class="flex flex-col">
              Institution
              <input v-model="training.institution" />
            </label>
            <div class="flex justify-center gap-10">
              <label class="flex flex-col flex-[30%]">
                Period
                <input v-model="training.period" />
              </label>
              <label class="flex flex-col flex-[70%]">
                Location
                <input v-model="training.location" />
              </label>
            </div>
            <label class="flex flex-col">
              Description
              <input v-model="training.description" />
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
