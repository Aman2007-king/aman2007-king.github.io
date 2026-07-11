import os

SITE = "https://aman2007-king.github.io"

LIB_URLS = {
    "pdf-lib": "https://unpkg.com/pdf-lib/dist/pdf-lib.min.js",
    "jspdf": "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
    "tesseract": "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
    "qrcode": "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
    "jszip": "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
    "html2canvas": "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
    "pdfjs": "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    "jsbarcode": "https://cdn.jsdelivr.net/npm/jsbarcode/dist/JsBarcode.all.min.js",
    "mediapipe": "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js",
}

TOOLS = [
    dict(
        mode="ai", slug="ai-image-generator", nav="AI Art",
        title="AI Image Generator", subtitle="Create images from text descriptions.",
        input_label="Describe the image you want", input_placeholder="e.g. a lighthouse at sunset, oil painting style",
        accept="", multiple=False, needs_file=False, needs_text=True, libs=[],
        about_heading="Free AI Image Generator",
        about_html="""<p>Type a description and generate an image in seconds. This tool sends your text prompt to <strong>Pollinations AI</strong>, a third-party image-generation service, to produce the artwork — this is the one AiFileStudio tool that isn't fully local, so avoid entering private or sensitive text into the prompt.</p>
        <p>Useful for mockups, social media graphics, blog headers, or just experimenting with an idea before commissioning real artwork. Generated images are yours to download and use; results vary in quality depending on how descriptive your prompt is — try including a style (e.g. "watercolor," "3D render," "cinematic") for more consistent results.</p>""",
        faq=[
            ("Is my prompt private?", "No — unlike our other tools, the AI Art generator sends your text prompt to Pollinations AI to create the image. Don't include confidential information in your prompt."),
            ("Can I use the generated images commercially?", "Generated images are yours to download. Review Pollinations AI's own terms if you plan to use images commercially, since the model's training data and licensing are outside our control."),
            ("Why did my image not match my prompt?", "AI image generation is probabilistic — more descriptive prompts (subject, style, lighting, mood) generally produce more consistent, on-target results."),
        ],
    ),
    dict(
        mode="resize", slug="resize-image", nav="Resize Image",
        title="Image Resizer", subtitle="Resize images locally, with optional scan enhancement.",
        input_label="Target width in pixels", input_placeholder="e.g. 800",
        accept="image/*", multiple=True, needs_file=True, needs_text=True, libs=["jszip"],
        about_heading="Free Local Image Resizer",
        about_html="""<p>Resize one or many images at once, entirely in your browser — nothing is uploaded to a server. Enter the target width in pixels and the height scales proportionally to preserve the image's aspect ratio.</p>
        <p>For scanned documents, the optional <strong>Document Enhancement</strong> panel lets you adjust brightness and contrast, apply a black-and-white "scan mode," and enable a light sharpening pass, so a resized photo of a page reads more clearly. Upload more than one image and AiFileStudio will batch-process them and hand you back a single ZIP file.</p>""",
        faq=[
            ("Does resizing upload my images anywhere?", "No. Resizing happens entirely on your device using the HTML5 canvas API — your images never leave your browser."),
            ("What's the maximum number of images I can resize at once?", "There's no hard-coded limit; it depends on your device's memory. A handful to a few dozen images at a time works comfortably on most modern browsers."),
            ("What does 'B&W Mode (Scan)' do?", "It converts each pixel to pure black or white based on brightness, which can make scanned text documents look cleaner and more print-like."),
        ],
    ),
    dict(
        mode="convert", slug="jpg-to-png", nav="JPG to PNG",
        title="JPG to PNG Converter", subtitle="Convert JPG images to PNG format, locally.",
        input_label="", input_placeholder="",
        accept="image/jpeg", multiple=False, needs_file=True, needs_text=False, libs=[],
        about_heading="Free JPG to PNG Converter",
        about_html="""<p>Convert a JPG (or JPEG) photo into a PNG file directly in your browser — no upload, no waiting on a server queue. PNG is a lossless format, so it's often preferred for logos, screenshots, and graphics that need transparency or sharp edges, while JPG is better for photographs where smaller file size matters more than pixel-perfect detail.</p>
        <p>This conversion happens instantly using the browser's built-in canvas rendering, then hands you a download link for the resulting PNG file.</p>""",
        faq=[
            ("Will converting to PNG add transparency to my JPG?", "No — JPG files don't store transparency information, so the converted PNG will have the same solid background as the original photo."),
            ("Does PNG conversion reduce image quality?", "No, PNG is lossless, so no additional compression artifacts are introduced during conversion. The resulting file will typically be larger than the original JPG."),
        ],
    ),
    dict(
        mode="merge", slug="merge-pdf", nav="Merge PDF",
        title="Merge PDF", subtitle="Combine multiple PDF files into one.",
        input_label="", input_placeholder="",
        accept="application/pdf", multiple=True, needs_file=True, needs_text=False, libs=["pdf-lib"],
        about_heading="Free PDF Merger — Combine PDFs Locally",
        about_html="""<p>Select two or more PDF files and AiFileStudio will combine them into a single document, in the order you selected them. All of the merging happens locally using the <code class="text-blue-400">pdf-lib</code> library — your files are never uploaded to a server, which matters if you're combining contracts, statements, or other sensitive paperwork.</p>
        <p>The merged file preserves each source PDF's pages exactly as they were, appended one after another. Once merging is complete, the combined PDF downloads straight to your device.</p>""",
        faq=[
            ("Is there a limit on how many PDFs I can merge?", "No fixed limit, though very large files are bounded by your device's available memory since everything happens in-browser."),
            ("Does merging affect the quality or formatting of my PDFs?", "No — pages are copied as-is from each source file, so formatting, fonts, and images stay exactly the same."),
            ("Are my PDFs uploaded to a server?", "No. Merging is done entirely client-side; your files stay on your device throughout."),
        ],
    ),
    dict(
        mode="split", slug="split-pdf", nav="Split PDF",
        title="Split PDF", subtitle="Extract specific pages from a PDF.",
        input_label="Page numbers to extract", input_placeholder="e.g. 1, 3, 5",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=True, libs=["pdf-lib"],
        about_heading="Free PDF Splitter — Extract Pages Locally",
        about_html="""<p>Pull specific pages out of a PDF and save them as a new, smaller document — for example, extracting just the signature page from a long contract, or pulling out one chapter from a report. Enter the page numbers you want (comma-separated, e.g. <code class="text-blue-400">1, 3, 5</code>) and AiFileStudio builds a new PDF containing just those pages, in your browser.</p>
        <p>Nothing is uploaded to a server — the original PDF and the extracted pages both stay on your device.</p>""",
        faq=[
            ("Can I extract a range of pages, like 1 to 5?", "Currently you list individual page numbers separated by commas (e.g. 1, 2, 3, 4, 5). Range syntax (like 1-5) isn't supported yet."),
            ("What happens if I enter a page number that doesn't exist?", "Invalid page numbers are automatically skipped; if none of the numbers you entered are valid, you'll get an error message instead of an empty file."),
        ],
    ),
    dict(
        mode="rotate", slug="rotate-pdf", nav="Rotate PDF",
        title="Rotate PDF", subtitle="Rotate every page in a PDF by 90°.",
        input_label="", input_placeholder="",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=False, libs=["pdf-lib"],
        about_heading="Free PDF Rotator",
        about_html="""<p>Fix a PDF that was scanned sideways or upside down. Upload the file and AiFileStudio rotates every page by 90 degrees, then hands you back the corrected document — all processed locally in your browser, so the file never touches a server.</p>
        <p>Run the tool again on the result if you need to rotate a full 180 degrees or 270 degrees.</p>""",
        faq=[
            ("Can I rotate just one page instead of the whole document?", "Not currently — this tool rotates every page in the PDF by the same amount. Per-page rotation may be added in a future update."),
            ("Can I rotate in the other direction?", "Running the tool repeatedly rotates 90° further each time, so three passes gets you a 270° rotation, which is equivalent to a single 90° turn the other way."),
        ],
    ),
    dict(
        mode="pdf", slug="jpg-to-pdf", nav="JPG to PDF",
        title="JPG to PDF Converter", subtitle="Convert images into a single PDF document.",
        input_label="", input_placeholder="",
        accept="image/*", multiple=True, needs_file=True, needs_text=False, libs=["jspdf"],
        about_heading="Free JPG to PDF Converter",
        about_html="""<p>Turn one or more photos or scanned images into a single PDF document — handy for submitting scanned forms, assembling a photo packet, or archiving receipts. Select your images in the order you want them to appear, and AiFileStudio places each one on its own page.</p>
        <p>Conversion happens locally using the <code class="text-blue-400">jsPDF</code> library, so your images aren't uploaded anywhere before becoming a PDF.</p>""",
        faq=[
            ("What image formats can I convert to PDF?", "JPG/JPEG works best; most common image formats your browser can display will also work."),
            ("Can I reorder images after selecting them?", "Currently images are placed in the order your file picker returns them (usually the order you selected/highlighted them in). Re-select files in your desired order if needed."),
        ],
    ),
    dict(
        mode="deletepages", slug="delete-pdf-pages", nav="Delete Pages",
        title="Delete PDF Pages", subtitle="Remove specific pages from a PDF.",
        input_label="Page numbers to delete", input_placeholder="e.g. 2, 4, 7",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=True, libs=["pdf-lib"],
        about_heading="Free Tool to Delete PDF Pages",
        about_html="""<p>Remove one or more pages from a PDF without touching the rest of the document. Enter the page numbers you want gone (comma-separated, e.g. <code class="text-blue-400">2, 4, 7</code>) and AiFileStudio builds a new copy of the PDF with just those pages removed — all processed locally using <code class="text-blue-400">pdf-lib</code>, so the file never leaves your device.</p>
        <p>Useful for stripping a blank scanned page, a duplicate, or an outdated cover sheet out of a longer document without re-assembling the whole thing.</p>""",
        faq=[
            ("Can I delete every page?", "No — at least one page has to remain, otherwise you'd end up with an empty PDF."),
            ("Does this change the page numbering of the remaining pages?", "The remaining pages shift up to fill the gap (e.g. deleting page 2 makes the old page 3 the new page 2), but their content is otherwise untouched."),
        ],
    ),
    dict(
        mode="extractpages", slug="extract-pdf-pages", nav="Extract Pages",
        title="Extract PDF Pages", subtitle="Save specific pages as separate PDF files.",
        input_label="Pages to extract (range or list)", input_placeholder="e.g. 2-5 or 1, 3, 5",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=True, libs=["pdf-lib", "jszip"],
        about_heading="Free Tool to Extract PDF Pages",
        about_html="""<p>Pull pages out of a PDF and save <strong>each one as its own separate PDF file</strong>, delivered together in a ZIP. Enter a range (e.g. <code class="text-blue-400">2-5</code>) or a comma-separated list (e.g. <code class="text-blue-400">1, 3, 5</code>), and AiFileStudio creates one standalone PDF per page you selected.</p>
        <p>This is different from <a href="/split-pdf/" class="text-blue-500 underline">Split PDF</a>, which combines your selected pages into a single new document — use Extract Pages when you need each page as its own individual file instead.</p>""",
        faq=[
            ("How is this different from Split PDF?", "Split PDF combines the pages you choose into one new document. Extract Pages gives you each selected page as its own separate PDF file, bundled in a ZIP."),
            ("Can I use a range and a list together?", "Currently you use one format per run — either a range like 2-5, or a comma list like 1, 3, 5."),
        ],
    ),
    dict(
        mode="reorder", slug="reorder-pdf-pages", nav="Reorder Pages",
        title="Reorder PDF Pages", subtitle="Rearrange the page order of a PDF.",
        input_label="New page order", input_placeholder="e.g. 3, 1, 2",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=True, libs=["pdf-lib"],
        about_heading="Free Tool to Reorder PDF Pages",
        about_html="""<p>Rearrange the pages of a PDF into a new order — handy for fixing a scan that came out of sequence, or reordering slides/sections before sharing a document. Enter every page number in the order you want them, separated by commas (e.g. <code class="text-blue-400">3, 1, 2</code> for a 3-page document).</p>
        <p>Every original page number must appear exactly once — AiFileStudio checks this and tells you the expected count if something's off, before building the reordered PDF locally in your browser.</p>""",
        faq=[
            ("What if I only want to move one page?", "You still need to list every page number, in the full new order — e.g. for a 5-page PDF, moving page 5 to the front is 5, 1, 2, 3, 4."),
            ("What happens if I leave out a page number?", "You'll get an error telling you how many pages the PDF has — every page must be included exactly once."),
        ],
    ),
    dict(
        mode="pagenumbers", slug="add-page-numbers", nav="Page Numbers",
        title="Add Page Numbers to PDF", subtitle="Stamp sequential page numbers onto every page.",
        input_label="", input_placeholder="",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=False, libs=["pdf-lib"],
        about_heading="Free Tool to Add Page Numbers to a PDF",
        about_html="""<p>Stamp a page number at the bottom-center of every page in a PDF — useful before printing or submitting a long document. Numbering starts at 1 and runs through the full document, processed locally with <code class="text-blue-400">pdf-lib</code>.</p>
        <p>The numbers are added as a new text layer on top of your existing content, so the rest of the page is untouched.</p>""",
        faq=[
            ("Can I choose where the page numbers appear?", "Currently they're placed bottom-center on every page. Custom position/style options may be added later."),
            ("Can I start numbering from something other than 1?", "Not yet — numbering currently always starts at 1 on the first page."),
        ],
    ),
    dict(
        mode="watermark", slug="watermark-pdf", nav="Watermark",
        title="Watermark PDF", subtitle="Stamp text diagonally across every page.",
        input_label="Watermark text", input_placeholder="e.g. CONFIDENTIAL or DRAFT",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=True, libs=["pdf-lib"],
        about_heading="Free PDF Watermark Tool",
        about_html="""<p>Stamp a semi-transparent diagonal text watermark — like "CONFIDENTIAL," "DRAFT," or your company name — across every page of a PDF. Processing happens locally using <code class="text-blue-400">pdf-lib</code>, so the document isn't uploaded anywhere to add the watermark.</p>
        <p>Useful for marking draft versions of a document before final review, or labeling copies shared for a specific limited purpose.</p>""",
        faq=[
            ("Can I change the watermark's color or size?", "Not yet through the interface — the watermark currently renders as gray, semi-transparent, 45-degree text sized to fit the page."),
            ("Does the watermark cover up my content?", "It's rendered at reduced opacity specifically so the underlying content stays legible underneath."),
        ],
    ),
    dict(
        mode="crop", slug="crop-pdf", nav="Crop PDF",
        title="Crop PDF", subtitle="Trim margins from every page of a PDF.",
        input_label="Margins to trim: top, right, bottom, left (%)", input_placeholder="e.g. 5, 5, 5, 5",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=True, libs=["pdf-lib"],
        about_heading="Free PDF Cropping Tool",
        about_html="""<p>Trim excess margins from every page of a PDF by entering how much to cut from each side, as a percentage of the page size — for example <code class="text-blue-400">5, 5, 5, 5</code> trims 5% off the top, right, bottom, and left of every page. This adjusts the PDF's crop box locally using <code class="text-blue-400">pdf-lib</code>, so the file isn't uploaded anywhere.</p>
        <p>Useful for removing wide scanner margins, cutting off a printer's crop marks, or tightening up a page before printing or presenting.</p>""",
        faq=[
            ("Can I crop each side by a different amount?", "Yes — the four numbers you enter correspond to top, right, bottom, and left independently."),
            ("Does cropping delete the trimmed content permanently?", "Cropping adjusts the PDF's visible crop box; most viewers will only show the cropped area. Content just outside the new boundary is typically no longer visible or printed."),
        ],
    ),
    dict(
        mode="compress", slug="compress-pdf", nav="Compress PDF",
        title="Compress PDF", subtitle="Reduce a PDF's file size.",
        input_label="", input_placeholder="",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=False, libs=["pdf-lib"],
        about_heading="Free PDF Compressor",
        about_html="""<p>Shrink a PDF's file size using structural compression (object streams), applied locally with <code class="text-blue-400">pdf-lib</code> — the file isn't uploaded anywhere to be compressed. AiFileStudio shows you the before/after size so you can see exactly how much was saved.</p>
        <p><strong>Honest limitation:</strong> this doesn't re-encode embedded images, which is usually where most of a PDF's file size comes from. PDFs that are mostly text and vector content will shrink more than PDFs full of high-resolution photos — for those, compressing the images before building the PDF (e.g. with our <a href="/image-compressor/" class="text-blue-500 underline">Image Compressor</a>) will do more.</p>""",
        faq=[
            ("Why didn't my PDF get much smaller?", "If your PDF's size mainly comes from embedded high-resolution images, structural compression alone won't reduce it much — image data isn't re-encoded by this tool."),
            ("Will compression reduce quality?", "No — this method doesn't touch the visual content of your PDF, only the underlying file structure, so there's no quality loss."),
        ],
    ),
    dict(
        mode="viewer", slug="pdf-viewer", nav="PDF Viewer",
        title="PDF Viewer", subtitle="View a PDF's pages directly in your browser.",
        input_label="", input_placeholder="",
        accept="application/pdf", multiple=False, needs_file=True, needs_text=False, libs=["pdfjs"],
        about_heading="Free Online PDF Viewer",
        about_html="""<p>Open and view a PDF directly in your browser using <code class="text-blue-400">pdf.js</code> — no software installation, no account, and the file isn't uploaded to a server to be displayed. Every page renders as an image you can scroll through right on this page.</p>
        <p>Handy for quickly checking the contents of a PDF you don't want to fully download and open in a separate app.</p>""",
        faq=[
            ("Can I edit the PDF here?", "No — this tool is read-only viewing. Use the other AiFileStudio PDF tools (merge, split, watermark, etc.) to modify a PDF."),
            ("Is there a page limit?", "No hard limit, but very long PDFs will take longer to render since every page is drawn to a canvas in your browser."),
        ],
    ),
    dict(
        mode="imgcompress", slug="image-compressor", nav="Image Compressor",
        title="Image Compressor", subtitle="Shrink image file size by adjusting quality.",
        input_label="Quality (1-100, lower = smaller file)", input_placeholder="e.g. 70",
        accept="image/*", multiple=True, needs_file=True, needs_text=True, libs=["jszip"],
        about_heading="Free Local Image Compressor",
        about_html="""<p>Reduce an image's file size by re-encoding it as a JPEG at a quality level you choose — lower quality means a smaller file, at the cost of some visual detail. Processing happens locally on the HTML5 canvas, so images aren't uploaded anywhere. Select multiple images and AiFileStudio batches them into a ZIP.</p>
        <p>A quality around 60-80 is usually a reasonable balance between file size and visual quality for photos; go lower if file size matters more than appearance.</p>""",
        faq=[
            ("Does this resize my image too?", "No — dimensions stay the same; only the compression quality changes. Use the <a href='/resize-image/' class='text-blue-500 underline'>Resize Image</a> tool if you also want to change dimensions."),
            ("What quality setting should I use?", "60-80 is a reasonable starting point for photos. Go lower for maximum size reduction if some quality loss is acceptable."),
        ],
    ),
    dict(
        mode="favicon", slug="favicon-generator", nav="Favicon Generator",
        title="Favicon Generator", subtitle="Turn an image into a full set of favicon sizes.",
        input_label="", input_placeholder="",
        accept="image/*", multiple=False, needs_file=True, needs_text=False, libs=["jszip"],
        about_heading="Free Favicon Generator",
        about_html="""<p>Upload a logo or image and get back a complete set of favicon sizes — 16×16, 32×32, 48×48, a 180×180 Apple touch icon, and 192×192 / 512×512 Android Chrome icons — plus a ready-to-use <code class="text-blue-400">site.webmanifest</code> file, all bundled in a ZIP. Everything is generated locally on the HTML5 canvas.</p>
        <p>A square source image (ideally 512×512 or larger) gives the cleanest results — non-square images get stretched to fit each square icon size.</p>""",
        faq=[
            ("What size source image should I upload?", "A square image at least 512×512 pixels gives the best results across all generated sizes."),
            ("How do I actually use these files on my site?", "Drop the generated PNG files into your site's root folder and link them from your HTML <head> (e.g. <link rel=\"icon\" href=\"/favicon-32x32.png\">), or reference the included site.webmanifest for the Android/PWA icons."),
        ],
    ),
    dict(
        mode="barcode", slug="barcode-generator", nav="Barcode Generator",
        title="Barcode Generator", subtitle="Turn text or numbers into a scannable barcode.",
        input_label="Text or number to encode", input_placeholder="e.g. 123456789012",
        accept="", multiple=False, needs_file=False, needs_text=True, libs=["jsbarcode"],
        about_heading="Free Barcode Generator",
        about_html="""<p>Generate a CODE128 barcode from any text or number, rendered locally using the <code class="text-blue-400">JsBarcode</code> library — nothing you type is sent anywhere. CODE128 is a widely supported format that can encode letters, numbers, and most symbols.</p>
        <p>Useful for inventory labels, asset tags, or any situation where you need a quick scannable code that isn't a QR code.</p>""",
        faq=[
            ("Can I generate other barcode formats like EAN-13 or UPC?", "Currently this tool generates CODE128 only, which covers most general-purpose use cases. Other formats may be added later."),
            ("Is this the same as a QR code?", "No — barcodes here are the traditional 1D striped format (CODE128). For QR codes, use our <a href='/qr-code-generator/' class='text-blue-500 underline'>QR Code Generator</a> instead."),
        ],
    ),
    dict(
        mode="bgremove", slug="background-remover", nav="Background Remover",
        title="Background Remover", subtitle="Remove or replace the background from a photo of a person.",
        input_label="", input_placeholder="",
        accept="image/*", multiple=False, needs_file=True, needs_text=False, libs=["mediapipe"],
        about_heading="Free Background Remover (Photos of People)",
        about_html="""<p><strong>Honest scope:</strong> this tool uses Google's MediaPipe Selfie Segmentation model, running locally in your browser, to separate a person from the background of a photo. It's built specifically for photos containing people — it is not a general-purpose object background remover, and results on other subjects (products, animals, landscapes) will likely be poor or unpredictable.</p>
        <p>Once the background is removed, you can leave it transparent or swap in a solid color — white, red, blue, green, black, or any custom color — using the swatches above the upload box. The output is generated entirely on your device — your photo isn't uploaded to a server, though the segmentation model itself is downloaded from Google's CDN the first time you use this tool.</p>""",
        faq=[
            ("Will this work on photos of objects or animals?", "Not reliably — this specific tool is built on a person-segmentation model, so it's tuned for human subjects. Results on other subjects can be inconsistent."),
            ("Can I set a solid color background instead of transparent?", "Yes — pick from the White, Red, Blue, Green, or Black swatches, or use the custom color picker, before running the tool. Leave it on the checkered 'Transparent' swatch for a transparent PNG."),
            ("Why does this take longer than your other tools?", "It downloads and runs a machine learning model in your browser the first time you use it, which takes more time than the simpler canvas-based tools."),
        ],
    ),
    dict(
        mode="txt2pdf", slug="txt-to-pdf", nav="TXT to PDF",
        title="TXT to PDF Converter", subtitle="Turn plain text into a downloadable PDF.",
        input_label="Paste your text", input_placeholder="Paste or type your text here...",
        accept="", multiple=False, needs_file=False, needs_text=True, libs=["jspdf"],
        about_heading="Free TXT to PDF Converter",
        about_html="""<p>Paste in plain text and get back a formatted, downloadable PDF — no file upload needed, since you're typing or pasting the text directly. Text wraps automatically to fit the page width using <code class="text-blue-400">jsPDF</code>, running entirely in your browser.</p>
        <p>Handy for quickly turning notes, a draft, or copied text into a shareable PDF without opening a full word processor.</p>""",
        faq=[
            ("Does this preserve text formatting like bold or bullet points?", "No — this converts plain text only. Rich formatting (bold, headings, images) isn't supported; try HTML to PDF if you need that."),
            ("Is there a length limit?", "No hard limit — very long text will simply flow across multiple pages."),
        ],
    ),
    dict(
        mode="html2pdf", slug="html-to-pdf", nav="HTML to PDF",
        title="HTML to PDF Converter", subtitle="Render HTML markup into a downloadable PDF.",
        input_label="Paste your HTML", input_placeholder="<h1>Hello</h1><p>Some content...</p>",
        accept="", multiple=False, needs_file=False, needs_text=True, libs=["jspdf", "html2canvas"],
        about_heading="Free HTML to PDF Converter",
        about_html="""<p>Paste in a snippet of HTML and AiFileStudio renders it in your browser, then captures it as an image and places it into a downloadable PDF, using <code class="text-blue-400">html2canvas</code> and <code class="text-blue-400">jsPDF</code>. Basic tags (headings, paragraphs, lists, inline styles) render as they would in a browser.</p>
        <p>Note that because this renders through an image capture, the output is a picture of your HTML rather than selectable/searchable PDF text — good for quick visual snapshots, not ideal for long text-heavy documents (use TXT to PDF for that instead).</p>""",
        faq=[
            ("Will external CSS or JavaScript in my HTML work?", "External stylesheets and scripts generally won't load in this sandboxed render — stick to inline styles for reliable results."),
            ("Is the resulting PDF text searchable?", "No — since it's rendered as a captured image, the text in the PDF isn't selectable or searchable. For real text-based PDFs, use TXT to PDF instead."),
        ],
    ),
    dict(
        mode="ocr", slug="image-to-text-ocr", nav="OCR Text",
        title="OCR: Image to Text", subtitle="Extract text from images or scanned pages.",
        input_label="", input_placeholder="",
        accept="image/*", multiple=False, needs_file=True, needs_text=False, libs=["tesseract"],
        about_heading="Free OCR Tool — Image to Text",
        about_html="""<p>Extract editable text from a photo or scanned image using <strong>Tesseract.js</strong>, an open-source OCR (Optical Character Recognition) engine that runs directly in your browser. Upload an image, and AiFileStudio scans it and returns the text it finds in an editable box you can copy from.</p>
        <p>For scanned documents with low contrast or a slight skew, try the <strong>Document Enhancement</strong> sliders (brightness, contrast, and B&W scan mode) before running OCR — cleaner input generally produces more accurate text extraction.</p>""",
        faq=[
            ("How accurate is the OCR?", "Accuracy depends heavily on image quality — clear, well-lit, high-contrast text recognizes best. Blurry, low-resolution, or heavily stylized text will produce more errors."),
            ("Does OCR work on handwriting?", "Tesseract.js is optimized for printed text; handwriting recognition is unreliable and not recommended."),
            ("Is my image uploaded to a server for OCR?", "No — Tesseract.js runs the recognition model entirely in your browser."),
        ],
    ),
    dict(
        mode="pass", slug="password-generator", nav="Key Gen",
        title="Password Generator", subtitle="Generate strong, random passwords locally.",
        input_label="", input_placeholder="",
        accept="", multiple=False, needs_file=False, needs_text=False, libs=[],
        about_heading="Free Secure Password Generator",
        about_html="""<p>Generate a strong, random password using your browser's built-in cryptographically secure random number generator (<code class="text-blue-400">window.crypto.getRandomValues</code>) — not a predictable pseudo-random function. Nothing is sent anywhere; the password is generated and displayed entirely on your device.</p>
        <p>Use the slider to choose a length between 8 and 64 characters. Passwords include upper and lowercase letters, numbers, and symbols, and deliberately exclude visually ambiguous characters (like <code class="text-blue-400">0</code>/<code class="text-blue-400">O</code> or <code class="text-blue-400">l</code>/<code class="text-blue-400">1</code>) to reduce transcription errors.</p>""",
        faq=[
            ("Is this password generator actually secure?", "Yes — it uses the Web Crypto API's cryptographically secure random values, generated locally. The password is never transmitted anywhere."),
            ("How long should my password be?", "Longer is generally better; 16+ characters is a reasonable default for most accounts, and use a unique password per site along with a password manager."),
        ],
    ),
    dict(
        mode="qr", slug="qr-code-generator", nav="QR Studio",
        title="QR Code Generator", subtitle="Turn a link or text into a QR code.",
        input_label="Text or URL to encode", input_placeholder="e.g. https://example.com",
        accept="", multiple=False, needs_file=False, needs_text=True, libs=["qrcode"],
        about_heading="Free QR Code Generator",
        about_html="""<p>Turn any link or short text into a scannable QR code, generated instantly in your browser. Useful for business cards, printed flyers, Wi-Fi sharing, or linking a physical object to a webpage.</p>
        <p>The QR code is rendered locally using the QRCode.js library — the text you enter isn't sent to a server to generate the code.</p>""",
        faq=[
            ("Can I download the QR code as an image?", "Right-click (or long-press on mobile) the generated QR code and choose 'Save image' to download it."),
            ("Is there a character limit for what I can encode?", "QR codes can technically hold a few thousand characters, but shorter text and URLs produce simpler, more reliably scannable codes."),
        ],
    ),
]

