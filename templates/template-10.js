// Template 10: Carbon Brutalist
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-10.svg';
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
            background: conic-gradient(from 0deg, #000000, #111111, #000000, #111111, #000000);
            color: #ffffff;
            font-family: 'Bebas Neue', sans-serif;
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 0;
            box-sizing: border-box;
        ">
            <div style="padding: 20px;">
                <h2 style="
                    font-size: 38px;
                    font-weight: 400;
                    margin: 0;
                    color: #ffffff;
                ">${name}</h2>
                <p style="
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    margin: 5px 0 0 0;
                    text-transform: uppercase;
                    color: #ffe600;
                ">${title}</p>
            </div>
            <div style="flex: 1; display: flex;">
                <div style="flex: 1; padding: 10px; border-right: 4px solid #ffffff;">
                    <div>
                        ${company ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${company}</p>` : ''}
                        ${phone ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${phone}</p>` : ''}
                        ${email ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${email}</p>` : ''}
                        ${website ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${website}</p>` : ''}
                    </div>
                </div>
                <div style="flex: 1; padding: 10px;">
                    <div>
                        ${address ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${address}</p>` : ''}
                        ${linkedin ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${linkedin}</p>` : ''}
                        ${instagram ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${instagram}</p>` : ''}
                        ${tagline ? `<p style="font-family: 'Courier New', monospace; font-size: 9px; color: #cccccc; margin: 2px 0;">${tagline}</p>` : ''}
                    </div>
                </div>
            </div>
            <div style="position: absolute; top: 10px; right: 10px;">
                <img src="${logoSrc}" alt="Logo" style="width: 40px; height: 40px;">
            </div>
            <!-- Warning stripe -->
            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 10px; background: repeating-linear-gradient(45deg, #ffe600, #ffe600 10px, #000000 10px, #000000 20px);"></div>
        </div>
    `;
}

window.renderCard = renderCard;