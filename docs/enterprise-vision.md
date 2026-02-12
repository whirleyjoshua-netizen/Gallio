# Gallio Enterprise — Vision Document

> Digital Identity Infrastructure for Education

**Last updated:** February 2026
**Status:** Pre-development — waitlist phase

---

## 1. Executive Summary

Gallio Enterprise transforms Gallio from a consumer page builder into **institutional identity infrastructure** for schools, athletic programs, and districts.

Every student receives a structured digital identity — powered by Gallio's Kit system — that tracks growth, showcases achievements, and builds automatically over their academic career. Coaches get team dashboards with performance analytics. Administrators get provisioning, privacy controls, and oversight. By graduation, students have a complete, shareable portfolio of who they became.

**Who it's for:**
- High school athletic programs (football, basketball, soccer, track, etc.)
- Private academies and prep schools
- Public school districts
- AAU programs and athletic clubs
- Colleges and universities

**Why now:**
- The Athlete Kit is already built (trackers, profiles, structured tabs)
- Schools lack unified digital portfolio tools
- College admissions is evolving beyond transcripts
- Athletes need recruiting tools that go beyond stats
- No product combines academic + athletic + creative identity in one platform

---

## 2. The Problem

### Scattered Records
Student achievements live in spreadsheets, filing cabinets, coaches' notebooks, and parents' email inboxes. When it matters — college applications, recruiting conversations, scholarship evaluations — nothing is in one place.

### Recruiting Friction
Athletes scramble to build highlight reels and stat sheets senior year. Coaches manually compile performance data for every college inquiry. There's no standardized, always-current profile.

### Lost Potential
By graduation, years of growth, projects, leadership, and milestones are forgotten. No structured record of who students became. Four years of development reduced to a GPA and a few bullet points.

### No Unified Platform
MaxPreps tracks stats but not development. LinkedIn is for adults. Naviance handles academic planning but not athletics or creative work. Google Sites are unstructured. Nothing does what Gallio does.

---

## 3. The Solution

**Gallio becomes the operating system for student identity.**

Each student gets:
- A Gallio account provisioned by their school or program
- One or more pre-assigned Kits (Athletic, Academic, Creative, etc.)
- Structured tabs that organize their identity (Profile, Performance, Stats, Highlights, About Me)
- Time-series trackers that record progress over months and years
- A shareable public page with a single link

Each organization gets:
- An admin console for managing users, kits, and privacy
- Team/class/club dashboards for monitoring progress
- Bulk provisioning tools
- Recruiter and college showcase modes
- Analytics and exports

---

## 4. Product Architecture

### Organization Hierarchy

```
District (optional top-level)
  └── School
        ├── Teams (Football, Basketball, Track...)
        ├── Classes (AP Bio, English 11, Art Studio...)
        ├── Clubs (Robotics, Debate, Student Gov...)
        └── Students
              ├── Athletic Kit (if athlete)
              ├── Academic Kit (if enrolled)
              └── Creative Kit (if in arts program)
```

### How It Extends the Existing Kit System

The Kit system is already built. Each Kit page is a regular Display with:
- `kitConfig` JSON field identifying which kit + storing profile data
- Pre-configured tabs with structured content
- Tracker elements for time-series data (TrackerEntry model)
- Kit profile elements for structured data

