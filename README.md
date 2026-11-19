# Garam Kim · Problem Solver

[한국어 사이트](https://kgr0831.github.io/) · [English website](https://kgr0831.github.io/en/) · [garam@moai.co](mailto:garam@moai.co)

Selected projects include MOAI, EUM, Dudri and On Your Mark. Korean and English editions include a 12-page portfolio and a one-page CV.

The published identity uses teal and cream motion typography. CV, portfolio PDF and Tech Blog are available in the first viewport; GitHub is in the footer.

## Local preview

Run `node scripts/build.mjs`, then `node scripts/serve.mjs`. Open http://127.0.0.1:4173.

The templates are in `scripts/site-template.mjs` and `scripts/document-template.mjs`; shared copy lives in `scripts/content.mjs`.

Playwright validation: `node scripts/verify.cjs --playwright PATH_TO_PLAYWRIGHT --chrome PATH_TO_CHROMIUM`.

Export the four published PDFs with `node scripts/export-documents.cjs --playwright PATH_TO_PLAYWRIGHT --chrome PATH_TO_CHROMIUM`.

The typeface is [IBM Plex Sans KR, selected on Noonnu](https://noonnu.cc/font_page/448), licensed under OFL.

See [DESIGN.md](DESIGN.md) for the selected visual system and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for release validation. The GitHub profile is maintained in [kgr0831/kgr0831](https://github.com/kgr0831/kgr0831).
