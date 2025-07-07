---
title: Introduction
---

# vue3-truncate-html

[![npm version](https://badge.fury.io/js/vue3-truncate-html.svg)](https://badge.fury.io/js/vue3-truncate-html)
[![npm downloads](https://img.shields.io/npm/dw/vue3-truncate-html)](https://badge.fury.io/js/vue3-truncate-html)
[![NPM license](https://img.shields.io/npm/l/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html/blob/main/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html)

A simple Vue 3 component for HTML text truncation with expand/collapse functionality.

## Key Features

- ✅ **Text and HTML truncation** - supports both plain text and HTML markup
- ✅ **Reactivity** - uses v-model for state management
- ✅ **Security** - HTML sanitization to prevent XSS
- ✅ **TypeScript** - full TypeScript support
- ✅ **Lightweight** - minimal dependencies
- ✅ **Customizable** - multiple options for customization

## Quick Start

### Installation

```bash
npm install vue3-truncate-html
```

or

```bash
yarn add vue3-truncate-html
```

or

```bash
pnpm add vue3-truncate-html
```

### Basic Usage

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
const text = 'Very long text that needs to be truncated...'
</script>
```

## Examples

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from '../VueTruncateHtmlExample.vue'
</script>

## Documentation

- 📖 [Getting Started](/en/getting-started) - detailed installation and usage guide
- 📚 [API](/en/api) - complete description of all props, events and slots
- 🧪 [Testing](https://github.com/ikloster03/vue3-truncate-html/blob/main/TESTING_EN.md) - library testing guide
- 🚀 [Release Process](https://github.com/ikloster03/vue3-truncate-html/blob/main/.github/RELEASE_EN.md) - automated release process
- 🛡️ [Branch Protection](https://github.com/ikloster03/vue3-truncate-html/blob/main/.github/BRANCH_PROTECTION_EN.md) - mandatory PR checks setup

## Support

- 🐛 [Report a Bug](https://github.com/ikloster03/vue3-truncate-html/issues)
- 💡 [Suggest Enhancement](https://github.com/ikloster03/vue3-truncate-html/issues)
- 📦 [NPM Package](https://www.npmjs.com/package/vue3-truncate-html)

## License

MIT © [Ivan Monastyrev](https://github.com/ikloster03)
