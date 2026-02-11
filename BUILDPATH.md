# Pages MVP - Strategic Build Path

> **Vision**: A platform where people build expressive, living proof of who they are - not just a resume, but a story with evidence. Athletes building scout profiles, students showcasing academic journeys, professionals presenting their work in ways that feel *alive*.

> **Philosophy**: Methodical, strategic, not rushed. Users should feel a "special spark" when building.

---

## Reference Repository

**Old repo location**: `C:\Users\whirl\pages`

Key systems to reference:
- Column-based building (`ColumnCanvas.tsx`, `PageEditor.tsx`)
- Slash commands (`SlashCommandMenu.tsx`)
- Background system (`BackgroundSettings.tsx`, `backgroundUtils.ts`)
- Element renderers (`components/page-builder/*.tsx`)
- Boards system (`app/board-builder/page.tsx`)
- Analytics (`app/api/analytics/events/route.ts`)

---

## Core Architecture Decisions

### Column-Based Building (Not Free-Form)
```
Page
└── Sections[]
    ├── layout: 'full-width' | 'two-column' | 'three-column'
    └── Columns[]
        ├── elements: Element[]
        └── cardSettings: { background, border, padding, glassmorphism }
```

### Tech Stack (Keep from current MVP)
- Next.js 14 (App Router)
- TypeScript (strict)
- React 18 + Zustand
- Tailwind CSS
- PostgreSQL + Prisma
- JWT auth

---

## Element Tiers

### Tier 1: Core (Phase 1)
| Element | Description | Priority |
|---------|-------------|----------|
| Text | Rich text with formatting | P0 |
| Heading | H1-H6 with sizes | P0 |
| Image | Upload, URL, drag-drop | P0 |
| Embed | YouTube, tweets, iframes | P0 |
| Button | Links with styling (solid/outline/ghost) | P0 |
| List | Bulleted and numbered | P0 |
| Quote | Styled blockquote with attribution | P0 |

### Tier 2: Differentiators (Phase 2)
| Element | Description | Priority |
|---------|-------------|----------|
| KPI/Stat | Metrics with trends, progress bars | P1 |
| Table | Editable rows/columns | P1 |
| Callout | Info/warning/success/error boxes | P1 |
| Toggle | Collapsible content sections | P1 |

### Tier 3: Premium (Phase 3)
| Element | Description | Priority |
|---------|-------------|----------|
| Basic Chart | Bar, line, pie | P2 |
| Premium 3D Chart | Advanced visualization | P2 |
| Code Block | Syntax highlighting | P2 |
| Multiple Choice | Form element | P2 |
| Rating | Star/numeric scale | P2 |
| Short Answer | Text input form | P2 |

---

## Background System

### Four Types
1. **Solid** - Color picker + presets
2. **Gradient** - Linear/radial with direction control
3. **Pattern** - Dots, grid, diagonal lines, zigzag
4. **Image** - Upload with cover/contain/tile modes

### Scroll Behavior
- **Fixed** - Parallax effect, background stays in place
- **Scroll** - Background moves with content

### Opacity Control
- 0-100% slider for all background types

---

## Premium Path: Boards + Analytics

### Free Tier
- Unlimited pages
- All Tier 1 + Tier 2 elements
- Basic view count
- Public sharing

### Premium Tier (Future)
- **Boards**: Organize multiple pages into collections
- **Analytics Dashboard**: Who viewed, when, duration, geography
- **Form Responses**: Collect and analyze submissions
- **Custom Domains**: yourname.com instead of pages.app/username
- **Advanced Elements**: Charts, 3D visualizations

---

## Build Phases

### Phase 1: Foundation ✅ COMPLETE
- [x] Database schema update (sections, elements model)
- [x] Section/column data structure
- [x] Column-based canvas component
- [x] Layout selector (1/2/3 columns)
- [x] Slash command menu
- [x] Core elements:
  - [x] Text element
  - [x] Heading element
  - [x] Image element (URL-based first)
  - [x] Embed element
  - [x] Button element
  - [x] List element (bullet + numbered)
  - [x] Quote element
- [x] Background system:
  - [x] Solid colors
  - [x] Gradients
  - [x] Patterns
  - [x] Images
  - [x] Fixed/scroll toggle
- [x] Preview mode
- [x] Auto-save

### Phase 2: Differentiation ✅ COMPLETE
- [x] KPI/Stat element
- [x] Table element
- [x] Callout element
- [x] Toggle element
- [x] Column styling (glass, solid, transparent)
- [x] Image upload (local storage + API, S3/R2 ready)
- [x] Drag-and-drop element reordering (@dnd-kit)

