# 김가람 · Problem Solver

[사이트](https://kgr0831.github.io/) · [포트폴리오 PDF](https://kgr0831.github.io/portfolio.pdf) · [CV](https://kgr0831.github.io/cv/) · [garam@moai.co](mailto:garam@moai.co)

AX · AI Native. 문제를 발견하고 필요한 기술로 해결합니다. 여섯 프로젝트(MOAI, VFriend, EUM, On Your Mark, Remnents of Light, 두드리)를 포트폴리오와 프로젝트별 페이지로 정리했습니다.

## 구조

- `index.html`, `projects/<slug>/`, `cv/`: `node scripts/v5/build.mjs`가 `scripts/v5/content.mjs`(사이트·CV 문구)와 `scripts/v5/deck.json`(포트폴리오 쪽별 제목과 리드)으로 만듭니다.
- `assets/v5/`: 사이트와 CV 스타일, 프로젝트 이미지, 포트폴리오 쪽 이미지. `python -I scripts/v5/media.py <쪽별 PDF 폴더> <포트폴리오 PDF> <이미지 폴더>...`로 다시 만들고 `--cv`로 `Garam_Kim_CV.pdf`를 인쇄합니다(Chrome 필요).
- `portfolio.pdf`, `portfolio/Garam_Kim_Portfolio.pdf`: 포트폴리오. `Garam_Kim_CV.pdf`, `CV.pdf`: CV.
- 영어 페이지(`en/`, `cv/en/`, `portfolio/en/`)와 영어 PDF는 이전 판입니다. 예전 생성기 `scripts/build.mjs`는 한국어 페이지까지 덮어쓰므로 실행하지 않습니다.

로컬 미리보기: 저장소 폴더에서 `python -m http.server 4173` 뒤 http://127.0.0.1:4173 을 엽니다.

글꼴은 [IBM Plex Sans KR](https://noonnu.cc/font_page/448)(OFL)입니다. 디자인 기준은 [DESIGN.md](DESIGN.md)에 있습니다.
