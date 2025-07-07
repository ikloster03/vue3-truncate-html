<!-- eslint-disable vue/no-v-html -->
<template>
  <div :class="proxyClasses.container">
    <div
      v-if="isHTML"
      :class="[proxyClasses.content, proxyClasses.contentHtml]"
      v-html="proxyText" />
    <div
      v-else
      :class="[proxyClasses.content, proxyClasses.contentText]">
      {{ proxyText }}
    </div>
    <slot>
      <button
        v-if="showButton"
        :class="[proxyClasses.button, proxyButtonClass]"
        @click.prevent="toggle">
        {{ buttonTitle }}
      </button>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import htmlTruncate from 'html-truncate';
import sanitizeHtml, { IOptions } from 'sanitize-html';
import { Classes, Buttons, Type } from './types';
import { defaultClasses, defaultButtons, HTML } from './const';

export default defineComponent({
  name: 'VueTruncateHtml',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    length: {
      type: Number,
      default: 100,
    },
    hideButton: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<Type>,
      default: 'text',
    },
    buttons: {
      type: Object as PropType<Buttons>,
      default: () => defaultButtons,
    },
    classes: {
      type: Object as PropType<Classes>,
      default: () => defaultClasses,
    },
    sanitizeOptions: {
      type: Object as PropType<IOptions>,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isTruncated = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const isHTML = computed(() => props.type === HTML);

    const textLength = computed(() => {
      const text = isHTML.value ? props.text.replace(/<[^>]*>/g, '') : props.text;

      return text.length;
    });

    const showButton = computed(() => !props.hideButton && textLength.value > props.length);

    const sanitizedHtmlOrText = computed(() => (isHTML.value
      ? sanitizeHtml(props.text, props.sanitizeOptions)
      : props.text));
    const truncatedHtmlOrText = computed(() => (
      isHTML.value
        ? htmlTruncate(sanitizedHtmlOrText.value, props.length)
        : sanitizedHtmlOrText.value.substring(0, props.length)
    ));

    const proxyText = computed(() => (isTruncated.value ? truncatedHtmlOrText.value : sanitizedHtmlOrText.value));

    const buttonTitle = computed(() => (
      isTruncated.value
        ? props.buttons.more ?? defaultButtons.more
        : props.buttons.less ?? defaultButtons.less
    ));

    const proxyClasses = computed(() => ({
      container: props.classes?.container ?? defaultClasses.container,
      content: props.classes?.content ?? defaultClasses.content,
      contentHtml: props.classes?.contentHtml ?? defaultClasses.contentHtml,
      contentText: props.classes?.contentText ?? defaultClasses.contentText,
      button: props.classes?.button ?? defaultClasses.button,
      buttonMore: props.classes?.buttonMore ?? defaultClasses.buttonMore,
      buttonLess: props.classes?.buttonLess ?? defaultClasses.buttonLess,
    }));

    const proxyButtonClass = computed(() => (isTruncated.value ? proxyClasses.value.buttonMore : proxyClasses.value.buttonLess));

    const toggle = () => {
      isTruncated.value = !isTruncated.value;
    };

    return {
      isHTML,
      showButton,
      proxyButtonClass,
      proxyText,
      buttonTitle,
      proxyClasses,
      toggle,
    };
  },
});
</script>
