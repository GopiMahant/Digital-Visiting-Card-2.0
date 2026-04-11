// Template 09: Sakura Soft
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-09.svg';
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
            background: linear-gradient(135deg, #ffeef8, #fff5fb);
            color: #7b2d8b;
            font-family: 'Kaisei Decol', serif;
            position: relative;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            border: 2px solid #e8a0bf;
        ">
            <img src="${logoSrc}" alt="Logo" style="
                width: 60px;
                height: 60px;
                margin-bottom: 10px;
            ">
            <h2 style="
                font-size: 24px;
                font-weight: 400;
                margin: 0;
                color: #7b2d8b;
            ">${name}</h2>
            <p style="
                font-family: 'Zen Kaku Gothic New', sans-serif;
                font-size: 10px;
                font-weight: 300;
                margin: 5px 0 0 0;
                letter-spacing: 0.3em;
                text-transform: uppercase;
                color: #e8a0bf;
            ">${title}</p>
            <div style="margin-top: 10px; text-align: center;">
                ${company ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${company}</p>` : ''}
                ${phone ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${phone}</p>` : ''}
                ${email ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${email}</p>` : ''}
                ${website ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${website}</p>` : ''}
                ${address ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${address}</p>` : ''}
                ${linkedin ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${linkedin}</p>` : ''}
                ${instagram ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${instagram}</p>` : ''}
                ${tagline ? `<p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 9px; color: #9a7a8a; margin: 2px 0;">${tagline}</p>` : ''}
            </div>
            <!-- Sakura watermark -->
            <div style="position: absolute; top: 20px; left: 20px; font-size: 40px; opacity: 0.07; color: #e8a0bf;">🌸</div>
        </div>
    `;
}

window.renderCard = renderCard;