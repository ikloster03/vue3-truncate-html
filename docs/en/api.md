---
title: API
---
# vue3-truncate-html

## Props

| Prop              | Type              | Description                                | Accepted Values      | Default             |
| :---------------- | :---------------- | :----------------------------------------- | :------------------- | :------------------ |
| `modelValue`      | `boolean`         | Controls truncation state (required)       | `true` or `false`    | **required**        |
| `text`            | `string`          | Text or HTML to be truncated               | any string           | `''`                |
| `length`          | `number`          | Length of text after truncation            | any number           | `100`               |
| `hideButton`      | `boolean`         | Hide more/less button                      | `true` or `false`    | `false`             |
| `type`            | `string`          | Content type                               | `'text'` or `'html'` | `'text'`            |
| `buttons`         | `Buttons`         | Button text configuration                  | `Buttons` object     | `{ more: 'Read More', less: 'Show Less' }` |
| `classes`         | `Classes`         | CSS classes for customization              | `Classes` object     | see below           |
| `sanitizeOptions` | `IOptions`        | Options for HTML sanitization              | `IOptions` object    | `undefined`         |

### `Buttons` Type

```typescript
type Buttons = {
  more: string  // "Show more" button text
  less: string  // "Show less" button text
}
```

### `Classes` Type

```typescript
type Classes = {
  container: string      // Container class
  content: string        // Content class
  contentHtml: string    // HTML content class
  contentText: string    // Text content class
  button: string         // Button class
  buttonMore: string     // "More" button class
  buttonLess: string     // "Less" button class
}
```

### Default Classes

```typescript
const defaultClasses: Classes = {
  container: 'vue-truncate-html',
  content: 'vue-truncate-html__content',
  contentHtml: 'vue-truncate-html__content_html',
  contentText: 'vue-truncate-html__content_text',
  button: 'vue-truncate-html__button',
  buttonMore: 'vue-truncate-html__button_more',
  buttonLess: 'vue-truncate-html__button_less',
}
```

## Events

| Event               | Description                    | Parameters               |
| :------------------ | :----------------------------- | :----------------------- |
| `update:modelValue` | Triggered on state change      | `boolean` - new value    |

## Slots

| Slot      | Description                    | Scope |
| :-------- | :----------------------------- | :---- |
| `default` | Default slot for custom button | -     |

## Usage Examples

### Basic Text Example

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

### HTML Example

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
  <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
  <ul>
    <li><a href="https://example.com">Link</a> - description</li>
    <li>Second list item</li>
  </ul>
  <i>Italic text</i>
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
const text = "Long text..."
const customButtons = {
  more: 'Show full text',
  less: 'Collapse'
}
</script>
```

### Custom CSS Classes

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
const text = "Long text..."
const customClasses = {
  container: 'my-truncate',
  content: 'my-truncate__content',
  button: 'my-truncate__button',
  // ... other classes
}
</script>
```

### Custom Button with Slot

```vue
<template>
  <vue-truncate-html v-model="isTruncated" :text="text">
    <button 
      @click="isTruncated = !isTruncated"
      class="custom-button">
      {{ isTruncated ? '📖 Read more' : '📕 Collapse' }}
    </button>
  </vue-truncate-html>
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const text = "Long text..."
</script>
```

### HTML Sanitization

```vue
<template>
  <vue-truncate-html
    v-model="isTruncated"
    :text="unsafeHtml"
    type="html"
    :sanitize-options="sanitizeOptions" />
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const unsafeHtml = `
  <p>Safe content</p>
  <script>alert('Unsafe script')</script>
`

const sanitizeOptions = {
  allowedTags: ['p', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: {
    'a': ['href']
  }
}
</script>
```

## Interactive Example

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from '../VueTruncateHtmlExample.vue'
</script>
