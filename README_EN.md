# vue3-truncate-html

> **Language:** [🇷🇺 Русский](./README.md) | 🇺🇸 English

[![npm version](https://badge.fury.io/js/vue3-truncate-html.svg)](https://badge.fury.io/js/vue3-truncate-html)
[![npm downloads](https://img.shields.io/npm/dw/vue3-truncate-html)](https://badge.fury.io/js/vue3-truncate-html)
[![NPM license](https://img.shields.io/npm/l/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html/blob/main/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html)

Simple Vue 3 component for truncating HTML text with expand/collapse functionality.

More details [here](https://vue3-truncate-html.ikloster.tech).

## 📚 Documentation

- 🧪 [Testing Library](./.github/TESTING_EN.md) - complete guide for testing before publishing
- 🚀 [Release Process](./.github/RELEASE_EN.md) - automated release creation process
- 🛡️ [Branch Protection](./.github/BRANCH_PROTECTION_EN.md) - setting up required PR checks
- 🔒 [Security](./.github/SECURITY_SETUP_EN.md) - automated security checks setup

## Install

```shell
npm i vue3-truncate-html
```

or

```shell
yarn add vue3-truncate-html
```

or

```shell
pnpm add vue3-truncate-html
```

## Example

```vue
<template>
  <div class="vue-truncate-html-example">
    <div class="vue-truncate-html-example__container">
      <h3>Plain text truncation</h3>
      <vue-truncate-html
        v-model="isTruncated"
        :text="text" />
    </div>
    <div class="vue-truncate-html-example__container">
      <h3>HTML markup truncation</h3>
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
  margin-bottom: 30px;
}
</style>
```

## Features

- ✅ **Text & HTML truncation** - supports both plain text and HTML markup
- ✅ **Reactivity** - uses v-model for state management
- ✅ **Security** - HTML sanitization to prevent XSS
- ✅ **TypeScript** - full TypeScript support
- ✅ **Lightweight** - minimal dependencies
- ✅ **Customizable** - multiple options for customization

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `''` | Text to truncate |
| `type` | `'text' \| 'html'` | `'text'` | Content type |
| `length` | `number` | `100` | Maximum length |
| `clamp` | `string` | `'...'` | Truncation characters |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `update:modelValue` | `(value: boolean) => void` | Expanded/collapsed state change |

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Lint
pnpm lint

# Type check
pnpm typecheck

# Build library
pnpm build:library
```

## License

MIT © [Ivan Monastyrev](https://github.com/ikloster03) 
