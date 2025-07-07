# Security Policy

## Supported Versions

We actively support the following versions of `vue3-truncate-html`:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | ✅ Yes             |
| 1.x.x   | ⚠️ Security fixes only |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do NOT** create a public GitHub issue

Security vulnerabilities should be reported privately to avoid potential exploitation.

### 2. Report via GitHub Security Advisories

1. Go to the [Security tab](https://github.com/ikloster03/vue3-truncate-html/security) of this repository
2. Click "Report a vulnerability"
3. Fill out the form with detailed information about the vulnerability

### 3. Alternative reporting methods

If you cannot use GitHub Security Advisories, you can:

- Email: [security@example.com](mailto:security@example.com)
- Create a private issue (if you have access)

### 4. What to include in your report

Please provide the following information:

- **Description**: A clear description of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Impact**: What could an attacker accomplish with this vulnerability
- **Affected versions**: Which versions of the library are affected
- **Suggested fix**: If you have ideas for how to fix the issue

## Security Features

### HTML Sanitization

This library includes built-in HTML sanitization to prevent XSS attacks:

- Uses `sanitize-html` library for safe HTML processing
- Configurable sanitization options
- Default safe configuration that removes dangerous elements and attributes

### Safe Defaults

- Content is sanitized by default when using HTML mode
- No execution of JavaScript in processed content
- Safe handling of user-provided content

## Security Best Practices

When using `vue3-truncate-html` in your application:

### 1. Always sanitize user input

```javascript
// Good - using sanitization
<vue-truncate-html
  type="html"
  :text="userContent"
  :sanitize-options="{
    allowedTags: ['p', 'b', 'i', 'em', 'strong'],
    allowedAttributes: {}
  }"
/>

// Avoid - without sanitization (only for trusted content)
<vue-truncate-html
  type="html"
  :text="trustedContent"
  :sanitize-options="false"
/>
```

### 2. Configure sanitization options appropriately

```javascript
// Restrictive configuration for user-generated content
const restrictiveSanitization = {
  allowedTags: ['p', 'br', 'strong', 'em'],
  allowedAttributes: {},
  allowedSchemes: []
}

// More permissive for trusted content
const permissiveSanitization = {
  allowedTags: ['p', 'div', 'span', 'a', 'img', 'ul', 'ol', 'li'],
  allowedAttributes: {
    'a': ['href'],
    'img': ['src', 'alt']
  },
  allowedSchemes: ['http', 'https']
}
```

### 3. Regular security updates

- Keep the library updated to the latest version
- Monitor security advisories
- Run regular security audits

## Automated Security Measures

This repository includes automated security measures:

### Monthly Security Audits

- **Schedule**: First day of each month at 09:00 UTC
- **Tools used**:
  - npm audit for dependency vulnerabilities
  - Snyk for code and dependency scanning
  - CodeQL for static analysis
  - Custom checks for sensitive files and hardcoded secrets

### Continuous Integration

- Security checks run on every pull request
- Dependency vulnerability scanning
- Code quality checks

### Branch Protection

- Required status checks before merging
- Signed commits recommended
- Review requirements for sensitive changes

## Vulnerability Response Process

When a vulnerability is reported:

1. **Acknowledgment** (within 24 hours)
   - Confirm receipt of the report
   - Provide timeline for initial assessment

2. **Assessment** (within 72 hours)
   - Verify and reproduce the vulnerability
   - Assess impact and severity
   - Determine affected versions

3. **Fix Development** (timeline depends on severity)
   - Develop and test fix
   - Prepare security advisory
   - Plan coordinated disclosure

4. **Release** 
   - Release patched version
   - Publish security advisory
   - Update documentation

5. **Post-Release**
   - Monitor for additional issues
   - Update security measures if needed
   - Credit reporter (if desired)

## Security Contact

For security-related questions or concerns:

- **Primary**: GitHub Security Advisories
- **Email**: [security@example.com](mailto:security@example.com)
- **Response time**: Within 24 hours for security issues

## Acknowledgments

We appreciate the security research community and responsible disclosure of vulnerabilities. Contributors who report security issues will be acknowledged in our security advisories (unless they prefer to remain anonymous).

---

**Note**: This security policy is regularly reviewed and updated. Last updated: $(date +%Y-%m-%d) 
