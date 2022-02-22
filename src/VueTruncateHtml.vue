<template>
  <div class="vue-truncate-html">
    <div
      v-if="isHTML"
      :class="[classes.content, classes.contentHtml]"
      v-html="isTruncated ? truncatedHtmlOrText : text" />
    <div
      v-else
      :class="[classes.content, classes.contentText]">
      {{ isTruncated ? truncatedHtmlOrText : text }}
    </div>
    <button
      :class="[classes.button, isTruncated ? classes.buttonMore : classes.buttonLess]"
      @click.prevent="toggle">
      {{ isTruncated ? buttons.more : buttons.less }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import htmlTruncate from 'html-truncate';
import sanitizeHtml, { IOptions } from 'sanitize-html';

const [, HTML] = ['text', 'html'];

type Type = 'text' | 'html';

type Buttons = {
  more: string
  less: string
}

type Classes = {
  content: string
  contentHtml: string
  contentText: string
  button: string
  buttonMore: string
  buttonLess: string
}

export default defineComponent({
  name: 'VueTruncateHtml',
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: '',
    },
    length: {
      type: Number,
      default: 100,
    },
    type: {
      type: String as PropType<Type>,
      default: 'text',
    },
    buttons: {
      type: Object as PropType<Buttons>,
      default: () => ({
        more: 'Read More',
        less: 'Show Less',
      }),
    },
    classes: {
      type: Object as PropType<Classes>,
      default: () => ({
        content: 'vue-truncate-html__content',
        contentHtml: 'vue-truncate-html__content_html',
        contentText: 'vue-truncate-html__content_text',
        button: 'vue-truncate-html__button',
        buttonMore: 'vue-truncate-html__button_more',
        buttonLess: 'vue-truncate-html__button_less',
      }),
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

    const sanitizedHtmlOrText = computed(() => (
      isHTML.value
        ? sanitizeHtml(props.text, props.sanitizeOptions)
        : props.text
    ));
    const truncatedHtmlOrText = computed(() => (
      isHTML.value
        ? htmlTruncate(sanitizedHtmlOrText.value, props.length)
        : sanitizedHtmlOrText.value.substring(0, props.length)
    ));

    const toggle = () => {
      isTruncated.value = !isTruncated.value;
    };

    return {
      isTruncated, isHTML, textLength, truncatedHtmlOrText, toggle,
    };
  },
});
</script>