Enterprise adds:
- Organization ownership layer (who provisions/manages the account)
- Role-based permissions (who can see/edit what)
- Bulk operations (create 50 athlete accounts at once)
- Cross-student dashboards (view all team members' tracker data)
- Showcase aggregation (collect multiple students into a public gallery)

All existing Gallio features work unchanged:
- Tabs, elements, header cards, backgrounds
- Sharing, analytics, auto-save
- Public page rendering
- Comment and form systems

---

## 5. Admin Console

The Admin Console is the enterprise control center. Available to users with Admin or Coach roles.

### Core Capabilities

**User Management**
- View all students/members in the organization
- Add individual students or bulk import (CSV upload)
- Deactivate accounts (preserves data, revokes access)
- Reset passwords / send invitation links

**Kit Assignment**
- Assign kits to individual students or groups
- Auto-assignment rules (see Section 7)
- Custom kit templates (modify default fields/tabs per organization)

**Privacy & Visibility**
- Set default visibility for new accounts (private, organization-only, public)
- Override individual student visibility settings
- Control which profile fields are public vs. organization-only
- FERPA compliance toggle (restricts all external sharing)

**Analytics & Exports**
- Organization-wide stats (total entries, active users, completion rates)
- Team-level performance dashboards
- Export student data (CSV, PDF)
- Academic eligibility tracking (GPA thresholds)

**Team/Class/Club Management**
- Create organizational groups
- Assign students to groups
- Group-level kit auto-assignment
- Group dashboards

---

## 6. Role-Based Access

| Role | Permissions |
|------|------------|
| **Student** | Full ownership of their profile. Edit all kit data. Control own visibility settings (within admin-set bounds). Share their own pages. |
| **Teacher** | View student portfolios for their classes. Assign kits to class members. Cannot edit student data. |
| **Coach** | Team dashboard with all athletes. View performance data across team. Manage team roster. Share team showcase page. Cannot edit individual athlete data. |
| **Admin** | Full control. Provision accounts. Manage privacy defaults. Export data. Create custom templates. Manage all roles. |
| **Parent** | Optional read-only view of their child's profile. Cannot edit. Visibility controlled by admin settings. |

### Permission Model

- Students always own their data
- Admins set the ceiling on visibility (students can restrict further, never expand beyond admin settings)
- Coaches see aggregate team data + individual athlete profiles
- Teachers see academic kit data for their class only
- Parents see what the admin allows

---

## 7. Kit Auto-Assignment

Rules engine that automatically assigns kits when students join groups:

| Trigger | Kit Assigned |
|---------|-------------|
| Student joins a sports team | Athletic Kit |
| Student enrolls in AP class | Academic Kit (with research module) |
| Student joins arts club | Creative Portfolio Kit |
| Student joins robotics | Project Kit |
| All freshmen | Base Academic Kit |

Rules are configurable per organization. Admins define:
- Group → Kit mappings
- Role → Kit mappings
- Default kit for all new members
- Manual override for individual students

Students can have multiple kits simultaneously (one per Display).

---

## 8. Recruiter / College Showcase Mode

### Team Showcase Pages
- Public page aggregating all athletes in a team
- Grid of athlete cards with key stats, position, class year
- Click through to individual athlete's full Gallio profile
- Shareable link: `gallio.app/org/lincoln-hs/football`

### Graduating Class Collections
- Public showcase of all graduating seniors
- "Class of 2026 Gallio Showcase"
- Filterable by sport, GPA range, position, recruiting status
- Shareable link for college admissions offices

### Recruiter-Friendly Features
- One-link athlete profiles (no login required)
- Key stats prominently displayed
- Coach contact info included
- Video highlights embedded (Hudl, YouTube)
- PDF export for recruiter packets
- QR code generation for recruiting events

---

## 9. Business Model

### Pricing Tiers

**Free (Consumer)**
- Individual Gallio account
- Unlimited pages
- All element types
- Basic analytics
- Public sharing

**Pro (Individual Power User)** — Future
- Custom domain
- Advanced analytics
- Priority support
- PDF export
- Remove "Made with Gallio" branding

**Athletic Program** — Enterprise
- Per team, per season
- Coach dashboard
- Athlete Kit for all players
- Recruiting tools (showcase page, PDF export, QR codes)
- Team analytics
- Bulk athlete provisioning

**School** — Enterprise
- Per student, per year
- All kit types (Athletic, Academic, Creative, etc.)
- Admin console
- Role-based access (students, teachers, coaches, admins, parents)
- Graduating class showcases
- FERPA compliance mode
- Custom branding (school colors, logo)

**District** — Enterprise
- Custom pricing
- Everything in School tier
- SSO integration (Google Workspace, Clever, ClassLink)
- Custom branding per school
- District-wide analytics
- Dedicated support
- API access

### Revenue Strategy

1. **Land with athletic programs** — Coaches and ADs have budget authority and immediate need (recruiting)
2. **Expand to school-wide** — Once athletic program is successful, pitch to administration for all students
3. **Scale to districts** — Once multiple schools in a district adopt, pitch district-wide deal

### Early Access / Founding Partner Program
- First 10 schools/programs get founding pricing (locked in, significant discount)
- Co-development partnership (their feedback shapes the product)
- Case study / testimonial agreement

---

## 10. Privacy & Compliance

### FERPA Considerations

The Family Educational Rights and Privacy Act (FERPA) protects student education records. Gallio Enterprise must:

- **Student consent:** Students (or parents if under 18) control what's public
- **Directory information:** Schools can designate certain fields as "directory information" (shareable without consent)
- **Legitimate educational interest:** Teachers/coaches access data only for students they serve
- **No third-party sharing:** Gallio does not sell or share student data
- **Data portability:** Students can export all their data at any time
- **Right to delete:** Students/parents can request full data deletion

### Technical Privacy Controls

- Admin-configurable visibility defaults (private, org-only, public)
- Per-field visibility controls (e.g., GPA visible to coaches but not public)
- Audit log of who viewed what
- Data encryption at rest and in transit
- No advertising, no tracking beyond owned analytics
- Student data belongs to the student, not the school

### Age Requirements
- Under 13: Parental consent required (COPPA)
- 13-17: School/parent authorization via enterprise agreement
- 18+: Self-service consent

---

## 11. Phase Roadmap

### Phase 1 — Kits System (DONE)
- Kit page architecture (kitConfig on Display)
- Athlete Kit with 4 trackers, 16 profile fields, 5 tabs
- Tracker elements (chart, summary cards, entry modal)
- Kit profile element (editor + public)
- Kit selector on dashboard
- Public tracker rendering

### Phase 2 — Enterprise Waitlist (CURRENT)
- Enterprise vision document (this document)
- Landing page at `/enterprise`
- Waitlist form (email collection)
- Early adopter outreach

### Phase 3 — Organization Model + Auth
- New Prisma models: Organization, Membership, Role
- Organization creation flow
- Invite links for members
- Role-based permission middleware
- Admin console shell (dashboard skeleton)

### Phase 4 — Bulk Provisioning + Dashboards
- CSV import for student accounts
- Kit auto-assignment rules engine
- Coach team dashboard (aggregate tracker data)
- Admin user management table

### Phase 5 — Showcase + Export
- Team showcase public pages
- Graduating class collections
- PDF export for recruiter packets
- QR code generation
- Parent read-only view

### Phase 6 — Additional Kits
- Academic Kit (coursework tracker, GPA, test scores, research projects)
- Creative Portfolio Kit (projects, exhibitions, performances)
- Startup Founder Kit (ventures, metrics, pitch decks)
- Kit marketplace (community-contributed kits)

### Phase 7 — District Scale
- SSO integration (Google Workspace, Clever, ClassLink)
- Custom branding per organization
- District-wide analytics
- API access for integrations
- Dedicated support tier

---

## 12. Competitive Landscape

| Product | What It Does | What It Doesn't Do |
|---------|-------------|-------------------|
| **MaxPreps** | Game stats, rankings, schedules | No development tracking, no portfolios, no recruiting profiles |
| **Hudl** | Video highlights | No academic data, no profile building, no time-series tracking |
| **LinkedIn** | Professional networking | For adults only, not structured for students, no tracking |
| **Naviance** | College/career planning | Academic only, no athletics, no creative work, no public profiles |
| **Google Sites** | Free-form web pages | Unstructured, no tracking, no analytics, no identity framework |
| **Common App** | College applications | One-time snapshot, not a living record, no ongoing tracking |

**Gallio's unique position:** The only platform that combines academic + athletic + creative identity into one structured, trackable, shareable digital profile that builds over time.

---

## 13. Deferred / Future Ideas

- **AI Recruiter Snapshot** — Auto-generated summary card from tracker data ("Top 3 improvements this season...")
- **Sport-specific stat customization** — Football fields vs. basketball fields vs. soccer fields
- **Highlight media carousel** — Dedicated grid/carousel element for videos and photos
- **Workout log tracker** — Daily training log beyond just PRs
- **Bulk CSV import for entries** — Import historical data from spreadsheets
- **Peer endorsements** — Teammates can vouch for each other's qualities
- **Achievement badges** — Auto-awarded based on tracker milestones
- **Calendar integration** — Sync game schedules, practice times
- **Mobile app** — Native iOS/Android for quick entry logging
- **API for integrations** — Connect to school SIS, Hudl, MaxPreps, etc.
- **White-label option** — Schools can fully brand as their own tool
