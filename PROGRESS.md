# Bridgestone Cup — Progress

Last updated: 2026-08-07 14:50 WIB

## Current phase

Frontend implementation. The responsive Home page and the first Badminton
detail pages are implemented with local dummy data; the backend has not started.

## Completed

- Discussed and recorded the product purpose, audience, language, and access
  model.
- Chose the initial technical direction: vanilla HTML/CSS/JavaScript frontend,
  Node.js/Express backend, and Supabase database/authentication.
- Chose a single repository with separate frontend and backend directories.
- Established that frontend work with dummy data comes before backend and admin
  functionality.
- Established responsive, verification, Git, and progress-tracking rules.
- Inspected the Figma file structure and visible text content.
- Identified 22 desktop frames at 1440 × 900, six sports, Home, sports detail
  views, and gallery views.
- Created the initial `AGENTS.md`, `PROJECT_CONTEXT.md`, and `PROGRESS.md`.
- Inspected the complete Figma Home frame (`2088:421`) and extracted its visual
  hierarchy, content, and exported assets.
- Scaffolded a semantic vanilla HTML/CSS/JavaScript frontend in `frontend/`.
- Implemented the Home hero, greetings, event schedule, sport event links,
  gallery preview, support board, sticky navigation, mobile menu, active-section
  navigation, and the visible ID/EN language control.
- Separated Home dummy data from rendering logic and stored Figma imagery under
  `frontend/assets/images/`.
- Reworked the complete Home page against the individual Figma section nodes
  for pixel-accurate 1440 x 900 desktop geometry.
- Replaced invented emoji icons, card treatments, schedule copy, greeting copy,
  sport ordering/counts, and decorative styling with Figma-defined content,
  dimensions, colors, ornaments, and locally stored exported assets.
- Previously matched the Figma navigation as a page-level header. The latest
  owner decision now allows a sticky/fixed navbar, so the implementation should
  be reviewed and updated if it does not remain visible while scrolling.
- Added feature-based frontend/backend file-organization rules so Home, Gallery,
  sports, and later API modules are not combined into one oversized page file.
- Renamed Home-specific assets from generic `styles.css` and `app.js` to
  `home.css` and `home.js`; `index.html` remains the public Home entry point.
- Reworked the small-tablet and mobile responsive rules: the Hero content and
  anniversary timeline now fit the viewport, and Home content cards reflow into
  orderly grids instead of relying on fixed-width horizontal overflow.
- Replaced the repeated per-section gold frames with one continuous gold border
  around the full Home page, as explicitly requested by the project owner.
- Restored the sticky navbar and visible ID/EN language control under the latest
  responsive and interaction rules.
- Completed the missing Support Board carousel structure from Figma: internal
  media panel, four pagination dots, previous/next controls, external QR block,
  scan label, and the three supporter ranking cards.
- Corrected the Support Board quote layout after owner visual review: the quote
  mark, message, attribution, media panel, and controls now use explicit,
  non-overlapping positions.
- Added section scroll offsets so the sticky navbar no longer covers section
  headings after navigation-link clicks.
- Added a deliberate 768-1100 px tablet layout: greetings and gallery use two
  columns, schedules and sports use three columns, Support Board content stacks
  cleanly, and no content area relies on horizontal card scrolling.
- Repaired mojibake in Figma-derived punctuation by using stable HTML entities
  for the schedule range/bullet, CTA arrow, quote, attribution dash, and carousel
  chevrons.
- Corrected the owner-reported 625 px Hero layout: all three anniversary
  milestones now remain inside the viewport, the mobile wordmark crops out its
  unintended tagline, and excess space below the timeline was reduced.
- Added a dedicated 768-1100 px Hero composition after owner review of iPad Mini:
  the ribbon scales to the container, the three event logos are centered, Hero
  typography scales proportionally, and the milestone timeline uses three equal
  columns inside the viewport.

## Current decisions

