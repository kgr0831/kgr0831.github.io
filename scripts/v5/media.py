"""Prepare site media from the finished portfolio.

usage: python -I scripts/v5/media.py <dir with per-slide NN.pdf> <portfolio.pdf> <image source dir>...
  - renders the body of every content slide to assets/v5/slides/NN.webp (title and lead are HTML on the page)
  - writes assets/v5/slides/sizes.json, assets/v5/og.png
  - converts the project images named in IMAGES to assets/v5/img/
  - copies the portfolio PDF to portfolio.pdf and portfolio/Garam_Kim_Portfolio.pdf
The CV PDF is printed separately with --cv (needs Chrome): python -I scripts/v5/media.py --cv
"""
import json
import os
import shutil
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
# site file name: (source file name, max width)
IMAGES = {"vf-discover.jpg": ("vf-discover-c.png", 1440), "eum-board.jpg": ("eum-draw.jpg", 1497), "oym-hud.jpg": ("oym-hud.jpg", 1600),
          "rol-laser.jpg": ("rol-laser.jpg", 1600), "dudri-coffee.jpg": ("dudri-coffee.png", 1600)}


def cv_pdf():
    src = os.path.join(ROOT, "cv", "index.html")
    out = os.path.join(ROOT, "Garam_Kim_CV.pdf")
    url = "file:///" + src.replace("\\", "/")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=" + out, url], check=True, capture_output=True)
    shutil.copyfile(out, os.path.join(ROOT, "CV.pdf"))
    import fitz
    d = fitz.open(out)
    print("CV:", len(d), "page(s)", d[0].rect, os.path.getsize(out) // 1024, "KB")


def main(slide_dir, deck_pdf, *image_dirs):
    import fitz
    from PIL import Image
    deck = json.load(open(os.path.join(ROOT, "scripts", "v5", "deck.json"), encoding="utf-8"))
    out_dir = os.path.join(ROOT, "assets", "v5", "slides")
    os.makedirs(out_dir, exist_ok=True)
    sizes = {}
    for s in deck:
        if "bodyTop" not in s:
            continue
        page = fitz.open(os.path.join(slide_dir, s["no"] + ".pdf"))[0]
        top = max(0, s["bodyTop"] - 36)
        clip = fitz.Rect(48, top, 1872, min(994, s.get("bodyBottom", 994) + 36))  # body only; the footer rule is at 1004
        pix = page.get_pixmap(clip=clip, matrix=fitz.Matrix(1, 1), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        img.save(os.path.join(out_dir, s["no"] + ".webp"), "WEBP", quality=88, method=6)
        sizes[s["no"]] = {"w": img.width, "h": img.height}
    json.dump(sizes, open(os.path.join(out_dir, "sizes.json"), "w"), indent=0)
    # social preview from the cover
    cover = fitz.open(os.path.join(slide_dir, "01.pdf"))[0].get_pixmap(matrix=fitz.Matrix(1200 / 1920, 1200 / 1920), alpha=False)
    og = Image.frombytes("RGB", (cover.width, cover.height), cover.samples).crop((0, 22, 1200, 652))
    og.save(os.path.join(ROOT, "assets", "v5", "og.png"))
    # MOAI has no screens to show: use the portfolio's own illustration on its deep teal ground
    env = fitz.open(os.path.join(slide_dir, '04.pdf'))[0].get_pixmap(clip=fitz.Rect(1040, 60, 1860, 840), alpha=False)
    Image.frombytes('RGB', (env.width, env.height), env.samples).save(os.path.join(ROOT, 'assets', 'v5', 'img', 'moai-envelope.jpg'), 'JPEG', quality=88)
    # project images
    img_dir = os.path.join(ROOT, "assets", "v5", "img")
    os.makedirs(img_dir, exist_ok=True)
    for name, (src, maxw) in IMAGES.items():
        path = next((os.path.join(d, src) for d in image_dirs if os.path.exists(os.path.join(d, src))), None)
        if not path:
            print("missing", src)
            continue
        im = Image.open(path).convert("RGB")
        if im.width > maxw:
            im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
        im.save(os.path.join(img_dir, name), "JPEG", quality=86, optimize=True, progressive=True)
    # portfolio PDF at the stable URLs
    shutil.copyfile(deck_pdf, os.path.join(ROOT, "portfolio.pdf"))
    shutil.copyfile(deck_pdf, os.path.join(ROOT, "portfolio", "Garam_Kim_Portfolio.pdf"))
    print("slides:", len(sizes), "images:", len(os.listdir(img_dir)), "portfolio:", os.path.getsize(deck_pdf) // 1024, "KB")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    if sys.argv[1:] == ["--cv"]:
        cv_pdf()
    else:
        main(*sys.argv[1:])
