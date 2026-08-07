# Bridgestone Cup — Project Context

## Product summary

Bridgestone Cup is a sports-event website for employees of the Bridgestone
Bekasi plant. It serves participants and spectators who want event information,
competition schedules, results, standings, brackets, announcements, and photo
or video documentation.

The site is intended for a factory event and will be publicly accessible. Public
visitors do not need an account. Organizers/admins will have authenticated
management features in a later development phase.

## Audience

- Factory employees participating in the event.
- Factory employees following or watching the competition.
- Organizers maintaining event information.

## Language

The public interface is bilingual:

- Bahasa Indonesia
- English

A visible language switcher is required. Initial copy comes from Figma;
additional translation work will be handled later when required.

## Design

Figma source:
https://www.figma.com/design/lPfAyLNshuXJoJ6NHTZCBR/Test?node-id=0-1

Inspection date: 2026-08-07 (WIB)

The file currently contains one populated page and one empty page. The populated
page contains 22 top-level desktop frames, all sized 1440 × 900, plus a support
board carousel component set.

The approved Figma design is the visual source of truth, but it must not be
implemented as a rigid fixed-size canvas. The final website should closely
match Figma at the 1440 × 900 reference while remaining polished on desktop,
laptop, tablet, and mobile. Responsive reflow, sizing, spacing, stacking, grid,
and navigation adjustments are allowed when needed to avoid a broken layout.

The Figma identity, content hierarchy, colors, typography character, imagery,
ornamentation, and feature intent must remain recognizable. Do not add or
replace icons. Permitted enhancements include restrained animation, smooth
transitions, hover/focus feedback using the existing yellow accent, and a
sticky navigation bar that remains available while scrolling. Enhancements
must not add content or change the product's visual identity.

## Discovered public experience

### Home

The Home design contains:

- Bridgestone Cup BP 2026 event hero.
- Road to BSIN 50th Anniversary messaging.
- Greetings from event/company representatives.
- Event schedule.
- Six sports-category entry points.
- Tournament photo-gallery preview.
- Support-board carousel.
- Primary navigation.

### Sports

Six sports are currently represented:

1. Badminton
2. Futsal
3. Chess
4. Table Tennis
5. Football
6. Fishing

Discovered sport screens include:

- Badminton: bracket and schedule.
- Futsal: group standings, bracket, and schedule.
- Chess: group standings and tournament schedule/bracket view.
- Table Tennis: bracket, group standings, and winners/match scores.
- Football: bracket and schedule.
- Fishing: bracket/participant listing, standings, and winner information.

Each sports screen includes navigation between sports. Sport-specific tabs vary
by sport and may include Group Standing, Bracket, Schedule, or Winner.

### Gallery

The design contains:

- An all-photos gallery index.
- Gallery filters for all six sports.
- A dedicated gallery screen for each sport.
- Twenty photo slots per sport in the current designs.

## Data and administration

The first implementation phase uses dummy data. A later phase will connect the
site to Supabase and add a functional organizer/admin dashboard.

Planned admin-managed data:

- Match schedules.
- Results and scores.
- Standings.
- Teams and participants.
- News and announcements.
- Photo and video documentation.
- Tournament brackets.

There is no payment or ticketing feature. Participant registration has not been
decided and is outside scope until explicitly approved.

## Planned technical architecture

- One repository with separate `frontend/` and `backend/` directories.
- Frontend: semantic HTML, CSS, and vanilla JavaScript.
- Backend: Node.js and Express.
- Database and authentication: Supabase.
- Frontend first; backend functionality follows later.
- Hosting/deployment decision is intentionally deferred.

### Feature-based file organization

The project uses one `frontend/` application and one `backend/` application.
Do not create separate projects or top-level folders such as `home-frontend`,
`gallery-frontend`, `home-backend`, or `gallery-backend`.

Inside the single frontend application, each page or major feature has its own
named files instead of being merged into Home. Examples include `home.html` /
`home.css` / `home.js` and `gallery.html` / `gallery.css` / `gallery.js`.
`index.html` may act as the Home entry point, but its styling and behavior still
use Home-named files. Files may be arranged into `css/`, `js/`, and `pages/`
subdirectories while remaining part of the same frontend application.

Backend modules will mirror the feature names when implemented, such as
`gallery.routes.js`, `gallery.controller.js`, and `gallery.service.js`. Shared
code remains reusable, but unrelated page and API logic must not be collected
inside one oversized file.

## Open decisions

- Final delivery date.
- Which Figma frames and assets are formally final.
- Final fonts, icons, images, and design tokens.
- Exact mobile/tablet presentation for desktop-only frames.
- Final bilingual translations.
- Participant registration requirement.
- Admin roles, permissions, and workflow details.
- Supabase schema and storage strategy.
- Deployment provider, domain, and environments.
