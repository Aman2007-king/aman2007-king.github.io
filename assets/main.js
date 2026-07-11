/* AiFileStudio.PRO - shared site engine
   Loaded on every page. Each tool page sets `const TOOL_MODE = '...'` before
   including this file so the right tool logic and UI wiring gets applied. */

let selectedBgColor = 'transparent';

const TOOLS = [
    { group: 'Creative', id: 'ai',      name: 'AI Art',        icon: 'fa-magic',       url: '/ai-image-generator/' },
    { group: 'Creative', id: 'resize',  name: 'Resize Image',  icon: 'fa-expand',      url: '/resize-image/' },
    { group: 'Creative', id: 'convert', name: 'JPG to PNG',    icon: 'fa-sync',        url: '/jpg-to-png/' },
    { group: 'PDF Toolkit', id: 'merge',        name: 'Merge PDF',      icon: 'fa-layer-group', url: '/merge-pdf/' },
    { group: 'PDF Toolkit', id: 'split',        name: 'Split PDF',      icon: 'fa-scissors',    url: '/split-pdf/' },
    { group: 'PDF Toolkit', id: 'rotate',       name: 'Rotate PDF',     icon: 'fa-redo',        url: '/rotate-pdf/' },
    { group: 'PDF Toolkit', id: 'pdf',          name: 'JPG to PDF',     icon: 'fa-images',      url: '/jpg-to-pdf/' },
    { group: 'PDF Toolkit', id: 'deletepages',  name: 'Delete Pages',   icon: 'fa-trash',       url: '/delete-pdf-pages/' },
    { group: 'PDF Toolkit', id: 'extractpages', name: 'Extract Pages',  icon: 'fa-file-export', url: '/extract-pdf-pages/' },
    { group: 'PDF Toolkit', id: 'reorder',      name: 'Reorder Pages',  icon: 'fa-sort',        url: '/reorder-pdf-pages/' },
    { group: 'PDF Toolkit', id: 'pagenumbers',  name: 'Page Numbers',   icon: 'fa-list-ol',     url: '/add-page-numbers/' },
    { group: 'PDF Toolkit', id: 'watermark',    name: 'Watermark PDF',  icon: 'fa-stamp',       url: '/watermark-pdf/' },
    { group: 'PDF Toolkit', id: 'crop',         name: 'Crop PDF',       icon: 'fa-crop',        url: '/crop-pdf/' },
    { group: 'PDF Toolkit', id: 'compress',     name: 'Compress PDF',   icon: 'fa-compress',    url: '/compress-pdf/' },
    { group: 'PDF Toolkit', id: 'viewer',       name: 'PDF Viewer',     icon: 'fa-eye',         url: '/pdf-viewer/' },
    { group: 'Creative', id: 'imgcompress', name: 'Image Compressor', icon: 'fa-file-zipper', url: '/image-compressor/' },
    { group: 'Creative', id: 'bgremove', name: 'Background Remover', icon: 'fa-person', url: '/background-remover/' },
    { group: 'Utils', id: 'favicon', name: 'Favicon Generator', icon: 'fa-star', url: '/favicon-generator/' },
    { group: 'Utils', id: 'barcode', name: 'Barcode Generator', icon: 'fa-barcode', url: '/barcode-generator/' },
    { group: 'Convert', id: 'txt2pdf',  name: 'TXT to PDF',    icon: 'fa-file-lines',  url: '/txt-to-pdf/' },
    { group: 'Convert', id: 'html2pdf', name: 'HTML to PDF',   icon: 'fa-code',        url: '/html-to-pdf/' },
    { group: 'Utils', id: 'ocr',  name: 'OCR Text',     icon: 'fa-font',   url: '/image-to-text-ocr/' },
    { group: 'Utils', id: 'pass', name: 'Key Gen',      icon: 'fa-key',    url: '/password-generator/' },
    { group: 'Utils', id: 'qr',   name: 'QR Studio',    icon: 'fa-qrcode', url: '/qr-code-generator/' }
];

