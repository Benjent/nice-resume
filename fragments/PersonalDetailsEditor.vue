<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import type { Detail, Link } from "@/types";
import { contactIcons, socialIcons } from "@/globals";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { name, title } = storeToRefs(useProfileStore());

const { about, contactDetails, socialLinks } = storeToRefs(useResumeStore());

function addContactDetail() {
  const detail: Detail = {
    icon: null,
    value: "",
  };

  contactDetails.value.push(detail);

  focusNextInput("#contactDetailList input");
}

function addSocialLink() {
  const link: Link = {
    icon: null,
    url: "",
  };

  socialLinks.value.push(link);

  focusNextInput("#socialLinkList input");
}

function changeContactDetailIcon(detail: Detail, value: Detail["icon"]) {
  detail.icon = value;
}

function changeSocialLinkIcon(link: Link, value: Link["icon"]) {
  link.icon = value;
}
</script>

<template>
  <EditorCategory id="Details" class="w-full">
    <template v-slot:header>Details</template>
    <div class="flex flex-col gap-5">
      <div class="flex justify-center gap-5 flex-wrap">
        <label class="flex flex-col flex-1" for="detailsName">
          <span class="opacity-60">Name</span>
          <input id="detailsName" class="input" v-model="name" />
        </label>
        <label class="flex flex-col flex-1" for="detailsTitle">
          <span class="opacity-60">Title</span>
          <input id="detailsTitle" class="input" v-model="title" />
        </label>
      </div>
      <label class="flex flex-col" for="detailsAbout">
        <span class="opacity-60">About</span>
        <textarea id="detailsAbout" class="input" v-model="about" />
      </label>
      <label class="flex flex-col" for="contactDetails">
        <div class="flex gap-2">
          <span class="opacity-60">Contact details</span>
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
          id="contactDetailList"
          class="inputList"
        >
          <li
            v-for="(detail, detailIndex) in contactDetails"
            :key="detailIndex"
            class="inputListItem"
          >
            <div class="flex w-[70%] gap-3 items-end">
              <input
                class="input flex-1"
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
            </div>
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
          <span class="opacity-60">Social links</span>
          <button
            title="Add social link"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addSocialLink"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul v-if="socialLinks.length" id="socialLinkList" class="inputList">
          <li
            v-for="(link, linkIndex) in socialLinks"
            :key="linkIndex"
            class="inputListItem"
          >
            <div class="flex w-[70%] gap-3 items-end">
              <input
                class="input flex-1"
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
                      ($event.target as HTMLInputElement).value as Link['icon'],
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
            </div>
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
</template>
