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
