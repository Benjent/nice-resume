<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";
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
          <label class="flex flex-col flex-1" for="editorPersoName">
            Name
            <input
              id="editorPersoName"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="name"
            />
          </label>
          <label class="flex flex-col flex-1" for="editorPersoTitle">
            Title
            <input
              id="editorPersoTitle"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="title"
            />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-[60%]" for="editorPersoEmail">
            Email
            <input
              id="editorPersoEmail"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="email"
            />
          </label>
          <label class="flex flex-col flex-[40%]" for="editorPersoPhone">
            Phone
            <input
              id="editorPersoPhone"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="phone"
            />
          </label>
        </div>
        <div class="flex justify-center gap-10">
          <label class="flex flex-col flex-[80%]" for="editorPersoAddress">
            Address
            <input
              id="editorPersoAddress"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="address"
            />
          </label>
          <label class="flex flex-col flex-[20%]" for="editorPersoDriving">
            Driving license
            <input
              id="editorPersoDriving"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="drivingLicense"
            />
          </label>
        </div>
        <label class="flex flex-col" for="editorPersoLinkedin">
          LinkedIn
          <input
            id="editorPersoLinkedin"
            class="bg-white bg-opacity-10 rounded px-2 py-1"
            v-model="linkedIn"
          />
        </label>
        <label class="flex flex-col" for="editorPersoGithub">
          GitHub
          <input
            id="editorPersoGithub"
            class="bg-white bg-opacity-10 rounded px-2 py-1"
            v-model="gitHub"
          />
        </label>
        <label class="flex flex-col" for="editorPersoWebsite">
          Website
          <input
            id="editorPersoWebsite"
            class="bg-white bg-opacity-10 rounded px-2 py-1"
            v-model="website"
          />
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
        <li v-for="(job, jobIndex) in workExperience" :key="`job${jobIndex}`">
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
              <label class="flex flex-col flex-1" for="editorWorkPosition">
                Position
                <input
                  id="editorWorkPosition"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="job.position"
                />
              </label>
              <label class="flex flex-col flex-1" for="editorWorkCompany">
                Company
                <input
                  id="editorWorkCompany"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="job.company"
                />
              </label>
            </div>
            <div class="flex justify-center gap-10">
              <label class="flex flex-col flex-[30%]" for="editorWorkPeriod">
                Period
                <input
                  id="editorWorkPeriod"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="job.period"
                />
              </label>
              <label class="flex flex-col flex-[70%]" for="editorWorkLocation">
                Location
                <input
                  id="editorWorkLocation"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="job.location"
                />
              </label>
            </div>
            <label class="flex flex-col" for="editorWorkDescription">
              Description
              <textarea
                id="editorWorkDescription"
                class="bg-white bg-opacity-10 rounded px-2 py-1"
                v-model="job.description"
              />
            </label>
            <label class="flex flex-col" for="editorWorkTask">
              <div class="flex gap-2">
                Tasks
                <button
                  id="editorWorkTask"
                  title="Add task"
                  class="text-white size-6"
                  @click="() => addTask(jobIndex)"
                >
                  <PlusCircleIcon class="size-full" />
                </button>
              </div>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(_task, taskIndex) in job.tasks"
                  :key="`task${taskIndex}`"
                  class="flex items-center gap-2"
                >
                  <input
                    class="bg-white bg-opacity-10 rounded px-2 py-1 flex-1"
                    v-model="job.tasks[taskIndex]"
                  />
                  <button
                    title="Remove"
                    class="text-white size-6"
                    @click="() => deleteTask(jobIndex, taskIndex)"
                  >
                    <XCircleIcon class="size-full" />
                  </button>
                </li>
              </ul>
            </label>
          </div>
        </li>
      </ul>
      <footer class="flex justify-center mt-10">
        <button class="bg-pink-600 px-3 py-2 rounded" @click="addJob">
          Add experience
        </button>
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
            <label class="flex flex-col" for="editorEduDiploma">
              Diploma
              <input
                id="editorEduDiploma"
                class="bg-white bg-opacity-10 rounded px-2 py-1"
                v-model="training.diploma"
              />
            </label>
            <label class="flex flex-col" for="editorEduInstitution">
              Institution
              <input
                id="editorEduInstitution"
                class="bg-white bg-opacity-10 rounded px-2 py-1"
                v-model="training.institution"
              />
            </label>
            <div class="flex justify-center gap-10">
              <label class="flex flex-col flex-[30%]" for="editorEduPeriod">
                Period
                <input
                  id="editorEduPeriod"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="training.period"
                />
              </label>
              <label class="flex flex-col flex-[70%]" for="editorEduLocation">
                Location
                <input
                  id="editorEduLocation"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="training.location"
                />
              </label>
            </div>
            <label class="flex flex-col" for="editorEduDescription">
              Description
              <input
                id="editorEduDescription"
                class="bg-white bg-opacity-10 rounded px-2 py-1"
                v-model="training.description"
              />
            </label>
          </div>
        </li>
      </ul>
      <footer class="flex justify-center mt-10">
        <button class="bg-pink-600 px-3 py-2 rounded" @click="addTraining">
          Add education
        </button>
      </footer>
    </Category>
  </main>
</template>
