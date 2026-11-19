# Garam Kim · Problem Solver

The selected identity uses flat motion typography in deep teal and cream. A single horizontal composition connects the introduction, project frames, dialogs, footer, portfolio PDFs and GitHub banner.

## Palette and type

Accent/background: #174c48. Paper/type on the cover: #f2efe7. Reading ink: #172d2b. Secondary text: #566b65. Soft surfaces: #dfe6dc. Rules: #b2c1b7. Primary contrast is 8.45:1; secondary text on cream is 4.96:1.

IBM Plex Sans KR is selected through [Noonnu](https://noonnu.cc/font_page/448), with local 400/500/600 WOFF2 files and the OFL license. Large display typography uses the 600 face; it is preloaded and avoids a fallback-font flash. Body copy uses 400 and labels use 500. Korean keeps words together.

## Layout and resources

The first viewport contains PROBLEM / SOLVER, Garam Kim, the AX / AI Native field, CV, portfolio PDF, Tech Blog and contact. It contains no project previews. The header repeats the three resources; on narrow phones it uses a second row. GitHub is in the footer.

Four project rows feature MOAI, EUM, Dudri and On Your Mark. A row opens a native dialog with Overview, Decisions and Results tabs. The dialog has a fixed header and tabs with a scrollable reading body. Without JavaScript, rows open PDF pages 3, 5, 7 and 9. The portfolio has twelve pages; CV has one A4 page, in each language.

## Motion and interaction

PROB and LEM enter through opposing horizontal masks; the cream SOLVER band assembles with them. CSS establishes the sequence before first paint and completes it in 1.16 seconds. Native scroll offsets the typographic planes in opposite horizontal directions. There is no perpetual loop or scroll interception.

Dialogs reveal horizontally in 400 ms and exit in 200 ms. Tab content transitions take 220 ms. Keyboard activation and reduced-motion preferences keep states immediately usable. Escape closes the dialog, focus returns to the source row, and background scrolling resumes. Reduced motion removes spatial sequences and preserves selected states.

Controls are text and underlines. No decorative arrows, plus signs, pause controls, red ending or vertical fade entrance is used. User content and real project screenshots supply the case evidence.

## Implementation

Shared copy is in scripts/content.mjs. scripts/site-template.mjs and scripts/concept-template.mjs generate the canonical site with production mode enabled. assets/site.css and assets/concepts.css hold the base and selected styles; assets/site.js and assets/concepts.js hold interactions. Document templates use the corresponding teal/cream theme. Development proposal pages are excluded from publication.
