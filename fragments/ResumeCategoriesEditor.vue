<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import type { Asset, Category, Entry, Experience } from "@/types";
import {
  assetTypes,
  categoryTypes,
  categoryLayouts,
  experienceTypes,
  fixedLayoutTemplates,
} from "@/globals";
import Button from "@/components/Button.vue";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { template } = storeToRefs(useProfileStore());

const { categories } = storeToRefs(useResumeStore());

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

function addHighlight(entry: Entry) {
  entry.highlights.push("");

  focusNextInput("#highlightList input");
}

function changeCategoryType(category: Category, value: Category["type"]) {
  category.type = value;
  category.nature = (assetTypes as string[]).includes(value)
    ? "asset"
    : "experience";
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
  <EditorCategory
    class="w-full"
    v-for="(category, categoryIndex) in categories"
    :key="categoryIndex"
    :id="category.name"
  >
    <template v-slot:header>
      <div class="flex items-baseline gap-8">
        <label for="name">
          Category name
          <input
            id="name"
            class="input text-blue-500 block bg-blue-700 bg-opacity-5"
            v-model="category.name"
          />
        </label>
        <label for="type">
          Type
          <select
            id="type"
            :value="category.type"
            @change="
              changeCategoryType(
                category,
                ($event.target as HTMLInputElement).value as Category['type'],
              )
            "
            class="select block capitalize px-2 py-1 pl-0"
          >
            <option v-for="item in types" :key="item" class="option">
              {{ item }}
            </option>
          </select>
        </label>
        <label for="layout">
          Layout
          <select
            id="layout"
            :disabled="fixedLayoutTemplates.includes(template)"
            :value="category.layout"
            @change="
              changeCategoryLayout(
                category,
                ($event.target as HTMLInputElement).value as Category['layout'],
              )
            "
            class="select block capitalize px-2 py-1 pl-0 disabled:cursor-not-allowed"
          >
            <option v-for="item in layouts" :key="item" class="option">
              {{ item }}
            </option>
          </select>
        </label>
      </div>
      <ListActions
        :index="categoryIndex"
        :list-length="categories.length"
        @moveUp="moveUp(categories, categoryIndex)"
        @moveDown="moveDown(categories, categoryIndex)"
        @remove="remove(categories, categoryIndex)"
      />
    </template>
    <ul v-if="category.entries.length" class="flex flex-col gap-10 mb-4">
      <li
        v-for="(entry, entryIndex) in category.entries"
        :key="entryIndex"
        class="border-b-2 border-white border-opacity-5 pb-12"
      >
        <header class="flex items-center justify-between">
          <div class="uppercase font-bold text-lg mb-5">
            Entry #{{ entryIndex + 1 }}
          </div>
          <ListActions
            class="mb-2"
            :index="entryIndex"
            :list-length="category.entries.length"
            @moveUp="moveUp(category.entries, entryIndex)"
            @moveDown="moveDown(category.entries, entryIndex)"
            @remove="remove(category.entries, entryIndex)"
          />
        </header>
        <div class="flex flex-col gap-5">
          <label class="flex flex-col flex-1" for="title">
            <span class="opacity-60">
              {{ getEntryTitleLabel(entry) }}
            </span>
            <input id="title" class="input" v-model="entry.title" />
          </label>
          <template v-if="entry.nature === 'experience'">
            <div class="flex justify-center gap-5 flex-wrap">
              <label class="flex flex-col flex-1" for="organization">
                <span class="opacity-60">
                  {{ getExperienceOrganizationLabel(entry) }}
                </span>
                <input
                  id="organization"
                  class="input"
                  v-model="entry.organization"
                />
              </label>
              <label class="flex flex-col flex-1" for="location">
                <span class="opacity-60">Location</span>
                <input id="location" class="input" v-model="entry.location" />
              </label>
            </div>
            <div class="flex justify-center gap-5 flex-wrap">
              <label class="flex flex-col flex-1" for="startDate">
                <span class="opacity-60">From</span>
                <input id="startDate" class="input" v-model="entry.startDate" />
              </label>
              <label class="flex flex-col flex-1" for="endDate">
                <span class="opacity-60">To</span>
                <input id="endDate" class="input" v-model="entry.endDate" />
              </label>
            </div>
            <label class="flex flex-col" for="summary">
              <span class="opacity-60">Description</span>
              <textarea id="summary" class="input" v-model="entry.summary" />
            </label>
          </template>
          <label class="flex flex-col" for="highlights">
            <div class="flex gap-2">
              <span class="opacity-60">Highlights</span>
              <button
                id="highlights"
                title="Add highlight"
                class="text-white bg-blue-500 rounded-full size-7"
                @click="addHighlight(entry)"
              >
                <PlusCircleIcon class="size-full" />
              </button>
            </div>
            <ul
              v-if="entry.highlights.length"
              id="highlightList"
              class="inputList"
            >
              <li
                v-for="(_highlight, highlightIndex) in entry.highlights"
                :key="highlightIndex"
                class="inputListItem"
              >
                <input
                  class="input w-[70%]"
                  v-model="entry.highlights[highlightIndex]"
                  @keydown.enter.prevent="addHighlight(entry)"
                />
                <ListActions
                  class="mb-2"
                  :index="highlightIndex"
                  :list-length="entry.highlights.length"
                  @moveUp="moveUp(entry.highlights, highlightIndex)"
                  @moveDown="moveDown(entry.highlights, highlightIndex)"
                  @remove="remove(entry.highlights, highlightIndex)"
                />
              </li>
            </ul>
          </label>
        </div>
      </li>
    </ul>
    <footer class="flex justify-center">
      <Button @click="addEntry(category)">Add entry</Button>
    </footer>
  </EditorCategory>

  <footer class="flex justify-center">
    <Button class="shadow-lg w-full" @click="addCategory">Add category</Button>
  </footer>
</template>
