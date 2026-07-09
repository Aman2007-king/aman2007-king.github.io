# AiFileStudio.PRO

A free, browser-based file toolkit: PDF merge/split/rotate, JPG↔PDF, JPG↔PNG conversion, image resize with scan-style enhancement, OCR, a QR code generator, a local password generator, and an AI art generator.

Live at: https://aman2007-king.github.io/

## Architecture

Each tool has its own indexable URL (e.g. `/merge-pdf/`, `/split-pdf/`), like iLovePDF or similar sites — not a single-page app with JS tabs. This means each tool can be shared, bookmarked, and indexed by search engines individually, with its own title, meta description, and content.

```
/                       -> homepage (hub linking to every tool)
/merge-pdf/             -> Merge PDF
/split-pdf/             -> Split PDF
/rotate-pdf/            -> Rotate PDF
/jpg-to-pdf/            -> JPG to PDF
/jpg-to-png/            -> JPG to PNG
/resize-image/          -> Image Resizer
/image-to-text-ocr/     -> OCR
/ai-image-generator/    -> AI Art
/password-generator/    -> Password Generator
/qr-code-generator/     -> QR Code Generator
/privacy.html           -> Privacy Policy
/assets/style.css       -> shared stylesheet (all pages)
/assets/main.js         -> shared JS engine: nav rendering, chatbot, and all tool logic
generate_pages.py       -> regenerates the 10 tool pages from one template + per-tool content (edit this, not the individual index.html files, when updating shared page structure)
```

Each tool page only loads the specific library it needs (e.g. `pdf-lib` for PDF tools, `Tesseract.js` for OCR) instead of every library on every page.

### Adding a new tool

1. Add an entry to the `TOOLS` list in `assets/main.js` (for the nav) and to `TOOLS` in `generate_pages.py` (for the page content).
2. Add the tool's processing logic as a new branch in `processTask()` in `assets/main.js`.
3. Run `python3 generate_pages.py` to regenerate the page.
4. Add the new URL to `sitemap.xml`.

## How it works

Most tools process files entirely client-side using:

- [`pdf-lib`](https://pdf-lib.js.org/) — merge, split, rotate PDFs
- [`jsPDF`](https://github.com/parallax/jsPDF) — image → PDF
- [`Tesseract.js`](https://tesseract.projectnaptha.com/) — OCR
- [`QRCode.js`](https://davidshimjs.github.io/qrcodejs/) — QR code generation
- [`JSZip`](https://stuk.github.io/jszip/) — batch image download as .zip
- [Tailwind CSS](https://tailwindcss.com/) (via CDN) — styling
- [Font Awesome](https://fontawesome.com/) — icons

**Exception:** the AI Art tool sends your text prompt to a third-party image-generation API ([Pollinations AI](https://pollinations.ai/)) to produce the image — that one feature is not local-only.

Analytics/monetization: Google Analytics (GA4), Google Tag Manager, and Google AdSense are loaded on every page.

## Running locally

No build step is required to serve the site — it's all static files. Clone the repo and serve the folder with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

(Opening `index.html` directly via `file://` won't resolve the `/assets/...` root-relative paths — use a local server.)

## Known limitations / roadmap

- Tailwind is loaded via the Play CDN (fine for now, but a real build step would improve production performance as traffic grows).
- No automated tests.
- No Subresource Integrity (SRI) hashes on the third-party CDN scripts yet.

## License

See `LICENSE`.
