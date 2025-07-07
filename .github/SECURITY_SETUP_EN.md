# Security Workflow Setup

> **Language:** [🇷🇺 Русский](./SECURITY_SETUP.md) | 🇺🇸 English

This document describes the setup and usage of automated security checks in the `vue3-truncate-html` project.

## 📋 Overview

The project includes one level of security checks:

1. **Monthly Full Audit** - comprehensive security check

## 🔒 Monthly Security Audit

### Description

The `security-audit.yml` workflow runs automatically on the first day of each month at 09:00 UTC and includes:

- **npm audit** - dependency vulnerability check
- **Snyk scanning** - in-depth code and dependency analysis
- **CodeQL analysis** - static code analysis
- **Sensitive files check** - search for potentially dangerous files
- **Hardcoded secrets check** - search for hardcoded secrets

### Setup

#### 1. Snyk Setup (optional)

For full Snyk functionality, add a token to secrets:

1. Register at [snyk.io](https://snyk.io)
2. Get API token from account settings
3. Add `SNYK_TOKEN` secret in repository settings:
   - GitHub → Settings → Secrets and variables → Actions
   - New repository secret: `SNYK_TOKEN`

#### 2. Notification Setup

The workflow automatically:
- Creates issues when vulnerabilities are found
- Uploads detailed report as artifact
- Sends results to Security tab

### Manual Run

The workflow can be run manually:

1. Go to Actions → Security Audit
2. Click "Run workflow"
3. Select branch and run

## 📊 Monitoring and Reports

### Where to Find Results

1. **Actions tab** - workflow execution logs
2. **Security tab** - CodeQL results and security advisories
3. **Issues** - automatically created issues when problems are found
4. **Artifacts** - detailed reports (stored for 30 days)

### Report Types

- **security-audit-report** - full monthly audit report
- **CodeQL results** - static analysis results
- **Dependency alerts** - vulnerable dependency notifications

## 🔧 Sensitivity Level Configuration

### npm audit

Current level: `moderate` (medium and above)

To change the level, edit files:

```yaml
# For full audit
npm audit --audit-level=low  # all vulnerabilities
npm audit --audit-level=high # only critical
```

### Exclusions

To exclude certain vulnerabilities, create `.npmrc`:

```ini
# Ignore specific advisory IDs
audit-level=moderate
```

## 🚨 Vulnerability Response

### Automatic Actions

1. **Issue is created** automatically when problems are found
2. **Report is uploaded** as artifact for detailed analysis

### Manual Actions

1. **Check issue** - review details of found problems
2. **Update dependencies** - `pnpm update` or `pnpm audit fix`
3. **Fix code** - eliminate found issues
4. **Verify fixes** - run workflow again

## 📋 Security Checklist

### Before Release

- [ ] All security checks passed
- [ ] No open security issues
- [ ] Dependencies updated
- [ ] CodeQL results reviewed

### Regularly

- [ ] Check monthly reports
- [ ] Update dependencies
- [ ] Monitor security advisories
- [ ] Update security configuration

## 🔧 Customization

### Adding New Checks

To add new security checks:

1. Edit `.github/workflows/security-audit.yml`
2. Add new check steps
3. Update report and notifications

### Schedule Configuration

To change monthly audit schedule:

```yaml
schedule:
  # Every week on Monday
  - cron: '0 9 * * 1'
  
  # Every day at 02:00
  - cron: '0 2 * * *'
  
  # Every month on the 15th
  - cron: '0 9 15 * *'
```

## 📞 Support

If you have questions about security workflow setup:

1. Create an issue with `security` tag
2. Check documentation in `SECURITY.md`
3. Review examples in Actions tab

## 🔄 Updates

This document is updated when security configuration changes. Last updated: $(date +%Y-%m-%d) 
