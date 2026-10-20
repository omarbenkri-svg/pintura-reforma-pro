"""Side-by-side original vs developed thumbnails for Omar's review (prototipos/revelado.html)."""
from pathlib import Path
import sys

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).parent))
import images  # noqa: E402

OUT = images.OUT / "revelado"
H = 420


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for name, (src, crop) in images.AIRDROP.items():
        orig = images.open_any(images.AIRDROP_DIR / src)
        dev = Image.open(images.OUT / f"{name}-1200.webp").convert("RGB")
        a = orig.copy(); a.thumbnail((10_000, H))
        b = dev.copy(); b.thumbnail((10_000, H))
        if crop:  # show the crop area on the original
            d = ImageDraw.Draw(a)
            d.rectangle([crop[0] * a.width, crop[1] * a.height, crop[2] * a.width - 1, crop[3] * a.height - 1],
                        outline=(220, 40, 30), width=3)
        sheet = Image.new("RGB", (a.width + b.width + 12, H), "white")
        sheet.paste(a, (0, 0)); sheet.paste(b, (a.width + 12, 0))
        sheet.save(OUT / f"{name}.webp", "WEBP", quality=70)
    print(f"{len(images.AIRDROP)} comparativas en {OUT}")


if __name__ == "__main__":
    main()