function renderSidebar(activeId) {
    const groups = ['Creative', 'PDF Toolkit', 'Convert', 'Utils'];
    let navHtml = '';
    groups.forEach(g => {
        navHtml += `<p class="px-6 text-[10px] font-bold text-gray-600 uppercase mt-6 mb-2 tracking-widest">${g}</p>`;
        TOOLS.filter(t => t.group === g).forEach(t => {
            const isActive = t.id === activeId;
            navHtml += `<a href="${t.url}" class="nav-item${isActive ? ' active' : ''}"${isActive ? ' aria-current="page"' : ''}><i class="fas ${t.icon}" aria-hidden="true"></i> ${t.name}</a>`;
        });
    });

    const sidebar = `
        <div class="p-6 border-b border-gray-900 hidden md:block text-center">
            <a href="/" style="text-decoration:none;"><h1 class="text-xl font-black italic text-blue-500">AiFileStudio<span class="text-white">.PRO</span></h1></a>
            <div class="flex items-center gap-2 mt-4">
                <button type="button" class="cmdk-trigger" onclick="openCommandPalette()" aria-label="Search tools (Ctrl+K)">
                    <i class="fas fa-search" aria-hidden="true"></i> Search tools <kbd>Ctrl K</kbd>
                </button>
                <button type="button" class="theme-toggle-btn" id="theme-toggle-btn" onclick="toggleTheme()" aria-label="Toggle light and dark theme">
                    <i class="fas fa-moon" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="py-4 flex-1 overflow-y-auto" role="navigation" aria-label="Tool categories">
            ${navHtml}
            <div class="mt-6 pt-4 border-t border-gray-900">
                <a href="/privacy.html" class="nav-item"><i class="fas fa-shield-alt" aria-hidden="true"></i> Privacy</a>
                <button type="button" class="nav-item w-full text-left" onclick="openModal('contactModal')" style="background:none; border:none;"><i class="fas fa-envelope" aria-hidden="true"></i> Contact</button>
            </div>
            <div class="px-4 mt-6">
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1186506015762858" data-ad-slot="8734574320" data-ad-format="auto" data-full-width-responsive="true"></ins>
            </div>
        </div>
        <div style="margin-top: auto; padding: 20px; border-top: 1px solid #333;">
            <a href="/privacy.html" style="color: #888; text-decoration: none; font-size: 12px; display: block; margin-bottom: 10px;">Privacy Policy</a>
            <button type="button" onclick="openModal('termsModal')" style="color: #888; text-decoration: none; font-size: 12px; display: block; background:none; border:none; padding:0; text-align:left; cursor:pointer;">Terms of Service</button>
            <a href="#faq" class="text-xs text-gray-500 hover:text-blue-500 mt-4 border-t border-gray-800 pt-2 block">Help & FAQ</a>
            <a href="/health-check/" class="text-xs text-gray-600 hover:text-blue-500 mt-2 block">System Status</a>
        </div>
        <div style="margin-top: 30px; padding: 20px; border-top: 1px solid #1c1c21; text-align: center;">
            <p style="color: #666; font-size: 11px; margin-bottom: 12px; text-transform: uppercase;">Support Development</p>
            <a href="https://buymeacoffee.com/ry650506z" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 10px; background: #3b82f6; color: white; padding: 12px 20px; border-radius: 12px; font-weight: bold; text-decoration: none; font-size: 13px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                <i class="fas fa-coffee"></i> Buy me a coffee $5
            </a>
        </div>`;

    document.getElementById('main-sidebar').innerHTML = sidebar;

    const mobileHeader = document.getElementById('mobile-header-slot');
    if (mobileHeader) {
        mobileHeader.innerHTML = `
            <p class="text-lg font-black italic text-blue-500" style="margin:0;">AiFileStudio<span class="text-white">.PRO</span></p>
            <button onclick="toggleSidebar()" class="text-white text-xl" aria-label="Open menu"><i class="fas fa-bars" aria-hidden="true"></i></button>`;
    }

    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
}

function renderModalsAndChat() {
    const slot = document.getElementById('shared-widgets-slot');
    if (!slot) return;
    slot.innerHTML = `
    <div id="contactModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="contactModal-title">
        <div class="modal-content text-center">
            <h2 id="contactModal-title" class="text-xl font-bold text-blue-500 mb-4">Contact Us</h2>
            <p class="text-blue-400 font-mono">ry650506@gmail.com</p>
            <button onclick="closeModal('contactModal')" class="mt-6 text-gray-500 text-sm">Close</button>
        </div>
    </div>

    <div id="termsModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="termsModal-title">
        <div class="modal-content">
            <h2 id="termsModal-title" class="text-xl font-bold text-blue-500 mb-4">Terms of Service</h2>
            <p class="text-gray-400 text-xs leading-relaxed">
                Use AiFileStudio.PRO tools for lawful purposes only. Most tools (PDF merge/split/rotate, resize, JPG↔PNG, OCR, password generation, QR codes) process files locally in your browser and are not uploaded to our servers.<br><br>
                The AI Art tool sends your text prompt to a third-party service (Pollinations AI) to generate an image; that prompt does leave your device. Please avoid entering sensitive or confidential text into that tool.<br><br>
                We provide these tools "as is" without warranty and are not liable for any data loss, inaccuracies, or damages arising from their use. See our <a href="/privacy.html" class="text-blue-500 underline">Privacy Policy</a> for details on analytics and advertising.
            </p>
            <button onclick="closeModal('termsModal')" class="mt-6 text-blue-500 text-sm font-bold">Close</button>
        </div>
    </div>

    <div id="ai-chatbot-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Inter', sans-serif;">
        <button onclick="toggleChat()" id="chat-launcher" style="background: #3b82f6; width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-comment-dots" style="color: white; font-size: 24px;"></i>
        </button>
        <div id="chat-window" class="hidden" style="position: absolute; bottom: 80px; right: 0; width: 300px; background: #0d0d10; border: 1px solid #1c1c21; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
            <div style="background: #16161a; padding: 15px; border-bottom: 1px solid #1c1c21; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; font-weight: bold; color: #3b82f6; letter-spacing: 1px;">AI ASSISTANT</span>
                <button onclick="toggleChat()" style="color: #666; background: none; border: none; cursor: pointer; font-size: 20px;">&times;</button>
            </div>
            <div id="chat-messages" style="height: 250px; overflow-y: auto; padding: 15px; font-size: 13px; line-height: 1.5; color: #ccc;">
                <div style="background: #1c1c21; padding: 10px; border-radius: 10px; margin-bottom: 10px;">Hello! I'm the AiFileStudio assistant. How can I help you today?</div>
            </div>
            <div style="padding: 10px; border-top: 1px solid #1c1c21; background: #0a0a0c;">
                <div id="chat-options" style="display: flex; flex-wrap: wrap; gap: 5px;">
                    <button onclick="askChat('ai')" style="background: #1c1c21; border: 1px solid #333; color: #888; padding: 5px 10px; border-radius: 5px; font-size: 10px; cursor: pointer;">AI Art?</button>
                    <button onclick="askChat('pdf')" style="background: #1c1c21; border: 1px solid #333; color: #888; padding: 5px 10px; border-radius: 5px; font-size: 10px; cursor: pointer;">PDF Tools?</button>
                    <button onclick="askChat('ocr')" style="background: #1c1c21; border: 1px solid #333; color: #888; padding: 5px 10px; border-radius: 5px; font-size: 10px; cursor: pointer;">OCR Text?</button>
                    <button onclick="askChat('privacy')" style="background: #1c1c21; border: 1px solid #333; color: #888; padding: 5px 10px; border-radius: 5px; font-size: 10px; cursor: pointer;">Is it safe?</button>
                </div>
            </div>
        </div>
    </div>`;
}

