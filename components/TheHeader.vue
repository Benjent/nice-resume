<script setup lang="ts">
import { ref, watch } from "vue";
import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
} from "@heroicons/vue/24/outline";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { documentTypes, templates } from "@/globals";
import type { Export } from "@/types";
import { download } from "@/utils/file";
import packageJson from "../package.json";

console.log("Version: ", packageJson.version);

const { documentType, zoomLevel } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const profileStore = useProfileStore();
const profile = storeToRefs(profileStore);
const letterStore = useLetterStore();
const letter = storeToRefs(letterStore);
const resumeStore = useResumeStore();
const resume = storeToRefs(resumeStore);

const isImportError = ref(false);

function downloadPdf() {
  window.print();
}

function exportToJson() {
  const toExport = {
    ...letter,
    ...profile,
    ...resume,
  };
  Object.entries(toExport).forEach(([key, value]) => {
    // @ts-expect-error Build object on the fly
    toExport[key] = value.value;
  });

  // @ts-expect-error Build object on the fly
  toExport.isNiceResumeExport = true;
  download(toExport, "nice-resume");
}

function importFromJson(event: Event) {
  isImportError.value = false;
  try {
    // @ts-expect-error It seems there is no default <input type=file /> native TS type...
    const file = event.currentTarget?.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const toImport: Export = JSON.parse(
        fileReaderEvent.target.result.toString(),
      );
      if (!toImport.isNiceResumeExport) {
        isImportError.value = true;
        return;
      }

      Object.entries(toImport).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (profile[key]) {
          // @ts-expect-error Build object on the fly
          profile[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (resume[key]) {
          // @ts-expect-error Build object on the fly
          resume[key].value = value;
        }
      });
    };
    fileReader.onerror = function () {
      isImportError.value = true;
    };
  } catch {
    isImportError.value = true;
  }
}

function generateStores() {
  profile.name.value = "Firstname Lastname";
  profile.title.value = "Title";
  resume.about.value = "About";
  resume.contactDetails.value = [
    { icon: "drivingLicense", value: "Driving license" },
    { icon: "address", value: "Address" },
    { icon: "email", value: "email@email.com" },
    { icon: "phone", value: "061122334455" },
  ];
  resume.socialLinks.value = [
    { icon: "gitHub", url: "github.com" },
    { icon: "linkedIn", url: "linkedin.com" },
    { icon: "viadeo", url: "viadeo.com" },
  ];
  resume.categories.value = [
    {
      nature: "experience",
      type: "work",
      name: "Work experience",
      entries: [
        {
          nature: "experience",
          type: "work",
          title: "Title",
          organization: "Company",
          location: "Location",
          period: "Since",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: ["- A", "- B", "- C"],
        },
        {
          nature: "experience",
          type: "work",
          title: "Title",
          organization: "Company",
          location: "Location",
          period: "From - To",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: ["- A", "- B"],
        },
      ],
      layout: "full",
    },
    {
      nature: "experience",
      type: "education",
      name: "Education",
      entries: [
        {
          nature: "experience",
          type: "education",
          title: "Title",
          organization: "Institution",
          location: "Location",
          period: "From - To",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: ["- A", "- B", "- C"],
        },
        {
          nature: "experience",
          type: "education",
          title: "Title",
          organization: "Institution",
          location: "Location",
          period: "From - To",
          summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          highlights: [],
        },
      ],
      layout: "full",
    },
    {
      nature: "asset",
      type: "skill",
      name: "Skills",
      entries: [
        {
          nature: "asset",
          type: "skill",
          title: "Title",
          highlights: ["- A", "- B", "- C"],
        },
        {
          nature: "asset",
          type: "skill",
          title: "Title",
          highlights: ["- A", "- B", "- C"],
        },
        {
          nature: "asset",
          type: "skill",
          title: "Title",
          highlights: ["- A", "- B"],
        },
      ],
      layout: "half",
    },
    {
      nature: "asset",
      type: "language",
      name: "Languages",
      entries: [
        {
          nature: "asset",
          type: "language",
          title: "Title",
          highlights: ["- A", "- B", "- C"],
        },
        {
          nature: "asset",
          type: "language",
          title: "Title",
          highlights: ["- A", "- B", "- C"],
        },
        {
          nature: "asset",
          type: "language",
          title: "Title",
          highlights: ["- A", "- B"],
        },
      ],
      layout: "half",
    },
  ];
  letter.senderDetails.value = [
    "Firstname Lastname",
    "Streetnumber Streetname Street",
    "Zip code City - Country",
  ];
  letter.recipientDetails.value = [
    "Firstname Lastname",
    "Streetnumber Streetname Street",
    "Zip code City - Country",
  ];
  letter.subject.value = "Cover letter subject";
  letter.reference.value = "Ref.: Application reference";
  letter.paragraphs.value = [
    "Salutation,",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    "Outroduction.",
    "Regards.",
  ];
}

function resetStores() {
  profileStore.$reset();
  resumeStore.$reset();
  letterStore.$reset();
}

watch(documentType, (newValue) => {
  newValue === "letter" ? navigateTo("/letter") : navigateTo("/resume");
});
</script>

<template>
  <header
    class="print:hidden sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 bg-white text-pink-500 shadow-lg"
  >
    <NuxtLink to="/">
      <h1
        class="bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text text-center text-4xl font-black tracking-widest uppercase"
        :data-version="packageJson.version"
      >
        Nice
        <br />
        Resume
      </h1>
    </NuxtLink>
    <div class="flex items-end gap-8 h-[60%]">
      <button
        class="text-blue-500 flex items-center gap-1"
        @click="generateStores"
      >
        <ClipboardDocumentIcon class="h-6" />
        Generate
      </button>
      <button
        class="text-blue-500 flex items-center gap-1"
        @click="resetStores"
      >
        <ArrowPathIcon class="h-6" />
        Reset
      </button>
      <div>
        <label
          for="editorFileReader"
          class="text-blue-500 flex items-center gap-1 cursor-pointer"
        >
          <ArrowUpOnSquareIcon class="h-6" />
          Import
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
        <ArrowDownOnSquareIcon class="h-6" />
        Export
      </button>

      <label for="template">
        Template
        <select id="template" v-model="template" class="select block">
          <option v-for="template in templates" :key="template" class="option">
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
      <label for="documentType">
        Document
        <select
          id="documentType"
          v-model="documentType"
          class="select block capitalize"
        >
          <option
            v-for="documentType in documentTypes"
            :key="documentType"
            class="option"
          >
            {{ documentType }}
          </option>
        </select>
      </label>

      <button
        class="text-blue-500 flex items-center gap-1"
        @click="downloadPdf"
      >
        <ArrowDownOnSquareIcon class="h-6" />
        Download
      </button>
    </div>
  </header>
</template>
