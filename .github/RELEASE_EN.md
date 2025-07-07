# Release Process

> **Language:** [🇷🇺 Русский](./RELEASE.md) | 🇺🇸 English

## Automated Release Process

This project uses an automated release process with GitHub Actions.

### Steps to create a release:

1. **Make sure all changes are committed and pushed to the main branch**

2. **Create a new version using npm version:**
   ```bash
   # For patch version (1.0.0 → 1.0.1)
   pnpm run version:patch
   
   # For minor version (1.0.0 → 1.1.0)
   pnpm run version:minor
   
   # For major version (1.0.0 → 2.0.0)
   pnpm run version:major
   ```

3. **The following will happen automatically:**
   - Update version in package.json
   - Create git commit with version
   - Create git tag (e.g., v1.0.1)
   - Push to repository
   - Trigger GitHub Action for release

### What the Release workflow does:

1. **Checks code** (lint, typecheck, tests)
2. **Builds library**
3. **Generates changelog** using changelogithub
4. **Publishes to NPM** (requires NPM_TOKEN in secrets)

### Setting up secrets:

For automatic NPM publishing to work, you need to add to GitHub secrets:

- `NPM_TOKEN` - token for publishing to NPM

### Preview changelog:

```bash
pnpm run changelog:preview
```

### Manual changelog generation:

```bash
pnpm run changelog
```

### Available version commands:

#### Main versions:
- **`pnpm run version:patch`** - increments patch version (1.0.0 → 1.0.1)
- **`pnpm run version:minor`** - increments minor version (1.0.0 → 1.1.0)
- **`pnpm run version:major`** - increments major version (1.0.0 → 2.0.0)

#### Pre-release versions:
- **`pnpm run version:prerelease`** - increments prerelease version (1.0.0 → 1.0.1-0)
- **`pnpm run version:prepatch`** - creates prepatch version (1.0.0 → 1.0.1-0)
- **`pnpm run version:preminor`** - creates preminor version (1.0.0 → 1.1.0-0)
- **`pnpm run version:premajor`** - creates premajor version (1.0.0 → 2.0.0-0)

### Complete workflow:

1. **When creating version** → updates package.json → creates commit → creates tag → pushes to repo
2. **When tag is pushed** → triggers Release workflow → checks code → builds library → generates changelog → publishes to NPM 
