# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Pages, please report it responsibly.

**Do not open a public issue for security vulnerabilities.**

Instead, please email security concerns to: [your-email@example.com]

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Resolution target**: Depends on severity

## Scope

This policy applies to:
- The Pages application code
- Official deployments
- Dependencies we maintain

## Out of Scope

- Third-party services
- User-generated content
- Social engineering attacks

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Best Practices

When deploying Pages:
- Use strong JWT secrets (32+ characters)
- Enable HTTPS
- Keep dependencies updated
- Use environment variables for secrets
- Regular database backups

Thank you for helping keep Pages secure.
