# Branch Protection Rules

> **Language:** 🇷🇺 Русский | [🇺🇸 English](./BRANCH_PROTECTION_EN.md)

## Настройка обязательных проверок для PR

Для того чтобы CI стал обязательным для мержа PR, необходимо настроить Branch Protection Rules в GitHub:

### Шаги настройки:

1. **Перейдите в настройки репозитория:**
   - Settings → Branches

2. **Добавьте правило для ветки `main`:**
   - Нажмите "Add rule"
   - Branch name pattern: `main`

3. **Включите следующие опции:**
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals (минимум 1)
     - ✅ Dismiss stale PR approvals when new commits are pushed
     - ✅ Require review from code owners (если есть CODEOWNERS)
   
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - ✅ **Status checks to require:**
       - `CI Success` (это наш обязательный check)
       - `CI (18.x)` (опционально, для конкретных версий Node.js)
       - `CI (20.x)` (опционально, для конкретных версий Node.js)
   
   - ✅ **Require conversation resolution before merging**
   - ✅ **Restrict pushes that create files**
   - ✅ **Do not allow bypassing the above settings**

4. **Повторите для ветки `develop` (если используется):**
   - Те же настройки для ветки `develop`

### Что это даст:

- ❌ **Нельзя будет замержить PR без прохождения CI**
- ❌ **Нельзя будет замержить PR с failing тестами**
- ❌ **Нельзя будет замержить PR с ошибками линтинга**
- ❌ **Нельзя будет замержить PR с ошибками TypeScript**
- ✅ **Можно будет мержить только после успешного прохождения всех проверок**

### Особенности нашего CI:

- **Пропускает draft PR** - черновики не блокируют работу
- **Запускается на нескольких версиях Node.js** (18.x, 20.x)
- **Имеет общий статус `CI Success`** - именно его нужно добавить в required checks
- **Автоматически отменяется при новых коммитах** в PR

### Проверка настроек:

После настройки создайте тестовый PR и убедитесь, что:
1. CI запускается автоматически
2. Кнопка "Merge" заблокирована до прохождения проверок
3. Показывается статус "Required checks have not passed" 
