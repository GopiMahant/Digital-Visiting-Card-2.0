// Template 07: Editorial Broadsheet
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-07.svg';
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
            background: #faf7f0;
            color: #111111;
            font-family: 'Libre Baskerville', serif;
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
        ">
            <div style="border-bottom: 2px solid #111111; padding-bottom: 10px; margin-bottom: 10px;">
                <h2 style="
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0;
                    text-transform: uppercase;
                    color: #111111;
                ">${name}</h2>
            </div>
            <div style="display: flex;">
                <div style="flex: 1;">
                    <p style="
                        font-style: italic;
                        font-size: 11px;
                        margin: 0 0 10px 0;
                        color: #c0392b;
                    ">${title}</p>
                    <div>
                        ${company ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${company}</p>` : ''}
                        ${phone ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${phone}</p>` : ''}
                        ${email ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${email}</p>` : ''}
                        ${website ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${website}</p>` : ''}
                        ${address ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${address}</p>` : ''}
                        ${linkedin ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${linkedin}</p>` : ''}
                        ${instagram ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${instagram}</p>` : ''}
                        ${tagline ? `<p style="font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #333; margin: 2px 0;">${tagline}</p>` : ''}
                    </div>
                </div>
                <div style="width: 80px; display: flex; align-items: flex-start; justify-content: center;">
                    <img src="${logoSrc}" alt="Logo" style="width: 60px; height: 60px;">
                </div>
            </div>
        </div>
    `;
}

window.renderCard = renderCard;