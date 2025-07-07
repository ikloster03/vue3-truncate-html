---
title: API
---
# vue3-truncate-html

## Пропсы

| Пропс              | Тип              | Описание                                   | Разрешенные значения | Дефолтные значения |
| :---------------- | :---------------- | :----------------------------------------- | :------------------- | :------------------ |
| `modelValue`      | `boolean`         | Управляет состоянием усечения (обязательный) | `true` или `false`   | **обязательный**    |
| `text`            | `string`          | Текст или HTML, которые будут усечены      | любая строка         | `''`                |
| `length`          | `number`          | Длина текста после усечения                | любое число          | `100`               |
| `hideButton`      | `boolean`         | Скрыть кнопку больше/меньше                | `true` или `false`   | `false`             |
| `type`            | `string`          | Тип контента                               | `'text'` или `'html'` | `'text'`            |
| `buttons`         | `Buttons`         | Настройка текста кнопок                    | объект типа `Buttons` | `{ more: 'Read More', less: 'Show Less' }` |
| `classes`         | `Classes`         | CSS классы для кастомизации                | объект типа `Classes` | см. ниже            |
| `sanitizeOptions` | `IOptions`        | Опции для санитизации HTML                 | объект типа `IOptions` | `undefined`         |

### Тип `Buttons`

```typescript
type Buttons = {
  more: string  // Текст кнопки "Показать больше"
  less: string  // Текст кнопки "Показать меньше"
}
```

### Тип `Classes`

```typescript
type Classes = {
  container: string      // Класс контейнера
  content: string        // Класс контента
  contentHtml: string    // Класс HTML контента
  contentText: string    // Класс текстового контента
  button: string         // Класс кнопки
  buttonMore: string     // Класс кнопки "больше"
  buttonLess: string     // Класс кнопки "меньше"
}
```

### Дефолтные классы

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

## События

| Событие             | Описание                       | Параметры     |
| :------------------ | :----------------------------- | :------------ |
| `update:modelValue` | Запускается при изменении состояния | `boolean` - новое значение |

## Слоты

| Слот      | Описание                                      | Scope |
| :-------- | :-------------------------------------------- | :---- |
| `default` | Слот по умолчанию для пользовательской кнопки | -     |

## Примеры использования

### Базовый пример с текстом

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

### Пример с HTML

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
    <li><a href="https://example.com">Ссылка</a> - описание</li>
    <li>Второй элемент списка</li>
  </ul>
  <i>Курсивный текст</i>
`
</script>
```

### Кастомные кнопки

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
const text = "Длинный текст..."
const customButtons = {
  more: 'Показать полностью',
  less: 'Свернуть'
}
</script>
```

### Кастомные CSS классы

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
const text = "Длинный текст..."
const customClasses = {
  container: 'my-truncate',
  content: 'my-truncate__content',
  button: 'my-truncate__button',
  // ... остальные классы
}
</script>
```

### Пользовательская кнопка через слот

```vue
<template>
  <vue-truncate-html v-model="isTruncated" :text="text">
    <button 
      @click="isTruncated = !isTruncated"
      class="custom-button">
      {{ isTruncated ? '📖 Читать далее' : '📕 Свернуть' }}
    </button>
  </vue-truncate-html>
</template>

<script setup>
import { ref } from 'vue'
import { VueTruncateHtml } from 'vue3-truncate-html'

const isTruncated = ref(true)
const text = "Длинный текст..."
</script>
```

### Санитизация HTML

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
  <p>Безопасный контент</p>
  <script>alert('Небезопасный скрипт')</script>
`

const sanitizeOptions = {
  allowedTags: ['p', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: {
    'a': ['href']
  }
}
</script>
```

## Интерактивный пример

<VueTruncateHtmlExample />

<script setup>
import VueTruncateHtmlExample from './VueTruncateHtmlExample.vue'
</script>
