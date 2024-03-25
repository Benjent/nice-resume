<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import { useResumeStore } from "@/stores/resume";
import { type Education, type Skill, type WorkExperience } from "@/types";
import { moveDown, moveUp, remove } from "@/utils/array";
import Category from "./Category.vue";
import ListActions from "./ListActions.vue";

const {
  about,
  address,
  drivingLicense,
  education,
  educationLabel,
  email,
  gitHub,
  linkedIn,
  name,
  phone,
  skills,
  skillsLabel,
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

function addSkill() {
  const skill: Skill = {
    name: "",
    level: "",
  };

  skills.value.push(skill);
}
</script>

<template>
  <main class="flex flex-col overflow-y-auto text-white">
    <Category class="w-full">
      <template v-slot:header>Personal details</template>
      <div class="flex flex-col gap-5">
        <div class="flex justify-center gap-5 flex-wrap">
          <label class="flex flex-col flex-1" for="editorPersonalDetailsName">
            Name
            <input
              id="editorPersonalDetailsName"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="name"
            />
          </label>
          <label class="flex flex-col flex-1" for="editorPersonalDetailsTitle">
            Title
            <input
              id="editorPersonalDetailsTitle"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="title"
            />
          </label>
        </div>
        <label class="flex flex-col" for="editorAbout">
          About
          <textarea
            id="editorAbout"
            class="bg-white bg-opacity-10 rounded px-2 py-1"
            v-model="about"
          />
        </label>
        <div class="flex justify-center gap-5 flex-wrap">
          <label
            class="flex flex-col flex-[60%]"
            for="editorPersonalDetailsEmail"
          >
            Email
            <input
              id="editorPersonalDetailsEmail"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="email"
            />
          </label>
          <label
            class="flex flex-col flex-[40%]"
            for="editorPersonalDetailsPhone"
          >
            Phone
            <input
              id="editorPersonalDetailsPhone"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="phone"
            />
          </label>
        </div>
        <div class="flex justify-center gap-5 flex-wrap">
          <label
            class="flex flex-col flex-[80%]"
            for="editorPersonalDetailsAddress"
          >
            Address
            <input
              id="editorPersonalDetailsAddress"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="address"
            />
          </label>
          <label
            class="flex flex-col flex-[20%]"
            for="editorPersonalDetailsDriving"
          >
            Driving license
            <input
              id="editorPersonalDetailsDriving"
              class="bg-white bg-opacity-10 rounded px-2 py-1"
              v-model="drivingLicense"
            />
          </label>
        </div>
        <label class="flex flex-col" for="editorPersonalDetailsLinkedin">
          LinkedIn
          <input
            id="editorPersonalDetailsLinkedin"
            class="bg-white bg-opacity-10 rounded px-2 py-1"
            v-model="linkedIn"
          />
        </label>
        <label class="flex flex-col" for="editorPersonalDetailsGithub">
          GitHub
          <input
            id="editorPersonalDetailsGithub"
            class="bg-white bg-opacity-10 rounded px-2 py-1"
            v-model="gitHub"
          />
        </label>
        <label class="flex flex-col" for="editorPersonalDetailsWebsite">
          Website
          <input
            id="editorPersonalDetailsWebsite"
            class="bg-white bg-opacity-10 rounded px-2 py-1"
            v-model="website"
          />
        </label>
      </div>
    </Category>
    <Category class="w-full">
      <template v-slot:header>
        <input
          aria-label="Work experience label"
          class="bg-white bg-opacity-10 rounded px-2 py-1"
          v-model="workExperienceLabel"
        />
      </template>
      <ul class="flex flex-col gap-10">
        <li v-for="(job, jobIndex) in workExperience" :key="jobIndex">
          <ListActions
            class="mb-2"
            :index="jobIndex"
            :list-length="workExperience.length"
            @moveUp="moveUp(workExperience, jobIndex)"
            @moveDown="moveDown(workExperience, jobIndex)"
            @remove="remove(workExperience, jobIndex)"
          />
          <div class="flex flex-col gap-5">
            <div class="flex justify-center gap-5 flex-wrap">
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
            <div class="flex justify-center gap-5 flex-wrap">
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
                  @click="() => job.tasks.push('')"
                >
                  <PlusCircleIcon class="size-full" />
                </button>
              </div>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(_task, taskIndex) in job.tasks"
                  :key="taskIndex"
                  class="flex items-center gap-2"
                >
                  <input
                    class="bg-white bg-opacity-10 rounded px-2 py-1 flex-1"
                    v-model="job.tasks[taskIndex]"
                  />
                  <button
                    title="Remove"
                    class="text-white size-6"
                    @click="remove(job.tasks, taskIndex)"
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
        <button class="text-white px-3 py-2 rounded" @click="addJob">
          Add experience
        </button>
      </footer>
    </Category>
    <Category class="w-full">
      <template v-slot:header>
        <input
          aria-label="Education label"
          class="bg-white bg-opacity-10 rounded px-2 py-1"
          v-model="educationLabel"
        />
      </template>
      <ul class="flex flex-col gap-10">
        <li v-for="(training, trainingIndex) in education" :key="trainingIndex">
          <ListActions
            class="mb-2"
            :index="trainingIndex"
            :list-length="education.length"
            @moveUp="moveUp(education, trainingIndex)"
            @moveDown="moveDown(education, trainingIndex)"
            @remove="remove(education, trainingIndex)"
          />
          <div class="flex flex-col gap-5">
            <label class="flex flex-col" for="editorEducationDiploma">
              Diploma
              <input
                id="editorEducationDiploma"
                class="bg-white bg-opacity-10 rounded px-2 py-1"
                v-model="training.diploma"
              />
            </label>
            <label class="flex flex-col" for="editorEducationInstitution">
              Institution
              <input
                id="editorEducationInstitution"
                class="bg-white bg-opacity-10 rounded px-2 py-1"
                v-model="training.institution"
              />
            </label>
            <div class="flex justify-center gap-5 flex-wrap">
              <label
                class="flex flex-col flex-[30%]"
                for="editorEducationPeriod"
              >
                Period
                <input
                  id="editorEducationPeriod"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="training.period"
                />
              </label>
              <label
                class="flex flex-col flex-[70%]"
                for="editorEducationLocation"
              >
                Location
                <input
                  id="editorEducationLocation"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="training.location"
                />
              </label>
            </div>
            <label class="flex flex-col" for="editorEducationDescription">
              Description
              <input
                id="editorEducationDescription"
                class="bg-white bg-opacity-10 rounded px-2 py-1"
                v-model="training.description"
              />
            </label>
          </div>
        </li>
      </ul>
      <footer class="flex justify-center mt-10">
        <button class="text-white px-3 py-2 rounded" @click="addTraining">
          Add education
        </button>
      </footer>
    </Category>
    <Category class="w-full">
      <template v-slot:header>
        <input
          aria-label="Skills label"
          class="bg-white bg-opacity-10 rounded px-2 py-1"
          v-model="skillsLabel"
        />
      </template>
      <ul class="flex flex-col gap-10">
        <li v-for="(skill, skillIndex) in skills" :key="skillIndex">
          <ListActions
            class="mb-2"
            :index="skillIndex"
            :list-length="skills.length"
            @moveUp="moveUp(skills, skillIndex)"
            @moveDown="moveDown(skills, skillIndex)"
            @remove="remove(skills, skillIndex)"
          />

          <div class="flex flex-col gap-5">
            <div class="flex justify-center gap-5 flex-wrap">
              <label class="flex flex-col flex-[80%]" for="editorSkillName">
                Name
                <input
                  id="editorSkillName"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="skill.name"
                />
              </label>
              <label class="flex flex-col flex-[20%]" for="editorSkillLevel">
                Level
                <input
                  id="editorSkillLevel"
                  class="bg-white bg-opacity-10 rounded px-2 py-1"
                  v-model="skill.level"
                />
              </label>
            </div>
          </div>
        </li>
      </ul>
      <footer class="flex justify-center mt-10">
        <button class="text-white px-3 py-2 rounded" @click="addSkill">
          Add skill
        </button>
      </footer>
    </Category>
  </main>
</template>
