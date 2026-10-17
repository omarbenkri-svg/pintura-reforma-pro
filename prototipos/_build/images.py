"""Derive optimized WebP images for the prototypes from the site's own photos.

Every source is a real photo already tracked in this repo. Nothing generated.
Run from the repo root:  python3 prototipos/_build/images.py
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "prototipos" / "shared" / "img"
REAL = "images/projects/real"

# name -> (source path relative to repo root, optional crop box as fractions l,t,r,b)
PHOTOS = {
    # Case 1: facade repair and painting
    "fachada-antes-general": (f"{REAL}/rehabilitacion-fachada-mataro-08.webp", (0, 0, 1, 0.72)),  # crops out parked cars and a readable plate
    "fachada-antes-pilar": (f"{REAL}/rehabilitacion-fachada-mataro-14.webp", None),
    "fachada-antes-detalle": (f"{REAL}/rehabilitacion-fachada-mataro-13.webp", None),
    "fachada-proceso-escalera": (f"{REAL}/rehabilitacion-fachada-mataro-19.webp", None),
    "fachada-proceso-pintor": (f"{REAL}/rehabilitacion-fachada-mataro-09.webp", None),
    "fachada-despues-general": (f"{REAL}/rehabilitacion-fachada-mataro-21.webp", None),
    "fachada-despues-muro": (f"{REAL}/rehabilitacion-fachada-mataro-22.webp", None),
    "fachada-despues-esquina": (f"{REAL}/rehabilitacion-fachada-mataro-26.webp", None),
    "fachada-despues-entrada": (f"{REAL}/rehabilitacion-fachada-mataro-23.webp", None),
    # Case 2: exterior wood joinery varnish (attic enclosure)
    "madera-antes-general": (f"{REAL}/barnizado-madera-atico-02.webp", None),
    "madera-antes-marco": (f"{REAL}/barnizado-madera-atico-04.webp", None),
    "madera-antes-detalle": (f"{REAL}/barnizado-madera-atico-07.webp", None),
    "madera-despues-terraza": (f"{REAL}/barnizado-madera-atico-09.webp", None),
    "madera-despues-marco": (f"{REAL}/barnizado-madera-atico-10.webp", None),
    "madera-despues-cristaleras": (f"{REAL}/barnizado-madera-atico-13.webp", None),
    "madera-despues-exterior": (f"{REAL}/restauracion-madera-exterior-01.webp", None),
    # Case 3: community garage
    "garaje-antes": (f"{REAL}/pintura-garaje-comunitario-01.webp", None),
    "garaje-despues-zocalo": (f"{REAL}/pintura-garaje-comunitario-02.webp", None),
    "garaje-despues-pasillo": (f"{REAL}/pintura-garaje-comunitario-04.webp", None),
    "garaje-despues-suelo": (f"{REAL}/pintura-garaje-comunitario-06.webp", None),
    # Secondary services (renovations)
    "reforma-escalera": (f"{REAL}/reforma-escalera-marmol-bano-05.webp", (0, 0.096, 1, 0.948)),  # phone screenshot bars
    "reforma-tejado": (f"{REAL}/reparacion-tejado-mataro-03.webp", None),
}

WIDTHS = (640, 1200)
QUALITY = 74


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for name, (src, crop) in PHOTOS.items():
        im = ImageOps.exif_transpose(Image.open(ROOT / src)).convert("RGB")
        if crop:
            w, h = im.size
            im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
        for width in WIDTHS:
            target = OUT / f"{name}-{width}.webp"
            copy = im.copy()
            if copy.width > width:
                copy = copy.resize((width, round(copy.height * width / copy.width)), Image.LANCZOS)
            copy.save(target, "WEBP", quality=QUALITY, method=6)
            total += target.stat().st_size
        print(f"{name:28s} {im.width}x{im.height}  <- {src}")
    print(f"{len(PHOTOS)} photos, {len(PHOTOS) * len(WIDTHS)} files, {total / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
