// Main app controller
document.addEventListener('DOMContentLoaded', () => {
    // Screen management
    const screens = {
        landing: document.getElementById('landing'),
        gallery: document.getElementById('gallery'),
        formPreview: document.getElementById('formPreview')
    };

    let currentScreen = 'landing';
    let selectedTemplate = null;
    let formData = {};

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
    document.getElementById('downloadPngBtn').addEventListener('click', () => exportPNG());
    document.getElementById('downloadPdfBtn').addEventListener('click', () => exportPDF());

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

function updatePreview() {
    const preview = document.getElementById('cardPreview');
    if (window.renderCard) {
        preview.innerHTML = window.renderCard(formData);
    }
}

function exportPNG() {
    const card = document.querySelector('.card');
    if (card) {
        html2canvas(card).then(canvas => {
            const link = document.createElement('a');
            link.download = 'mycard-cardforge.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }
}

function exportPDF() {
    const card = document.querySelector('.card');
    if (card) {
        html2canvas(card).then(canvas => {
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
        });
    }
}