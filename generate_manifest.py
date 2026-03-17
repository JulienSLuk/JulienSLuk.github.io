import json
from pathlib import Path

BASE_DIR = Path("assets/achievements")

CATEGORIES = {
    "certificates": BASE_DIR / "certificates",
    "awards": BASE_DIR / "awards",
    "testimonials": BASE_DIR / "testimonials",
}

VALID_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

manifest = {}

for category, folder in CATEGORIES.items():
    if folder.exists():
        files = [
            f.name for f in sorted(folder.iterdir())
            if f.is_file() and f.suffix.lower() in VALID_EXTENSIONS
        ]
    else:
        files = []

    manifest[category] = files

manifest_path = BASE_DIR / "manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

print(f"Manifest written to: {manifest_path}")