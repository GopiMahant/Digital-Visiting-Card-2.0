// Template 03: Arctic Minimal
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-03.svg';
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
            background: #ffffff;
            color: #1a1a2e;
            font-family: 'Inter', sans-serif;
            position: relative;
            display: flex;
            padding: 20px;
            box-sizing: border-box;
        ">
            <div style="flex: 1;">
                <h2 style="
                    font-size: 24px;
                    font-weight: 900;
                    margin: 0 0 10px 0;
                    color: #1a1a2e;
                ">${name}</h2>
                <p style="
                    font-size: 11px;
                    font-weight: 300;
                    margin: 0 0 20px 0;
                    letter-spacing: 0.2em;
                    color: #4361ee;
                ">${title}</p>
                <div>
                    ${company ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${company}</p>` : ''}
                    ${phone ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${phone}</p>` : ''}
                    ${email ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${email}</p>` : ''}
                    ${website ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${website}</p>` : ''}
                    ${address ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${address}</p>` : ''}
                    ${linkedin ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${linkedin}</p>` : ''}
                    ${instagram ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${instagram}</p>` : ''}
                    ${tagline ? `<p style="font-size: 9px; color: #6b6b7a; margin: 2px 0;">${tagline}</p>` : ''}
                </div>
            </div>
            <div style="width: 35%; display: flex; align-items: center; justify-content: center;">
                <img src="${logoSrc}" alt="Logo" style="width: 80px; height: 80px;">
            </div>
            <div style="
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                height: 1px;
                background: #4361ee;
                transform: scaleX(0);
                transition: transform 0.3s;
            " class="accent-line"></div>
        </div>
        <style>
            .card:hover .accent-line { transform: scaleX(1); }
        </style>
    `;
}

window.renderCard = renderCard;