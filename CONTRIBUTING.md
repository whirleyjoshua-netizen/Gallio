# Contributing to Pages

Thank you for your interest in contributing to Pages! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful. Be constructive. Be welcoming to newcomers.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/pages/issues)
2. If not, create a new issue with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with the `feature` label
3. Describe the feature and its use case
4. Be open to discussion about implementation

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Ensure code passes linting:
   ```bash
   pnpm lint
   ```
5. Write clear commit messages:
   ```
   feat: add masonry layout option
   fix: resolve image loading issue on mobile
   docs: update API documentation
   ```
6. Push to your fork and open a PR
7. Fill out the PR template

## Development Setup

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env

# Start database (if using Docker)
docker-compose up -d postgres

# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Start dev server
pnpm dev
```

## Code Style

- **TypeScript**: Use strict mode, prefer explicit types
- **Components**: Functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components
- **Files**: kebab-case for file names

We use ESLint and Prettier. Run `pnpm lint` before committing.

## Project Structure

```
src/
├── app/           # Next.js routes and API
├── components/    # Reusable React components
├── lib/           # Utilities, types, database, auth
```

## Areas Needing Help

- **UI/UX improvements**: Better editor experience
- **New block types**: Gallery, carousel, social embeds
- **Tests**: Unit and integration tests
- **Documentation**: Tutorials, API docs
- **Accessibility**: ARIA labels, keyboard navigation

## Questions?

Open an issue with the `question` label or start a discussion.

---

Thank you for contributing!
