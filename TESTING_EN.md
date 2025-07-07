> **Language:** [🇷🇺 Русский](./TESTING.md) | 🇺🇸 English

# 🧪 Testing Library Before Publishing

This document describes the process of testing the `vue3-truncate-html` library before publishing to NPM.

## 🚀 Quick Start

### Full pre-publish check
```bash
pnpm test:prepublish
```

### Create test project
```bash
pnpm test:project
cd test-vue-project
npm run dev
```

## 📋 Available Commands

### `pnpm test:pack`
Creates a `.tgz` package and shows its contents
```bash
pnpm test:pack
```

### `pnpm test:install`
Full installation and import testing
```bash
pnpm test:install
```

### `pnpm test:project`
Creates a complete Vue project for testing
```bash
pnpm test:project
```

### `pnpm test:prepublish`
Full pre-publish check
```bash
pnpm test:prepublish
```

## 🔍 What is Tested

### ✅ Automated Tests (`test:install`)
- **Library Build** - compilation without errors
- **Package Creation** - .tgz file correctness
- **Package Contents** - file verification in archive
- **CommonJS Import** - `require('vue3-truncate-html')`
- **ES Modules Import** - `import { VueTruncateHtml } from 'vue3-truncate-html'`
- **Vue Component** - application creation and setup
- **TypeScript Types** - type checking (if available)

### ✅ Interactive Tests (`test:project`)
- **Text Truncation** - basic functionality
- **HTML Truncation** - preserving tags during truncation
- **Reactivity** - v-model and state changes
- **Dynamic Content** - text changes
- **Custom Settings** - length, clamp, type
- **Visual Testing** - browser verification

## 📁 Test Project Structure

```
test-vue-project/
├── index.html          # HTML page
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies
└── src/
    ├── main.js         # Entry point
    └── App.vue         # Test component
```

## 🎯 Test Scenarios

### Test 1: Plain Text
- Long text truncation
- State toggling (collapsed/expanded)
- v-model reactivity check

### Test 2: HTML Markup
- HTML truncation with tag preservation
- Working with various HTML elements
- Security (sanitization)

### Test 3: Complex HTML
- Nested elements processing
- Working with block elements
- Custom clamp settings

### Test 4: Reactivity
- Dynamic content changes
- State preservation during changes
- Performance with frequent changes

## 🔧 Debugging

### Import Issues
```bash
# Check package contents
tar -tzf vue3-truncate-html-*.tgz

# Check exports in package.json
cat package.json | grep -A 10 "exports"
```

### Type Issues
```bash
# Check for .d.ts files
ls -la dist/*.d.ts

# Check typings in package.json
cat package.json | grep "typings"
```

### Vue Component Issues
```bash
# Run test project
pnpm test:project
cd test-vue-project
npm run dev

# Open browser and check console
open http://localhost:3000
```

## 📊 Pre-publish Checklist

### ✅ Code
- [ ] All tests pass (`pnpm test`)
- [ ] Linting without errors (`pnpm lint`)
- [ ] TypeScript check (`pnpm typecheck`)
- [ ] Build successful (`pnpm build:library`)

### ✅ Package
- [ ] Package size acceptable (`pnpm test:pack`)
- [ ] All necessary files included
- [ ] No unnecessary files in package

### ✅ Import
- [ ] CommonJS import works
- [ ] ES modules import works
- [ ] TypeScript types available
- [ ] Default export works

### ✅ Functionality
- [ ] Basic text truncation
- [ ] HTML markup truncation
- [ ] v-model reactivity
- [ ] All props work
- [ ] Events generated correctly

### ✅ Compatibility
- [ ] Works with Vue 3
- [ ] Works with Vite
- [ ] Works with TypeScript
- [ ] Works in browser

## 🚀 Publishing

After passing all tests:

```bash
# Final check
pnpm test:prepublish

# Publish
pnpm publish:library
```

## 🧹 Cleanup

```bash
# Remove temporary files
rm -rf test-temp test-vue-project
rm vue3-truncate-html-*.tgz
``` 
