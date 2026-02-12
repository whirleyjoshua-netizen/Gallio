# Gallio Roadmap & Monetization Strategy

## Tier Structure

### Free Tier
- Unlimited pages (displays)
- All element types (text, heading, image, embed, button, list, table, KPI, chart, quote, callout, toggle, code block, MCQ, rating, short answer, comments, poll)
- Built-in cards only (LinkedIn, Vouch)
- Share links for individual pages
- Public page URLs (`/username/slug`)
- Basic page editor with full column canvas

### Pro Tier
- **Card Studio**: Browse full gallery, use external/third-party cards, iframe SDK cards
- **Shareable Board**: Dashboard becomes a public shareable portfolio board (`/username` or custom URL)
  - Custom dashboard background
  - Drag-and-drop layout persists for visitors
  - Pinned pages appear first
- **Analytics**: Detailed view stats, visitor insights
- Custom domains (future)
- Priority support

## Feature Gating Plan

| Feature | Free | Pro |
|---------|------|-----|
| Pages (displays) | Unlimited | Unlimited |
| All element types | Yes | Yes |
| Built-in cards (LinkedIn, Vouch) | Yes | Yes |
| Card Studio (browse + external cards) | No | Yes |
| Share links | Yes | Yes |
| Public pages | Yes | Yes |
| Shareable dashboard board | No | Yes |
| Custom dashboard background | No | Yes |
| Analytics | Basic (view count) | Detailed |
| Custom domain | No | Future |

## Card Studio Economics

- **SDK is free and open-source** — developers can build and host cards anywhere
- **Using external cards on pages requires Pro** — consumers pay, creators don't
- This keeps the card ecosystem growing (low barrier to create) while monetizing the demand side
- Built-in cards (LinkedIn, Vouch) remain free to ensure baseline value

## Shareable Board Vision

The dashboard currently serves as a private page management view. In Pro tier:
- Dashboard becomes a public "board" — a living portfolio page
- Visitors see the user's curated grid of pages with custom backgrounds and layout
- Acts as a Linktree/Bento alternative but with full Gallio richness
- URL structure: `gallio.app/username` shows the board, `gallio.app/username/slug` shows individual pages
- Board inherits dashboard customization (background, pin order, drag layout)

## Implementation Notes

### Gating Approach
- Add `tier: 'free' | 'pro'` field to User model (default: 'free')
- Middleware/helper: `isPro(user)` check
- Card Studio page: show cards but gate "Add to page" behind Pro
- Dashboard share: gate the "Share Board" button behind Pro
- Stripe integration for payment (future)

### Migration Path
- Currently everything is free — no gates exist yet
- When Pro launches: existing users get grandfathered or get a trial period
- Free tier should always feel complete — Pro is for power users, not for unlocking basics
