# Branch Protection Rules

> **Language:** [🇷🇺 Русский](./BRANCH_PROTECTION.md) | 🇺🇸 English

## Setting up Required Checks for PR

To make CI mandatory for merging PRs, you need to configure Branch Protection Rules in GitHub:

### Setup Steps:

1. **Go to repository settings:**
   - Settings → Branches

2. **Add rule for `main` branch:**
   - Click "Add rule"
   - Branch name pattern: `main`

3. **Enable the following options:**
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals (minimum 1)
     - ✅ Dismiss stale PR approvals when new commits are pushed
     - ✅ Require review from code owners (if CODEOWNERS exists)
   
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - ✅ **Status checks to require:**
       - `CI Success` (this is our mandatory check)
       - `CI (18.x)` (optional, for specific Node.js versions)
       - `CI (20.x)` (optional, for specific Node.js versions)
   
   - ✅ **Require conversation resolution before merging**
   - ✅ **Restrict pushes that create files**
   - ✅ **Do not allow bypassing the above settings**

4. **Repeat for `develop` branch (if used):**
   - Same settings for `develop` branch

### What this provides:

- ❌ **Cannot merge PR without passing CI**
- ❌ **Cannot merge PR with failing tests**
- ❌ **Cannot merge PR with linting errors**
- ❌ **Cannot merge PR with TypeScript errors**
- ✅ **Can only merge after successful completion of all checks**

### Our CI features:

- **Skips draft PRs** - drafts don't block work
- **Runs on multiple Node.js versions** (18.x, 20.x)
- **Has unified `CI Success` status** - this is what you need to add to required checks
- **Automatically cancels on new commits** in PR

### Verification:

After setup, create a test PR and ensure that:
1. CI runs automatically
2. "Merge" button is blocked until checks pass
3. Shows "Required checks have not passed" status 
