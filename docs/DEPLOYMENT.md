# Portfolio deployment

The approved identity is the teal/cream Motion Graphic design. Production routes are `/` and `/en/`, with direct CV, portfolio PDF and Tech Blog links in the first viewport. The GitHub profile link is in the footer.

## Targets

- Website: `kgr0831/kgr0831.github.io`, branch `main`, GitHub Pages root publishing.
- Profile: `kgr0831/kgr0831`, branch `main`.
- Account fields: Garam Kim; Problem Solver / AX Engineer Intern at MOAI; `https://kgr0831.github.io/`.

## Build and validation

Run `node scripts/build.mjs`, then `node scripts/serve.mjs` for the local preview. No production dependency installation or build service is required. `.nojekyll` serves the committed static files directly.

Run `node scripts/verify.cjs --playwright PATH_TO_PLAYWRIGHT --chrome PATH_TO_CHROMIUM --out .runtime/deploy-check` to verify Korean/English desktop and mobile routes, first-screen resources, native dialogs, keyboard navigation, PDF links, reduced motion and no-JavaScript fallbacks. This also exports the four canonical PDFs and renders the GitHub/social banners.

Run `python scripts/check-pdfs.py --out .runtime/deploy-check` with PyMuPDF and Pillow installed to inspect the actual PDF page counts, selectable text, internal contents links and every rendered page. The portfolio has 12 pages per language; CV has one page per language.

## Release scope

`scripts/prepare-release.mjs` copies an explicit production allowlist into fresh `.runtime/deploy-site` and `.runtime/deploy-profile` clones and writes `.runtime/release-manifest.json`. It verifies repository remotes and branches. It does not commit, push or change account fields.

The release excludes proposal pages, comparison thumbnails, local tools, test captures and session data. Existing unrelated repository files remain intact. Legacy `CV.pdf`, `CV.en.pdf`, `portfolio.pdf` and `portfolio.en.pdf` URLs receive the corresponding final PDFs.

After publication, check the exact GitHub Pages build commit and load the live Korean/English routes with Playwright. Check the PDF response signatures and language destinations, image/font loading and the GitHub README/banner. Existing repository activity automation may add a later commit after a deployment; inspect the published content in addition to the commit label.

## Design and evidence

The local [IBM Plex Sans KR](https://noonnu.cc/font_page/448) font is licensed under the included OFL file. The four cases are MOAI, EUM, Dudri and On Your Mark. Original measurement qualifications and the distinction between Dudri's award and later work remain in the shared content source.

The captured entry/dialog motion was independently reviewed. Real-device frame-rate benchmarks, Safari and screen-reader operation were not part of that review. No additional manual setup is needed for the configured GitHub Pages target.

The original three-project release passed 12 Korean/English viewport combinations, 13 interaction groups and 24 internal links with no browser/HTTP errors. The rendered canonical PDFs were independently checked as 10, 10, 1 and 1 pages. The release staging check compares the published PDF bytes, including legacy aliases, against those verified artifacts.
