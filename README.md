# Pages

**Beautiful displays for your work, art, and ideas.**

Create shareable portfolios, galleries, and catalogs in minutes.

---

## What is Pages?

Pages is an open-source platform for creating beautiful, interactive displays. Whether you're an artist showcasing a gallery, a realtor displaying listings, a developer presenting projects, or anyone with something to share—Pages gives you a simple way to present your work.

**Not a document editor. Not a design tool. A display platform.**

## Features

- **Simple block-based editor** - Add images, text, links, and embeds
- **Multiple layouts** - Grid, masonry, or list views
- **Themes** - Light, dark, minimal, or bold
- **Shareable URLs** - `pages.app/username/my-portfolio`
- **No design skills needed** - Focus on your content

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **Auth**: JWT
- **State**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/pages.git
cd pages

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Set up database
pnpm db:generate
pnpm db:push

# Start development server
pnpm dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Login, signup
│   ├── (dashboard)/       # User dashboard
│   ├── editor/[id]/       # Display editor
│   ├── [username]/[slug]/ # Public display view
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities, types, stores
└── prisma/               # Database schema
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/cool-thing`)
3. Make your changes
4. Run `pnpm lint` to check code style
5. Commit with a descriptive message
6. Open a pull request

## Roadmap

- [ ] Drag-and-drop block reordering
- [ ] Image upload (S3/Cloudflare R2)
- [ ] Custom domains
- [ ] Analytics dashboard
- [ ] More block types (gallery, carousel, social links)
- [ ] Template library

## License

MIT License - see [LICENSE](LICENSE)

---

Built with care. Open source forever.
