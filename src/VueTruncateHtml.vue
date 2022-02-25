<template>
  <div :class="classes.container">
    <div
      v-if="isHTML"
      :class="[classes.content, classes.contentHtml]"
      v-html="isTruncated ? truncatedHtmlOrText : text" />
    <div
      v-else
      :class="[classes.content, classes.contentText]">
      {{ isTruncated ? truncatedHtmlOrText : text }}
    </div>
    <slot>
      <button
        v-if="showButton"
        :class="[classes.button, isTruncated ? classes.buttonMore : classes.buttonLess]"
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

type Type = 'text' | 'html';

type Buttons = {
  more: string
  less: string
}

type Classes = {
  container: string
  content: string
  contentHtml: string
  contentText: string
  button: string
  buttonMore: string
  buttonLess: string
}

const [, HTML] = ['text', 'html'];

const defaultClasses: Classes = {
  container: 'vue-truncate-html',
  content: 'vue-truncate-html__content',
  contentHtml: 'vue-truncate-html__content_html',
  contentText: 'vue-truncate-html__content_text',
  button: 'vue-truncate-html__button',
  buttonMore: 'vue-truncate-html__button_more',
  buttonLess: 'vue-truncate-html__button_less',
};

const defaultButtons: Buttons = {
  more: 'Read More',
  less: 'Show Less',
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

    const buttonTitle = computed(() => (isTruncated.value ? props.buttons.more ?? defaultButtons.more : props.buttons.less ?? defaultButtons.less));

    const toggle = () => {
      isTruncated.value = !isTruncated.value;
    };

    return {
      isTruncated,
      isHTML,
      textLength,
      showButton,
      truncatedHtmlOrText,
      buttonTitle,
      toggle,
    };
  },
});
</script>