TOOL_PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{meta_desc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{canonical}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title} | AiFileStudio.PRO">
    <meta name="twitter:description" content="{meta_desc}">
    <meta name="twitter:image" content="{site}/ag-image.png">
    <meta property="og:title" content="{title} | AiFileStudio.PRO">
    <meta property="og:description" content="{meta_desc}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{canonical}">
    <meta property="og:image" content="{site}/ag-image.png">
    <meta name="google-adsense-account" content="ca-pub-1186506015762858">
    <title>{title} | AiFileStudio.PRO</title>
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#050507">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="icon" href="/icon-192.png" type="image/png">
    <script type="application/ld+json">{schema_json}</script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-6H0T540P06"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-6H0T540P06');
    </script>
    <script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':
    new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    }})(window,document,'script','dataLayer','GTM-T9JJ9N9L');</script>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1186506015762858" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to content</a>
<div style="display: flex; align-items: center; justify-content: center; padding: 15px; background-color: #000; border-bottom: 2px solid #007bff; gap: 20px;">
    <img src="/ag-image.png" alt="AiFileStudio Logo" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
    <div>
        <a href="/" style="text-decoration:none;"><p style="color: #ffffff; font-size: 1.8rem; font-weight: 800; margin: 0; line-height: 1;">AiFileStudio<span style="color: #007bff;">.PRO</span></p></a>
        <p style="color: #888; font-size: 0.8rem; margin: 5px 0 0 0;">Secure. Local. Professional.</p>
    </div>
