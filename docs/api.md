# vue3-truncate-html

| Prop              | Type              | Description                                | Accepted Values      | Default     |
| :---------------- | :---------------- | :----------------------------------------- | :------------------- | :---------- |
| `modelValue`      | boolean           | HTML's disabled attribute                  | `true` or `false`    | `false`     |
| `text`            | string            | The text or HTML that will be truncated    | -                    | `''`        |
| `length`          | number            | Length of the text or HTML after truncate. | -                    | `100`       |
| `type`            | string (Type)     | Text or html                               | `text` or `html`     | `text`      |
| `buttons`         | object (Buttons)  | Read More / Show Less                      | type `Buttons`       | <pre> { <br>    more: 'Read More', <br>    less: 'Show Less' <br> } </pre> |
| `classes`         | object (Classes)  | All css classes                            | type `Classes`       | <pre> { <br>    container: 'vue-truncate-html', <br>    content: 'vue-truncate-html__content', <br>    contentHtml: 'vue-truncate-html__content_html', <br>    contentText: 'vue-truncate-html__content_text', <br>    button: 'vue-truncate-html__button', <br>    buttonMore: 'vue-truncate-html__button_more', <br>    buttonLess: 'vue-truncate-html__button_less', <br> } </pre> |
| `sanitizeOptions` | object (IOptions) | Options for HTML sanitizing                | interface `IOptions` | [Show IOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/sanitize-html/index.d.ts#L54)     |

| Event               | Description               | Parameters    |
| :------------------ | :------------------------ | :------------ |
| `update:modelValue` | Triggered on button click |               |


```vue
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
```

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from './VueTruncateHtmlExample.vue'
</script>
