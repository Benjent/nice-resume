<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useResumeStore } from "@/stores/resume";
import { type Category, type Experience } from "@/types";
import { moveDown, moveUp, remove } from "@/utils/array";
import { capitalize } from "@/utils/string";
import Button from "./Button.vue";
import EditorCategory from "./EditorCategory.vue";
import ListActions from "./ListActions.vue";
import type { Asset, Detail, Entry, Link } from "@/types";
import {
  assetTypes,
  categoryTypes,
  categoryLayouts,
  contactIcons,
  discouragedLayoutTemplates,
  experienceTypes,
  fixedLayoutTemplates,
  socialIcons,
} from "@/globals";

const {
  about,
  categories,
  contactDetails,
  name,
  socialLinks,
  template,
  title,
} = storeToRefs(useResumeStore());

const types = ref<Category["type"][]>(categoryTypes);
const layouts = ref<Category["layout"][]>(categoryLayouts);

const isLayoutDisabled = computed(() =>
  fixedLayoutTemplates.includes(template.value),
);

const isLayoutDiscouraged = computed(() => {
  const discouragedLayouts = discouragedLayoutTemplates[template.value];
  return categories.value.some((category) =>
    discouragedLayouts.includes(category.layout),
  );
});

const discouragedLayoutText = computed(() => {
  const isPlural = discouragedLayoutTemplates[template.value].length > 1;
  const layouts = discouragedLayoutTemplates[template.value].join(" and ");
  return `${capitalize(layouts)} ${isPlural ? "layouts are" : "layout is"} discouraged for this template.`;
});

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

function addContactDetail() {
  const detail: Detail = {
    icon: null,
    value: "",
  };

  contactDetails.value.push(detail);

  focusNextInput("#contactDetailsList input");
}

function addHighlight(entry: Entry) {
  entry.highlights.push("");

  focusNextInput("#highlightList input");
}

function addSocialLink() {
  const link: Link = {
    icon: null,
    url: "",
  };

  socialLinks.value.push(link);

  focusNextInput("#socialLinksList input");
}

function changeContactDetailIcon(detail: Detail, value: Detail["icon"]) {
  detail.icon = value;
}

