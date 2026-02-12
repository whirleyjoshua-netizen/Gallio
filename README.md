# Gallio

**A living gallery of you.**

Create, share, and track beautiful interactive displays in minutes.

---

## What is Gallio?

Gallio is an open-source platform for creating beautiful, interactive displays. Whether you're an artist showcasing a gallery, a realtor displaying listings, a developer presenting projects, or anyone with something to share — Gallio gives you a simple way to present your work.

**Not a document editor. Not a design tool. A display platform.**

## Features

- **Column-based canvas editor** — Add text, images, embeds, buttons, code blocks, charts, and more via slash commands
- **Multiple layouts** — Single column, two-column, three-column sections
- **Header cards** — Profile, Resume, and Catalog hero templates with photo presets and action buttons
- **Tab navigation** — Pages within pages, each tab with its own full canvas
- **Interactive elements** — MCQ, ratings, short answer, polls, comments with public submission
- **Background customization** — Solid colors, gradients, patterns, and images
- **Analytics dashboard** — Views, traffic sources, device breakdown, and per-element response digests
- **Share links** — Custom `/s/[code]` short links with click tracking
- **Dashboard customization** — Custom background, drag-and-drop card reordering, pin displays
- **Shareable URLs** — `gallio.app/username/my-portfolio`

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **Auth**: JWT
- **State**: Zustand
- **Drag & Drop**: @dnd-kit

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/whirleyjoshua-netizen/Gallio.git
cd Gallio

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
│   ├── (dashboard)/       # Dashboard, analytics
│   ├── editor/            # Display editor
│   ├── [username]/[slug]/ # Public display view
│   ├── s/[code]/          # Share link view
│   └── api/               # API routes
├── components/
│   ├── canvas/            # Column canvas, background settings
│   ├── editor/            # Page editor, slash command menu
│   ├── elements/          # Element editor + public components
│   ├── header/            # Header card components
│   ├── tabs/              # Tab navigation components
│   └── analytics/         # Analytics dashboard components
├── lib/
│   ├── types/             # TypeScript types (canvas, background, tabs, etc.)
│   ├── cards/             # App card provider registry
│   └── store.ts           # Zustand auth store
└── prisma/                # Database schema
```

## Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/cool-thing`)
3. Make your changes
4. Commit with a descriptive message
5. Open a pull request

## Roadmap

- [ ] Image upload (S3/Cloudflare R2)
- [ ] Custom domains
- [ ] Template library
- [ ] Dark mode toggle
- [ ] Real-time collaboration

## License

MIT License - see [LICENSE](LICENSE)

---

Built with care. Open source forever.
