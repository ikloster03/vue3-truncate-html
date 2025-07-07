---
title: Вступление
---

# vue3-truncate-html

[![npm version](https://badge.fury.io/js/vue3-truncate-html.svg)](https://badge.fury.io/js/vue3-truncate-html)
[![npm downloads](https://img.shields.io/npm/dw/vue3-truncate-html)](https://badge.fury.io/js/vue3-truncate-html)
[![NPM license](https://img.shields.io/npm/l/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html/blob/main/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html)

Простой Vue 3 компонент для обрезки HTML-текста с возможностью развернуть/свернуть содержимое.

## Основные возможности

- ✅ **Обрезка текста и HTML** - поддержка обычного текста и HTML-разметки
- ✅ **Реактивность** - использует v-model для управления состоянием
- ✅ **Безопасность** - санитизация HTML для предотвращения XSS
- ✅ **TypeScript** - полная поддержка TypeScript
- ✅ **Легковесность** - минимальные зависимости
- ✅ **Настраиваемость** - множество опций для кастомизации

## Быстрый старт

### Установка

```bash
npm install vue3-truncate-html
```

или

```bash
yarn add vue3-truncate-html
```

или

```bash
pnpm add vue3-truncate-html
```

### Базовое использование

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
const text = 'Очень длинный текст, который нужно обрезать...'
</script>
```

## Примеры

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from './VueTruncateHtmlExample.vue'
</script>

## Документация

- 📖 [Быстрый старт](/getting-started) - подробное руководство по установке и использованию
- 📚 [API](/api) - полное описание всех пропсов, событий и слотов
- 🧪 [Тестирование](https://github.com/ikloster03/vue3-truncate-html/blob/main/TESTING.md) - руководство по тестированию библиотеки
- 🚀 [Процесс релиза](https://github.com/ikloster03/vue3-truncate-html/blob/main/.github/RELEASE.md) - автоматизированный процесс создания релизов
- 🛡️ [Защита веток](https://github.com/ikloster03/vue3-truncate-html/blob/main/.github/BRANCH_PROTECTION.md) - настройка обязательных проверок для PR

## Поддержка

- 🐛 [Сообщить об ошибке](https://github.com/ikloster03/vue3-truncate-html/issues)
- 💡 [Предложить улучшение](https://github.com/ikloster03/vue3-truncate-html/issues)
- 📦 [NPM пакет](https://www.npmjs.com/package/vue3-truncate-html)

## Лицензия

MIT © [Ivan Monastyrev](https://github.com/ikloster03)
