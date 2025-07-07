# Release Process

> **Language:** 🇷🇺 Русский | [🇺🇸 English](./RELEASE_EN.md)

## Автоматический процесс релиза

Этот проект использует автоматизированный процесс релиза с помощью GitHub Actions.

### Шаги для создания релиза:

1. **Убедитесь, что все изменения закоммичены и запушены в main ветку**

2. **Создайте новую версию с помощью npm version:**
   ```bash
   # Для patch версии (1.0.0 → 1.0.1)
   pnpm run version:patch
   
   # Для minor версии (1.0.0 → 1.1.0)
   pnpm run version:minor
   
   # Для major версии (1.0.0 → 2.0.0)
   pnpm run version:major
   ```

3. **Автоматически произойдет:**
   - Обновление версии в package.json
   - Создание git commit с версией
   - Создание git tag (например, v1.0.1)
   - Push в репозиторий
   - Запуск GitHub Action для релиза

### Что делает Release workflow:

1. **Проверяет код** (lint, typecheck, tests)
2. **Собирает библиотеку**
3. **Генерирует changelog** с помощью changelogithub
4. **Публикует в NPM** (требует NPM_TOKEN в secrets)

### Настройка secrets:

Для работы автоматической публикации в NPM необходимо добавить в GitHub secrets:

- `NPM_TOKEN` - токен для публикации в NPM

### Предварительный просмотр changelog:

```bash
pnpm run changelog:preview
```

### Ручная генерация changelog:

```bash
pnpm run changelog
``` 
