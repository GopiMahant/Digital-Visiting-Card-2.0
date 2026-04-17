// Main app controller
// Toast utility for brief notifications (also announces to screen readers)
function showToast(message, type = 'success', duration = 2000) {
    // Accessible live region for screen readers
    let live = document.getElementById('toastLiveRegion');
    if (!live) {
        live = document.createElement('div');
        live.id = 'toastLiveRegion';
        live.setAttribute('aria-live', 'polite');
        live.setAttribute('aria-atomic', 'true');
        live.style.position = 'absolute';
        live.style.left = '-9999px';
        live.style.width = '1px';
        live.style.height = '1px';
        live.style.overflow = 'hidden';
        document.body.appendChild(live);
    }
    live.textContent = message;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Auto-save helper: saves form to localStorage and restores on load
class CardAutoSave {
    constructor(formElement, options = {}) {
        this.form = formElement;
        this.saveKey = options.saveKey || 'cardData_autosave';
        this.interval = options.interval || 10000;
        this.debounce = options.debounce || 500;
        this._debounceTimer = null;
        this._init();
    }

    _init() {
        if (!this.form) return;
        this.load();
        this._intervalId = setInterval(() => this.save(), this.interval);
        this.form.addEventListener('input', () => {
            clearTimeout(this._debounceTimer);
            this._debounceTimer = setTimeout(() => this.save(), this.debounce);
        });
        this.form.addEventListener('change', () => this.save());
        this.form.addEventListener('blur', () => this.save(), true);
    }

    getFormObject() {
        const fd = new FormData(this.form);
        return Object.fromEntries(fd.entries());
    }

    save() {
        try {
            const data = this.getFormObject();
            localStorage.setItem(this.saveKey, JSON.stringify(data));
            showToast('Draft saved', 'success', 1400);
        } catch (e) {
            console.error('Auto-save failed', e);
            showToast('Save failed', 'error', 2000);
        }
    }

    load() {
        const raw = localStorage.getItem(this.saveKey);
        if (!raw) return;
        try {
            const data = JSON.parse(raw);
            Object.entries(data).forEach(([key, value]) => {
                const field = this.form.querySelector(`[name="${key}"]`);
                if (field && field.type !== 'file') {
                    field.value = value;
                    // dispatch input so other listeners (preview, state) update
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
            showToast('Loaded saved draft', 'info', 1800);
            try { updatePreview(); } catch (e) {}
        } catch (e) {
            console.error('Failed to load saved draft', e);
        }
    }

    clear() {
        localStorage.removeItem(this.saveKey);
        showToast('Saved draft cleared', 'info', 1400);
    }
}

// Global holders for helpers
let autoSaveInstance = null;
let undoRedoInstance = null;
let loadingManager = null;
let selectedTemplate = null;
let formData = {};

// Loading overlay + spinner
class LoadingManager {
    constructor() {
        this.overlay = null;
        this._create();
    }

    _create() {
        if (this.overlay) return;
        const style = document.createElement('style');
        style.textContent = `
            .loading-overlay { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.45); z-index: 100000; }
            .loading-overlay.active { display: flex; }
            .loading-box { background: rgba(0,0,0,0.65); padding: 14px 18px; border-radius: 12px; color: #fff; display: flex; gap: 12px; align-items: center; }
            .loading-text { font-weight: 600; }
            .spinner { width: 28px; height: 28px; border: 3px solid rgba(255,255,255,0.18); border-top-color: #fff; border-radius: 50%; animation: lv-spin 0.8s linear infinite; }
            @keyframes lv-spin { to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `<div class="loading-box"><div class="spinner"></div><div class="loading-text">Loading...</div></div>`;
        document.body.appendChild(overlay);
        this.overlay = overlay;
    }

    show(message = 'Loading...') {
        if (!this.overlay) this._create();
        const txt = this.overlay.querySelector('.loading-text');
        if (txt) txt.textContent = message;
        this.overlay.classList.add('active');
    }

    hide() {
        if (!this.overlay) return;
        this.overlay.classList.remove('active');
    }
}

// Undo/Redo manager for form states
class UndoRedoManager {
    constructor(formSelector) {
        this.form = typeof formSelector === 'string' ? document.querySelector(formSelector) : formSelector;
        this.history = [];
        this.currentStep = -1;
        this.max = 60;
        this.debounce = 400;
        this._debounceTimer = null;
        this.isRestoring = false;
        if (this.form) this._init();
    }

    _init() {
        this.saveState();
        this.form.addEventListener('input', () => {
            clearTimeout(this._debounceTimer);
            this._debounceTimer = setTimeout(() => this.saveState(), this.debounce);
        });
    }

    saveState() {
        if (this.isRestoring || !this.form) return;
        const fd = new FormData(this.form);
        const state = JSON.stringify(Object.fromEntries(fd.entries()));
        this.history.splice(this.currentStep + 1);
        this.history.push(state);
        this.currentStep++;
        if (this.history.length > this.max) {
            this.history.shift();
            this.currentStep--;
        }
    }

    restoreState() {
        if (!this.form || this.currentStep < 0) return;
        try {
            this.isRestoring = true;
            const state = JSON.parse(this.history[this.currentStep]);
            Object.entries(state).forEach(([key, value]) => {
                const field = this.form.querySelector(`[name="${key}"]`);
                if (field && field.type !== 'file') {
                    field.value = value;
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        } catch (e) {
            console.error('Failed to restore state', e);
        } finally {
            setTimeout(() => { this.isRestoring = false; }, 0);
            try { updatePreview(); } catch (e) {}
        }
    }

    undo() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.restoreState();
        }
    }

    redo() {
        if (this.currentStep < this.history.length - 1) {
            this.currentStep++;
            this.restoreState();
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Screen management
    const screens = {
        landing: document.getElementById('landing'),
        gallery: document.getElementById('gallery'),
        formPreview: document.getElementById('formPreview')
    };

    let currentScreen = 'landing';

    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
        currentScreen = screenName;
    }

    // Navigation
    document.getElementById('createCardBtn').addEventListener('click', () => showScreen('gallery'));
    document.getElementById('backToLanding').addEventListener('click', () => showScreen('landing'));
    document.getElementById('backToGallery').addEventListener('click', () => showScreen('gallery'));
    document.getElementById('selectTemplateBtn').addEventListener('click', () => {
        if (selectedTemplate) {
            showScreen('formPreview');
            // Load template for preview
            loadTemplateForPreview(selectedTemplate);
        }
    });

    // Template selection
    document.getElementById('templateGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.template-card');
        if (card) {
            document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedTemplate = card.dataset.template;
            document.getElementById('selectTemplateBtn').classList.remove('hidden');
        }
    });

    // Form input handling
    document.getElementById('cardForm').addEventListener('input', (e) => {
        formData[e.target.name] = e.target.value;
        updatePreview();
    });

    // Logo upload
    document.getElementById('logo').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                formData.logo = reader.result;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });


        // Export buttons
        document.getElementById('generateCardBtn').addEventListener('click', () => generateCard());
        document.getElementById('downloadPngBtn').addEventListener('click', () => exportPNG());
        document.getElementById('downloadPdfBtn').addEventListener('click', () => exportPDF());

        // Initialize auto-save, loader and undo/redo for the form
        try {
            autoSaveInstance = new CardAutoSave(document.getElementById('cardForm'));
        } catch (e) {
            console.warn('Auto-save failed to initialize', e);
        }

        try {
            loadingManager = new LoadingManager();
        } catch (e) {
            console.warn('LoadingManager failed to initialize', e);
        }

        try {
            undoRedoInstance = new UndoRedoManager('#cardForm');
        } catch (e) {
            console.warn('UndoRedo failed to initialize', e);
        }

        // Keyboard shortcuts: Ctrl/Cmd+S to save, Ctrl/Cmd+Z to undo, Ctrl/Cmd+Shift+Z / Y to redo
        document.addEventListener('keydown', (e) => {
            const mod = e.ctrlKey || e.metaKey;
            if (!mod) return;
            const key = (e.key || '').toLowerCase();
            if (key === 's') {
                e.preventDefault();
                if (autoSaveInstance) autoSaveInstance.save();
                showToast('Saved', 'success', 1200);
            } else if (key === 'z' && !e.shiftKey) {
                e.preventDefault();
                if (undoRedoInstance) undoRedoInstance.undo();
                showToast('Undo', 'info', 900);
            } else if ((key === 'z' && e.shiftKey) || key === 'y') {
                e.preventDefault();
                if (undoRedoInstance) undoRedoInstance.redo();
                showToast('Redo', 'info', 900);
            }
        });

        // Load templates
        loadTemplates();
});

function loadTemplates() {
    const grid = document.getElementById('templateGrid');
    const templates = [
        { id: 1, name: 'Obsidian Executive', desc: 'Ultra-luxury, corporate authority' },
        { id: 2, name: 'Rose Gold Luxe', desc: 'Premium feminine luxury' },
        { id: 3, name: 'Arctic Minimal', desc: 'Clean, Scandinavian, ultra-modern' },
        { id: 4, name: 'Neon Noir', desc: 'Cyberpunk, Gen-Z energy' },
        { id: 5, name: 'Terra Organic', desc: 'Earthy, warm, sustainable' },
        { id: 6, name: 'Holographic Prism', desc: 'Futuristic iridescent' },
        { id: 7, name: 'Editorial Broadsheet', desc: 'Intellectual, editorial' },
        { id: 8, name: 'Midnight Blueprint', desc: 'Technical, architectural' },
        { id: 9, name: 'Sakura Soft', desc: 'Japanese minimalism' },
        { id: 10, name: 'Carbon Brutalist', desc: 'Raw, bold, unapologetic' }
    ];

    templates.forEach(template => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.dataset.template = template.id;
        card.innerHTML = `
            <h3>${template.name}</h3>
            <p>${template.desc}</p>
        `;
        grid.appendChild(card);
    });
}

function loadTemplateForPreview(templateId) {
    // Load the template script dynamically
    const script = document.createElement('script');
    script.src = `templates/template-${templateId.toString().padStart(2, '0')}.js`;
    document.head.appendChild(script);

    // Assume the template defines a renderCard function
    script.onload = () => {
        updatePreview();
    };
}

function generateCard() {
    const preview = document.getElementById('cardPreview');
    if (!preview) return;

    if (!selectedTemplate) {
        const firstCard = document.querySelector('.template-card');
        if (firstCard) {
            selectedTemplate = firstCard.dataset.template;
            firstCard.classList.add('selected');
            document.getElementById('selectTemplateBtn').classList.remove('hidden');
        }
    }

    if (selectedTemplate && !window.renderCard) {
        loadTemplateForPreview(selectedTemplate);
        showToast('Loading template...', 'info', 1400);
        return;
    }

    updatePreview();
    showToast('Card generated', 'success', 1400);
}

function updatePreview() {
    const preview = document.getElementById('cardPreview');
    if (!preview) return;
    if (window.renderCard) {
        preview.innerHTML = window.renderCard(formData);
    } else {
        preview.innerHTML = `
            <div style="color: #cbd5e1; text-align: center; padding: 28px;">
                <p style="margin:0 0 10px; font-weight:600;">No template selected yet.</p>
                <p style="margin:0; font-size: 14px; color:#94a3b8;">Choose a template and enter your details to see a live preview.</p>
            </div>
        `;
    }
}

function exportPNG() {
    const card = document.querySelector('.card') || document.getElementById('cardPreview');
    if (card) {
        if (loadingManager) loadingManager.show('Generating PNG...');
        html2canvas(card, { scale: 2, useCORS: true }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'mycard-cardforge.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            if (loadingManager) loadingManager.hide();
            showToast('PNG downloaded', 'success', 2000);
        }).catch(err => {
            console.error('PNG export failed', err);
            if (loadingManager) loadingManager.hide();
            showToast('PNG export failed', 'error', 2200);
        });
    }
}

function exportPDF() {
    const card = document.querySelector('.card') || document.getElementById('cardPreview');
    if (card) {
        if (loadingManager) loadingManager.show('Generating PDF...');
        html2canvas(card, { scale: 2, useCORS: true }).then(canvas => {
            try {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf.jsPDF();
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 295; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('mycard-cardforge.pdf');
                if (loadingManager) loadingManager.hide();
                showToast('PDF downloaded', 'success', 2000);
            } catch (err) {
                console.error('PDF export failed', err);
                if (loadingManager) loadingManager.hide();
                showToast('PDF export failed', 'error', 2200);
            }
        }).catch(err => {
            console.error('PDF html2canvas failed', err);
            if (loadingManager) loadingManager.hide();
            showToast('PDF export failed', 'error', 2200);
        });
    }
}
// Theme manager: toggles light/dark theme and persists preference
class ThemeManager {
    constructor(toggleSelector = '#themeToggle') {
        this.toggle = document.querySelector(toggleSelector);
        this.init();
    }

    init() {
        const saved = localStorage.getItem('theme');
        const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        const theme = saved || (systemPrefersLight ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', theme);
        if (this.toggle) this.toggle.addEventListener('click', () => this.toggleTheme());
        this.updateToggle();
        try {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                    this.updateToggle();
                }
            });
        } catch (e) {}
    }

    setTheme(name) {
        document.documentElement.setAttribute('data-theme', name);
        localStorage.setItem('theme', name);
        this.updateToggle();
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        this.setTheme(current === 'dark' ? 'light' : 'dark');
    }

    updateToggle() {
        if (!this.toggle) return;
        const theme = document.documentElement.getAttribute('data-theme');
        this.toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// Simple real-time form validator (all fields optional)
class FormValidator {
    constructor(formElement) {
        this.form = typeof formElement === 'string' ? document.querySelector(formElement) : formElement;
        this.rules = {
            email: {
                validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v === '',
                hint: 'Please enter a valid email',
                success: 'Email looks good!'
            },
            phone: {
                validate: (v) => /^[+]?([0-9()\-\s]){6,}$/.test(v) || v === '',
                hint: 'Invalid phone format',
                success: 'Phone looks valid'
            },
            fullName: {
                validate: (v) => /^[\p{L} .'-]{2,}$/u.test(v) || v === '',
                hint: 'Enter at least 2 characters',
                success: 'Name looks good'
            },
            website: {
                validate: (v) => /^(https?:\/\/)?([\w.-])+\.[a-z]{2,}([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i.test(v) || v === '',
                hint: 'Enter a valid URL',
                success: 'URL looks valid'
            }
        };
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.querySelectorAll('input, textarea').forEach(field => {
            let hint = field.nextElementSibling;
            if (!hint || !hint.classList.contains('field-hint')) {
                hint = document.createElement('span');
                hint.className = 'field-hint';
                field.parentNode.insertBefore(hint, field.nextSibling);
            }

            field.addEventListener('input', (e) => this.validate(e.target));
            field.addEventListener('blur', (e) => this.validate(e.target));
        });
    }

    validate(field) {
        const rule = this.rules[field.name];
        const value = field.value.trim();
        const hint = field.parentNode.querySelector('.field-hint');

        if (!rule) {
            field.classList.remove('valid', 'invalid');
            if (hint) hint.textContent = '';
            return true;
        }

        const ok = rule.validate(value);
        if (value === '') {
            field.classList.remove('valid', 'invalid');
            if (hint) hint.textContent = '';
            return true;
        } else if (ok) {
            field.classList.remove('invalid');
            field.classList.add('valid');
            if (hint) { hint.textContent = rule.success; hint.classList.add('success'); }
            return true;
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
            if (hint) { hint.textContent = rule.hint; hint.classList.remove('success'); }
            return false;
        }
    }
}