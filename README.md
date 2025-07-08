# vue3-truncate-html

> **Language:** 🇷🇺 Русский | [🇺🇸 English](./README_EN.md)

[![npm version](https://badge.fury.io/js/vue3-truncate-html.svg)](https://badge.fury.io/js/vue3-truncate-html)
[![npm downloads](https://img.shields.io/npm/dw/vue3-truncate-html)](https://badge.fury.io/js/vue3-truncate-html)
[![NPM license](https://img.shields.io/npm/l/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html/blob/main/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/vue3-truncate-html)](https://github.com/ikloster03/vue3-truncate-html)

Простой Vue 3 компонент для обрезки HTML-текста с возможностью развернуть/свернуть содержимое.

Подробная документация [здесь](https://vue3-truncate-html.ikloster.tech).

## 📚 Документация

- 🧪 [Тестирование библиотеки](./.github/TESTING.md) - полное руководство по тестированию перед публикацией
- 🚀 [Процесс релиза](./.github/RELEASE.md) - автоматизированный процесс создания релизов
- 🛡️ [Защита веток](./.github/BRANCH_PROTECTION.md) - настройка обязательных проверок для PR
- 🔒 [Безопасность](./.github/SECURITY_SETUP.md) - настройка автоматических проверок безопасности

## Установка

```shell
npm i vue3-truncate-html
```

или

```shell
yarn add vue3-truncate-html
```

или

```shell
pnpm add vue3-truncate-html
```

## Пример использования

```vue
<template>
  <div class="vue-truncate-html-example">
    <div class="vue-truncate-html-example__container">
      <h3>Обрезка обычного текста</h3>
      <vue-truncate-html
        v-model="isTruncated"
        :text="text" />
    </div>
    <div class="vue-truncate-html-example__container">
      <h3>Обрезка HTML-разметки</h3>
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

## Основные возможности

- ✅ **Обрезка текста и HTML** - поддержка обычного текста и HTML-разметки
- ✅ **Реактивность** - использует v-model для управления состоянием
- ✅ **Безопасность** - санитизация HTML для предотвращения XSS
- ✅ **TypeScript** - полная поддержка TypeScript
- ✅ **Легковесность** - минимальные зависимости
- ✅ **Настраиваемость** - множество опций для кастомизации

## API

### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|-------------|----------|
| `text` | `string` | `''` | Текст для обрезки |
| `type` | `'text' \| 'html'` | `'text'` | Тип контента |
| `length` | `number` | `100` | Максимальная длина |
| `clamp` | `string` | `'...'` | Символы для обрезки |

### Events

| Event | Тип | Описание |
|-------|-----|----------|
| `update:modelValue` | `(value: boolean) => void` | Изменение состояния развернуто/свернуто |

## Разработка

```bash
# Установка зависимостей
pnpm install

# Запуск тестов
pnpm test

# Линтинг
pnpm lint

# Проверка типов
pnpm typecheck

# Сборка библиотеки
pnpm build:library
```

## Лицензия

MIT © [Ivan Monastyrev](https://github.com/ikloster03)
