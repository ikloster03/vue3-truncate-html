---
title: Getting Started
---

# Getting Started

## Installation

### npm

```bash
npm install vue3-truncate-html
```

### yarn

```bash
yarn add vue3-truncate-html
```

### pnpm

```bash
pnpm add vue3-truncate-html
```

## Setup

### Global Registration

```javascript
import { createApp } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const app = createApp({})

app.component('VueTruncateHtml', VueTruncateHtml)

app.mount('#app')
```

### Local Registration

```vue
<template>
  <vue-truncate-html
    v-model="isTruncated"
    :text="text"
    :length="150" />
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const text = `
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Adipisci animi autem beatae consequuntur debitis delectus deleniti ducimus enim,
  facere hic id impedit labore laboriosam magni molestiae nemo non numquam officiis porro,
  quibusdam tempora totam vel voluptate voluptatem voluptatum.
`
</script>
```

## Basic Examples

### Text Truncation

```vue
<template>
  <vue-truncate-html
    v-model="isTruncated"
    :text="text"
    :length="100" />
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const text = 'Long text that needs to be truncated...'
</script>
```

### HTML Truncation

```vue
<template>
  <vue-truncate-html
    v-model="isTruncated"
    :text="html"
    type="html"
    :length="200" />
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const html = `
  <p><strong>Bold text</strong> and <em>italic text</em></p>
  <ul>
    <li>First list item</li>
    <li>Second list item</li>
  </ul>
`
</script>
```

### Custom Buttons

```vue
<template>
  <vue-truncate-html
    v-model="isTruncated"
    :text="text"
    :buttons="customButtons" />
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const text = 'Long text...'
const customButtons = {
  more: 'Show full text',
  less: 'Collapse'
}
</script>
```

### Hide Button

```vue
<template>
  <vue-truncate-html
    v-model="isTruncated"
    :text="text"
    :hide-button="true" />
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const text = 'Short text'
</script>
```

### Custom Styling

```vue
<template>
  <vue-truncate-html
    v-model="isTruncated"
    :text="text"
    :classes="customClasses" />
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const text = 'Long text...'
const customClasses = {
  container: 'my-truncate',
  content: 'my-truncate__content',
  button: 'my-truncate__button btn btn-primary',
  buttonMore: 'my-truncate__button_more',
  buttonLess: 'my-truncate__button_less'
}
</script>

<style scoped>
.my-truncate {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}

.my-truncate__content {
  margin-bottom: 12px;
}

.my-truncate__button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.my-truncate__button:hover {
  background: #0056b3;
}
</style>
```

## Interactive Example

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from '../VueTruncateHtmlExample.vue'
</script>

## What's Next?

- Explore the [complete API](/en/api) for all available options
- Check out [testing examples](/en/testing) for your project
