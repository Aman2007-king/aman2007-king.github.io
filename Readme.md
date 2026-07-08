# AiFileStudio.PRO

A free, browser-based file toolkit: PDF merge/split/rotate, JPG↔PDF, JPG↔PNG conversion, image resize with scan-style enhancement, OCR, a QR code generator, a local password generator, and an AI art generator.

Live at: https://aman2007-king.github.io/

## How it works

Everything runs in a single static page (`index.html`) — no backend server, no build step. Most tools process files entirely client-side using:

- [`pdf-lib`](https://pdf-lib.js.org/) — merge, split, rotate PDFs
- [`jsPDF`](https://github.com/parallax/jsPDF) — image → PDF
- [`Tesseract.js`](https://tesseract.projectnaptha.com/) — OCR
- [`QRCode.js`](https://davidshimjs.github.io/qrcodejs/) — QR code generation
- [`JSZip`](https://stuk.github.io/jszip/) — batch image download as .zip
- [Tailwind CSS](https://tailwindcss.com/) (via CDN) — styling
- [Font Awesome](https://fontawesome.com/) — icons

**Exception:** the AI Art tool sends your text prompt to a third-party image-generation API ([Pollinations AI](https://pollinations.ai/)) to produce the image — that one feature is not local-only.

Analytics/monetization: Google Analytics (GA4), Google Tag Manager, and Google AdSense are loaded on the page.

## Running locally

No build step is required — it's a static site. Clone the repo and open `index.html` in a browser, or serve the folder with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

## Files

| File | Purpose |
|---|---|
| `index.html` | The app |
| `privacy.html` | Privacy policy (linked from the sidebar) |
| `ads.txt` | AdSense publisher verification |
| `robots.txt` | Crawler rules + sitemap pointer |
| `sitemap.xml` | SEO sitemap |
| `ag-image.png` | Site logo |
| `google*.html` | Google Search Console verification file |

## Known limitations / roadmap

- Tailwind is loaded via the Play CDN (fine for now, but a real build step would improve production performance as traffic grows).
- No automated tests.
- Single-file architecture keeps things simple but will get harder to maintain as more tools are added — see issues/backlog for planned refactor toward per-tool pages.

## License

See `LICENSE`.
