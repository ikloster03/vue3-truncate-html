> **Language:** 🇷🇺 Русский | [🇺🇸 English](./TESTING_EN.md)

# 🧪 Тестирование библиотеки перед публикацией

Этот документ описывает процесс тестирования библиотеки `vue3-truncate-html` перед публикацией в NPM.

## 🚀 Быстрый старт

### Полная проверка перед публикацией
```bash
pnpm test:prepublish
```

### Создание тестового проекта
```bash
pnpm test:project
cd test-vue-project
npm run dev
```

## 📋 Доступные команды

### `pnpm test:pack`
Создает `.tgz` пакет и показывает его содержимое
```bash
pnpm test:pack
```

### `pnpm test:install`
Полное тестирование установки и импорта
```bash
pnpm test:install
```

### `pnpm test:project`
Создает полноценный Vue проект для тестирования
```bash
pnpm test:project
```

### `pnpm test:prepublish`
Полная проверка перед публикацией
```bash
pnpm test:prepublish
```

## 🔍 Что проверяется

### ✅ Автоматические тесты (`test:install`)
- **Сборка библиотеки** - компиляция без ошибок
- **Создание пакета** - корректность .tgz файла
- **Содержимое пакета** - проверка файлов в архиве
- **CommonJS импорт** - `require('vue3-truncate-html')`
- **ES модули импорт** - `import { VueTruncateHtml } from 'vue3-truncate-html'`
- **Vue компонент** - создание и настройка приложения
- **TypeScript типы** - проверка типов (если доступно)

### ✅ Интерактивные тесты (`test:project`)
- **Обрезка текста** - базовая функциональность
- **Обрезка HTML** - сохранение тегов при обрезке
- **Реактивность** - v-model и изменение состояния
- **Динамический контент** - изменение текста
- **Пользовательские настройки** - length, clamp, type
- **Визуальное тестирование** - проверка в браузере

## 📁 Структура тестового проекта

```
test-vue-project/
├── index.html          # HTML страница
├── vite.config.js      # Конфигурация Vite
├── package.json        # Зависимости проекта
└── src/
    ├── main.js         # Точка входа
    └── App.vue         # Тестовый компонент
```

## 🎯 Тестовые сценарии

### Тест 1: Обычный текст
- Обрезка длинного текста
- Переключение состояния (свернуто/развернуто)
- Проверка v-model реактивности

### Тест 2: HTML разметка
- Обрезка HTML с сохранением тегов
- Работа с различными HTML элементами
- Безопасность (санитизация)

### Тест 3: Сложный HTML
- Обработка вложенных элементов
- Работа с блочными элементами
- Кастомные настройки clamp

### Тест 4: Реактивность
- Динамическое изменение контента
- Сохранение состояния при изменении
- Производительность при частых изменениях

## 🔧 Отладка

### Проблемы с импортом
```bash
# Проверьте содержимое пакета
tar -tzf vue3-truncate-html-*.tgz

# Проверьте exports в package.json
cat package.json | grep -A 10 "exports"
```

### Проблемы с типами
```bash
# Проверьте наличие .d.ts файлов
ls -la dist/*.d.ts

# Проверьте typings в package.json
cat package.json | grep "typings"
```

### Проблемы с Vue компонентом
```bash
# Запустите тестовый проект
pnpm test:project
cd test-vue-project
npm run dev

# Откройте браузер и проверьте консоль
open http://localhost:3000
```

## 📊 Чек-лист перед публикацией

### ✅ Код
- [ ] Все тесты проходят (`pnpm test`)
- [ ] Линтинг без ошибок (`pnpm lint`)
- [ ] TypeScript проверка (`pnpm typecheck`)
- [ ] Сборка успешна (`pnpm build:library`)

### ✅ Пакет
- [ ] Размер пакета приемлемый (`pnpm test:pack`)
- [ ] Все необходимые файлы включены
- [ ] Нет лишних файлов в пакете

### ✅ Импорт
- [ ] CommonJS импорт работает
- [ ] ES модули импорт работает
- [ ] TypeScript типы доступны
- [ ] Default export работает

### ✅ Функциональность
- [ ] Базовая обрезка текста
- [ ] Обрезка HTML разметки
- [ ] v-model реактивность
- [ ] Все props работают
- [ ] События генерируются корректно

### ✅ Совместимость
- [ ] Работает с Vue 3
- [ ] Работает с Vite
- [ ] Работает с TypeScript
- [ ] Работает в браузере

## 🚀 Публикация

После прохождения всех тестов:

```bash
# Финальная проверка
pnpm test:prepublish

# Публикация
pnpm publish:library
```

## 🧹 Очистка

```bash
# Удаление временных файлов
rm -rf test-temp test-vue-project
rm vue3-truncate-html-*.tgz
``` 
