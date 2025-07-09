<!-- eslint-disable vue/no-v-html -->
<template>
  <div :class="proxyClasses.container">
    <div
      v-if="processedContent.isHTML"
      :class="[proxyClasses.content, proxyClasses.contentHtml]"
      v-html="processedContent.displayText" />
    <div
      v-else
      :class="[proxyClasses.content, proxyClasses.contentText]">
      {{ processedContent.displayText }}
    </div>
    <slot>
      <button
        v-if="processedContent.showButton"
        :class="[proxyClasses.button, processedContent.buttonClass]"
        @click.prevent="toggle">
        {{ processedContent.buttonTitle }}
      </button>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue';
import { truncate } from 'html-truncate-ts';
import { IOptions } from 'sanitize-html';
import {
  Classes, Buttons, Type, ProcessedContent,
} from './types';
import {
  defaultClasses, defaultButtons, HTML, DEFAULT_SANITIZE_OPTIONS,
} from './const';
import { sanitizeWithCache, stripHtmlTags } from './utils';

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
      validator: (value: string) => {
        if (typeof value !== 'string') return false;
        const suspiciousPatterns = [
          /javascript:/i,
          /vbscript:/i,
          /data:text\/html/i,
          /on\w+\s*=/i,
        ];

        return !suspiciousPatterns.some((pattern) => pattern.test(value));
      },
    },
    length: {
      type: Number,
      default: 100,
      validator: (value: number) => value > 0 && value <= 10000,
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
      default: () => DEFAULT_SANITIZE_OPTIONS,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isTruncated = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    // Объединенное computed property для всей обработки контента
    const processedContent = computed((): ProcessedContent => {
      const isHTML = props.type === HTML;

      // Санитизация (единоразовая)
      const sanitizedText = sanitizeWithCache(props.text, props.sanitizeOptions, isHTML);

      // Определение длины текста
      const textLength = isHTML ? stripHtmlTags(sanitizedText).length : sanitizedText.length;

      // Показывать ли кнопку
      const showButton = !props.hideButton && textLength > props.length;

      // Обрезка контента
      let displayText: string;

      if (isTruncated.value) {
        if (isHTML) {
          displayText = truncate(sanitizedText, props.length);
        } else {
          displayText = sanitizedText.substring(0, props.length);
        }
      } else {
        displayText = sanitizedText;
      }

      // Заголовок кнопки
      const buttonTitle = isTruncated.value
        ? props.buttons.more ?? defaultButtons.more
        : props.buttons.less ?? defaultButtons.less;

      // Класс кнопки
      const buttonClass = isTruncated.value
        ? props.classes.buttonMore ?? defaultClasses.buttonMore
        : props.classes.buttonLess ?? defaultClasses.buttonLess;

      return {
        isHTML,
        displayText,
        showButton,
        buttonTitle,
        buttonClass,
      };
    });

    // Объединенное computed property для классов
    const proxyClasses = computed(() => ({
      container: props.classes.container ?? defaultClasses.container,
      content: props.classes.content ?? defaultClasses.content,
      contentHtml: props.classes.contentHtml ?? defaultClasses.contentHtml,
      contentText: props.classes.contentText ?? defaultClasses.contentText,
      button: props.classes.button ?? defaultClasses.button,
    }));

    const toggle = () => {
      isTruncated.value = !isTruncated.value;
    };

    return {
      processedContent,
      proxyClasses,
      toggle,
    };
  },
});
</script>
