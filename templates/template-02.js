// Template 02: Rose Gold Luxe
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-02.svg';
    const name = data.fullName || 'Alexandra Chen';
    const title = data.jobTitle || 'Creative Director';
    const company = data.company || '';
    const phone = data.phone || '';
    const email = data.email || '';
    const website = data.website || '';
    const address = data.address || '';
    const linkedin = data.linkedin || '';
    const instagram = data.instagram || '';
    const tagline = data.tagline || '';

    return `
        <div class="card" style="
            width: 350px;
            height: 200px;
            background: #f5ede0;
            color: #2a1a1a;
            font-family: 'Playfair Display', serif;
            position: relative;
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            border: 2px solid #c77daa;
        ">
            <img src="${logoSrc}" alt="Logo" style="
                width: 60px;
                height: 60px;
                margin-bottom: 10px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            ">
            <h2 style="
                font-size: 26px;
                font-weight: 400;
                font-style: italic;
                margin: 0;
                color: #2a1a1a;
            ">${name}</h2>
            <p style="
                font-family: 'Montserrat', sans-serif;
                font-size: 10px;
                font-weight: 300;
                margin: 5px 0 0 0;
                letter-spacing: 0.4em;
                text-transform: uppercase;
                color: #c77daa;
            ">${title}</p>
            <div style="margin-top: 10px; text-align: center;">
                ${company ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${company}</p>` : ''}
                ${phone ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${phone}</p>` : ''}
                ${email ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${email}</p>` : ''}
                ${website ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${website}</p>` : ''}
                ${address ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${address}</p>` : ''}
                ${linkedin ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${linkedin}</p>` : ''}
                ${instagram ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${instagram}</p>` : ''}
                ${tagline ? `<p style="font-family: 'Montserrat', sans-serif; font-size: 9px; color: #5a4a4a; margin: 2px 0;">${tagline}</p>` : ''}
            </div>
            <!-- Floral ornaments -->
            <div style="position: absolute; top: 10px; left: 10px; font-size: 20px; color: #c77daa;">❀</div>
            <div style="position: absolute; bottom: 10px; right: 10px; font-size: 20px; color: #c77daa;">❀</div>
        </div>
    `;
}

window.renderCard = renderCard;