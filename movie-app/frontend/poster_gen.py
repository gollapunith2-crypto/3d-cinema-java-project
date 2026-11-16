from PIL import Image, ImageDraw, ImageFont
import math, random

W, H = 500, 750

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def make_poster(filename, title, genre, top, bottom, accent, seed):
    random.seed(seed)
    img = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(img)
    # vertical gradient
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=lerp(top, bottom, t))
    # sun/glow disc
    cx, cy, r = int(W * 0.5), int(H * 0.42), int(W * 0.30)
    for rr in range(r, 0, -2):
        t = rr / r
        glow = lerp(accent, bottom, t * 0.85)
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=glow)
    d.ellipse([cx - r // 3, cy - r // 3, cx + r // 3, cy + r // 3], fill=lerp((255, 255, 255), accent, 0.25))
    # silhouette ridge lines
    base = int(H * 0.72)
    pts = []
    for x in range(0, W + 1, 6):
        y = base + int(math.sin(x * 0.017 + seed) * 34 + math.sin(x * 0.05 + seed * 2) * 15)
        pts.append((x, y))
    d.polygon(pts + [(W, H), (0, H)], fill=lerp(bottom, (0, 0, 0), 0.55))
    # star specks
    for _ in range(60):
        sx = random.randint(0, W - 1); sy = random.randint(0, int(H * 0.55))
        s = random.choice([1, 1, 1, 2])
        d.ellipse([sx, sy, sx + s, sy + s], fill=(255, 255, 255))
    # title text
    def font(sz, bold=True):
        try:
            return ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf", sz)
        except Exception:
            return ImageFont.load_default()
    # wrap title to lines
    words = title.split()
    lines, cur = [], ""
    maxw = W - 70
    f = font(44)
    for w_word in words:
        test = (cur + " " + w_word).strip()
        if d.textlength(test, font=f) <= maxw:
            cur = test
        else:
            lines.append(cur); cur = w_word
    if cur: lines.append(cur)
    # resize font until lines fit
    size = 44
    while size > 20:
        f = font(size)
        if all(d.textlength(l, font=f) <= maxw for l in lines): break
        size -= 2
    f = font(size); fg = font(17, bold=False)
    y = int(H * 0.60)
    for l in lines:
        tw = d.textlength(l, font=f)
        d.text(((W - tw) / 2, y), l, font=f, fill=(255, 255, 255))
        y += int(size * 1.15)
    gy = y + 6
    tw = d.textlength(genre.upper(), font=fg)
    d.text(((W - tw) / 2, gy), genre.upper(), font=fg, fill=lerp(accent, (255, 255, 255), 0.35))
    # bottom tag strip
    d.rectangle([0, H - 46, W, H], fill=lerp(bottom, (0, 0, 0), 0.5))
    tag = "A  V A N T A G E   P R E S E N T S"
    ftag = font(13, bold=False)
    tw = d.textlength(tag, font=ftag)
    d.text(((W - tw) / 2, H - 32), tag, font=ftag, fill=(220, 220, 230))
    img.save(filename, "JPEG", quality=88, optimize=True)
    print("wrote", filename)

make_poster("public/posters/kalki.jpg",   "KALKI 2898 AD", "Sci-Fi / Action",   (42, 12, 58), (120, 45, 15), (255, 150, 60), 7)
make_poster("public/posters/pushpa2.jpg", "PUSHPA 2",      "Action / Thriller", (10, 35, 25), (35, 15, 8),   (255, 90, 40),  19)
make_poster("public/posters/devara.jpg",  "DEVARA",        "Action / Drama",    (35, 8, 12),  (15, 20, 45),  (240, 70, 70),  31)
make_poster("public/posters/og.jpg",      "OG",            "Action / Gangster", (18, 22, 38), (55, 10, 10),  (255, 200, 80), 43)
make_poster("public/posters/spirit.jpg",  "SPIRIT",        "Action / Cop Drama",(8, 30, 40),  (25, 10, 30),  (110, 220, 255),59)