- Organize frontend files per page/feature with matching names (for example
  Home HTML/CSS/JS and Gallery HTML/CSS/JS). Keep Gallery and other menu pages
  separate from Home. Mirror these feature names in backend route/controller/
  service modules when backend development begins.
- Keep all page files inside one `frontend/` application and all server modules
  inside one `backend/` application; do not create separate `home-frontend`,
  `gallery-frontend`, `home-backend`, or similar projects.
- Use Figma as the visual source of truth and closely match its 1440 × 900
  reference, but do not treat it as a rigid fixed-size canvas.
- Create orderly responsive layouts for desktop, laptop, tablet, and mobile.
  Reflow, resize, wrap, stack, or change grid columns as needed while preserving
  Figma's visual identity, content order, assets, and feature behavior.
- Do not add or replace icons. Allowed enhancements include restrained
  animation, smooth transitions, hover/focus feedback using the existing yellow
  accent, and sticky navigation that remains available while scrolling.
- Record small responsive decisions and ask the project owner before any change
  that would materially alter the visible design or user flow.
- Public visitors do not log in; login is for organizers/admins only.
- The public site supports Bahasa Indonesia and English via a language switcher.
- No online payment or ticketing.
- Do not commit, push, or deploy without explicit instruction.

## Verification

- Figma pages and top-level frames were inspected programmatically.
- The repository was confirmed to contain no project files before these
  documentation files were created.
- Served the frontend locally and inspected the Home page at desktop width
  (1280 px) and mobile width (390 px).
- Confirmed all six Home sections render, the mobile menu opens, no unintended
  horizontal overflow is present, and no relevant browser-console errors occur.
- Compared the desktop hero visually against the Figma screenshot and corrected
  the Bridgestone wordmark crop.
- Verified the revised Home layout at 625 px, 390 px, and 1440 px viewport
  widths. No horizontal overflow or relevant browser-console errors were found.
- Re-verified all six 900 px sections at a 1440 x 900 viewport. Confirmed exact
  key component dimensions (sport cards 192 x 390), six rendered sections,
  mobile reflow at 390 px, no unintended horizontal overflow, and no relevant
  console errors.
- Verified at 1440 px that the page has one 2 px wrapper border across the full
  5400 px Home height and that all six former section borders are disabled.
- Verified Support Board renders one media panel, four dots, two working arrow
  controls, one QR area, and three team cards. Rechecked at 390 px: mobile menu
  works, the continuous border remains present, no horizontal overflow occurs,
  and the browser console has no relevant errors.
- Rechecked the reported Support Board viewport at 1313 px. The quote and message
  now have an 11 px measured gap, the Support title clears the sticky header,
  and no relevant console errors occur.
- Verified the latest responsive rules at 1440, 900, 625, and 390 px. The actual
  grid columns reflow as intended, no horizontal overflow occurs, the mobile
  menu opens, Figma punctuation renders correctly, and no relevant console
  errors occur.
- Rechecked the corrected Hero at 625 and 390 px. Its measured heights are now
  650 and 620 px respectively; milestone right edges remain within the viewport,
  the wordmark uses the intended crop, and no console errors occur.
- Verified the dedicated tablet Hero at exactly 768 x 1024. The ribbon, logo
  group, Hero content, and full three-item timeline remain within the 753 px
  content viewport with no horizontal overflow or relevant console errors.
- Rebuilt the phone layout from Figma frame `01 / HOME — MOBILE` (`2132:393`)
  while retaining the existing responsive navbar requested by the owner.
- Matched the six mobile section heights and overall 390 px composition:
  Hero 844, Greetings 1700, Schedule 1160, Sport Event 1150, Gallery 700, and
  Support Board 900 px (6454 px total). Greeting cards now stack vertically;
  schedule and sport cards use the Figma two-column arrangements; Gallery and
  Support Board use compact mobile-specific compositions.
- Verified at 390 x 844 in Chrome: all section heights match the Figma frame,
  document width stays within the viewport, the Hero composition remains
  orderly, and there are no relevant console warnings or errors.
