<script setup lang="ts">
// @ts-expect-error TODO set up type of htmlevent
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import { useResumeStore } from "@/stores/resume";
import { type Category, type Experience } from "@/types";
import { moveDown, moveUp, remove } from "@/utils/array";
import EditorCategory from "./EditorCategory.vue";
import ListActions from "./ListActions.vue";
import type { Asset, Entry, Link } from "@/types";
import {
  assetTypes,
  categoryTypes,
  categoryLayouts,
  experienceTypes,
  socialIcons,
} from "@/globals";

const {
  about,
  address,
  categories,
  drivingLicense,
  email,
  name,
  phone,
  socialLinks,
  title,
} = storeToRefs(useResumeStore());

const types = ref<Category["type"][]>(categoryTypes);
const layouts = ref<Category["layout"][]>(categoryLayouts);

function addCategory() {
  const category: Category = {
    nature: "experience",
    type: "work",
    name: "Name",
    entries: [],
    layout: "full",
  };

  categories.value.push(category);
}

function addEntry(category: Category) {
  if (category.nature === "asset") {
    const asset: Asset = {
      nature: "asset",
      type: assetTypes.find((type) => category.type === type) || "skill",
      title: "",
      highlights: [],
    };

    category.entries.push(asset);
  } else {
    const experience: Experience = {
      nature: "experience",
      type: experienceTypes.find((type) => category.type === type) || "work",
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      location: "",
      summary: "",
      highlights: [],
    };

    category.entries.push(experience);
  }
}

function addSocialLink() {
  const link: Link = {
    icon: null,
    url: "",
  };

  socialLinks.value.push(link);
}

function changeSocialLinkIcon(link: Link, value: Link["icon"]) {
  link.icon = value;
}

function changeCategoryType(category: Category, value: Category["type"]) {
  category.type = value;
  // @ts-expect-error TODO which error?
  category.nature = assetTypes.includes(value) ? "asset" : "experience";
  category.entries = []; // Prevent inconsistency between previous and new entry types
}

function changeCategoryLayout(category: Category, value: Category["layout"]) {
  category.layout = value;
}

function getEntryTitleLabel(entry: Entry) {
  switch (entry.type) {
    case "education":
      return "Diploma";
    case "project":
    case "voluntary":
    case "work":
      return "Position";
    case "language":
      return "Language";
    default:
      return "Title";
  }
}

function getExperienceOrganizationLabel(experience: Experience) {
  switch (experience.type) {
    case "work":
      return "Company";
    case "education":
      return "Institution";
    case "project":
    case "voluntary":
      return "Organization";
  }
}
</script>

