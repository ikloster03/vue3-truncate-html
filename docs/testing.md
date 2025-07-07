---
title: Тестирование
---

# Тестирование

## Обзор

Библиотека `vue3-truncate-html` включает в себя комплексное тестирование для обеспечения стабильности и надежности компонента. Тесты написаны с использованием **Vitest** и **Vue Test Utils**.

## Структура тестов

Основные тесты находятся в файле `src/VueTruncateHtml.test.ts` и покрывают следующие сценарии:

### 1. Базовое монтирование компонента

```typescript
test('mounts without props', () => {
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true
    }
  })
  expect(wrapper.exists()).toBe(true)
})
```

### 2. Тестирование с текстом

```typescript
test('displays text correctly', () => {
  const text = 'Test text content'
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text,
      length: 50
    }
  })
  expect(wrapper.text()).toContain(text)
})
```

### 3. Тестирование с HTML

```typescript
test('renders HTML content', () => {
  const html = '<p><strong>Bold text</strong></p>'
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text: html,
      type: 'html'
    }
  })
  expect(wrapper.html()).toContain('<strong>Bold text</strong>')
})
```

### 4. Тестирование логики обрезки

```typescript
test('truncates long text', () => {
  const longText = 'A'.repeat(200)
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text: longText,
      length: 100
    }
  })
  
  const content = wrapper.find('.vue-truncate-html__content')
  expect(content.text().length).toBeLessThanOrEqual(100)
})
```

### 5. Тестирование кнопок

```typescript
test('shows/hides button based on text length', () => {
  const shortText = 'Short text'
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text: shortText,
      length: 100
    }
  })
  
  const button = wrapper.find('.vue-truncate-html__button')
  expect(button.exists()).toBe(false)
})
```

### 6. Тестирование пользовательских кнопок

```typescript
test('displays custom button text', () => {
  const customButtons = {
    more: 'Показать больше',
    less: 'Показать меньше'
  }
  
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text: 'A'.repeat(200),
      buttons: customButtons
    }
  })
  
  const button = wrapper.find('.vue-truncate-html__button')
  expect(button.text()).toBe('Показать больше')
})
```

## Запуск тестов

### Запуск всех тестов

```bash
npm test
```

### Запуск тестов в режиме наблюдения

```bash
npm run test:watch
```

### Генерация отчета о покрытии

```bash
npm run test:coverage
```

## Тестирование в вашем проекте

### Базовый тест компонента

```vue
<!-- MyComponent.vue -->
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
const text = ref('Long text content...')
</script>
```

```typescript
// MyComponent.test.ts
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  test('renders VueTruncateHtml component', () => {
    const wrapper = mount(MyComponent)
    
    const truncateComponent = wrapper.findComponent({ name: 'VueTruncateHtml' })
    expect(truncateComponent.exists()).toBe(true)
  })
  
  test('passes correct props to VueTruncateHtml', () => {
    const wrapper = mount(MyComponent)
    
    const truncateComponent = wrapper.findComponent({ name: 'VueTruncateHtml' })
    expect(truncateComponent.props('length')).toBe(100)
    expect(truncateComponent.props('text')).toBe('Long text content...')
  })
})
```

### Тестирование событий

```typescript
test('handles modelValue updates', async () => {
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text: 'A'.repeat(200),
      'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
    }
  })
  
  const button = wrapper.find('.vue-truncate-html__button')
  await button.trigger('click')
  
  expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
})
```

### Тестирование с пользовательскими стилями

```typescript
test('applies custom CSS classes', () => {
  const customClasses = {
    container: 'custom-container',
    content: 'custom-content',
    button: 'custom-button'
  }
  
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text: 'A'.repeat(200),
      classes: customClasses
    }
  })
  
  expect(wrapper.find('.custom-container').exists()).toBe(true)
  expect(wrapper.find('.custom-content').exists()).toBe(true)
  expect(wrapper.find('.custom-button').exists()).toBe(true)
})
```

## Рекомендации по тестированию

### 1. Тестируйте основные сценарии

- Монтирование компонента с различными props
- Корректное отображение текста и HTML
- Работа логики обрезки
- Функциональность кнопок

### 2. Проверяйте граничные случаи

- Пустой текст
- Очень длинный текст
- HTML с небезопасным содержимым
- Некорректные props

### 3. Тестируйте интеграцию

- Взаимодействие с родительскими компонентами
- Передача событий
- Реактивность данных

### 4. Используйте моки для внешних зависимостей

```typescript
// Мокирование html-truncate
vi.mock('html-truncate', () => ({
  default: vi.fn((text, length) => text.substring(0, length))
}))
```

## Continuous Integration

Для автоматического запуска тестов в CI/CD используйте следующую конфигурацию:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    - run: npm test
    - run: npm run test:coverage
```

## Отладка тестов

### Использование Vue DevTools

```typescript
import { config } from '@vue/test-utils'

// Включение Vue DevTools в тестах
config.global.config.devtools = true
```

### Отладка с помощью console.log

```typescript
test('debug component state', () => {
  const wrapper = mount(VueTruncateHtml, {
    props: { modelValue: true, text: 'test' }
  })
  
  console.log('Component HTML:', wrapper.html())
  console.log('Component props:', wrapper.props())
})
```

## Полезные ресурсы

- [Vue Test Utils документация](https://vue-test-utils.vuejs.org/)
- [Vitest документация](https://vitest.dev/)
- [Примеры тестов Vue 3](https://github.com/vuejs/vue-test-utils-next/tree/main/tests)

Качественное тестирование обеспечивает стабильность вашего приложения и упрощает поддержку кода в долгосрочной перспективе. 
