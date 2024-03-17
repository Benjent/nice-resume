<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import { useResumeStore } from "../stores/resume";
import { moveDown, moveUp, remove } from "../utils/array";
import { Skill, type Education, type WorkExperience } from "../types";
import Category from "./Category.vue";
import ListActions from "./ListActions.vue";
import { download } from "../utils/file";

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
  skills,
  skillsLabel,
  title,
  website,
  workExperience,
  workExperienceLabel,
} = storeToRefs(useResumeStore());

const isImportError = ref(false);

function exportToJson() {
  const resume = {
    isNiceResumeExport: true,
    address: address.value,
    drivingLicense: drivingLicense.value,
    education: education.value,
    educationLabel: educationLabel.value,
    email: email.value,
    gitHub: gitHub.value,
    linkedIn: linkedIn.value,
    name: name.value,
    phone: phone.value,
    skills: skills.value,
    skillsLabel: skillsLabel.value,
    title: title.value,
    website: website.value,
    workExperience: workExperience.value,
    workExperienceLabel: workExperienceLabel.value,
  };

  download(resume, "nice-resume");
}

function importFromJson(event: Event) {
  isImportError.value = false;
  try {
    // @ts-expect-error It seems like TS does nos not have the files property attached to the Event type.
    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const resume = JSON.parse(fileReaderEvent.target.result.toString());
      if (!resume.isNiceResumeExport) {
        isImportError.value = true;
        return;
      }

      address.value = resume.address;
      drivingLicense.value = resume.drivingLicense;
      education.value = resume.education;
      educationLabel.value = resume.educationLabel;
      email.value = resume.email;
      gitHub.value = resume.gitHub;
      linkedIn.value = resume.linkedIn;
      name.value = resume.name;
      phone.value = resume.phone;
      skills.value = resume.skills;
      skillsLabel.value = resume.skillsLabel;
      title.value = resume.title;
      website.value = resume.website;
      workExperience.value = resume.workExperience;
      workExperienceLabel.value = resume.workExperienceLabel;
    };
    fileReader.onerror = function () {
      isImportError.value = true;
    };
  } catch {
    isImportError.value = true;
  }
}

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

function addSkill() {
  const skill: Skill = {
    name: "",
    level: "",
  };

  skills.value.push(skill);
}
</script>

<template>
  <main class="flex flex-col overflow-y-scroll text-white">
    <header class="flex justify-center gap-2 p-6 bg-white shadow-lg">
      <h1
        class="bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text text-center text-4xl font-black tracking-widest uppercase"
      >
        Nice
        <br />
        Resume
      </h1>
      <div class="flex items-center gap-4">
        <div>
          <label
            for="editorFileReader"
            class="text-blue-500 flex items-center gap-1 cursor-pointer"
          >
            <ArrowUpOnSquareIcon class="h-6" />Import
            <input
              id="editorFileReader"
              type="file"
              accept=".json"
              @change="importFromJson"
            />
          </label>
          <p v-if="isImportError" class="text-red-500">
            Error while importing data from local file.
          </p>
        </div>
        <button
          class="text-blue-500 flex items-center gap-1"
          @click="exportToJson"
        >
          <ArrowDownOnSquareIcon class="h-6" />Export
        </button>
      </div>
    </header>
    <Category class="w-full">
      <template v-slot:header>Personal details</template>
      <div class="flex flex-col gap-5">
        <div class="flex justify-center gap-10">
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
        <div class="flex justify-center gap-10">
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
        <div class="flex justify-center gap-10">
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
            <div class="flex justify-center gap-10">
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
        <li v-for="(skill, skillIndex) in skills" :key="`skill${skillIndex}`">
          <ListActions
            class="mb-2"
            :index="skillIndex"
            :list-length="skills.length"
            @moveUp="moveUp(skills, skillIndex)"
            @moveDown="moveDown(skills, skillIndex)"
            @remove="() => remove(skills, skillIndex)"
          />

          <div class="flex flex-col gap-5">
            <div class="flex justify-center gap-10">
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
        <button class="bg-pink-600 px-3 py-2 rounded" @click="addSkill">
          Add skill
        </button>
      </footer>
    </Category>
  </main>
</template>
