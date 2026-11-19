"""Inspect actual PDF page counts, searchable Korean text, links, and renders.

Optional: --module-path .runtime/python for a task-local PyMuPDF installation.
"""
import argparse
import json
import sys
from pathlib import Path
parser = argparse.ArgumentParser()
parser.add_argument('--module-path')
parser.add_argument('--out', default='.runtime/v4')
parser.add_argument('--concept', choices=['metallic', 'motion'])
args = parser.parse_args()
if args.module_path:
    sys.path.insert(0, str(Path(args.module_path).resolve()))
import pymupdf
from PIL import Image, ImageOps, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / args.out / 'pdf'
out.mkdir(parents=True, exist_ok=True)
report = []
documents = [('portfolio/Garam_Kim_Portfolio.pdf', 12, 'portfolio-ko'), ('portfolio/Garam_Kim_Portfolio_EN.pdf', 12, 'portfolio-en'), ('Garam_Kim_CV.pdf', 1, 'cv-ko'), ('Garam_Kim_CV_EN.pdf', 1, 'cv-en')]
documents += [(f'concepts/{theme}/Garam_Kim_Portfolio{suffix}.pdf', 12, f'{theme}-{lang}') for theme in ['metallic', 'motion'] for lang, suffix in [('ko', ''), ('en', '_EN')]]
for filename, count, prefix in documents:
    if args.concept and not filename.startswith(f'concepts/{args.concept}/'):
        continue
    if not args.concept and filename.startswith('concepts/'):
        continue
    document = pymupdf.open(root / filename)
    assert len(document) == count, (filename, len(document), count)
    text = '\n'.join(page.get_text() for page in document)
    assert 'Problem' in text and 'Solver' in text and 'garam@moai.co' in text
    assert 'On Your Mark' in text
    if count > 1:
        assert '64' in text
    else:
        assert '시간표' not in text and 'timetable' not in text.lower()
        assert text.index('EUM') < text.index('On Your Mark')
        assert ('두드리' if prefix.endswith('ko') else 'Dudri') in text[:text.index('On Your Mark')]
    trailer = 'https://kgr0831.github.io/assets/work/on-your-mark-trailer.mp4'
    assert any(link.get('uri') == trailer for page in document for link in page.get_links()), (filename, 'Trailer link')
    if prefix.endswith('ko'):
        assert '김가람' in text
    assert 'kimgalam0831@gmail.com' not in text and 'Orca' not in text
    assert '\ufffd' not in text
    pages = []
    for i, page in enumerate(document):
        assert len(page.get_text().strip()) > 55, (filename, i, 'empty page')
        for link in page.get_links():
            destination = link.get('uri', '')
            assert '127.0.0.1' not in destination and 'localhost' not in destination, (filename, i, destination)
            assert '/portfolio/#page-' not in destination, (filename, i, 'TOC opens HTML')
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1.6, 1.6), alpha=False)
        target = out / f'{prefix}-{i+1:02d}.png'
        pix.save(target)
        pages.append({'page': i+1, 'width': round(page.rect.width,2), 'height': round(page.rect.height,2), 'characters': len(page.get_text()), 'links': len(page.get_links())})
    if count > 1:
        assert [link['page'] for link in document[1].get_links() if 'page' in link] == [2, 4, 6, 8], (filename, 'Internal PDF TOC destinations')
    report.append({'file': filename, 'pages': pages, 'characters': len(text), 'fontNames': sorted(set(font[3] for page in document for font in page.get_fonts()))})
    thumb_w = 480
    thumb_h = 270 if count > 1 else 679
    cols = 3 if count > 1 else 1
    rows = (count + cols - 1) // cols
    sheet = Image.new('RGB',(cols*(thumb_w+16)+16,rows*(thumb_h+38)+16),'#dce2d7')
    draw = ImageDraw.Draw(sheet)
    for i in range(count):
        im = Image.open(out / f'{prefix}-{i+1:02d}.png').convert('RGB')
        im = ImageOps.contain(im,(thumb_w,thumb_h))
        x = 16 + (i % cols)*(thumb_w+16)
        y = 16 + (i // cols)*(thumb_h+38)
        sheet.paste(im,(x,y))
        draw.text((x,y+thumb_h+6),f'{i+1:02d} / {count}',fill='#18392e')
    sheet.save(out / f'{prefix}-contact.png')
(root / args.out / 'pdf-verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2),encoding='utf8')
print(json.dumps([{'file':r['file'],'pages':len(r['pages']),'characters':r['characters'],'links':sum(p['links'] for p in r['pages']),'fonts':r['fontNames']} for r in report],ensure_ascii=False,indent=2))
