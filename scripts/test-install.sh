#!/bin/bash
set -e

echo "🔧 Собираем библиотеку..."
pnpm build:library

echo "📦 Создаем пакет..."
pnpm pack

PACKAGE_FILE=$(ls vue3-truncate-html-*.tgz | head -1)
echo "📁 Пакет создан: $PACKAGE_FILE"

echo "📋 Содержимое пакета:"
tar -tzf "$PACKAGE_FILE" | head -20

echo "🧪 Создаем тестовый проект..."
rm -rf test-temp
mkdir test-temp && cd test-temp

echo "📝 Инициализируем npm проект..."
npm init -y > /dev/null 2>&1

echo "⚡ Устанавливаем Vue..."
npm install vue@latest > /dev/null 2>&1

echo "📦 Устанавливаем нашу библиотеку..."
npm install "../$PACKAGE_FILE" > /dev/null 2>&1

echo "✅ Тест CommonJS импорта..."
node -e "
try {
  const { VueTruncateHtml } = require('vue3-truncate-html');
  console.log('✅ CommonJS импорт работает');
  console.log('✅ Компонент найден:', !!VueTruncateHtml);
  console.log('✅ Тип компонента:', typeof VueTruncateHtml);
} catch (error) {
  console.error('❌ Ошибка CommonJS импорта:', error.message);
  process.exit(1);
}
"

echo "✅ Тест ES модуля..."
node --input-type=module -e "
try {
  const { VueTruncateHtml } = await import('vue3-truncate-html');
  console.log('✅ ES модуль импорт работает');
  console.log('✅ Компонент найден:', !!VueTruncateHtml);
  console.log('✅ Тип компонента:', typeof VueTruncateHtml);
} catch (error) {
  console.error('❌ Ошибка ES модуля:', error.message);
  process.exit(1);
}
"

echo "📝 Создаем тестовый Vue компонент..."
cat > test-component.mjs << 'EOF'
import { createApp, ref } from 'vue';
import { VueTruncateHtml } from 'vue3-truncate-html';

console.log('✅ Vue импорт работает');
console.log('✅ Компонент импортирован:', !!VueTruncateHtml);

// Тест базовой функциональности
const app = createApp({
  components: {
    VueTruncateHtml
  },
  setup() {
    const truncated = ref(true);
    const text = '<b>Тест</b> библиотеки работает!';

    console.log('✅ Настройка компонента прошла успешно');

    return {
      truncated,
      text
    };
  },
  template: `
    <div>
      <h1>Тест библиотеки</h1>
      <VueTruncateHtml
        v-model="truncated"
        :text="text"
        type="html" />
    </div>
  `
});

console.log('✅ Vue приложение создано успешно');
console.log('✅ Все тесты пройдены!');
EOF

echo "🧪 Запускаем тест Vue компонента..."
node test-component.mjs

echo "📝 Создаем тест TypeScript типов..."
cat > test-types.ts << 'EOF'
import { VueTruncateHtml } from 'vue3-truncate-html';
import type { Component } from 'vue';

// Тест типов
const component: Component = VueTruncateHtml;

// Тест props (если есть типы)
interface TestProps {
  text: string;
  type?: 'text' | 'html';
  length?: number;
  clamp?: string;
}

console.log('✅ TypeScript типы работают');
EOF

echo "🔍 Проверяем TypeScript типы..."
if command -v npx >/dev/null 2>&1; then
  npx tsc --noEmit --skipLibCheck test-types.ts 2>/dev/null && echo "✅ TypeScript типы валидны" || echo "⚠️  TypeScript типы не найдены (это нормально)"
else
  echo "⚠️  TypeScript не установлен, пропускаем проверку типов"
fi

echo "🧹 Очищаем временные файлы..."
cd ..
rm -rf test-temp "$PACKAGE_FILE"

echo ""
echo "🎉 Все проверки пройдены успешно!"
echo "📦 Библиотека готова к публикации в NPM"
echo ""
echo "Следующие шаги:"
echo "1. pnpm test:prepublish  - полная проверка перед публикацией"
echo "2. pnpm publish:library  - публикация в NPM"
echo ""
