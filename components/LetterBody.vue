<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";

const { isThemeCustomized, name, template } = storeToRefs(useProfileStore());

const {
  settings: storeSettings,
  paragraphs,
  recipientDetails,
  reference,
  subject,
} = storeToRefs(useLetterStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].letter;
});
</script>

<template>
  <ul
    v-if="recipientDetails.length"
    class="text-right self-end"
    :style="{
      fontSize: `${settings.recipientDetails.fontSize}px`,
      lineHeight: settings.recipientDetails.lineHeight,
      fontWeight: settings.recipientDetails.fontWeight,
      fontStyle: settings.recipientDetails.isItalic ? 'italic' : 'initial',
      color: settings.recipientDetails.color,
      backgroundColor: settings.recipientDetails.backgroundColor,
      marginTop: `${settings.recipientDetails.margin[0]}px`,
      marginRight: `${settings.recipientDetails.margin[1]}px`,
      marginBottom: `${settings.recipientDetails.margin[2]}px`,
      marginLeft: `${settings.recipientDetails.margin[3]}px`,
      borderTop: `solid ${settings.recipientDetails.borderColor} ${settings.recipientDetails.border[0]}px`,
      borderRight: `solid ${settings.recipientDetails.borderColor} ${settings.recipientDetails.border[1]}px`,
      borderBottom: `solid ${settings.recipientDetails.borderColor} ${settings.recipientDetails.border[2]}px`,
      borderLeft: `solid ${settings.recipientDetails.borderColor} ${settings.recipientDetails.border[3]}px`,
      paddingTop: `${settings.recipientDetails.padding[0]}px`,
      paddingRight: `${settings.recipientDetails.padding[1]}px`,
      paddingBottom: `${settings.recipientDetails.padding[2]}px`,
      paddingLeft: `${settings.recipientDetails.padding[3]}px`,
    }"
  >
    <li v-for="detail in recipientDetails" :key="detail">
      {{ detail }}
    </li>
  </ul>
  <!-- TODO allow invert between subject and reference CF OpenResume theme in prod -->
  <header
    :style="{
      alignSelf: settings.subject.isCentered ? 'center' : 'start',
      backgroundColor: settings.header.backgroundColor,
      marginTop: `${settings.header.margin[0]}px`,
      marginRight: `${settings.header.margin[1]}px`,
      marginBottom: `${settings.header.margin[2]}px`,
      marginLeft: `${settings.header.margin[3]}px`,
      borderTop: `solid ${settings.header.borderColor} ${settings.header.border[0]}px`,
      borderRight: `solid ${settings.header.borderColor} ${settings.header.border[1]}px`,
      borderBottom: `solid ${settings.header.borderColor} ${settings.header.border[2]}px`,
      borderLeft: `solid ${settings.header.borderColor} ${settings.header.border[3]}px`,
      paddingTop: `${settings.header.padding[0]}px`,
      paddingRight: `${settings.header.padding[1]}px`,
      paddingBottom: `${settings.header.padding[2]}px`,
      paddingLeft: `${settings.header.padding[3]}px`,
    }"
  >
    <h3
      v-if="subject"
      :style="{
        fontFamily: settings.subject.font,
        fontSize: `${settings.subject.fontSize}px`,
        lineHeight: settings.subject.lineHeight,
        fontWeight: settings.subject.fontWeight,
        fontStyle: settings.subject.isItalic ? 'italic' : 'initial',
        textTransform: settings.subject.isUppercase ? 'uppercase' : 'initial',
        textAlign: settings.subject.isCentered ? 'center' : 'left',
        color: settings.subject.color,
        backgroundColor: settings.subject.backgroundColor,
        marginTop: `${settings.subject.margin[0]}px`,
        marginRight: `${settings.subject.margin[1]}px`,
        marginBottom: `${settings.subject.margin[2]}px`,
        marginLeft: `${settings.subject.margin[3]}px`,
        borderTop: `solid ${settings.subject.borderColor} ${settings.subject.border[0]}px`,
        borderRight: `solid ${settings.subject.borderColor} ${settings.subject.border[1]}px`,
        borderBottom: `solid ${settings.subject.borderColor} ${settings.subject.border[2]}px`,
        borderLeft: `solid ${settings.subject.borderColor} ${settings.subject.border[3]}px`,
        paddingTop: `${settings.subject.padding[0]}px`,
        paddingRight: `${settings.subject.padding[1]}px`,
        paddingBottom: `${settings.subject.padding[2]}px`,
        paddingLeft: `${settings.subject.padding[3]}px`,
      }"
    >
      {{ subject }}
    </h3>
    <h4
      v-if="reference"
      :style="{
        fontSize: `${settings.reference.fontSize}px`,
        lineHeight: settings.reference.lineHeight,
        fontWeight: settings.reference.fontWeight,
        fontStyle: settings.reference.isItalic ? 'italic' : 'initial',
        textAlign: settings.reference.isCentered ? 'center' : 'left',
        color: settings.reference.color,
        backgroundColor: settings.reference.backgroundColor,
        marginTop: `${settings.reference.margin[0]}px`,
        marginRight: `${settings.reference.margin[1]}px`,
        marginBottom: `${settings.reference.margin[2]}px`,
        marginLeft: `${settings.reference.margin[3]}px`,
        borderTop: `solid ${settings.reference.borderColor} ${settings.reference.border[0]}px`,
        borderRight: `solid ${settings.reference.borderColor} ${settings.reference.border[1]}px`,
        borderBottom: `solid ${settings.reference.borderColor} ${settings.reference.border[2]}px`,
        borderLeft: `solid ${settings.reference.borderColor} ${settings.reference.border[3]}px`,
        paddingTop: `${settings.reference.padding[0]}px`,
        paddingRight: `${settings.reference.padding[1]}px`,
        paddingBottom: `${settings.reference.padding[2]}px`,
        paddingLeft: `${settings.reference.padding[3]}px`,
      }"
    >
      {{ reference }}
    </h4>
  </header>
  <section
    :style="{
      fontSize: `${settings.body.fontSize}px`,
      lineHeight: settings.body.lineHeight,
      fontWeight: settings.body.fontWeight,
      textAlign: settings.body.isJustified ? 'justify' : 'left',
      color: settings.body.color,
      marginTop: `${settings.body.margin[0]}px`,
      marginRight: `${settings.body.margin[1]}px`,
      marginBottom: `${settings.body.margin[2]}px`,
      marginLeft: `${settings.body.margin[3]}px`,
    }"
  >
    <p
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      :style="{
        marginBottom: `${settings.body.gap}px`,
      }"
    >
      <span
        v-if="settings.body.indentation"
        class="inline-block"
        :style="{ width: `${settings.body.indentation}px` }"
      />
      {{ paragraph }}
    </p>
    <p
      :style="{
        textAlign: settings.body.isSignatureRightAligned ? 'right' : 'left',
      }"
    >
      <span
        v-if="settings.body.indentation"
        class="inline-block"
        :style="{ width: `${settings.body.indentation}px` }"
      />
      {{ name }}
    </p>
  </section>
</template>