- Implemented separate responsive Badminton Bracket and Badminton Schedule
  pages from Figma frames `2088:979` and `2088:2455`.
- Added local Badminton data/rendering modules and downloaded the exact Figma
  shuttlecock, dot-grid, connector, and schedule-background assets.
- Recreated the 16-team championship bracket with all opening teams, advanced
  rounds, scores, champion card, and Figma connector artwork. Implemented the
  four-row schedule with the exact displayed times, teams, and QF/SF labels.
- Connected Home's Badminton card to the bracket page and connected the
  Bracket/Schedule tabs in both directions, matching the prototype flow.
- Fixed the Home-to-Badminton navigation being masked by a stale cached Home
  module. Added versioned module URLs so the updated card link loads reliably.
- Browser-tested the actual `Buka BADMINTON` link: its served href is now
  `pages/badminton-bracket.html`, clicking lands on the bracket page, and no
  relevant console errors occur.
- Verified both pages visually against Figma at desktop size. All five image
  instances load, 30 bracket match cards and four schedule rows render, tabs
  navigate correctly, the mobile menu opens, the 390 px schedule has no
  document overflow, and no relevant console errors were found. The mobile
  bracket uses an intentional contained horizontal scroller for legibility.
- Implemented Futsal Group Standing, Bracket, and Schedule as three separate
  responsive pages from Figma frames `2088:1302`, `2088:2501`, and `2088:3347`.
- Added exact local Figma background, football, dot-grid, bracket-connector,
  and top-scorer icon assets plus feature-scoped Futsal data and rendering.
- Connected Home's Futsal card to Group Standing and wired all three Futsal
  tabs bidirectionally. Browser-tested the real Home click and full
  Group Standing -> Bracket -> Schedule flow.
- Verified four standing cards, 24 bracket slots, three top scorers, four
  schedule rows, and all bracket image assets. At 390 px the standing and
  schedule pages have no horizontal overflow, the mobile menu works, and the
  bracket remains readable inside a contained 900 px horizontal scroller.
  No relevant browser console errors were found.
- Reworked the owner-reported broken Badminton and Futsal bracket layouts.
  Desktop retains the Figma composition and exported connector artwork, while
  viewports at 900 px and below now use purpose-built vertical brackets grouped
  into Round of 16, Quarter Final, Semi Final, Final, and Champion stages.
- Removed the mobile dependency on 1200/900 px canvases and horizontal panning.
  Both mobile bracket documents now stay within the viewport, render 15 clear
  matchup cards, preserve team/score data, and keep the Futsal top-scorer panel.
  Verified desktop/mobile display switching and found no relevant console
  warnings or errors.
- Replaced the unstable absolute connector layouts on desktop after owner
  screenshot review. Both sports now use a custom five-column stage layout
  (Round of 16, Quarter Final, Semi Final, Final, Champion) with consistent
  cards, spacing, progression arrows, readable text, and no overlapping lines.
- Retained Figma colors, typography character, event data, decorative frame,
  Badminton winner, and Futsal Top Scorer panel while removing the connector
  artwork from active rendering. Verified all later-round team names render
  without truncation, both desktop documents have no horizontal overflow, and
  neither page produces relevant console errors.
- Fixed the sport-navbar link from both Badminton pages to Futsal Group
  Standing. Browser-tested navigation in both directions: Badminton -> Futsal
  and Futsal -> Badminton now land on the intended pages with no console errors.

## Open questions

- Which Figma screens and assets are final.
- Whether participant registration will be required.
- Final translations and brand assets.
- Admin permission model and Supabase schema.
- Deployment and domain selection.

## Next recommended steps

1. Review the Home navbar, sport-event hover state, animation, and responsive
   layout against the latest interaction and file-organization rules.
2. Review the implemented Home page against the owner's intended final Home
   frame and replace any still-placeholder official copy or imagery.
3. Add complete approved Bahasa Indonesia and English strings to the existing
   language structure.
4. Implement and verify the first sport-detail page, reusing the Home navigation
   and visual tokens.