### Phase 3: Premium Foundation ✅ COMPLETE
- [ ] Boards system (skipped for now)
- [x] Analytics tracking (AnalyticsEvent model, track API, session tracking)
- [x] Analytics dashboard UI (views, visitors, devices, browsers, referrers)
- [x] Form elements (MCQ, rating, short answer)
- [x] Form response collection (submit API, responses viewer, CSV export)
- [x] 3D Charts (bar, line, pie with 3D effects, glow, gradients)

### Phase 4: Scale & Polish
- [ ] Custom domains
- [ ] Premium 3D charts
- [ ] Code block with syntax highlighting
- [ ] Collaboration features
- [ ] Mobile optimization
- [ ] Performance optimization

---

## Progress Tracker

### Current Status: Phase 2 - Differentiators (In Progress)

**Last Updated**: 2026-02-02

**Completed**:
- [x] Basic Next.js setup
- [x] Prisma + PostgreSQL setup
- [x] User auth (signup/login)
- [x] Basic display CRUD
- [x] **Section/column data model** (types defined in `src/lib/types/canvas.ts`)
- [x] **Background system types** (`src/lib/types/background.ts`)
- [x] **ColumnCanvas component** with section management
- [x] **SlashCommandMenu** with "/" keyboard trigger
- [x] **Tier 1 Core elements created**:
  - [x] TextElement (rich text with contenteditable)
  - [x] HeadingElement (H1-H6 with sizes)
  - [x] ImageElement (URL-based with modal)
  - [x] EmbedElement (YouTube, Vimeo support)
  - [x] ButtonElement (3 variants, 6 colors)
  - [x] ListElement (bulleted/numbered with keyboard nav)
  - [x] QuoteElement (with author attribution)
- [x] **Tier 2 Differentiator elements created**:
  - [x] KPIElement (metrics with trends, 6 colors, prefix/suffix)
  - [x] TableElement (editable rows/columns, add/delete)
  - [x] CalloutElement (info/warning/success/error types)
  - [x] ToggleElement (collapsible content sections)
- [x] **BackgroundSettings modal** (solid, gradient, pattern, image)
- [x] **Editor page refactored** to use new canvas system
- [x] **Public view page updated** for sections
- [x] **API updated** for sections + background
- [x] **Schema updated** with background field
- [x] Preview mode in editor
- [x] **Column styling** (transparent, glass/translucent, solid with customization)
- [x] **Public view** - Added Tier 2 elements and column styling support
- [x] **Image upload** - Local storage with file upload/drag-drop, structured for S3/R2 integration
- [x] **Drag-and-drop** - Element reordering within and between columns using @dnd-kit

**Phase 2 COMPLETE!**

**Next Up (Phase 3)**:
- Boards system
- Analytics tracking
- Analytics dashboard UI
- Form elements (MCQ, rating, short answer)
- Form response collection
- Basic charts
- Sample pages for 3 use cases (Personal Profile, Resume, Gallery)

---

## Key Files to Create/Modify

### New Components Needed
```
src/
├── components/
│   ├── canvas/
│   │   ├── ColumnCanvas.tsx       # Main edit canvas
│   │   ├── PreviewCanvas.tsx      # Read-only view
│   │   ├── Section.tsx            # Section container
│   │   ├── Column.tsx             # Column container
│   │   └── LayoutSelector.tsx     # 1/2/3 column picker
│   ├── elements/
│   │   ├── TextElement.tsx
│   │   ├── HeadingElement.tsx
│   │   ├── ImageElement.tsx
│   │   ├── EmbedElement.tsx
│   │   ├── ButtonElement.tsx
│   │   ├── ListElement.tsx
│   │   └── QuoteElement.tsx
│   ├── slash-menu/
│   │   └── SlashCommandMenu.tsx   # "/" command interface
│   └── background/
│       ├── BackgroundSettings.tsx # Background config UI
│       └── BackgroundPreview.tsx  # Live preview
├── lib/
│   ├── types/
│   │   ├── canvas.ts              # Section, Column, Element types
│   │   └── background.ts          # Background config types
│   └── utils/
│       └── backgroundUtils.ts     # CSS generation
```

### Schema Updates
```prisma
model Display {
  id          String    @id @default(cuid())
  userId      String
  slug        String
  title       String
  description String?

  // New: Section-based content
  sections    Json      // Section[] with columns and elements

  // Background config
  background  Json?     // BackgroundConfig

  published   Boolean   @default(false)
  views       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, slug])
}
```

---

---

## 3 Core Use Cases (North Star)

> **Philosophy**: This is a LEISURE site. Users will take multiple sessions before publishing. Think FULL, not fast. MySpace energy - personal expression, making it *yours*.

### 1. Personal Profile / Portfolio
**MySpace-inspired personal expression**

*Who*: Athletes, creatives, students, anyone wanting a personal brand page

*Examples built*:
- Athlete scout profile: `/marcusjohnson/marcus-johnson-class-of-2026`