</div>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9JJ9N9L" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<div class="mobile-header" id="mobile-header-slot"></div>

<aside id="main-sidebar" aria-label="Tool navigation"></aside>

<main id="main-content" tabindex="-1" onclick="closeSidebarMobile()">
    <div class="mb-8">
        <nav class="text-xs text-gray-600 mb-3" aria-label="Breadcrumb"><a href="/" class="hover:text-blue-500">Home</a> / <span class="text-gray-400">{title}</span></nav>
        <h1 class="text-3xl font-bold">{title}</h1>
        <p class="text-gray-500 text-sm">{subtitle}</p>
    </div>

    <div class="cyber-card">
        <div id="standard-inputs">
            <div id="text-field-wrap">
                <label for="main-input" class="block text-[10px] font-bold text-gray-500 uppercase mb-3">{input_label}</label>
                <textarea id="main-input" placeholder="{input_placeholder}" class="w-full bg-black border border-gray-800 p-4 rounded-xl text-sm mb-4 text-white focus:outline-none focus:border-blue-500 h-20"></textarea>
            </div>

            <div id="enhancement-ui" class="hidden mb-6 p-4 bg-black/40 rounded-xl border border-gray-800">
                <p class="text-[10px] font-bold text-blue-500 uppercase mb-4 tracking-tighter">Document Enhancements</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="doc-bright" class="text-[9px] text-gray-500 block mb-1">BRIGHTNESS</label>
                        <input type="range" id="doc-bright" min="0.5" max="2" step="0.1" value="1" class="w-full accent-blue-600">
                    </div>
                    <div>
                        <label for="doc-contrast" class="text-[9px] text-gray-500 block mb-1">CONTRAST</label>
                        <input type="range" id="doc-contrast" min="0.5" max="3" step="0.1" value="1" class="w-full accent-blue-600">
                    </div>
                </div>
                <div class="flex items-center gap-4 mt-4">
                    <label class="flex items-center gap-2 text-xs text-gray-400">
                        <input type="checkbox" id="doc-binarize"> B&W Mode (Scan)
                    </label>
                    <label class="flex items-center gap-2 text-xs text-gray-400">
                        <input type="checkbox" id="doc-upscale"> Super-Res
                    </label>
                </div>
            </div>

            <div id="bgcolor-ui" class="hidden mb-6 p-4 bg-black/40 rounded-xl border border-gray-800">
                <p class="text-[10px] font-bold text-blue-500 uppercase mb-4 tracking-tighter">Background Color</p>
                <div class="flex flex-wrap gap-3 items-center">
                    <button type="button" class="bg-swatch" data-color="transparent" style="background-image: repeating-conic-gradient(#666 0% 25%, #333 0% 50%) 50% / 12px 12px;" title="Transparent"></button>
                    <button type="button" class="bg-swatch" data-color="#ffffff" style="background-color:#ffffff;" title="White"></button>
                    <button type="button" class="bg-swatch" data-color="#ff0000" style="background-color:#ff0000;" title="Red"></button>
                    <button type="button" class="bg-swatch" data-color="#0000ff" style="background-color:#0000ff;" title="Blue"></button>
                    <button type="button" class="bg-swatch" data-color="#22c55e" style="background-color:#22c55e;" title="Green"></button>
                    <button type="button" class="bg-swatch" data-color="#000000" style="background-color:#000000;" title="Black"></button>
                    <input type="color" id="bgcolor-custom" value="#3b82f6" class="w-9 h-9 rounded cursor-pointer border-2 border-gray-700 bg-transparent" title="Custom color">
                </div>
            </div>

            <div id="file-field-wrap">
                <label for="main-file" class="block text-[10px] font-bold text-gray-500 uppercase mb-3">Upload {file_label}</label>
                <input type="file" id="main-file" {multiple_attr} accept="{accept}" class="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-800 file:text-white mb-4">
            </div>
        </div>

        <div id="password-ui" class="hidden text-center">
            <div id="pass-display-box" class="p-6 bg-black rounded-xl text-xl font-mono text-blue-400 border border-blue-900 mb-6">********</div>
            <input type="range" id="pass-length" min="8" max="64" value="16" class="w-full mb-4">
        </div>

        <button onclick="processTask()" class="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">Execute Task</button>
    </div>

    <div id="result-card" class="cyber-card mt-8 hidden text-center">
        <div id="loader-box" class="flex flex-col items-center py-10">
            <div class="loader mb-4"></div>
            <p class="text-xs font-mono text-gray-500" id="loader-text">ENGINE RUNNING...</p>
        </div>
        <div id="preview-area" class="flex flex-col items-center w-full"></div>
    </div>

    <section class="mt-16 border-t border-gray-900 pt-10">
        <h2 class="text-2xl font-bold text-blue-500 mb-6">{about_heading}</h2>
        <div class="space-y-4 text-gray-400 leading-relaxed text-sm">
            {about_html}
        </div>
    </section>

    <section id="faq" class="mt-12 p-8 bg-gray-900/20 border border-gray-800 rounded-2xl text-gray-400">
        <h3 class="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
        <div class="space-y-6 text-sm">
            {faq_html}
        </div>
    </section>

    <section class="mt-12">
        <h3 class="text-lg font-bold text-white mb-4">More Tools</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            {related_html}
        </div>
    </section>

    <footer class="p-6 text-center text-gray-600 text-[10px] mt-12">© 2026 AiFileStudio.pro</footer>
