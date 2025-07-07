---
title: Быстрый старт
---

# Быстрый старт

## Установка

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

## Подключение

### Глобальная регистрация

```javascript
import { createApp } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const app = createApp({})

app.component('VueTruncateHtml', VueTruncateHtml)

app.mount('#app')
```

### Локальная регистрация

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

## Базовые примеры

### Обрезка текста

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
const text = 'Длинный текст, который нужно обрезать...'
</script>
```

### Обрезка HTML

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
  <p><strong>Жирный текст</strong> и <em>курсивный текст</em></p>
  <ul>
    <li>Первый элемент списка</li>
    <li>Второй элемент списка</li>
  </ul>
`
</script>
```

### Пользовательские кнопки

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
const text = 'Длинный текст...'
const customButtons = {
  more: 'Показать полностью',
  less: 'Скрыть'
}
</script>
```

### Скрытие кнопки

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
const text = 'Короткий текст'
</script>
```

### Пользовательский стиль

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
const text = 'Длинный текст...'
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

## Интерактивный пример

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from './VueTruncateHtmlExample.vue'
</script>

## Что дальше?

- Изучите [полное API](/api) для всех доступных опций
- Посмотрите [примеры тестирования](/testing) для вашего проекта