*Key features needed*:
- [ ] **Music player** (MySpace vibes - let users add a song)
- [ ] **Profile photo/avatar section** (prominent, customizable frame)
- [ ] **Mood/status** ("Currently: Training for state championship")
- [ ] **Friends/connections display** (link to other Pages users)
- [ ] **Guestbook/comments** (visitors can leave messages)
- [ ] **Custom cursor** (fun personalization)
- [ ] **Sparkle/effects toggle** (tasteful animations)
- [ ] **Color themes beyond backgrounds** (accent colors, fonts)
- [ ] **"About Me" template sections** (interests, favorites, etc.)

*Vibe*: Express yourself. This is YOUR corner of the internet.

---

### 2. Resume / Professional
**Modern alternative to PDF resumes**

*Who*: Job seekers, professionals, freelancers

*Examples built*:
- Software engineer resume: `/sarahchen/sarah-chen-software-engineer`

*Key features needed*:
- [ ] **PDF export** (one-click download)
- [ ] **Print-optimized view** (clean formatting)
- [ ] **Timeline element** (visual career progression)
- [ ] **Skills bar/rating element** (proficiency levels)
- [ ] **Contact form** (recruiters can reach out)
- [ ] **Analytics** (see who viewed your resume)
- [ ] **QR code generation** (for business cards)
- [ ] **"Available for work" badge**
- [ ] **Resume templates** (quick-start layouts)

*Vibe*: Professional, clean, shareable. Better than a PDF.

---

### 3. Gallery / Showcase
**Visual-first display for multiple items**

*Who*: Artists, photographers, real estate agents, influencers, collectors

*Key features needed*:
- [ ] **Masonry/grid layouts** (Pinterest-style)
- [ ] **Lightbox** (click to expand images)
- [ ] **Image carousel/slider** element
- [ ] **Before/After slider** (real estate, fitness transformations)
- [ ] **Categories/filtering** (organize by type)
- [ ] **Lazy loading** (performance for many images)
- [ ] **Caption/description overlays**
- [ ] **Price tags** (for items for sale)
- [ ] **"Inquire" buttons** (lead capture)
- [ ] **Watermark option** (protect work)
- [ ] **Fullscreen gallery mode**

*Vibe*: Let the visuals speak. Clean, immersive, impressive.

---

## Future: Developer Marketplace

> Users should be able to enhance their pages with tools built by developers

**Concept**:
- Developers can create "Page Tools" (elements, integrations, themes)
- Users can browse and add tools to their pages
- Revenue share model (developers earn from premium tools)

**Example tools**:
- Spotify "Now Playing" widget
- Instagram feed embed
- Countdown timer
- Donation/tip jar (Stripe integration)
- Booking calendar (Calendly-style)
- Newsletter signup (Mailchimp integration)
- Custom animations pack
- Premium themes/templates

**Technical approach**:
- Tools as isolated components (iframes or web components)
- Manifest file defines tool config
- Review process for quality/security
- API for tool developers

---

## Example Use Cases (North Star)

### 1. Athlete Scout Profile
```
[Hero Section - Full Width]
├── Background: Action photo, fixed
├── Heading: "Marcus Johnson - Class of 2026"
├── Text: "Point Guard | 6'2" | Chicago, IL"
└── Button: "Contact My Coach"

[Stats Section - Three Column]
├── Column 1: KPI "3.8 GPA"
├── Column 2: KPI "18.5 PPG"
└── Column 3: KPI "7.2 APG"

[Highlights Section - Two Column]
├── Column 1: Embed (YouTube highlights)
└── Column 2:
    ├── Heading: "Achievements"
    └── List: All-Conference, Team Captain, etc.

[Schools Section - Full Width]
├── Heading: "Target Schools"
└── Table: School | Location | Division | Status
```

### 2. Academic Portfolio
```
[Hero Section - Full Width]
├── Background: Gradient (professional)
├── Heading: "Sarah Chen"
├── Text: "Computer Science @ MIT | AI Researcher"
└── Button: "Download CV"

[Projects Section - Two Column]
├── Column 1: Image + description of project 1
└── Column 2: Image + description of project 2

[Publications Section - Full Width]
├── Heading: "Publications"
└── Quote blocks for each paper with citations

[Contact Section - Full Width]
├── Callout: "Open to research opportunities"
└── Button row: LinkedIn, GitHub, Email
```

---

## Notes for Future Sessions

1. **Always read this file first** when resuming work
2. **Update the Progress Tracker** after each session
3. **Reference old repo** at `C:\Users\whirl\pages` for implementation patterns
4. **Keep elements simple** - resist scope creep
5. **Test with real use cases** - athlete profile, academic portfolio

---

## Commands to Resume

```bash
cd C:\Users\whirl\pages-mvp
pnpm dev
```

Database:
```bash
pnpm db:studio  # View data
pnpm db:push    # Push schema changes
```

---

*This document is the source of truth for the Pages MVP build. Update it as progress is made.*
