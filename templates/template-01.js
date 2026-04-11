// Template 01: Obsidian Executive
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-01.svg';
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
            background: #0a0a0a;
            color: #c9a84c;
            font-family: 'Cormorant Garamond', serif;
            position: relative;
            border-radius: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            box-sizing: border-box;
        ">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <h2 style="
                        font-size: 28px;
                        font-weight: 700;
                        margin: 0;
                        letter-spacing: 0.15em;
                        color: #c9a84c;
                    ">${name}</h2>
                    <p style="
                        font-family: 'DM Sans', sans-serif;
                        font-size: 11px;
                        font-weight: 300;
                        margin: 5px 0 0 0;
                        letter-spacing: 0.3em;
                        text-transform: uppercase;
                        color: #888;
                    ">${title}</p>
                </div>
                <img src="${logoSrc}" alt="Logo" style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 2px solid #c9a84c;
                ">
            </div>
            <div style="margin-top: 10px;">
                ${company ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${company}</p>` : ''}
                ${phone ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${phone}</p>` : ''}
                ${email ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${email}</p>` : ''}
                ${website ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${website}</p>` : ''}
                ${address ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${address}</p>` : ''}
                ${linkedin ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${linkedin}</p>` : ''}
                ${instagram ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${instagram}</p>` : ''}
                ${tagline ? `<p style="font-family: 'DM Sans', sans-serif; font-size: 10px; color: #aaa; margin: 2px 0;">${tagline}</p>` : ''}
            </div>
            <div style="
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(to right, #c9a84c, transparent);
            "></div>
        </div>
    `;
}

window.renderCard = renderCard;