/* --- Chrome / nav plumbing --- */
function toggleSidebar() { document.getElementById('main-sidebar').classList.toggle('active'); }
function closeSidebarMobile() { if (window.innerWidth <= 768) { document.getElementById('main-sidebar').classList.remove('active'); } }
function openModal(id) { document.getElementById(id).style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }
window.addEventListener('click', function (event) {
    if (event.target.className === 'modal') { event.target.style.display = "none"; }
});

/* --- Theme toggle --- */
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = theme === 'light' ? '<i class="fas fa-sun" aria-hidden="true"></i>' : '<i class="fas fa-moon" aria-hidden="true"></i>';
}
function toggleTheme() {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('afs-theme', next); } catch (e) {}
    applyTheme(next);
}
function initTheme() {
    let saved = 'dark';
    try { saved = localStorage.getItem('afs-theme') || 'dark'; } catch (e) {}
    applyTheme(saved);
}

/* --- Recently used tools --- */
function recordRecentTool(mode) {
    if (!mode) return;
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem('afs-recent') || '[]'); } catch (e) {}
    recent = recent.filter(id => id !== mode);
    recent.unshift(mode);
    recent = recent.slice(0, 5);
    try { localStorage.setItem('afs-recent', JSON.stringify(recent)); } catch (e) {}
}
function getRecentTools() {
    try {
        const ids = JSON.parse(localStorage.getItem('afs-recent') || '[]');
        return ids.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
    } catch (e) { return []; }
}

