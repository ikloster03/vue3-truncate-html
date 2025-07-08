<!-- eslint-disable vue/no-v-html -->
<template>
  <div :class="proxyClasses.container">
    <div
      v-if="isHTML"
      :class="[proxyClasses.content, proxyClasses.contentHtml]"
      v-html="sanitizedProxyText" />
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

// Безопасные настройки санитизации по умолчанию
const DEFAULT_SANITIZE_OPTIONS: IOptions = {
  allowedTags: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target'],
    '*': ['class', 'style'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: {
    a: ['http', 'https', 'mailto'],
  },
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
  enforceHtmlBoundary: true,
};

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
        // Базовая валидация на очень подозрительный контент
        if (typeof value !== 'string') return false;
        // Проверка на подозрительные скрипты
        const suspiciousPatterns = [
          /javascript:/i,
          /vbscript:/i,
          /data:text\/html/i,
          /on\w+\s*=/i, // onclick, onload, etc.
        ];

        return !suspiciousPatterns.some((pattern) => pattern.test(value));
      },
    },
    length: {
      type: Number,
      default: 100,
      validator: (value: number) => value > 0 && value <= 10000, // Ограничение на разумную длину
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

    const isHTML = computed(() => props.type === HTML);

    // Кешируем результат удаления HTML тегов для производительности
    const plainText = computed(() => {
      if (!isHTML.value) return props.text;

      try {
        // Более эффективное удаление HTML тегов с кешированием
        return props.text.replace(/<[^>]*>/g, '').trim();
      } catch {
        return '';
      }
    });

    const textLength = computed(() => plainText.value.length);

    const showButton = computed(() => !props.hideButton && textLength.value > props.length);

    // Всегда санитизируем контент, даже для текста (на случай если type изменится)
    const sanitizedText = computed(() => {
      try {
        if (isHTML.value) {
          return sanitizeHtml(props.text, props.sanitizeOptions);
        }

        // Для текста применяем базовую санитизацию для защиты от XSS
        return sanitizeHtml(props.text, {
          allowedTags: [],
          allowedAttributes: {},
          disallowedTagsMode: 'escape',
        });
      } catch {
        return '';
      }
    });

    const truncatedContent = computed(() => {
      try {
        if (isHTML.value) {
          return htmlTruncate(sanitizedText.value, props.length);
        }

        return sanitizedText.value.substring(0, props.length);
      } catch {
        return '';
      }
    });

    const proxyText = computed(() => (isTruncated.value ? truncatedContent.value : sanitizedText.value));

    // Дополнительная санитизация для v-html (двойная защита)
    const sanitizedProxyText = computed(() => {
      try {
        return sanitizeHtml(proxyText.value, props.sanitizeOptions);
      } catch {
        return '';
      }
    });

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
      sanitizedProxyText,
      buttonTitle,
      proxyClasses,
      toggle,
    };
  },
});
</script>