# Update 2026-08-07 15:12 WIB — Sport pages and in-page navigation

- Completed one canonical standalone page for every Figma sport: Badminton, Futsal, Chess, Table Tennis, Football, and Fishing.
- Added shared `frontend/css/sports.css` and `frontend/js/sports.js` so the sport navbar, responsive shell, schedules, standings, and bracket patterns are reused.
- Internal sport menus now switch content in place with JavaScript and History API hashes (no full page reload). Back/Forward and direct hash URLs remain supported.
- Cross-sport navigation uses ordinary HTML links and therefore performs the requested full page reload.
- Implemented the menus represented by Figma: Badminton (Bracket/Schedule), Futsal (Group Standing/Bracket/Schedule), Chess (Group Standing/Schedule), Table Tennis (Bracket/Group Standing/Winner), Football (Bracket/Schedule), and Fishing (Bracket/Winner Fishing).
- Updated every Home Sport Event card to link to its corresponding canonical sport page.
- Verification: opened all six canonical pages in the browser; each rendered six sport links, the expected tab count and non-empty content, and reported no horizontal overflow at the tested browser width. Verified Badminton Schedule changes to `#schedule` with its content updated in place, and Badminton → Futsal changes the document path to `/pages/futsal.html`. Table Tennis `#winner` direct state also rendered correctly. Browser viewport control did not apply the requested 390 px width in this session (reported 1280 px), so the mobile CSS was implemented but a true 390 px visual pass remains to be repeated.
- `node --check` could not run because the sandbox denied Node resolving `C:\Users\ekoaw`; successful browser imports/rendering of every module provide runtime syntax coverage instead.
# Update 2026-08-07 15:25 WIB — Fishing team-pair correction

- Rechecked Figma node `2088:2171` and corrected the Fishing participant model: one card now represents one team/unit with two participant names and a center divider.
- Replaced the incorrect one-person entries with all 15 exact team/name pairs from Figma and added the event-date card (`Sabtu, 13 Desember 2025`).
- Kept the existing no-reload Bracket/Winner Fishing tab behavior.
# Update 2026-08-07 16:05 WIB — Sport visual-system redesign

- Redesigned all six sport pages with owner-approved visual freedom while retaining the Figma black/gold identity, content hierarchy, and navigation behavior.
- Rebuilt the shared bracket presentation into readable round columns with stage numbering, match connectors, score cells, hover feedback, and a dedicated champion card. Round labels now adapt correctly for both 8-team and 16-team brackets.
- Redesigned schedules as numbered match boards with time, round badge, team pairing, and centered VS marker.
- Redesigned group standings with group headers, rank rows, leader highlighting, and point columns.
- Improved Table Tennis/Fishing winner panels and Fishing team-pair cards; restored a dedicated Top Scorer panel to the Futsal bracket view.
- Strengthened the shared sports chrome: double gold frame, radial black/gold canvas, selected sport pill, selected view tab, and responsive mobile navigation.
- Verification performed in the local browser across Badminton, Futsal, Chess, Table Tennis, Football, and Fishing: all canonical pages rendered their expected tab counts and content with no horizontal overflow and no browser-console errors. Verified in-page Badminton Bracket → Schedule updates `#schedule` without reloading. Explicit viewport checks passed at 390 × 844 and 1440 × 900 with no horizontal overflow; both mobile schedule and desktop bracket were visually inspected.
# Update 2026-08-07 16:30 WIB — Match date and time in brackets

- Added a date/time footer to every elimination match card so spectators can see when each bracket match is played.
- Used the official schedule information visible in Figma section `2088:518`: 8–12 December, Cafetaria, 16.30 WIB for 8–11 December and 16.45 WIB on 12 December. Round dates adapt to 8-team and 16-team brackets.
- Added the announcement time to champion cards and expanded the Fishing event card with `07.00 WIB • Empang Ikan Mas Bungur` for 13 December 2025.
- Used semantic `<time>` values with Asia/Jakarta (`+07:00`) offsets in bracket cards.
# Update 2026-08-07 17:10 WIB — Gallery index and sport collections