/* --- Command palette (Ctrl/Cmd+K) --- */
let cmdkActiveIndex = 0;
function ensureCommandPalette() {
    if (document.getElementById('cmdk-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'cmdk-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search tools');
    overlay.innerHTML = `
        <div id="cmdk-box">
            <input id="cmdk-input" type="text" placeholder="Search tools..." autocomplete="off" aria-label="Search tools">
            <div id="cmdk-results"></div>
        </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCommandPalette(); });
    document.getElementById('cmdk-input').addEventListener('input', renderCommandResults);
    document.getElementById('cmdk-input').addEventListener('keydown', handleCommandKeydown);
}
function openCommandPalette() {
    ensureCommandPalette();
    const overlay = document.getElementById('cmdk-overlay');
    overlay.classList.add('open');
    cmdkActiveIndex = 0;
    const input = document.getElementById('cmdk-input');
    input.value = '';
    renderCommandResults();
    setTimeout(() => input.focus(), 30);
}
function closeCommandPalette() {
    const overlay = document.getElementById('cmdk-overlay');
    if (overlay) overlay.classList.remove('open');
}
function renderCommandResults() {
    const query = document.getElementById('cmdk-input').value.trim().toLowerCase();
    const resultsEl = document.getElementById('cmdk-results');
    let list;
    let label = 'All tools';
    if (!query) {
        const recent = getRecentTools();
        list = recent.length ? recent : TOOLS;
        label = recent.length ? 'Recently used' : 'All tools';
    } else {
        list = TOOLS.filter(t => t.name.toLowerCase().includes(query) || t.group.toLowerCase().includes(query));
        label = 'Results';
    }
    cmdkActiveIndex = 0;
    if (!list.length) {
        resultsEl.innerHTML = `<div class="cmdk-empty">No tools match "${query}"</div>`;
        return;
    }
    resultsEl.innerHTML = `<p class="cmdk-section-label">${label}</p>` + list.map((t, i) =>
        `<div class="cmdk-item${i === 0 ? ' active' : ''}" data-url="${t.url}" role="option" aria-selected="${i === 0}"><i class="fas ${t.icon}" aria-hidden="true"></i> ${t.name}</div>`
    ).join('');
    resultsEl.querySelectorAll('.cmdk-item').forEach(el => {
        el.addEventListener('click', () => { window.location.href = el.dataset.url; });
    });
}
function handleCommandKeydown(e) {
    const items = Array.from(document.querySelectorAll('.cmdk-item'));
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        cmdkActiveIndex = Math.min(cmdkActiveIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        cmdkActiveIndex = Math.max(cmdkActiveIndex - 1, 0);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        window.location.href = items[cmdkActiveIndex].dataset.url;
        return;
    } else {
        return;
    }
    items.forEach((el, i) => {
        el.classList.toggle('active', i === cmdkActiveIndex);
        el.setAttribute('aria-selected', i === cmdkActiveIndex);
    });
    items[cmdkActiveIndex].scrollIntoView({ block: 'nearest' });
}
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const overlay = document.getElementById('cmdk-overlay');
        if (overlay && overlay.classList.contains('open')) closeCommandPalette();
        else openCommandPalette();
    } else if (e.key === 'Escape') {
        closeCommandPalette();
        document.querySelectorAll('.modal').forEach(m => { if (m.style.display === 'block') m.style.display = 'none'; });
    }
});

/* --- PWA: service worker registration --- */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => { /* offline support just won't be available */ });
    }
}

/* --- Chatbot --- */
function toggleChat() { document.getElementById('chat-window').classList.toggle('hidden'); }
function askChat(topic) {
    const msgArea = document.getElementById('chat-messages');
    const data = {
        'ai': "Our **AI Art Studio** uses Pollinations AI to generate images from text prompts. Your prompt is sent to that service.",
        'pdf': "You can **Merge, Split, Rotate, and Convert** PDFs. That processing is 100% local — your PDFs never leave your computer.",
        'ocr': "The **OCR Engine** extracts text from images using Tesseract.js, locally in your browser. Try the 'Enhancement' sliders first for scanned documents!",
        'privacy': "Most tools run locally in your browser and never upload your files. The one exception is AI Art, which sends your prompt to a third-party API. See our Privacy Policy for details."
    };
    const response = data[topic] || "I'm here to help you navigate our Pro Document Suite!";
    msgArea.innerHTML += `<div style="text-align: right; margin-bottom: 10px;"><span style="background: #3b82f6; color: white; padding: 8px 12px; border-radius: 10px; display: inline-block;">${topic.toUpperCase()}</span></div>`;
    setTimeout(() => {
        msgArea.innerHTML += `<div style="background: #1c1c21; padding: 10px; border-radius: 10px; margin-bottom: 10px; border-left: 3px solid #3b82f6;">${response}</div>`;
        msgArea.scrollTop = msgArea.scrollHeight;
    }, 400);
}

/* --- Toasts --- */
function ensureToastStack() {
    let stack = document.getElementById('toast-stack');
    if (!stack) {
        stack = document.createElement('div');
        stack.id = 'toast-stack';
        stack.setAttribute('role', 'status');
        stack.setAttribute('aria-live', 'polite');
        document.body.appendChild(stack);
    }
    return stack;
}
function showToast(message, type = 'info') {
    const stack = ensureToastStack();
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, 4500);
}

/* --- Analytics --- */
function trackEvent(action, label) {
    try {
        if (typeof gtag === 'function') {
            gtag('event', action, { event_category: 'tool_usage', event_label: label });
        }
    } catch (e) { /* analytics should never break the tool */ }
}

/* --- Lazy library loading --- */
const _loadedScripts = {};
function loadScript(url) {
    if (_loadedScripts[url]) return _loadedScripts[url];
    _loadedScripts[url] = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = url;
        s.onload = resolve;
        s.onerror = () => {
            delete _loadedScripts[url]; // don't permanently cache a failed load — allow retry next time
            reject(new Error(`Failed to load ${url}`));
        };
        document.head.appendChild(s);
    });
    return _loadedScripts[url];
}
async function ensureToolLibsLoaded() {
    if (typeof TOOL_LIBS === 'undefined' || !TOOL_LIBS.length) return;
    document.getElementById('loader-text').innerText = "LOADING ENGINE...";
    try {
        await Promise.all(TOOL_LIBS.map(loadScript));
    } catch (e) {
        throw "Couldn't load a required component for this tool — check your internet connection, or try disabling any ad-blocker/extension that might be blocking scripts, then try again.";
    }
}

/* --- Drag & drop --- */
function enhanceDropzone() {
    const fileInput = document.getElementById('main-file');
    if (!fileInput) return;
    const wrap = fileInput.closest('#file-field-wrap');
    if (!wrap || wrap.querySelector('.dropzone')) return;

    const zone = document.createElement('div');
    zone.className = 'dropzone';
    zone.innerHTML = `<i class="fas fa-cloud-upload-alt dz-icon"></i><p class="text-xs text-gray-400">Drag & drop files here, or click to browse</p><div class="dz-filelist"></div>`;
    fileInput.style.display = 'none';
    fileInput.parentNode.insertBefore(zone, fileInput);

    const fileListEl = zone.querySelector('.dz-filelist');
    const renderList = () => {
        fileListEl.innerHTML = fileInput.files.length
            ? Array.from(fileInput.files).map(f => `• ${f.name}`).join('<br>')
            : '';
    };

    zone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', renderList);
    ['dragenter', 'dragover'].forEach(evt => zone.addEventListener(evt, e => {
        e.preventDefault(); e.stopPropagation(); zone.classList.add('drag-over');
    }));
    ['dragleave', 'drop'].forEach(evt => zone.addEventListener(evt, e => {
        e.preventDefault(); e.stopPropagation(); zone.classList.remove('drag-over');
    }));
    zone.addEventListener('drop', e => {
        fileInput.files = e.dataTransfer.files;
        renderList();
    });
}

/* --- Shared file utilities --- */
const fileToDataURL = (f) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); });
const downloadFile = (d, n, t) => { const b = new Blob([d], { type: t }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = n; a.click(); };

function processImageEnhancement(file, targetWidth) {
    return new Promise(async (resolve) => {
        const img = new Image();
        img.src = await fileToDataURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const brightEl = document.getElementById('doc-bright');
            const contrastEl = document.getElementById('doc-contrast');
            const upscaleEl = document.getElementById('doc-upscale');
            const binarizeEl = document.getElementById('doc-binarize');
            const b = brightEl ? brightEl.value : 1;
            const c = contrastEl ? contrastEl.value : 1;
            const upscale = upscaleEl ? upscaleEl.checked : false;
            const binarize = binarizeEl ? binarizeEl.checked : false;

            const scale = targetWidth / img.width;
            canvas.width = targetWidth;
            canvas.height = img.height * scale;

            ctx.filter = `brightness(${b}) contrast(${c}) ${upscale ? 'saturate(1.2) contrast(1.1)' : ''}`;
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (binarize) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    const val = avg > 128 ? 255 : 0;
                    data[i] = data[i + 1] = data[i + 2] = val;
                }
                ctx.putImageData(imageData, 0, 0);
            }
            resolve(canvas.toDataURL("image/jpeg", 0.9));
        };
    });
}

/* --- Page setup: show/hide the right input UI for this tool --- */
function setupToolUI(mode) {
    const enhancementModes = ['resize', 'ocr'];
    const passwordUiEl = document.getElementById('password-ui');
    const standardInputsEl = document.getElementById('standard-inputs');
    const enhancementEl = document.getElementById('enhancement-ui');
    const bgColorEl = document.getElementById('bgcolor-ui');
    const textFieldWrap = document.getElementById('text-field-wrap');
    const fileFieldWrap = document.getElementById('file-field-wrap');

    if (passwordUiEl) passwordUiEl.classList.toggle('hidden', mode !== 'pass');
    if (standardInputsEl) standardInputsEl.classList.toggle('hidden', mode === 'pass');
    if (enhancementEl) enhancementEl.classList.toggle('hidden', !enhancementModes.includes(mode));
    if (bgColorEl) bgColorEl.classList.toggle('hidden', mode !== 'bgremove');

    const noTextInput = ['convert', 'merge', 'rotate', 'pdf', 'ocr', 'pagenumbers', 'viewer', 'favicon', 'bgremove'];
    const noFileInput = ['ai', 'pass', 'qr', 'txt2pdf', 'html2pdf', 'barcode'];
    if (textFieldWrap) textFieldWrap.classList.toggle('hidden', noTextInput.includes(mode));
    if (fileFieldWrap) fileFieldWrap.classList.toggle('hidden', noFileInput.includes(mode));
}

function setupBgColorPicker() {
    const wrap = document.getElementById('bgcolor-ui');
    if (!wrap) return;
    const swatches = wrap.querySelectorAll('.bg-swatch');
    const customInput = document.getElementById('bgcolor-custom');

    swatches.forEach(sw => {
        sw.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('selected'));
            sw.classList.add('selected');
            selectedBgColor = sw.dataset.color;
        });
    });
    if (customInput) {
        customInput.addEventListener('input', () => {
            swatches.forEach(s => s.classList.remove('selected'));
            selectedBgColor = customInput.value;
        });
    }
    const defaultSwatch = wrap.querySelector('.bg-swatch[data-color="transparent"]');
    if (defaultSwatch) defaultSwatch.classList.add('selected');
}

/* --- Main task runner (mode comes from the page's TOOL_MODE) --- */
async function processTask() {
    const mode = TOOL_MODE;
    const inputEl = document.getElementById('main-input');
    const fileEl = document.getElementById('main-file');
    const input = inputEl ? inputEl.value : '';
    const files = fileEl ? fileEl.files : [];
    const resCard = document.getElementById('result-card');
    const preview = document.getElementById('preview-area');
    const loader = document.getElementById('loader-box');
    const loaderText = document.getElementById('loader-text');

    resCard.classList.remove('hidden');
    preview.innerHTML = ""; loader.classList.remove('hidden');

    try {
        await ensureToolLibsLoaded();
        loaderText.innerText = "ENGINE RUNNING...";

        if (mode === 'ai') {
            if (!input) throw "Enter a prompt describing the image you want.";
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(input)}?nologo=true`;
            preview.innerHTML = `<img src="${url}" class="rounded-xl shadow-lg mb-4" alt="AI generated image"><a href="${url}" download class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold uppercase">Download</a>`;
        }
        else if (mode === 'resize') {
            if (!files[0] || !input) throw "Need an image and a target width (px).";
            const widthNum = Number(input);
            if (!Number.isFinite(widthNum) || widthNum <= 0) throw "Width must be a positive number (e.g. 800).";
            if (files.length > 1) {
                const zip = new JSZip();
                for (let i = 0; i < files.length; i++) {
                    loaderText.innerText = `PROCESSING ${i + 1} OF ${files.length}...`;
                    const blob = await processImageEnhancement(files[i], widthNum);
                    zip.file(`resized_${files[i].name}`, blob.split(',')[1], { base64: true });
                }
                const content = await zip.generateAsync({ type: "blob" });
                const url = URL.createObjectURL(content);
                preview.innerHTML = `<p class='text-xs mb-4'>Processed ${files.length} images</p><a href="${url}" download="batch_resized.zip" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold uppercase">Download ZIP</a>`;
            } else {
                const res = await processImageEnhancement(files[0], widthNum);
                preview.innerHTML = `<img src="${res}" class="mb-4 rounded-xl border border-gray-800" alt="Resized image"><a href="${res}" download="resized.jpg" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold">Download</a>`;
            }
        }
        else if (mode === 'convert') {
            if (!files[0]) throw "Select a JPG image.";
            const img = new Image(); img.src = await fileToDataURL(files[0]);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width; canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);
                const res = canvas.toDataURL("image/png");
                preview.innerHTML = `<a href="${res}" download="converted.png" class="bg-green-600 px-8 py-3 rounded-full text-xs font-bold">Download PNG</a>`;
                loader.classList.add('hidden');
            }; return;
        }
        else if (mode === 'merge') {
            if (files.length < 2) throw "Select 2 or more PDFs.";
            const merged = await PDFLib.PDFDocument.create();
            for (const f of files) {
                const doc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
                const pages = await merged.copyPages(doc, doc.getPageIndices());
                pages.forEach(p => merged.addPage(p));
            }
            downloadFile(await merged.save(), "merged.pdf", "application/pdf");
            preview.innerHTML = "✓ Downloaded";
        }
        else if (mode === 'split') {
            if (!files[0] || !input) throw "Upload a PDF and enter pages (e.g., 1, 2).";
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const splitDoc = await PDFLib.PDFDocument.create();
            const totalPages = doc.getPageCount();
            const indices = input.split(',')
                .map(n => parseInt(n.trim()) - 1)
                .filter(n => n >= 0 && n < totalPages);
            if (indices.length === 0) throw "Invalid page numbers.";
            const pages = await splitDoc.copyPages(doc, indices);
            pages.forEach(p => splitDoc.addPage(p));
            downloadFile(await splitDoc.save(), "split.pdf", "application/pdf");
            preview.innerHTML = "✓ Extracted";
        }
        else if (mode === 'rotate') {
            if (!files[0]) throw "Upload a PDF.";
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const pages = doc.getPages();
            pages.forEach(p => p.setRotation(PDFLib.degrees((p.getRotation().angle || 0) + 90)));
            downloadFile(await doc.save(), "rotated.pdf", "application/pdf");
            preview.innerHTML = "✓ Rotated";
        }
        else if (mode === 'pdf') {
            if (!files[0]) throw "Select one or more images.";
            const { jsPDF } = window.jspdf; const doc = new jsPDF();
            for (let i = 0; i < files.length; i++) {
                if (i > 0) doc.addPage();
                doc.addImage(await fileToDataURL(files[i]), 'JPEG', 10, 10, 190, 0);
            }
            doc.save("studio.pdf");
            preview.innerHTML = "✓ Downloaded";
        }
        else if (mode === 'ocr') {
            if (!files[0]) throw "Select an image containing text.";
            const processedURL = await processImageEnhancement(files[0], 2000);
            const ret = await Tesseract.recognize(processedURL);
            preview.innerHTML = `<textarea class="w-full h-40 bg-black p-4 text-xs text-blue-400 border border-gray-800 rounded-xl">${ret.data.text}</textarea>`;
        }
        else if (mode === 'pass') {
            const char = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*";
            let pass = ""; const v = new Uint32Array(document.getElementById('pass-length').value);
            window.crypto.getRandomValues(v);
            for (let i = 0; i < v.length; i++) pass += char[v[i] % char.length];
            document.getElementById('pass-display-box').innerText = pass;
        }
        else if (mode === 'deletepages') {
            if (!files[0] || !input) throw "Upload a PDF and enter the page numbers to delete (e.g., 2, 4, 7).";
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const totalPages = doc.getPageCount();
            const toDelete = input.split(',')
                .map(n => parseInt(n.trim()) - 1)
                .filter(n => n >= 0 && n < totalPages)
                .sort((a, b) => b - a);
            if (toDelete.length === 0) throw "Invalid page numbers.";
            if (toDelete.length >= totalPages) throw "You can't delete every page.";
            toDelete.forEach(idx => doc.removePage(idx));
            downloadFile(await doc.save(), "pages_deleted.pdf", "application/pdf");
            preview.innerHTML = "✓ Pages removed";
        }
        else if (mode === 'extractpages') {
            if (!files[0] || !input) throw "Upload a PDF and enter a page range (e.g., 2-5) or list (e.g., 1, 3, 5).";
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const totalPages = doc.getPageCount();
            const rangeMatch = input.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
            let indices = [];
            if (rangeMatch) {
                const start = parseInt(rangeMatch[1]) - 1, end = parseInt(rangeMatch[2]) - 1;
                for (let i = Math.min(start, end); i <= Math.max(start, end); i++) if (i >= 0 && i < totalPages) indices.push(i);
            } else {
                indices = input.split(',').map(n => parseInt(n.trim()) - 1).filter(n => n >= 0 && n < totalPages);
            }
            if (indices.length === 0) throw "Invalid page range.";
            const zip = new JSZip();
            for (let i = 0; i < indices.length; i++) {
                loaderText.innerText = `EXTRACTING ${i + 1} OF ${indices.length}...`;
                const single = await PDFLib.PDFDocument.create();
                const [copied] = await single.copyPages(doc, [indices[i]]);
                single.addPage(copied);
                zip.file(`page_${indices[i] + 1}.pdf`, await single.save());
            }
            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            preview.innerHTML = `<p class='text-xs mb-4'>Extracted ${indices.length} page(s) as separate PDF files</p><a href="${url}" download="extracted_pages.zip" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold uppercase">Download ZIP</a>`;
        }
        else if (mode === 'reorder') {
            if (!files[0] || !input) throw "Upload a PDF and enter the new page order (e.g., 3, 1, 2).";
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const totalPages = doc.getPageCount();
            const order = input.split(',').map(n => parseInt(n.trim()) - 1);
            const validSet = new Set(order);
            if (order.length !== totalPages || order.some(n => n < 0 || n >= totalPages) || validSet.size !== totalPages) {
                throw `This PDF has ${totalPages} pages — enter all ${totalPages} page numbers, each exactly once (e.g., ${Array.from({ length: totalPages }, (_, i) => i + 1).join(', ')}).`;
            }
            const newDoc = await PDFLib.PDFDocument.create();
            const pages = await newDoc.copyPages(doc, order);
            pages.forEach(p => newDoc.addPage(p));
            downloadFile(await newDoc.save(), "reordered.pdf", "application/pdf");
            preview.innerHTML = "✓ Reordered";
        }
        else if (mode === 'pagenumbers') {
            if (!files[0]) throw "Upload a PDF.";
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
            doc.getPages().forEach((p, i) => {
                const { width } = p.getSize();
                p.drawText(`${i + 1}`, { x: width / 2 - 5, y: 20, size: 10, font, color: PDFLib.rgb(0.4, 0.4, 0.4) });
            });
            downloadFile(await doc.save(), "numbered.pdf", "application/pdf");
            preview.innerHTML = "✓ Page numbers added";
        }
        else if (mode === 'watermark') {
            if (!files[0] || !input) throw "Upload a PDF and enter watermark text.";
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const font = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
            doc.getPages().forEach(p => {
                const { width, height } = p.getSize();
                p.drawText(input, {
                    x: width / 2 - (input.length * 7), y: height / 2, size: 40, font,
                    color: PDFLib.rgb(0.6, 0.6, 0.6), opacity: 0.3, rotate: PDFLib.degrees(45)
                });
            });
            downloadFile(await doc.save(), "watermarked.pdf", "application/pdf");
            preview.innerHTML = "✓ Watermark added";
        }
        else if (mode === 'txt2pdf') {
            if (!input) throw "Paste some text first.";
            const { jsPDF } = window.jspdf; const doc = new jsPDF();
            const lines = doc.splitTextToSize(input, 180);
            doc.text(lines, 10, 10);
            doc.save("document.pdf");
            preview.innerHTML = "✓ Downloaded";
        }
        else if (mode === 'html2pdf') {
            if (!input) throw "Paste some HTML first.";
            const wrap = document.createElement('div');
            wrap.style.cssText = "position:fixed; left:-9999px; top:0; width:800px; background:#fff; color:#000; padding:20px;";
            wrap.innerHTML = input;
            document.body.appendChild(wrap);
            const canvas = await html2canvas(wrap, { backgroundColor: '#ffffff' });
            document.body.removeChild(wrap);
            const { jsPDF } = window.jspdf; const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const imgHeight = canvas.height * pageWidth / canvas.width;
            doc.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pageWidth, imgHeight);
            doc.save("webpage.pdf");
            preview.innerHTML = "✓ Downloaded";
        }
        else if (mode === 'crop') {
            if (!files[0] || !input) throw "Upload a PDF and enter margins as top,right,bottom,left percentages (e.g. 5,5,5,5).";
            const parts = input.split(',').map(n => parseFloat(n.trim()));
            if (parts.length !== 4 || parts.some(n => isNaN(n) || n < 0 || n >= 50)) throw "Enter 4 percentages between 0 and 49, as top,right,bottom,left (e.g. 5,5,5,5).";
            const [top, right, bottom, left] = parts;
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            doc.getPages().forEach(p => {
                const { width, height } = p.getSize();
                const x = width * (left / 100);
                const y = height * (bottom / 100);
                const newWidth = width * (1 - (left + right) / 100);
                const newHeight = height * (1 - (top + bottom) / 100);
                p.setCropBox(x, y, newWidth, newHeight);
            });
            downloadFile(await doc.save(), "cropped.pdf", "application/pdf");
            preview.innerHTML = "✓ Cropped";
        }
        else if (mode === 'compress') {
            if (!files[0]) throw "Upload a PDF.";
            const beforeSize = files[0].size;
            const doc = await PDFLib.PDFDocument.load(await files[0].arrayBuffer());
            const bytes = await doc.save({ useObjectStreams: true });
            const afterSize = bytes.length;
            const pct = beforeSize > 0 ? Math.round((1 - afterSize / beforeSize) * 100) : 0;
            downloadFile(bytes, "compressed.pdf", "application/pdf");
            preview.innerHTML = `<p class="text-xs mb-2">${(beforeSize / 1024).toFixed(1)} KB → ${(afterSize / 1024).toFixed(1)} KB${pct > 0 ? ` (${pct}% smaller)` : ''}</p><p class="text-[10px] text-gray-600 mb-4">This applies structural/stream compression only — it doesn't re-encode embedded images, so image-heavy PDFs may not shrink much.</p><p class="text-sm">✓ Downloaded</p>`;
        }
        else if (mode === 'viewer') {
            if (!files[0]) throw "Upload a PDF to view.";
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            const buf = await files[0].arrayBuffer();
            const pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise;
            const container = document.createElement('div');
            container.className = "space-y-4 w-full";
            preview.innerHTML = `<p class="text-xs text-gray-500 mb-4">${pdfDoc.numPages} page(s)</p>`;
            preview.appendChild(container);
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                loaderText.innerText = `RENDERING PAGE ${i} OF ${pdfDoc.numPages}...`;
                const page = await pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 1.2 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width; canvas.height = viewport.height;
                canvas.className = "rounded-lg border border-gray-800 mx-auto block max-w-full";
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                container.appendChild(canvas);
            }
        }
        else if (mode === 'imgcompress') {
            if (!files[0]) throw "Select one or more images.";
            let quality = parseFloat(input);
            if (!Number.isFinite(quality) || quality <= 0 || quality > 100) quality = 70;
            const compressOne = (file) => new Promise(async (resolve) => {
                const img = new Image();
                img.src = await fileToDataURL(file);
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width; canvas.height = img.height;
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/jpeg', quality / 100));
                };
            });
            if (files.length > 1) {
                const zip = new JSZip();
                for (let i = 0; i < files.length; i++) {
                    loaderText.innerText = `COMPRESSING ${i + 1} OF ${files.length}...`;
                    const dataUrl = await compressOne(files[i]);
                    zip.file(`compressed_${files[i].name.replace(/\.[^.]+$/, '')}.jpg`, dataUrl.split(',')[1], { base64: true });
                }
                const content = await zip.generateAsync({ type: "blob" });
                const url = URL.createObjectURL(content);
                preview.innerHTML = `<p class='text-xs mb-4'>Compressed ${files.length} images at ${quality}% quality</p><a href="${url}" download="compressed_images.zip" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold uppercase">Download ZIP</a>`;
            } else {
                const before = files[0].size;
                const dataUrl = await compressOne(files[0]);
                const afterBytes = Math.round((dataUrl.length - dataUrl.indexOf(',') - 1) * 0.75);
                preview.innerHTML = `<img src="${dataUrl}" class="mb-4 rounded-xl border border-gray-800 max-w-full" alt="Compressed image"><p class="text-xs text-gray-500 mb-2">${(before / 1024).toFixed(1)} KB → ~${(afterBytes / 1024).toFixed(1)} KB</p><a href="${dataUrl}" download="compressed.jpg" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold">Download</a>`;
            }
        }
        else if (mode === 'favicon') {
            if (!files[0]) throw "Upload an image (a square image works best).";
            const img = new Image();
            img.src = await fileToDataURL(files[0]);
            await new Promise(resolve => { img.onload = resolve; });
            const sizes = [16, 32, 48, 180, 192, 512];
            const zip = new JSZip();
            for (let i = 0; i < sizes.length; i++) {
                const size = sizes[i];
                loaderText.innerText = `RENDERING ${size}x${size}...`;
                const canvas = document.createElement('canvas');
                canvas.width = size; canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, size, size);
                const dataUrl = canvas.toDataURL('image/png');
                const name = size === 180 ? 'apple-touch-icon.png' : size === 192 ? 'android-chrome-192x192.png' : size === 512 ? 'android-chrome-512x512.png' : `favicon-${size}x${size}.png`;
                zip.file(name, dataUrl.split(',')[1], { base64: true });
            }
            zip.file("site.webmanifest", JSON.stringify({
                name: "My Site", short_name: "Site",
                icons: [
                    { src: "android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
                    { src: "android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
                ],
                theme_color: "#3b82f6", background_color: "#ffffff", display: "standalone"
            }, null, 2));
            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            preview.innerHTML = `<p class='text-xs mb-4'>Generated ${sizes.length} icon sizes + a web manifest</p><a href="${url}" download="favicons.zip" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold uppercase">Download ZIP</a>`;
        }
        else if (mode === 'barcode') {
            if (!input) throw "Enter the text or number to encode.";
            const canvas = document.createElement('canvas');
            try {
                JsBarcode(canvas, input, { format: "CODE128", displayValue: true, margin: 10 });
            } catch (e) {
                throw "Couldn't generate a barcode for that value — try different characters.";
            }
            const dataUrl = canvas.toDataURL('image/png');
            preview.innerHTML = `<div class="bg-white p-4 rounded-xl mb-4"><img src="${dataUrl}" alt="Barcode"></div><a href="${dataUrl}" download="barcode.png" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold">Download</a>`;
        }
        else if (mode === 'bgremove') {
            if (!files[0]) throw "Upload a photo (this works best on photos of people).";
            const img = new Image();
            img.src = await fileToDataURL(files[0]);
            await new Promise(resolve => { img.onload = resolve; });

            const selfieSegmentation = new SelfieSegmentation({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
            });
            selfieSegmentation.setOptions({ modelSelection: 1 });

            const cutoutCanvas = document.createElement('canvas');
            cutoutCanvas.width = img.width; cutoutCanvas.height = img.height;
            const cutoutCtx = cutoutCanvas.getContext('2d');

            await new Promise((resolve, reject) => {
                selfieSegmentation.onResults((results) => {
                    try {
                        cutoutCtx.save();
                        cutoutCtx.clearRect(0, 0, cutoutCanvas.width, cutoutCanvas.height);
                        cutoutCtx.drawImage(results.segmentationMask, 0, 0, cutoutCanvas.width, cutoutCanvas.height);
                        cutoutCtx.globalCompositeOperation = 'source-in';
                        cutoutCtx.drawImage(results.image, 0, 0, cutoutCanvas.width, cutoutCanvas.height);
                        cutoutCtx.restore();
                        resolve();
                    } catch (e) { reject(e); }
                });
                selfieSegmentation.send({ image: img }).catch(reject);
            });

            let finalCanvas = cutoutCanvas;
            const bgColor = selectedBgColor || 'transparent';
            if (bgColor !== 'transparent') {
                finalCanvas = document.createElement('canvas');
                finalCanvas.width = cutoutCanvas.width; finalCanvas.height = cutoutCanvas.height;
                const fctx = finalCanvas.getContext('2d');
                fctx.fillStyle = bgColor;
                fctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
                fctx.drawImage(cutoutCanvas, 0, 0);
            }

            const dataUrl = finalCanvas.toDataURL('image/png');
            const checkerStyle = bgColor === 'transparent' ? 'background: repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 50% / 20px 20px;' : '';
            preview.innerHTML = `<img src="${dataUrl}" class="mb-4 rounded-xl border border-gray-800 max-w-full" alt="Background removed" style="${checkerStyle}"><p class="text-[10px] text-gray-600 mb-2">Works best on clear photos of people — results on other subjects may vary.</p><a href="${dataUrl}" download="${bgColor === 'transparent' ? 'no-background.png' : 'new-background.png'}" class="bg-blue-600 px-8 py-3 rounded-full text-xs font-bold">Download PNG</a>`;
        }
        else if (mode === 'qr') {
            if (!input) throw "Enter text or a URL to encode.";
            preview.innerHTML = `<div id="q" class="bg-white p-4"></div>`;
            new QRCode(document.getElementById("q"), { text: input, width: 150, height: 150 });
        }
        loader.classList.add('hidden');
        trackEvent('tool_used', mode);
    } catch (err) {
        resCard.classList.add('hidden');
        loader.classList.add('hidden');
        if (typeof err !== 'string') {
            console.error(`AiFileStudio [${mode}] error:`, err);
        }
        showToast(typeof err === 'string' ? err : 'Something went wrong. Please check your input and try again. (Details logged to browser console — press F12.)', 'error');
        trackEvent('tool_error', mode);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    registerServiceWorker();
    if (typeof TOOL_MODE !== 'undefined') {
        renderSidebar(TOOL_MODE);
        setupToolUI(TOOL_MODE);
        enhanceDropzone();
        setupBgColorPicker();
        recordRecentTool(TOOL_MODE);
    } else {
        renderSidebar(null);
    }
    renderModalsAndChat();
});
