"""Derive optimized WebP images for the prototypes from the site's own photos.

Every source is a real photo already tracked in this repo. Nothing generated.
Run from the repo root:  python3 prototipos/_build/images.py
"""
import os
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

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

# Microcement and decorative-wall photos sent by Omar via AirDrop (20/10/2026).
# Originals stay outside the repo (AIRDROP_DIR, default ~/Downloads); only the
# developed WebP versions are committed. They are phone/WhatsApp photos, so they
# get a conservative development: crop away non-work clutter, tone-preserving
# autocontrast and light sharpening. No white-balance change, no retouching of
# the finish, no AI upscaling.
AIRDROP_DIR = Path(os.environ.get("AIRDROP_DIR", Path.home() / "Downloads"))
AIRDROP = {
    # Light microcement bathroom, 2021
    "mc-bano-general": ("aa320cb0-b7a9-41bb-99f1-f11a37c5d086.JPG", (0, 0, 1, 0.92)),
    "mc-bano-ducha-desague": ("8b1a9b4a-4c93-47bc-a585-b6be7455dcf3.JPG", (0, 0.06, 1, 1)),
    "mc-bano-ducha-esquina": ("417aac0f-6798-4685-b537-f80b947c462f.JPG", None),
    "mc-bano-encimera": ("52c6aae9-0788-43a3-8445-f51ed8a04a4a.JPG", (0, 0, 0.92, 1)),
    "mc-bano-banco": ("b4079b45-73a5-42b2-9b3c-ea1c3f804eae.JPG", (0, 0.12, 1, 1)),
    "mc-bano-mampara": ("dcde8011-e581-4060-a895-19a8b5532cdd.JPG", None),
    "mc-bano-murete": ("d3de01d8-4268-4915-bd4d-b254a4525abe.JPG", (0, 0, 0.94, 1)),
    "mc-bano-luz": ("686963c8-f13c-44d6-b416-5a9b72a4777f.JPG", None),
    "mc-bano-obra": ("66631351-7dad-4052-82fe-83b78ca49c20.JPG", None),
    # Dark grey microcement shower, 2024 (full-resolution HEIC)
    "mc-gris-pared": ("IMG_4079.HEIC", (0, 0.05, 0.76, 1)),
    "mc-gris-ducha": ("IMG_4080.HEIC", (0, 0.08, 0.82, 0.9)),
    # Decorative wall with clouding (estuco or microcement, unconfirmed)
    "deco-pared-aguas": ("5f549cb0-47b5-4b0b-91b7-b072fc4fa09d.JPG", (0.05, 0, 1, 0.72)),
    # Process
    "mc-proceso-base": ("ef735509-dd9e-4387-84d1-a591bb943184.JPG", (0.06, 0.08, 1, 1)),
    "mc-proceso-suelo": ("c93e661f-06dd-4a54-a66f-186e524441d2.JPG", (0, 0.12, 1, 1)),
    # Floors and terrace, 2021
    "mc-suelo-escalones": ("8c75070b-4aca-4373-a84f-677ab5ec2589.JPG", None),
    "mc-suelo-ladrillo": ("9adab94e-2c99-4e7f-bc05-d6690e2844eb.JPG", (0.08, 0, 0.92, 1)),
    "mc-suelo-salon": ("e0143c9e-2077-4ee6-b718-2a3edc24ea2c.JPG", None),
    "mc-terraza-escalera": ("3d0f0e96-5ff5-48a2-bd72-ea12798d3b68.JPG", (0, 0, 1, 0.86)),
    "mc-terraza": ("508d6e5c-0941-4913-b9ce-84e1364d3a26.JPG", (0, 0.08, 0.86, 0.88)),
}
MAX_SIDE = 1600

WIDTHS = (640, 1200)
QUALITY = 74


def open_any(path: Path) -> Image.Image:
    """Open JPEG/WebP directly; convert HEIC with macOS sips first."""
    if path.suffix.lower() == ".heic":
        tmp = Path(tempfile.mkdtemp()) / (path.stem + ".jpg")
        subprocess.run(["sips", "-s", "format", "jpeg", str(path), "--out", str(tmp)],
                       check=True, capture_output=True)
        path = tmp
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def develop(im: Image.Image) -> Image.Image:
    if max(im.size) > MAX_SIDE:
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    im = ImageOps.autocontrast(im, cutoff=0.3, preserve_tone=True)
    return im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))


def export(name: str, im: Image.Image) -> int:
    size = 0
    for width in WIDTHS:
        target = OUT / f"{name}-{width}.webp"
        copy = im.copy()
        if copy.width > width:
            copy = copy.resize((width, round(copy.height * width / copy.width)), Image.LANCZOS)
        copy.save(target, "WEBP", quality=QUALITY, method=6)  # Pillow writes no EXIF unless asked
        size += target.stat().st_size
    return size


def crop_to(im: Image.Image, crop) -> Image.Image:
    if not crop:
        return im
    w, h = im.size
    return im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for name, (src, crop) in PHOTOS.items():
        im = crop_to(ImageOps.exif_transpose(Image.open(ROOT / src)).convert("RGB"), crop)
        total += export(name, im)
        print(f"{name:28s} {im.width}x{im.height}  <- {src}")
    missing = [f for f, _ in AIRDROP.values() if not (AIRDROP_DIR / f).exists()]
    if missing:
        print(f"AirDrop originals not found in {AIRDROP_DIR}: {len(missing)} (kept existing WebP files)")
    else:
        for name, (src, crop) in AIRDROP.items():
            im = develop(crop_to(open_any(AIRDROP_DIR / src), crop))
            total += export(name, im)
            print(f"{name:28s} {im.width}x{im.height}  <- AirDrop {src}")
    print(f"{len(PHOTOS) + len(AIRDROP)} photos, {total / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
