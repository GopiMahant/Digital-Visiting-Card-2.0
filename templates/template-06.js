// Template 06: Holographic Prism
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-06.svg';
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
            background: linear-gradient(45deg, #111118, #222228, #333340);
            color: #ffffff;
            font-family: 'Syne', sans-serif;
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
            clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
        ">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <h2 style="
                        font-size: 26px;
                        font-weight: 800;
                        margin: 0;
                        background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    ">${name}</h2>
                    <p style="
                        font-size: 10px;
                        font-weight: 400;
                        margin: 5px 0 0 0;
                        text-transform: uppercase;
                        color: rgba(255,255,255,0.7);
                    ">${title}</p>
                </div>
                <img src="${logoSrc}" alt="Logo" style="width: 50px; height: 50px;">
            </div>
            <div style="margin-top: 10px;">
                ${company ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${company}</p>` : ''}
                ${phone ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${phone}</p>` : ''}
                ${email ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${email}</p>` : ''}
                ${website ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${website}</p>` : ''}
                ${address ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${address}</p>` : ''}
                ${linkedin ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${linkedin}</p>` : ''}
                ${instagram ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${instagram}</p>` : ''}
                ${tagline ? `<p style="font-size: 9px; color: rgba(255,255,255,0.55); margin: 2px 0;">${tagline}</p>` : ''}
            </div>
        </div>
    `;
}

window.renderCard = renderCard;