---
title: Testing
---

# Testing

## Overview

The `vue3-truncate-html` library includes comprehensive testing to ensure component stability and reliability. Tests are written using **Vitest** and **Vue Test Utils**.

## Test Structure

The main tests are located in `src/VueTruncateHtml.test.ts` and cover the following scenarios:

### 1. Basic Component Mounting

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

### 2. Text Testing

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

### 3. HTML Testing

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

### 4. Truncation Logic Testing

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

### 5. Button Testing

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

### 6. Custom Button Testing

```typescript
test('displays custom button text', () => {
  const customButtons = {
    more: 'Show more',
    less: 'Show less'
  }
  
  const wrapper = mount(VueTruncateHtml, {
    props: {
      modelValue: true,
      text: 'A'.repeat(200),
      buttons: customButtons
    }
  })
  
  const button = wrapper.find('.vue-truncate-html__button')
  expect(button.text()).toBe('Show more')
})
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

## Testing in Your Project

### Basic Component Test

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

### Event Testing

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

### Custom Styling Tests

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

## Testing Recommendations

### 1. Test Core Scenarios

- Component mounting with various props
- Correct text and HTML rendering
- Truncation logic functionality
- Button functionality

### 2. Test Edge Cases

- Empty text
- Very long text
- HTML with unsafe content
- Invalid props

### 3. Test Integration

- Interaction with parent components
- Event passing
- Data reactivity

### 4. Use Mocks for External Dependencies

```typescript
// Mocking html-truncate
vi.mock('html-truncate', () => ({
  default: vi.fn((text, length) => text.substring(0, length))
}))
```

## Continuous Integration

For automatic test execution in CI/CD, use the following configuration:

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

## Test Debugging

### Using Vue DevTools

```typescript
import { config } from '@vue/test-utils'

// Enable Vue DevTools in tests
config.global.config.devtools = true
```

### Debugging with console.log

```typescript
test('debug component state', () => {
  const wrapper = mount(VueTruncateHtml, {
    props: { modelValue: true, text: 'test' }
  })
  
  console.log('Component HTML:', wrapper.html())
  console.log('Component props:', wrapper.props())
})
```

## Useful Resources

- [Vue Test Utils Documentation](https://vue-test-utils.vuejs.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Vue 3 Testing Examples](https://github.com/vuejs/vue-test-utils-next/tree/main/tests)

Quality testing ensures application stability and simplifies long-term code maintenance. 