- Implemented the Gallery flow from Figma frames `2088:2370`, `2088:3212`, `2088:3514`, `2088:3649`, `2088:3784`, `2088:3919`, and `2088:4054`.
- Added a responsive All Photos index with ALL plus six sport filters and six collection cards.
- Added one reusable sport-collection page driven by the selected sport query, rendering the Figma-defined 20 Tournament Moment slots for Badminton, Futsal, Chess, Table Tennis, Football, and Fishing.
- Added an accessible no-reload lightbox for each moment with close, previous, next, backdrop close, labels, and full-moment presentation.
- Connected Home Gallery preview cards and the `CLICK FOR MORE` CTA to the new Gallery flow.
- Downloaded and reused the Figma Gallery frame asset locally as `frontend/assets/images/gallery-frame.svg`.
- Preserved placeholders because the Figma gallery frames contain designed photo slots but no final photo assets; no unrelated stock photography was introduced.
- Verification: at 1440 × 900, Gallery index rendered seven filters and six collection cards; Futsal collection rendered 20 moments; opening moment 01 and advancing to moment 02 worked; close and Back to All Photos worked. At 390 × 844 the index reflowed to one column with no horizontal overflow. No relevant browser-console errors were found, and the desktop index was visually inspected.
# Update 2026-08-07 17:40 WIB — Home Support Board side controls

- Moved the Support Board previous/next controls from the pagination row to the vertical left and right edges of the yellow feature card, following the owner's supplied reference.
- Kept four pagination dots centered along the bottom and converted them into accessible clickable buttons.
- Added four dummy Support Board slides with distinct messages, attribution, and media-panel labels; arrows and dots now update all slide content without reloading.
- Added visible hover/focus feedback and responsive side-control sizing for mobile.
- Verification: at 1440 px the previous/next controls sit at the left/right vertical edges of the 813 px card, four dots remain centered, arrow and direct-dot navigation update message/author/media label, and no horizontal overflow occurs. At 390 px both controls remain inside the 327 px card with no horizontal overflow. The initial stale data-module error was fixed by versioning both Home data imports; subsequent interactions rendered the new slides correctly.
# Update 2026-08-07 18:05 WIB — Support Board responsive cleanup

- Replaced the conflicting absolute Support Board text/media geometry with one stable two-column grid: quote/message/attribution on the left and media on the right.
- Added deliberate desktop, laptop/tablet, small-tablet, and phone sizing so longer carousel messages no longer collide with attribution, media, arrows, or pagination.
- Normalized QR alignment below the feature card at widths below 1100 px and retained left/right side arrows across all breakpoints.
- Verification after moving the final rules to the end of the stylesheet: at 1024 px the card is 929 × 360 px, the longest dummy message has a 137 px gap before its attribution, and text/media do not overlap; at 390 px the card is 327 × 330 px with separate 119 px text and 124 px media columns. Both widths have no horizontal overflow, and the 1024 px result was visually inspected.
# Update 2026-08-07 18:25 WIB — Public preview preparation

- Added a GitHub Pages workflow that publishes only the static `frontend/` directory on pushes to `master` or `main`.
- Added repository `README.md` with local preview and GitHub Pages activation instructions plus a minimal `.gitignore` for local/system files and secrets.
- Repository currently has no commits and no remote; a GitHub repository/remote is still required before a public URL can be created.

# Update 2026-08-07 16:10 WIB — GitHub publication

- Created the initial repository commit and connected the local project to `https://github.com/EkoPutraNugraha/bridgestone-cup-bp-2026` as `origin`.
- Pushed branch `master` and configured GitHub Pages to deploy through GitHub Actions.
- The first workflow run occurred before Pages was enabled and failed as expected; this progress commit retriggers the configured deployment after Pages activation.
- Public preview target: `https://ekoputranugraha.github.io/bridgestone-cup-bp-2026/`.
- Final live-site and navigation verification remains pending until the new workflow run completes.