function changeSocialLinkIcon(link: Link, value: Link["icon"]) {
  link.icon = value;
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

async function focusNextInput(selector: string) {
  await nextTick(); // Wait for the new input to be rendered before querying it
  const inputs = [...document.querySelectorAll(selector)];
  (inputs[inputs.length - 1] as HTMLInputElement).focus();
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
    <p
      v-if="isLayoutDisabled"
      class="sticky top-0 text-center p-2 bg-amber-500"
    >
      Category layouts are fixed for this template.
    </p>
    <p
      v-if="isLayoutDiscouraged"
      class="sticky top-0 text-center p-2 bg-amber-500"
    >
      {{ discouragedLayoutText }}
    </p>
    <div class="flex flex-col gap-8 p-8 w-full max-w-[860px] mx-auto">
      <EditorCategory class="w-full">
        <template v-slot:header>Details</template>
        <div class="flex flex-col gap-5">
          <div class="flex justify-center gap-5 flex-wrap">
            <label class="flex flex-col flex-1" for="detailsName">
              Name
              <input id="detailsName" class="input" v-model="name" />
            </label>
            <label class="flex flex-col flex-1" for="detailsTitle">
              Title
              <input id="detailsTitle" class="input" v-model="title" />
            </label>
          </div>
          <label class="flex flex-col" for="detailsAbout">
            About
            <textarea id="detailsAbout" class="input" v-model="about" />
          </label>
          <label class="flex flex-col" for="contactDetails">
            <div class="flex gap-2">
              Contact details
              <button
                title="Add detail"
                class="bg-blue-500 size-7 text-white rounded-full"
                @click="addContactDetail"
              >
                <PlusCircleIcon class="size-full" />
              </button>
            </div>
            <ul
              v-if="contactDetails.length"
              id="contactDetailsList"
              class="flex flex-col gap-2"
            >
              <li
                v-for="(detail, detailIndex) in contactDetails"
                :key="detailIndex"
                class="flex items-center gap-2"
              >
                <input
                  class="input"
                  v-model="contactDetails[detailIndex].value"
                  @keydown.enter.prevent="addContactDetail"
                />
                <label for="detailIcon">
                  Icon
                  <select
                    id="detailIcon"
                    :value="detail.icon"
                    @change="
                      changeContactDetailIcon(
                        detail,
                        ($event.target as HTMLInputElement)
                          .value as Detail['icon'],
                      )
                    "
                    class="select block capitalize bg-transparent text-white"
                  >
                    <option class="option" value="">None</option>
                    <option class="option">default</option>
                    <option
                      v-for="icon in contactIcons"
                      :key="icon as string"
                      class="option"
                    >
                      {{ icon }}
                    </option>
                  </select>
                </label>
                <ListActions
                  class="mb-2"
                  :index="detailIndex"
                  :list-length="contactDetails.length"
                  @moveUp="moveUp(contactDetails, detailIndex)"
                  @moveDown="moveDown(contactDetails, detailIndex)"
                  @remove="remove(contactDetails, detailIndex)"
                />
              </li>
            </ul>
          </label>
          <label class="flex flex-col" for="socialLinks">
            <div class="flex gap-2">
              Social links
              <button
                title="Add social link"
                class="bg-blue-500 size-7 text-white rounded-full"
                @click="addSocialLink"
              >
                <PlusCircleIcon class="size-full" />
              </button>
            </div>
            <ul
              v-if="socialLinks.length"
              id="socialLinksList"
              class="flex flex-col gap-2 justify-between"
            >
              <li
                v-for="(link, linkIndex) in socialLinks"
                :key="linkIndex"
                class="flex items-center gap-2"
              >
                <input
                  class="input"
                  v-model="socialLinks[linkIndex].url"
                  @keydown.enter.prevent="addSocialLink"
                />
                <label for="linkIcon">
                  Icon
                  <select
                    id="linkIcon"
                    :value="link.icon"
                    @change="
                      changeSocialLinkIcon(
                        link,
                        ($event.target as HTMLInputElement)
                          .value as Link['icon'],
                      )
                    "
                    class="select block capitalize bg-transparent text-white"
                  >
                    <option class="option" value="">None</option>
                    <option class="option">default</option>
                    <option
                      v-for="icon in socialIcons"
                      :key="icon as string"
                      class="option"
                    >
                      {{ icon }}
                    </option>
                  </select>
                </label>
                <ListActions
                  class="mb-2"
                  :index="linkIndex"
                  :list-length="socialLinks.length"
                  @moveUp="moveUp(socialLinks, linkIndex)"
                  @moveDown="moveDown(socialLinks, linkIndex)"
                  @remove="remove(socialLinks, linkIndex)"
                />
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
                    ($event.target as HTMLInputElement)
                      .value as Category['type'],
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
                    ($event.target as HTMLInputElement)
                      .value as Category['layout'],
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
                  <label class="flex flex-col flex-1" for="location">
                    Location
                    <input
                      id="location"
                      class="input"
                      v-model="entry.location"
                    />
                  </label>
                </div>
                <div class="flex justify-center gap-5 flex-wrap">
                  <label class="flex flex-col flex-1" for="startDate">
                    From
                    <input
                      id="startDate"
                      class="input"
                      v-model="entry.startDate"
                    />
                  </label>
                  <label class="flex flex-col flex-1" for="endDate">
                    To
                    <input id="endDate" class="input" v-model="entry.endDate" />
                  </label>
                </div>
                <label class="flex flex-col" for="summary">
                  Description
                  <textarea
                    id="summary"
                    class="input"
                    v-model="entry.summary"
                  />
                </label>
              </template>
              <label class="flex flex-col" for="highlights">
                <div class="flex gap-2">
                  Highlights
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
                  class="flex flex-col gap-2"
                >
                  <li
                    v-for="(_highlight, highlightIndex) in entry.highlights"
                    :key="highlightIndex"
                    class="flex items-center gap-2"
                  >
                    <input
                      class="input"
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
        <Button class="shadow-lg w-full" @click="addCategory">
          Add category
        </Button>
      </footer>
    </div>
  </main>
</template>