</main>

<div id="shared-widgets-slot"></div>

<script>const TOOL_MODE = '{mode}'; const TOOL_LIBS = {tool_libs_json};</script>
<script src="/assets/main.js"></script>
</body>
</html>
"""

def build_faq_html(faq):
    parts = []
    for q, a in faq:
        parts.append(f'<div><h4 class="text-blue-400 font-bold">{q}</h4><p>{a}</p></div>')
    return "\n            ".join(parts)

def build_related_html(current_slug):
    parts = []
    for t in TOOLS:
        if t["slug"] == current_slug:
            continue
        parts.append(f'<a href="/{t["slug"]}/" class="tool-card text-center text-xs"><i class="fas {ICON[t["mode"]]} text-blue-500 text-lg mb-2 block"></i>{t["nav"]}</a>')
    return "\n            ".join(parts)

def build_schema_json(t, meta_desc):
    faq_entities = [
        {
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {"@type": "Answer", "text": a},
        }
        for q, a in t["faq"]
    ]
    schema = [
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": f'{t["title"]} | AiFileStudio.PRO',
            "url": f'{SITE}/{t["slug"]}/',
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any (runs in browser)",
            "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
            "description": meta_desc,
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq_entities,
        },
    ]
    return json.dumps(schema)

ICON = {
    "ai": "fa-magic", "resize": "fa-expand", "convert": "fa-sync",
    "merge": "fa-layer-group", "split": "fa-scissors", "rotate": "fa-redo",
    "pdf": "fa-images", "ocr": "fa-font", "pass": "fa-key", "qr": "fa-qrcode",
    "deletepages": "fa-trash", "extractpages": "fa-file-export", "reorder": "fa-sort",
    "pagenumbers": "fa-list-ol", "watermark": "fa-stamp", "txt2pdf": "fa-file-lines",
    "html2pdf": "fa-code", "crop": "fa-crop", "compress": "fa-compress",
    "viewer": "fa-eye", "imgcompress": "fa-file-zipper",
    "favicon": "fa-star", "barcode": "fa-barcode", "bgremove": "fa-person",
}

os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)

import re as _re
import json

def plain_desc(about_html):
    first_p = about_html.split("<p>", 1)[1].split("</p>")[0]
    text = _re.sub(r'<[^>]+>', '', first_p)
    text = _re.sub(r'\s+', ' ', text).strip()
    if len(text) > 155:
        text = text[:155].rsplit(" ", 1)[0] + "..."
    return text

for t in TOOLS:
    meta_desc = plain_desc(t["about_html"])
    tool_libs_json = json.dumps([LIB_URLS[l] for l in t["libs"]])
    page = TOOL_PAGE_TEMPLATE.format(
        meta_desc=meta_desc,
        canonical=f'{SITE}/{t["slug"]}/',
        site=SITE,
        title=t["title"],
        subtitle=t["subtitle"],
        input_label=t["input_label"],
        input_placeholder=t["input_placeholder"],
        file_label="Files" if t["multiple"] else "File",
        multiple_attr="multiple" if t["multiple"] else "",
        accept=t["accept"],
        about_heading=t["about_heading"],
        about_html=t["about_html"],
        faq_html=build_faq_html(t["faq"]),
        related_html=build_related_html(t["slug"]),
        mode=t["mode"],
        tool_libs_json=tool_libs_json,
        schema_json=build_schema_json(t, meta_desc),
    )
    outdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), t["slug"])
    os.makedirs(outdir, exist_ok=True)
    with open(f"{outdir}/index.html", "w", encoding="utf-8") as f:
        f.write(page)
    print("wrote", f"{outdir}/index.html")

print("DONE:", len(TOOLS), "tool pages generated")
