---
title: Getting started
---
# Getting started

## Install

```shell
npm i vue3-truncate-html
```

or

```shell
yarn add vue3-truncate-html
```


## Example

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
