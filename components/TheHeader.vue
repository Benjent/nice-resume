<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/vue/24/outline";
import { useEditorStore } from "@/stores/editor";
import { useResumeStore } from "@/stores/resume";
import { templates } from "@/globals";
import { download } from "@/utils/file";

const { zoomLevel } = storeToRefs(useEditorStore());

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
  template,
  title,
  website,
  workExperience,
  workExperienceLabel,
} = storeToRefs(useResumeStore());

const isImportError = ref(false);

function exportToJson() {
  const resume = {
    isNiceResumeExport: true,
    template: template.value,
    about: about.value,
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

      about.value = resume.about;
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
</script>

<template>
  <header
    class="sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 bg-white text-pink-500 shadow-lg"
  >
    <h1
      class="bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text text-center text-4xl font-black tracking-widest uppercase"
    >
      Nice
      <br />
      Resume
    </h1>
    <div class="flex items-end gap-8 h-[60%]">
      <div>
        <label
          for="editorFileReader"
          class="text-blue-500 flex items-center gap-1 cursor-pointer"
        >
          <ArrowUpOnSquareIcon class="h-6" />Import
          <input
            id="editorFileReader"
            class="hidden"
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

      <label for="editorTemplateSelector">
        Template
        <select
          id="editorTemplateSelector"
          v-model="template"
          class="bg-white cursor-pointer text-blue-500 block"
        >
          <option v-for="template in templates" :key="template">
            {{ template }}
          </option>
        </select>
      </label>
      <label for="editorZoomLevel">
        Zoom
        <div class="flex gap-2 items-center">
          <input
            id="editorZoomLevel"
            type="range"
            min="50"
            max="150"
            v-model="zoomLevel"
          />
          <output class="w-[3rem] text-blue-500">{{ zoomLevel }}%</output>
        </div>
      </label>
    </div>
  </header>
</template>
