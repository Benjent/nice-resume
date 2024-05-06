<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { fonts, templateBaseSettings, templateSettings } from "@/globals";
import { getSideIndexLabel } from "@/utils/editor";
import Button from "@/components/Button.vue";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";

// TODO factorize palette with resume

const { documentType } = storeToRefs(useEditorStore());

const { customColors, isThemeCustomized, template } =
  storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useLetterStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].letter;
});

const templateColors = computed(() => {
  return isThemeCustomized.value
    ? customColors.value
    : templateBaseSettings[template.value].colors;
});

function resetStyle() {
  storeSettings.value = templateSettings[template.value].letter;
}

function setCssVariable(name: string, value: string) {
  const root = document.querySelector(":root");
  // Rely on CSS variables to allow pseudo-element styling in templates
  (root as HTMLElement).style.setProperty(`--${name}`, value);
}

function setThemeColors() {
  templateColors.value.forEach((color, index) => {
    setCssVariable(`${documentType.value}-color${index}`, color);
  });
}

onMounted(() => {
  setThemeColors();
});

watch(
  [template, isThemeCustomized, templateColors],
  () => {
    setThemeColors();
  },
  { deep: true },
);
</script>

<template>
  <EditorCategory id="Customization" class="w-full">
    <template v-slot:header>Customization</template>
    <ul class="flex flex-col gap-10 mb-4">
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <div class="flex gap-5">
          <!-- TODO use nice toggle component -->
          <label class="cursor-pointer" for="isThemeCustomized">
            <input
              id="isThemeCustomized"
              class="input"
              type="checkbox"
              v-model="isThemeCustomized"
            />
            <span class="opacity-60">Use custom theme</span>
          </label>
          <Button v-if="isThemeCustomized" @click="resetStyle">
            Reset style
          </Button>
        </div>
      </li>
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <header>
          <div class="uppercase font-bold text-lg mb-5">Palette</div>
        </header>
        <div class="flex gap-5">
          <Field
            v-for="(_color, index) in templateColors"
            :key="index"
            :id="`color${index}`"
            type="color"
            label="Color"
            :disabled="!isThemeCustomized"
            v-model="templateColors[index]"
          />
        </div>
      </li>
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <header>
          <div class="uppercase font-bold text-lg mb-5">Document</div>
        </header>
        <div class="flex gap-5">
          <Field
            v-for="i in 4"
            :key="i"
            :id="`documentMargin${i}`"
            class="w-[20%]"
            type="number"
            :label="`Margin ${getSideIndexLabel(i)}`"
            :disabled="!isThemeCustomized"
            v-model="settings.document.margin[i - 1]"
          />
        </div>
        <div class="flex gap-5">
          <label class="flex flex-col" for="documentBodyFont">
            <span class="opacity-60">Font</span>
            <select
              id="documentBodyFont"
              class="select block"
              :disabled="!isThemeCustomized"
              v-model="settings.document.bodyFont"
            >
              <option v-for="font in fonts" :key="font" class="option">
                {{ font }}
              </option>
            </select>
          </label>
        </div>
      </li>
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <header>
          <div class="uppercase font-bold text-lg mb-5">Recipient</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <Field
              id="recipientDetailsColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.color"
            />
            <Field
              id="recipientDetailsFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.fontSize"
            />
            <Field
              id="recipientDetailsLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="recipientDetailsFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="recipientDetailsFontWeight"
                v-model="settings.recipientDetails.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="recipientDetailsIsItalic">
              <input
                id="recipientDetailsIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <Field
              id="recipientDetailsGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.gap"
            />
          </div>
          <div class="flex gap-5">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`recipientDetailsMargin${i}`"
              class="w-[20%]"
              type="number"
              :label="`Margin ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.margin[i - 1]"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`recipientDetailsBorder${i}`"
              class="w-[20%]"
              type="number"
              :label="`Border ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.border[i - 1]"
            />
            <Field
              id="recipientDetailsBorderColor"
              class="w-[20%]"
              type="color"
              label="Border color"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.borderColor"
            />
            <Field
              id="recipientDetailsBorderRadius"
              class="w-[20%]"
              type="number"
              label="Border radius"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.borderRadius"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`recipientDetailsPadding${i}`"
              class="w-[20%]"
              type="number"
              :label="`Padding ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.padding[i - 1]"
            />
            <Field
              id="recipientDetailsBackgroundColor"
              type="color"
              label="Background color"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.backgroundColor"
            />
          </div>
        </div>
      </li>
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <header>
          <div class="uppercase font-bold text-lg mb-5">Header</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <label for="headerIsCentered">
              <input
                id="headerIsCentered"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.header.isCentered"
              />
              <span class="opacity-60">Centered</span>
            </label>
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`headerMargin${i}`"
              class="w-[20%]"
              type="number"
              :label="`Margin ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.header.margin[i - 1]"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`headerBorder${i}`"
              class="w-[20%]"
              type="number"
              :label="`Border ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.header.border[i - 1]"
            />
            <Field
              id="headerBorderColor"
              type="color"
              label="Border color"
              :disabled="!isThemeCustomized"
              v-model="settings.header.borderColor"
            />
            <Field
              id="headerBorderRadius"
              class="w-[20%]"
              type="number"
              label="Border radius"
              :disabled="!isThemeCustomized"
              v-model="settings.header.borderRadius"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`headerPadding${i}`"
              class="w-[20%]"
              type="number"
              :label="`Padding ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.header.padding[i - 1]"
            />
            <Field
              id="headerBackgroundColor"
              type="color"
              label="Background color"
              :disabled="!isThemeCustomized"
              v-model="settings.header.backgroundColor"
            />
          </div>
        </div>
      </li>
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <header>
          <div class="uppercase font-bold text-lg mb-5">Subject</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <Field
              id="subjectColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.color"
            />
            <Field
              id="subjectFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.fontSize"
            />
            <Field
              id="subjectLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="subjectFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="subjectFontWeight"
                v-model="settings.subject.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="subjectIsItalic">
              <input
                id="subjectIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="subjectIsCentered">
              <input
                id="subjectIsCentered"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.isCentered"
              />
              <span class="opacity-60">Centered</span>
            </label>
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`subjectMargin${i}`"
              class="w-[20%]"
              type="number"
              :label="`Margin ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.margin[i - 1]"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`subjectBorder${i}`"
              class="w-[20%]"
              type="number"
              :label="`Border ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.border[i - 1]"
            />
            <Field
              id="subjectBorderColor"
              type="color"
              label="Border color"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.borderColor"
            />
            <Field
              id="subjectBorderRadius"
              class="w-[20%]"
              type="number"
              label="Border radius"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.borderRadius"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`subjectPadding${i}`"
              class="w-[20%]"
              type="number"
              :label="`Padding ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.padding[i - 1]"
            />
            <Field
              id="subjectBackgroundColor"
              type="color"
              label="Background color"
              :disabled="!isThemeCustomized"
              v-model="settings.subject.backgroundColor"
            />
          </div>
        </div>
      </li>
      <li class="border-b-2 border-white border-opacity-5 pb-12">
        <header>
          <div class="uppercase font-bold text-lg mb-5">Reference</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <Field
              id="referenceColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.color"
            />
            <Field
              id="referenceFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.fontSize"
            />
            <Field
              id="referenceLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="referenceFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="referenceFontWeight"
                v-model="settings.reference.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="referenceIsItalic">
              <input
                id="referenceIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="referenceIsCentered">
              <input
                id="referenceIsCentered"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.isCentered"
              />
              <span class="opacity-60">Centered</span>
            </label>
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`referenceMargin${i}`"
              class="w-[20%]"
              type="number"
              :label="`Margin ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.margin[i - 1]"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`referenceBorder${i}`"
              class="w-[20%]"
              type="number"
              :label="`Border ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.border[i - 1]"
            />
            <Field
              id="referenceBorderColor"
              type="color"
              label="Border color"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.borderColor"
            />
            <Field
              id="referenceBorderRadius"
              class="w-[20%]"
              type="number"
              label="Border radius"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.borderRadius"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`referencePadding${i}`"
              class="w-[20%]"
              type="number"
              :label="`Padding ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.padding[i - 1]"
            />
            <Field
              id="referenceBackgroundColor"
              type="color"
              label="Background color"
              :disabled="!isThemeCustomized"
              v-model="settings.reference.backgroundColor"
            />
          </div>
        </div>
      </li>
      <li>
        <header>
          <div class="uppercase font-bold text-lg mb-5">Body</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <Field
              id="bodyColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.body.color"
            />
            <Field
              id="bodyFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.body.fontSize"
            />
            <Field
              id="bodyLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.body.lineHeight"
              step="0.1"
            />
            <Field
              id="bodyIndentation"
              label="Indentation"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.body.indentation"
            />
            <label for="bodyIsJustified">
              <input
                id="bodyIsJustified"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.body.isJustified"
              />
              <span class="opacity-60">Justified</span>
            </label>
            <label for="bodyIsSignatureRightAligned">
              <input
                id="bodyIsSignatureRightAligned"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.body.isSignatureRightAligned"
              />
              <span class="opacity-60">Signature on the right</span>
            </label>
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`bodyMargin${i}`"
              class="w-[20%]"
              type="number"
              :label="`Margin ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.body.margin[i - 1]"
            />
          </div>
        </div>
        <Field
          id="bodyGap"
          label="Gap"
          type="number"
          :disabled="!isThemeCustomized"
          v-model="settings.body.gap"
        />
      </li>
    </ul>
  </EditorCategory>
</template>
