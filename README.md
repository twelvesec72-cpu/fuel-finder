# Fuel Finder PWA

A dark-themed, mobile-first fuel station finder. Load any KML file, find the nearest station, search by name, or plan a route and see all stations along the way.

---

## Setup

### 1. Get a Google Maps API Key

1. Go to https://console.cloud.google.com/
2. Create a project (or select an existing one)
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Directions API**
   - **Geocoding API** (for typing addresses in Route mode)
4. Create an API key under **Credentials**
5. Restrict the key to your domain or IP for security

### 2. Add your API key

Open `index.html` and find **two** places that say:

```
YOUR_GOOGLE_MAPS_API_KEY_HERE
```

Replace both with your actual key:
- One is in the `GOOGLE_MAPS_API_KEY` constant at the top of the script
- One is in the `<script src="https://maps.googleapis.com/...">` tag at the bottom

### 3. Add icons (optional but recommended for full PWA)

Drop two PNG files alongside index.html:
- `icon-192.png` — 192×192 px app icon
- `icon-512.png` — 512×512 px app icon

You can use any fuel pump / gas station icon, or generate one at https://maskable.app/

### 4. Host it

The app must be served over **HTTPS** for GPS and PWA install to work.

Options:
- **GitHub Pages** — free, push the folder to a repo and enable Pages
- **Netlify** — drag-and-drop the folder at netlify.com
- **Cloudflare Pages** — free tier, connect a GitHub repo

Or run locally for testing:
```bash
npx serve .
# or
python3 -m http.server 8080
```

### 5. Install on your phone

Once hosted on HTTPS:
- **Android:** Open in Chrome → three-dot menu → "Add to Home Screen"
- **iOS:** Open in Safari → Share → "Add to Home Screen"

---

## Usage

| Feature | How to use |
|---|---|
| Load stations | Tap ☰ → drop or tap to load your `.kml` file |
| Find nearest | Tap 📍 → panel opens to Nearest tab |
| Search | ☰ → Search tab → type station name |
| Route mode | ☰ → Route tab → enter start + destination → Get Route |
| Navigate to station | Tap any pin on map → Navigate → |

---

## KML Format

The app reads standard KML `<Placemark>` elements with `<Point>` coordinates:

```xml
<Placemark>
  <name>Station Name</name>
  <Point>
    <coordinates>-93.1234,44.5678,0</coordinates>
  </Point>
</Placemark>
```

Both flat `<coordinates>` and nested `<Point><coordinates>` are supported.
