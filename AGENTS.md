# Bridgestone Cup — Agent Instructions

## Project overview

Build a public website for Bridgestone Cup, an employee sports event at the
Bridgestone Bekasi plant. The primary users are factory employees, including
participants and spectators who need event information, schedules, results,
standings, brackets, announcements, and match documentation.

Design source:
https://www.figma.com/design/lPfAyLNshuXJoJ6NHTZCBR/Test?node-id=0-1

Read `PROJECT_CONTEXT.md` before making product or design decisions. Read
`PROGRESS.md` before starting implementation so work continues from the latest
verified state.

## Sources of truth

When information conflicts, use this priority:

1. The project owner's latest instruction.
2. The relevant final or approved Figma design.
3. This `AGENTS.md` file.
4. `PROJECT_CONTEXT.md`.
5. The current implementation.
6. `PROGRESS.md`.

Do not treat every Figma frame as final. Some designs are still in progress.
If a decision would materially change content, features, user flows, or brand
direction, ask the project owner first.

## Scope rules

- Implement only pages and features represented in Figma or explicitly
  requested by the project owner.
- Do not invent new pages, primary content, or product features.
- Preserve Figma's visual identity, content, hierarchy, and feature intent, but
  refine the implementation when necessary so it remains polished and usable
  across desktop, laptop, tablet, and mobile.
- Responsive adjustments may change spacing, sizing, wrapping, stacking, grid
  columns, and navigation behavior when necessary to prevent a broken layout.
- Do not introduce new icons, decorative symbols, content, sections, or product
  features that are not represented in Figma or approved by the project owner.
- If Figma is ambiguous or incomplete, choose the smallest consistent solution,
  record it in `PROGRESS.md`, and ask first if it would materially change the
  visible design or user flow.
- Use Figma text as the initial content source.
- Record material ambiguities or decisions in `PROGRESS.md`.

## Architecture and technology

Use a single repository with separated applications:

```text
frontend/
backend/
AGENTS.md
PROJECT_CONTEXT.md
PROGRESS.md
README.md
```

Planned stack:

- Frontend: semantic HTML, CSS, and vanilla JavaScript.
- Backend: Node.js and Express.
- Database: Supabase.
- Authentication: Supabase authentication for organizers/admins only.
- Initial data: local dummy data; database integration comes later.
- Deployment: not decided yet.

Keep frontend and backend concerns separate. The browser must never receive a
Supabase service-role key or other server-only credential. Store secrets in
environment variables and provide safe examples through `.env.example` when
environment variables are introduced.

## Frontend organization

- Use exactly one `frontend/` application directory. Do not create separate
  applications or top-level directories named `home-frontend`,
  `gallery-frontend`, `sports-frontend`, or similar.
- Do not place the entire site in one oversized HTML, CSS, or JavaScript file.
- Give every public page or feature its own clearly named HTML, CSS, and
  JavaScript files. For example, Home uses `home.html`, `home.css`, and
  `home.js`; Gallery uses `gallery.html`, `gallery.css`, and `gallery.js`.
- `index.html` may remain the public entry point for Home, but Home-specific
  styling and behavior must live in clearly named `home.css` and `home.js`.
- Files may be grouped by type inside the same frontend application, such as
  `frontend/css/home.css`, `frontend/js/home.js`, and
  `frontend/pages/gallery.html`. They still belong to the one `frontend/`
  application.
- Do not place Gallery, sport details, schedules, standings, brackets, or admin
  screens inside the Home page file merely for convenience.
- Split code by responsibility and reuse repeated UI patterns such as the
  navigation, footer, sports menu, tabs, gallery cards, schedule rows, bracket
  entries, and modal behavior.
- Keep page content and dummy competition data separate from rendering logic.
- Prefer semantic HTML and progressive enhancement.
- Avoid adding libraries when a clear solution is practical with the agreed
  vanilla stack.
- Do not introduce a frontend framework without explicit approval.

## Backend organization

- Use exactly one `backend/` application directory. Do not create separate
  backend projects such as `home-backend` or `gallery-backend`.
- Mirror frontend feature names in backend modules when backend work begins.
  For example, Gallery uses `gallery.routes.js`, `gallery.controller.js`, and
  `gallery.service.js`; schedules use equivalent schedule-named modules.
- Keep route, controller, service, validation, and data-access responsibilities
  separate when their complexity warrants separate files.