<template>
  <main class="flex flex-col overflow-y-auto text-white">
    <EditorCategory class="w-full">
      <template v-slot:header>Details</template>
      <div class="flex flex-col gap-5">
        <div class="flex justify-center gap-5 flex-wrap">
          <label class="flex flex-col flex-1" for="editorPersonalDetailsName">
            Name
            <input
              id="editorPersonalDetailsName"
              class="input"
              v-model="name"
            />
          </label>
          <label class="flex flex-col flex-1" for="editorPersonalDetailsTitle">
            Title
            <input
              id="editorPersonalDetailsTitle"
              class="input"
              v-model="title"
            />
          </label>
        </div>
        <label class="flex flex-col" for="editorAbout">
          About
          <textarea id="editorAbout" class="input" v-model="about" />
        </label>
        <div class="flex justify-center gap-5 flex-wrap">
          <label
            class="flex flex-col flex-[60%]"
            for="editorPersonalDetailsEmail"
          >
            Email
            <input
              id="editorPersonalDetailsEmail"
              class="input"
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
              class="input"
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
              class="input"
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
              class="input"
              v-model="drivingLicense"
            />
          </label>
        </div>
        <label class="flex flex-col" for="highlights">
          <div class="flex gap-2">
            Social links
            <button
              id="links"
              title="Add task"
              class="text-white size-6"
              @click="addSocialLink"
            >
              <PlusCircleIcon class="size-full" />
            </button>
          </div>
          <ul class="flex flex-col gap-2">
            <li
              v-for="(link, linkIndex) in socialLinks"
              :key="linkIndex"
              class="flex items-center gap-2"
            >
              <input
                class="bg-white bg-opacity-10 rounded px-2 py-1 flex-1"
                v-model="socialLinks[linkIndex].url"
              />
              <label for="linkIcon">
                Icon
                <select
                  id="linkIcon"
                  :value="link.icon"
                  @change="changeSocialLinkIcon(link, $event.target?.value)"
                  class="cursor-pointer bg-transparent text-white block capitalize"
                >
                  <!-- <option value="">None</option> -->
                  <option value="default">Default</option>
                  <option
                    v-for="icon in socialIcons"
                    :key="icon"
                    class="text-blue-500 capitalize"
                  >
                    {{ icon }}
                  </option>
                </select>
              </label>
              <button
                title="Remove"
                class="text-white size-6"
                @click="remove(socialLinks, linkIndex)"
              >
                <XCircleIcon class="size-full" />
              </button>
            </li>
          </ul>
        </label>
      </div>
    </EditorCategory>
    <EditorCategory
      class="w-full"
      v-for="(category, categoryIndex) in categories"
      :key="categoryIndex"
    >
      <template v-slot:header>
        <div class="flex items-baseline gap-8">
          <input class="input" v-model="category.name" />
          <label for="type">
            Type
            <select
              id="type"
              :value="category.type"
              @change="changeCategoryType(category, $event.target?.value)"
              class="cursor-pointer bg-transparent text-white block capitalize"
            >
              <option
                v-for="item in types"
                :key="item"
                class="text-blue-500 capitalize"
              >
                {{ item }}
              </option>
            </select>
          </label>
          <label for="layout">
            Layout
            <select
              id="layout"
              :value="category.layout"
              @change="changeCategoryLayout(category, $event.target?.value)"
              class="cursor-pointer bg-transparent text-white block capitalize"
            >
              <option
                v-for="item in layouts"
                :key="item"
                class="text-blue-500 capitalize"
              >
                {{ item }}
              </option>
            </select>
          </label>
        </div>
        <ListActions
          class="mb-2"
          :index="categoryIndex"
          :list-length="categories.length"
          @moveUp="moveUp(categories, categoryIndex)"
          @moveDown="moveDown(categories, categoryIndex)"
          @remove="remove(categories, categoryIndex)"
        />
      </template>
      <ul class="flex flex-col gap-10">
        <li v-for="(entry, entryIndex) in category.entries" :key="entryIndex">
          <ListActions
            class="mb-2"
            :index="entryIndex"
            :list-length="category.entries.length"
            @moveUp="moveUp(category.entries, entryIndex)"
            @moveDown="moveDown(category.entries, entryIndex)"
            @remove="remove(category.entries, entryIndex)"
          />
          <div class="flex flex-col gap-5">
            <label class="flex flex-col flex-1" for="title">
              {{ getEntryTitleLabel(entry) }}
              <input id="title" class="input" v-model="entry.title" />
            </label>
            <template v-if="entry.nature === 'experience'">
              <div class="flex justify-center gap-5 flex-wrap">
                <label class="flex flex-col flex-1" for="organization">
                  {{ getExperienceOrganizationLabel(entry) }}
                  <input
                    id="organization"
                    class="input"
                    v-model="entry.organization"
                  />
                </label>
                <label class="flex flex-col flex-[20%]" for="location">
                  Location
                  <input id="location" class="input" v-model="entry.location" />
                </label>
                <label class="flex flex-col flex-[10%]" for="startDate">
                  From
                  <input
                    id="startDate"
                    class="input"
                    v-model="entry.startDate"
                  />
                </label>
                <label class="flex flex-col flex-[10%]" for="endDate">
                  To
                  <input id="endDate" class="input" v-model="entry.endDate" />
                </label>
              </div>
              <label class="flex flex-col" for="summary">
                Description
                <textarea id="summary" class="input" v-model="entry.summary" />
              </label>
            </template>
            <label class="flex flex-col" for="highlights">
              <div class="flex gap-2">
                Highlights
                <button
                  id="highlights"
                  title="Add task"
                  class="text-white size-6"
                  @click="() => entry.highlights.push('')"
                >
                  <PlusCircleIcon class="size-full" />
                </button>
              </div>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(_task, taskIndex) in entry.highlights"
                  :key="taskIndex"
                  class="flex items-center gap-2"
                >
                  <input
                    class="bg-white bg-opacity-10 rounded px-2 py-1 flex-1"
                    v-model="entry.highlights[taskIndex]"
                  />
                  <button
                    title="Remove"
                    class="text-white size-6"
                    @click="remove(entry.highlights, taskIndex)"
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
        <button
          class="text-white px-3 py-2 rounded"
          @click="addEntry(category)"
        >
          Add entry
        </button>
      </footer>
    </EditorCategory>

    <footer class="flex justify-center mt-10">
      <button class="text-white px-3 py-2 rounded" @click="addCategory">
        Add category
      </button>
    </footer>
  </main>
</template>
