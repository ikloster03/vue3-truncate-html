---
title: API
---
# vue3-truncate-html

## Props

| Prop              | Type              | Description                                | Accepted Values      | Default     |
| :---------------- | :---------------- | :----------------------------------------- | :------------------- | :---------- |
| `modelValue`      | boolean           | Truncated model value                            | `true` or `false`    | `false`     |
| `text`            | string            | The text or HTML that will be truncated    | -                    | `''`        |
| `length`          | number            | Length of the text or HTML after truncate. | -                    | `100`       |
| `hideButton`      | boolean           | It can force hide button more/less         | `true` or `false`    | `false`     |
| `type`            | string (Type)     | Text or html                               | `text` or `html`     | `text`      |
| `buttons`         | object (Buttons)  | Read More / Show Less                      | type `Buttons`       | <pre> { <br>    more: 'Read More', <br>    less: 'Show Less' <br> } </pre> |
| `classes`         | object (Classes)  | All css classes                            | type `Classes`       | <pre> { <br>    container: 'vue-truncate-html', <br>    content: 'vue-truncate-html__content', <br>    contentHtml: 'vue-truncate-html__content_html', <br>    contentText: 'vue-truncate-html__content_text', <br>    button: 'vue-truncate-html__button', <br>    buttonMore: 'vue-truncate-html__button_more', <br>    buttonLess: 'vue-truncate-html__button_less', <br> } </pre> |
| `sanitizeOptions` | object (IOptions) | Options for HTML sanitizing                | interface `IOptions` | [Show IOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/sanitize-html/index.d.ts#L54)     |

## Events

| Event               | Description               | Parameters    |
| :------------------ | :------------------------ | :------------ |
| `update:modelValue` | Triggered on button click | `modelValue`  |

## Slots

| Slot      | Description                    |
| :-------- | :----------------------------- |
| `default` | Default slot for custom button |          

## Examples

```vue
<template>
  <div class="vue-truncate-html-example">
    <div class="vue-truncate-html-example__container">
      <vue-truncate-html
        v-model="isTruncated"
        :text="text" />
    </div>
    <div class="vue-truncate-html-example__container">
      <vue-truncate-html
        v-model="isTruncated2"
        type="html"
        :text="html" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { VueTruncateHtml } from 'vue3-truncate-html';

export default {
  name: 'VueTruncateHtmlExample',
  components: {
    VueTruncateHtml,
  },
  setup() {
    const isTruncated = ref(true);
    const isTruncated2 = ref(true);

    const text = `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Adipisci animi autem beatae consequuntur debitis delectus deleniti ducimus enim,
      facere hic id impedit labore laboriosam magni molestiae nemo non numquam officiis porro,
      quibusdam tempora totam vel voluptate voluptatem voluptatum. Ad adipisci architecto,
      beatae blanditiis corporis cumque dolor, eaque excepturi exercitationem magnam nihil optio perferendis perspiciatis qui quis,
      `;

    const html = `
      <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
      <ul>
        <li>
            <a href="https://google.com">Google.com</a>
            Adipisci animi autem beatae consequuntur debitis delectus deleniti ducimus enim,
        </li>
        <li>facere hic id impedit labore laboriosam magni molestiae nemo non numquam officiis porro,</li>
        <li>quibusdam tempora totam vel voluptate voluptatem voluptatum. Ad adipisci architecto,</li>
      </ul>
      <i>beatae blanditiis corporis cumque dolor</i>, eaque excepturi exercitationem magnam nihil optio perferendis perspiciatis qui quis,
    `;

    return {
      isTruncated, isTruncated2, text, html,
    };
  },
};
</script>

<style scoped>
.vue-truncate-html-example__container {
  padding: 15px;
  background-color: #f3f5f7;
}
.vue-truncate-html-example__container:first-child {
  margin-bottom: 30px;
}
</style>
```

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from '../VueTruncateHtmlExample.vue'
</script>