- Shared backend utilities may live in clearly named shared/config/middleware
  directories. Do not combine unrelated feature endpoints into one large file.
- Frontend and backend filenames should make their feature relationship obvious.

## Figma implementation

- Use the approved Figma design as the visual source of truth. At its reference
  desktop viewport, match it as closely as practical while keeping the code and
  layout robust.
- Preserve Figma's hierarchy, typography, color palette, imagery, ornamentation,
  shapes, component appearance, and overall composition.
- Use exact values and original assets extracted from Figma whenever available.
- Do not add or replace icons. Reuse only icons and graphic assets present in
  Figma unless the project owner explicitly approves another asset.
- Current discovered frames are desktop designs at 1440 × 900.
- Use 1440 × 900 as the primary visual reference, not as a fixed canvas that
  forces every device to use the same dimensions.
- Create deliberate responsive layouts for desktop, laptop, tablet, and mobile.
  Reflow, resize, wrap, stack, or reduce grid columns when needed, while keeping
  the final result recognizably consistent with Figma and visually orderly.
- Allowed enhancements include subtle transitions, entrance/reveal animation,
  hover/focus feedback, and persistent navigation behavior, as long as they do
  not introduce new content or change the design identity.
- Sport-event menu items may use the existing yellow accent on hover/focus.
- The main navigation may remain sticky/fixed and available while scrolling.
- Animation must be restrained, smooth, and respect `prefers-reduced-motion`.

## Responsive requirements

- The public experience must work on mobile, tablet, laptop, and desktop.
- Use fluid layouts before adding breakpoints.
- Prevent unintended horizontal overflow.
- Navigation, tables, standings, brackets, schedules, and galleries need an
  intentional layout for each viewport rather than being blindly scaled down.
- Responsive changes must preserve content order, meaning, brand styling, and
  clear visual similarity to Figma.
- Maintain usable tap targets and readable typography on small screens.
- At minimum, verify representative mobile and desktop widths before declaring
  UI work complete.

## Languages and content

- The website supports Bahasa Indonesia and English through a visible language
  switcher.
- Start with the text available in Figma.
- Do not invent missing official copy or translation without approval.
- Organize strings so they can later be translated without rewriting page
  markup or UI logic.
- Use Asia/Jakarta as the event timezone unless the owner specifies otherwise.

## Public and admin access

- The public website is accessible without login.
- Login is only for organizers/admins.
- The frontend is implemented first with dummy data.
- The functional admin dashboard and database integration are later phases.
- Planned admin-managed content includes schedules, match results and scores,
  standings, teams/participants, news/announcements, photo/video documentation,
  and brackets.
- Registration forms are not yet approved. Do not add them until decided.
- The website has no ticket sales or online payments.

## Accessibility and quality

- Use semantic elements and real buttons/links for interactive controls.
- Provide meaningful alternative text for informative images.
- Keep keyboard interaction and visible focus states working.
- Preserve sufficient contrast and respect reduced-motion preferences.
- Avoid avoidable layout shift by sizing media appropriately.
- Optimize images for the web without unnecessarily degrading them.

## Definition of done

A material task is complete only when the relevant checks have been performed:

- At the Figma reference viewport, the result has been visually compared and
  closely matches the relevant frame without looking broken or unfinished.
- Mobile, tablet, laptop, and desktop layouts are orderly, readable, and remain
  visually consistent with the Figma design.
- Mobile and desktop layouts have been inspected.
- There is no unintended horizontal overflow.
- JavaScript produces no relevant browser-console errors.
- Relevant links, buttons, navigation, and interactions work.
- Content and core feature behavior have not been changed unintentionally.
- When backend work exists, the affected server and endpoints are tested.
- Anything that could not be verified is explicitly reported.
- `PROGRESS.md` is updated.

## Change and Git rules

- Preserve unrelated user changes.
- Do not perform broad refactors outside the current task unless required and
  explained.
- Do not replace the agreed stack or add major dependencies without approval.
- Never commit secrets or credentials.
- Do not create commits, push changes, or deploy unless explicitly instructed.
- Do not delete files or discard user work without explicit approval.

## Progress tracking

After every material piece of work, update `PROGRESS.md` with:

- Date and time in WIB.
- Work completed.
- Current work state.
- Important technical or design decisions.
- Verification performed and its result.
- Open questions or blockers.
- The next recommended steps.

Do not mark work complete before the required verification has actually run.
